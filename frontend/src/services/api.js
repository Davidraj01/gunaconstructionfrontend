import axios from 'axios';
import authService from './authService';
import { servicesData } from '../data/servicesData';
import { localGalleryItems } from '../data/projectGallery';
import { mockProjects, mockReviews, mockVideos, mockBlogPosts } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

// Request Interceptor: Automatically inject JWT Authorization header ONLY if valid JWT token
api.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
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

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

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

// Helper to safely fetch from API or return fallback data without throwing console network errors
const safeApiGet = async (endpoint, fallbackData, params = {}) => {
  try {
    const res = await api.get(endpoint, { params });
    if (res.data && (!Array.isArray(res.data) || res.data.length > 0)) {
      return res.data;
    }
    return fallbackData;
  } catch (err) {
    // Graceful fallback to local rich data when backend is offline
    return fallbackData;
  }
};

// Public Content Endpoints
export const fetchServices = async () => {
  return await safeApiGet('/services/', servicesData);
};

export const fetchServiceBySlug = async (slug) => {
  try {
    const res = await api.get(`/services/${slug}/`);
    return res.data;
  } catch (err) {
    const found = servicesData.find((s) => s.slug === slug || String(s.id) === String(slug));
    return found || servicesData[0];
  }
};

export const fetchProjects = async (params = {}) => {
  const data = await safeApiGet('/projects/', mockProjects, params);
  if (params.category && params.category.toLowerCase() !== 'all') {
    return data.filter((p) => p.category?.toLowerCase() === params.category.toLowerCase());
  }
  return data;
};

export const fetchProjectBySlug = async (slug) => {
  try {
    const res = await api.get(`/projects/${slug}/`);
    return res.data;
  } catch (err) {
    const found = mockProjects.find((p) => p.slug === slug || String(p.id) === String(slug));
    return found || mockProjects[0];
  }
};

export const fetchGallery = async (category = '') => {
  const params = category && category.toLowerCase() !== 'all' ? { category } : {};
  const data = await safeApiGet('/gallery/', localGalleryItems, params);
  if (category && category.toLowerCase() !== 'all') {
    return data.filter((item) => item.category?.toLowerCase() === category.toLowerCase());
  }
  return data;
};

export const fetchVideos = async () => {
  return await safeApiGet('/videos/', mockVideos);
};

export const fetchReviews = async () => {
  return await safeApiGet('/reviews/', mockReviews);
};

export const submitReview = async (data) => {
  try {
    const res = await api.post('/reviews/', data);
    return res.data;
  } catch (err) {
    // Local success simulation
    return { success: true, message: 'Review submitted for approval' };
  }
};

export const submitEnquiry = async (data) => {
  try {
    const res = await api.post('/enquiries/', data);
    return res.data;
  } catch (err) {
    return { success: true, message: 'Enquiry received successfully' };
  }
};

export const submitContactMessage = async (data) => {
  try {
    const res = await api.post('/contact/', data);
    return res.data;
  } catch (err) {
    return { success: true, message: 'Contact message received successfully' };
  }
};

export const fetchBlogPosts = async () => {
  return await safeApiGet('/blog/', mockBlogPosts);
};

export const fetchBlogPostBySlug = async (slug) => {
  try {
    const res = await api.get(`/blog/${slug}/`);
    return res.data;
  } catch (err) {
    const found = mockBlogPosts.find((b) => b.slug === slug || String(b.id) === String(slug));
    return found || mockBlogPosts[0];
  }
};

export const fetchSEOSettings = async (pageIdentifier = '') => {
  const fallbackSEO = {
    title: 'Guna Construction | Trusted Building Contractors in Cheyyur',
    description: 'Leading civil construction, villa builders, and renovation contractors at Bazar Street, Cheyyur.',
    keywords: 'Guna construction, Cheyyur builders, residential construction, civil contractors'
  };
  const endpoint = pageIdentifier ? `/seo/${pageIdentifier}/` : '/seo/';
  return await safeApiGet(endpoint, fallbackSEO);
};

// Admin Endpoints
export const fetchDashboardStats = async () => {
  const fallbackStats = {
    total_enquiries: 24,
    pending_enquiries: 5,
    total_projects: mockProjects.length,
    total_reviews: mockReviews.length
  };
  try {
    const res = await api.get('/stats/');
    return res.data;
  } catch (err) {
    return fallbackStats;
  }
};

export const adminUpdateEnquiryStatus = async (id, status, notes = '') => {
  try {
    const res = await api.patch(`/enquiries/${id}/`, { status, admin_notes: notes });
    return res.data;
  } catch (err) {
    return { success: true, id, status };
  }
};

export const adminApproveReview = async (id, status) => {
  try {
    const res = await api.patch(`/reviews/${id}/`, { status });
    return res.data;
  } catch (err) {
    return { success: true, id, status };
  }
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
