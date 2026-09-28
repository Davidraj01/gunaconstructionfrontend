/**
 * Centralized Route Definitions and Navigation Configuration
 * GUNA CONSTRUCTION Portal
 */

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  SERVICE_DETAILS: (slug = ':slug') => `/services/${slug}`,
  PROJECTS: '/projects',
  PROJECT_DETAILS: (id = ':id') => `/projects/${id}`,
  GALLERY: '/gallery',
  VIDEOS: '/videos',
  REVIEWS: '/reviews',
  ENQUIRE: '/enquire',
  BLOG: '/blog',
  BLOG_DETAILS: (slug = ':slug') => `/blog/${slug}`,
  CONTACT: '/contact',
  LOGIN: '/login',
  ADMIN_LOGIN: '/adminLogin',
  ADMIN_DASHBOARD: '/admin',
};

// Static route paths for router matching
export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  SERVICE_DETAILS: '/services/:slug',
  PROJECTS: '/projects',
  PROJECT_DETAILS: '/projects/:id',
  GALLERY: '/gallery',
  VIDEOS: '/videos',
  REVIEWS: '/reviews',
  ENQUIRE: '/enquire',
  BLOG: '/blog',
  BLOG_DETAILS: '/blog/:slug',
  CONTACT: '/contact',
  LOGIN: '/login',
  ADMIN_LOGIN: '/adminLogin',
  ADMIN_DASHBOARD: '/admin',
};

// Navigation items matching exact requested menu structure
export const NAV_ITEMS = [
  { name: 'Home', path: ROUTES.HOME },
  { name: 'About', path: ROUTES.ABOUT },
  { name: 'Services', path: ROUTES.SERVICES, hasDropdown: true },
  { name: 'Enquire Now', path: ROUTES.ENQUIRE },
  { name: 'Project Gallery', path: ROUTES.GALLERY },
  { name: 'Customer Reviews', path: ROUTES.REVIEWS },
  { name: 'Contact', path: ROUTES.CONTACT },
];

export default ROUTES;
