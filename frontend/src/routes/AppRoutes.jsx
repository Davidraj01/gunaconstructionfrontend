import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTE_PATHS, ROUTES } from './routes';
import ProtectedRoute from './ProtectedRoute';

// Pages
import Login from '../pages/Login';
import AdminLoginPage from '../pages/AdminLoginPage';
import Home from '../pages/Home';
import AboutPage from '../pages/AboutPage';
import ServicesPage from '../pages/ServicesPage';
import ServiceDetailsPage from '../pages/ServiceDetailsPage';
import ProjectsPage from '../pages/ProjectsPage';
import ProjectDetailsPage from '../pages/ProjectDetailsPage';
import GalleryPage from '../pages/GalleryPage';
import VideosPage from '../pages/VideosPage';
import ReviewsPage from '../pages/ReviewsPage';
import EnquiryPage from '../pages/EnquiryPage';
import BlogPage from '../pages/BlogPage';
import BlogDetailsPage from '../pages/BlogDetailsPage';
import ContactPage from '../pages/ContactPage';
import AdminDashboard from '../pages/AdminDashboard';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Home Landing Page */}
      <Route path={ROUTE_PATHS.HOME} element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Secret Admin Login Portal (Restricted to Admin Only) */}
      <Route path={ROUTE_PATHS.ADMIN_LOGIN} element={<AdminLoginPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Optional Client Login */}
      <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />

      {/* Main Public Website Flow */}
      <Route path={ROUTE_PATHS.ABOUT} element={<AboutPage />} />
      <Route path={ROUTE_PATHS.SERVICES} element={<ServicesPage />} />

      <Route path={ROUTE_PATHS.SERVICE_DETAILS} element={<ServiceDetailsPage />} />
      <Route path={ROUTE_PATHS.PROJECTS} element={<ProjectsPage />} />
      <Route path={ROUTE_PATHS.PROJECT_DETAILS} element={<ProjectDetailsPage />} />
      <Route path={ROUTE_PATHS.GALLERY} element={<GalleryPage />} />
      <Route path={ROUTE_PATHS.VIDEOS} element={<VideosPage />} />
      <Route path={ROUTE_PATHS.REVIEWS} element={<ReviewsPage />} />
      <Route path={ROUTE_PATHS.ENQUIRE} element={<EnquiryPage />} />
      <Route path={ROUTE_PATHS.BLOG} element={<BlogPage />} />
      <Route path={ROUTE_PATHS.BLOG_DETAILS} element={<BlogDetailsPage />} />
      <Route path={ROUTE_PATHS.CONTACT} element={<ContactPage />} />

      {/* Protected Admin Control Panel */}
      <Route
        path={ROUTE_PATHS.ADMIN_DASHBOARD}
        element={
          <ProtectedRoute requireAdmin={true} redirectTo={ROUTES.ADMIN_LOGIN}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
