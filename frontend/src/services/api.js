import axios from 'axios';
import authService from './authService';

const API_BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Automatically inject JWT Authorization header ONLY if valid JWT token
api.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    // Only attach Bearer header if token exists and is a valid JWT (3 dot-separated base64 segments)
    if (token && typeof token === 'string' && token.split('.').length === 3) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers?.Authorization) {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Automatically handle 401 by refreshing token or retrying public requests anonymously
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// List of public read-only endpoint patterns
const isPublicGetRequest = (config) => {
  if (!config || config.method?.toLowerCase() !== 'get') return false;
  const url = config.url || '';
  return (
    url.includes('/services') ||
    url.includes('/projects') ||
    url.includes('/gallery') ||
    url.includes('/videos') ||
    url.includes('/reviews') ||
    url.includes('/blog') ||
    url.includes('/seo')
  );
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and request has not already been retried
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      // If it's a public GET endpoint that failed because of an invalid/expired token, retry anonymously
      if (isPublicGetRequest(originalRequest)) {
        delete originalRequest.headers.Authorization;
        authService.clearSession();
        return api(originalRequest);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            } else {
              delete originalRequest.headers.Authorization;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const newAccessToken = await authService.refreshToken();
        if (newAccessToken && newAccessToken.split('.').length === 3) {
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else {
          processQueue(new Error('Refresh token expired'), null);
          authService.clearSession();
          if (isPublicGetRequest(originalRequest)) {
            delete originalRequest.headers.Authorization;
            return api(originalRequest);
          }
          return Promise.reject(error);
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        authService.clearSession();
        if (isPublicGetRequest(originalRequest)) {
          delete originalRequest.headers.Authorization;
          return api(originalRequest);
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Public Content Endpoints
export const fetchServices = async () => {
  try {
    const res = await api.get('/services/');
    return res.data;
  } catch (err) {
    console.warn("API offline or error, returning fallback data if available", err);
    throw err;
  }
};

export const fetchServiceBySlug = async (slug) => {
  const res = await api.get(`/services/${slug}/`);
  return res.data;
};

export const fetchProjects = async (params = {}) => {
  const res = await api.get('/projects/', { params });
  return res.data;
};

export const fetchProjectBySlug = async (slug) => {
  const res = await api.get(`/projects/${slug}/`);
  return res.data;
};

export const fetchGallery = async (category = '') => {
  const params = category && category.toLowerCase() !== 'all' ? { category } : {};
  const res = await api.get('/gallery/', { params });
  return res.data;
};

export const fetchVideos = async () => {
  const res = await api.get('/videos/');
  return res.data;
};

export const fetchReviews = async () => {
  const res = await api.get('/reviews/');
  return res.data;
};

export const submitReview = async (data) => {
  const res = await api.post('/reviews/', data);
  return res.data;
};

export const submitEnquiry = async (data) => {
  const res = await api.post('/enquiries/', data);
  return res.data;
};

export const submitContactMessage = async (data) => {
  const res = await api.post('/contact/', data);
  return res.data;
};

export const fetchBlogPosts = async () => {
  const res = await api.get('/blog/');
  return res.data;
};

export const fetchBlogPostBySlug = async (slug) => {
  const res = await api.get(`/blog/${slug}/`);
  return res.data;
};

export const fetchSEOSettings = async (pageIdentifier = '') => {
  const endpoint = pageIdentifier ? `/seo/${pageIdentifier}/` : '/seo/';
  const res = await api.get(endpoint);
  return res.data;
};

// Admin Endpoints
export const fetchDashboardStats = async () => {
  try {
    const res = await api.get('/stats/');
    return res.data;
  } catch (err) {
    const res = await api.get('/admin/dashboard/');
    return res.data?.metrics || res.data;
  }
};

export const adminUpdateEnquiryStatus = async (id, status, notes = '') => {
  const res = await api.patch(`/enquiries/${id}/`, { status, admin_notes: notes });
  return res.data;
};

export const adminApproveReview = async (id, status) => {
  const res = await api.patch(`/reviews/${id}/`, { status });
  return res.data;
};

// Admin Content & Project CRUD Endpoints
export const createProject = async (projectData) => {
  const res = await api.post('/projects/', projectData);
  return res.data;
};


export const updateProject = async (idOrSlug, projectData) => {
  const res = await api.patch(`/projects/${idOrSlug}/`, projectData);
  return res.data;
};

export const deleteProject = async (idOrSlug) => {
  const res = await api.delete(`/projects/${idOrSlug}/`);
  return res.data;
};

export const uploadMediaFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await api.post('/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const createGalleryItem = async (galleryData) => {
  const res = await api.post('/gallery/', galleryData);
  return res.data;
};

export const deleteGalleryItem = async (id) => {
  const res = await api.delete(`/gallery/${id}/`);
  return res.data;
};

export const createVideoItem = async (videoData) => {
  const res = await api.post('/videos/', videoData);
  return res.data;
};

export const deleteVideoItem = async (id) => {
  const res = await api.delete(`/videos/${id}/`);
  return res.data;
};

// Service CRUD Endpoints
export const createService = async (serviceData) => {
  const res = await api.post('/services/', serviceData);
  return res.data;
};

export const updateService = async (idOrSlug, serviceData) => {
  const res = await api.patch(`/services/${idOrSlug}/`, serviceData);
  return res.data;
};

export const deleteService = async (idOrSlug) => {
  const res = await api.delete(`/services/${idOrSlug}/`);
  return res.data;
};

export default api;

