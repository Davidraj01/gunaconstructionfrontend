import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes/routes';
import {
  fetchDashboardStats, api, adminUpdateEnquiryStatus, adminApproveReview,
  fetchProjects, fetchServices, fetchGallery, fetchVideos, fetchReviews, fetchBlogPosts,
  createGalleryItem, deleteGalleryItem, createVideoItem, deleteVideoItem,
  createProject, deleteProject, createService, deleteService, uploadMediaFile
} from '../services/api';
import { servicesData } from '../data/servicesData';
import localGalleryItems from '../data/projectGallery';
import {
  LayoutDashboard, MessageSquare, CheckSquare, Building2, Layers, Image as ImageIcon,
  Play, FileText, Lock, LogOut, Search, Filter, CheckCircle2, XCircle, Clock, ShieldAlert, RefreshCw,
  KeyRound, Shield, ShieldCheck, User, Plus, Trash2, ExternalLink, Upload, AlertCircle,
  FolderOpen, Globe, Eye, Sparkles, Check, ChevronRight, Menu, X, ArrowRight
} from 'lucide-react';
import logoImg from '../assets/logo.png';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdminLoggedIn, currentUser, logoutAdmin, changePassword } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');
  const [actionError, setActionError] = useState('');

  // 1. Gallery Form State
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [gallerySourceTab, setGallerySourceTab] = useState('desktop'); // 'desktop' | 'google'
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Construction');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [galleryFile, setGalleryFile] = useState(null);
  const [galleryPreviewUrl, setGalleryPreviewUrl] = useState('');
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // 2. Video Form State
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoCategory, setNewVideoCategory] = useState('Site Walkthrough');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoDesc, setNewVideoDesc] = useState('');

  // 3. Project Form State
  const [showAddProject, setShowAddProject] = useState(false);
  const [projImageSource, setProjImageSource] = useState('desktop'); // 'desktop' | 'gallery' | 'google'
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('Residential');
  const [newProjStatus, setNewProjStatus] = useState('Ongoing');
  const [newProjLocation, setNewProjLocation] = useState('Cheyyur, Tamil Nadu');
  const [newProjProgress, setNewProjProgress] = useState(50);
  const [newProjImage, setNewProjImage] = useState('');
  const [newProjFile, setNewProjFile] = useState(null);
  const [newProjPreview, setNewProjPreview] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryModalTarget, setGalleryModalTarget] = useState('project'); // 'project' | 'service'

  // 4. Service Form State
  const [showAddService, setShowAddService] = useState(false);
  const [servImageSource, setServImageSource] = useState('desktop'); // 'desktop' | 'gallery' | 'google'
  const [newServTitle, setNewServTitle] = useState('');
  const [newServCategory, setNewServCategory] = useState('Civil & Infrastructure');
  const [newServShortDesc, setNewServShortDesc] = useState('');
  const [newServFullDesc, setNewServFullDesc] = useState('');
  const [newServImage, setNewServImage] = useState('');
  const [newServFile, setNewServFile] = useState(null);
  const [newServPreview, setNewServPreview] = useState('');
  const [newServFeatures, setNewServFeatures] = useState('');

  // Change Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState({ type: '', text: '' });
  const [pwdLoading, setPwdLoading] = useState(false);

  // Search & Filter state for enquiries
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAdminLoggedIn) {
      navigate(ROUTES.ADMIN_LOGIN);
      return;
    }
    loadAllAdminData();
  }, [isAdminLoggedIn, navigate]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [sData, enqRes, revRes, projRes, servRes, galRes, vidRes, blogRes] = await Promise.all([
        fetchDashboardStats().catch(() => null),
        api.get('/enquiries/').catch(() => ({ data: [] })),
        api.get('/reviews/').catch(() => ({ data: [] })),
        fetchProjects().catch(() => []),
        fetchServices().catch(() => servicesData),
        fetchGallery().catch(() => localGalleryItems),
        fetchVideos().catch(() => []),
        fetchBlogPosts().catch(() => [])
      ]);

      setStats(sData);
      setEnquiries(enqRes.data || []);
      setReviews(revRes.data || []);
      setProjects(projRes || []);
      setServices(servRes && servRes.length ? servRes : servicesData);
      setGallery(galRes && galRes.length ? galRes : localGalleryItems);
      setVideos(vidRes || []);
      setBlogPosts(blogRes || []);
    } catch (err) {
      console.error("Failed loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const notifySuccess = (msg) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 4000);
  };

  const notifyError = (msg) => {
    setActionError(msg);
    setTimeout(() => setActionError(''), 4000);
  };

  // --- Helper: Read file to base64 preview ---
  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- 1. Gallery Handlers ---
  const handleAddGallerySubmit = async (e) => {
    e.preventDefault();
    setUploadingGallery(true);
    try {
      let finalUrl = newGalleryUrl;
      if (gallerySourceTab === 'desktop' && galleryFile) {
        try {
          const uploadRes = await uploadMediaFile(galleryFile);
          finalUrl = uploadRes.url || galleryPreviewUrl;
        } catch {
          finalUrl = galleryPreviewUrl;
        }
      }

      if (!finalUrl) {
        notifyError("Please provide an image from desktop or Google/Web URL.");
        setUploadingGallery(false);
        return;
      }

      await createGalleryItem({
        title: newGalleryTitle || "GUNA CONSTRUCTION Site Photo",
        category: newGalleryCategory,
        image_url: finalUrl,
        is_published: true
      });

      notifySuccess("Image successfully added to Project Gallery!");
      setNewGalleryTitle('');
      setNewGalleryUrl('');
      setGalleryFile(null);
      setGalleryPreviewUrl('');
      setShowAddGallery(false);
      loadAllAdminData();
    } catch (err) {
      notifyError("Failed to add image. Please check format.");
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!window.confirm("Are you sure you want to remove this photo from the gallery?")) return;
    try {
      await deleteGalleryItem(id);
      notifySuccess("Photo removed successfully.");
      loadAllAdminData();
    } catch (err) {
      notifyError("Failed to delete gallery item.");
    }
  };

  // --- 2. Video Handlers ---
  const handleAddVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVideoItem({
        title: newVideoTitle,
        category: newVideoCategory,
        video_url: newVideoUrl,
        thumbnail_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80",
        description: newVideoDesc,
        is_published: true
      });

      notifySuccess("Site video successfully added and published!");
      setNewVideoTitle('');
      setNewVideoUrl('');
      setNewVideoDesc('');
      setShowAddVideo(false);
      loadAllAdminData();
    } catch (err) {
      notifyError("Failed to add video.");
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to remove this video?")) return;
    try {
      await deleteVideoItem(id);
      notifySuccess("Video deleted.");
      loadAllAdminData();
    } catch (err) {
      notifyError("Failed to delete video.");
    }
  };

  // --- 3. Project Handlers ---
  const handleAddProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImg = newProjImage;
      if (projImageSource === 'desktop' && newProjFile) {
        try {
          const uploadRes = await uploadMediaFile(newProjFile);
          finalImg = uploadRes.url || newProjPreview;
        } catch {
          finalImg = newProjPreview;
        }
      } else if (projImageSource === 'gallery') {
        finalImg = newProjImage || (gallery[0]?.image_url);
      }

      if (!finalImg) {
        finalImg = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
      }

      await createProject({
        title: newProjTitle,
        category: newProjCategory,
        status: newProjStatus,
        location: newProjLocation,
        progress_percentage: parseInt(newProjProgress, 10) || 50,
        main_image: finalImg,
        short_description: newProjDesc || "Quality project executed by GUNA CONSTRUCTION.",
        is_published: true
      });

      notifySuccess("Project added successfully and visible on public projects list!");
      setNewProjTitle('');
      setNewProjImage('');
      setNewProjFile(null);
      setNewProjPreview('');
      setNewProjDesc('');
      setShowAddProject(false);
      loadAllAdminData();
    } catch (err) {
      notifyError("Failed to create project.");
    }
  };

  const handleDeleteProject = async (idOrSlug) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(idOrSlug);
      notifySuccess("Project removed.");
      loadAllAdminData();
    } catch (err) {
      notifyError("Failed to delete project.");
    }
  };

  // --- 4. Service Handlers ---
  const handleAddServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalImg = newServImage;
      if (servImageSource === 'desktop' && newServFile) {
        try {
          const uploadRes = await uploadMediaFile(newServFile);
          finalImg = uploadRes.url || newServPreview;
        } catch {
          finalImg = newServPreview;
        }
      } else if (servImageSource === 'gallery') {
        finalImg = newServImage || (gallery[0]?.image_url);
      }

      if (!finalImg) {
        finalImg = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80";
      }

      const featuresArr = newServFeatures
        ? newServFeatures.split(',').map(f => f.trim()).filter(Boolean)
        : ["Engineering site evaluation", "Certified quality materials", "Timely project handover"];

      await createService({
        title: newServTitle,
        category: newServCategory,
        short_description: newServShortDesc,
        full_description: newServFullDesc || newServShortDesc,
        image_url: finalImg,
        features: featuresArr,
        icon_name: "Building2",
        is_published: true
      });

      notifySuccess("New service created and visible on services page!");
      setNewServTitle('');
      setNewServShortDesc('');
      setNewServFullDesc('');
      setNewServImage('');
      setNewServFile(null);
      setNewServPreview('');
      setNewServFeatures('');
      setShowAddService(false);
      loadAllAdminData();
    } catch (err) {
      notifyError("Failed to create service.");
    }
  };

  const handleDeleteService = async (idOrSlug) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(idOrSlug);
      notifySuccess("Service removed.");
      loadAllAdminData();
    } catch (err) {
      notifyError("Failed to delete service.");
    }
  };

  // --- 5. Status & Approval Handlers ---
  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      await adminUpdateEnquiryStatus(enquiryId, newStatus);
      notifySuccess(`Enquiry marked as ${newStatus}`);
      loadAllAdminData();
    } catch (err) {
      setEnquiries(prev => prev.map(item => item.id === enquiryId ? { ...item, status: newStatus } : item));
    }
  };

  const handleReviewApproval = async (reviewId, newStatus) => {
    try {
      await adminApproveReview(reviewId, newStatus);
      notifySuccess(`Review marked as ${newStatus}`);
      loadAllAdminData();
    } catch (err) {
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwdMessage({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setPwdMessage({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setPwdMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    setPwdLoading(true);
    const res = await changePassword(oldPassword, newPassword, confirmPassword);
    setPwdLoading(false);

    if (res.success) {
      setPwdMessage({ type: 'success', text: 'Password updated successfully!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPwdMessage({ type: 'error', text: res.message || 'Failed to update password.' });
    }
  };

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter(enq => {
    const matchesSearch = (enq.full_name && enq.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (enq.phone && enq.phone.includes(searchQuery)) ||
                          (enq.project_type && enq.project_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (enq.location && enq.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const allAvailablePhotos = [
    ...(gallery || []),
    ...localGalleryItems
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>

      {/* Sidebar Navigation */}
      <aside style={{
        width: '260px',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
        zIndex: 50,
        transition: 'all 0.3s ease'
      }} className="admin-sidebar">

        {/* Brand Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px'
          }}>
            <img src={logoImg} alt="GUNA" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.3px', lineHeight: 1 }}>
              GUNA <span style={{ color: '#f97316' }}>ADMIN</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', marginTop: '3px' }}>
              Control Dashboard
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '1.25rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flexGrow: 1, overflowY: 'auto' }}>
          {[
            { id: 'overview', label: 'Overview Stats', icon: LayoutDashboard, count: null },
            { id: 'enquiries', label: 'Customer Enquiries', icon: MessageSquare, count: enquiries.length },
            { id: 'projects', label: 'Project Management', icon: Building2, count: projects.length },
            { id: 'services', label: 'Services (25)', icon: Layers, count: services.length },
            { id: 'gallery', label: 'Project Gallery', icon: ImageIcon, count: gallery.length },
            { id: 'videos', label: 'Site Videos', icon: Play, count: videos.length },
            { id: 'reviews', label: 'Reviews Approval', icon: CheckSquare, count: reviews.length },
            { id: 'password', label: 'Security & Password', icon: Lock, count: null },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileNavOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: isActive ? '#f97316' : 'transparent',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                }}
                onMouseOut={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.count !== null && (
                  <span style={{
                    backgroundColor: isActive ? '#ffffff' : 'rgba(255,255,255,0.1)',
                    color: isActive ? '#f97316' : '#94a3b8',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div style={{
          padding: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          backgroundColor: '#090d16'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#f97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800
            }}>
              A
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff' }}>
                {currentUser?.username || 'gunaconstruction'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#10b981' }}>
                Verified Administrator
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              logoutAdmin();
              navigate(ROUTES.ADMIN_LOGIN);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '0.6rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' }} className="admin-main-content">

        {/* Top Notification Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          backgroundColor: '#ffffff',
          padding: '1rem 1.5rem',
          borderRadius: '16px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
          border: '1px solid #e2e8f0',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Admin Management Portal
            </span>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
              {activeTab === 'overview' && 'System Overview & Quick Metrics'}
              {activeTab === 'enquiries' && 'Client Enquiries & Requests'}
              {activeTab === 'projects' && 'Projects & Milestones Management'}
              {activeTab === 'services' && '25 Construction Services Management'}
              {activeTab === 'gallery' && 'Project Photo Gallery Uploads'}
              {activeTab === 'videos' && 'Site Walkthrough Videos'}
              {activeTab === 'reviews' && 'Customer Testimonials & Approvals'}
              {activeTab === 'password' && 'Admin Account Security'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={loadAllAdminData}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                padding: '0.5rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh Data
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <ExternalLink size={14} /> View Live Site
            </a>
          </div>
        </div>

        {/* Action Alerts */}
        {actionSuccess && (
          <div style={{
            backgroundColor: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontWeight: 600
          }}>
            <CheckCircle2 color="#10b981" size={20} />
            {actionSuccess}
          </div>
        )}

        {actionError && (
          <div style={{
            backgroundColor: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontWeight: 600
          }}>
            <AlertCircle color="#ef4444" size={20} />
            {actionError}
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* 4 Metric Cards */}
            <div className="grid-4" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>Total Enquiries</span>
                  <div style={{ backgroundColor: '#fff7ed', color: '#ea580c', padding: '0.4rem', borderRadius: '8px' }}>
                    <MessageSquare size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
                  {enquiries.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#16a34a', marginTop: '0.35rem', fontWeight: 600 }}>
                  Active client communications
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>Specialized Services</span>
                  <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '0.4rem', borderRadius: '8px' }}>
                    <Layers size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
                  {services.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#2563eb', marginTop: '0.35rem', fontWeight: 600 }}>
                  25 Civil & Architectural categories
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>Live Projects</span>
                  <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '0.4rem', borderRadius: '8px' }}>
                    <Building2 size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
                  {projects.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#16a34a', marginTop: '0.35rem', fontWeight: 600 }}>
                  Completed & ongoing structures
                </div>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>Project Photos</span>
                  <div style={{ backgroundColor: '#faf5ff', color: '#9333ea', padding: '0.4rem', borderRadius: '8px' }}>
                    <ImageIcon size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
                  {gallery.length}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#9333ea', marginTop: '0.35rem', fontWeight: 600 }}>
                  Real site construction gallery
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #e2e8f0',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                Quick Administrator Actions
              </h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => { setActiveTab('projects'); setShowAddProject(true); }}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.4rem' }}
                >
                  <Plus size={18} /> Add New Project
                </button>
                <button
                  onClick={() => { setActiveTab('services'); setShowAddService(true); }}
                  className="btn-primary"
                  style={{ padding: '0.75rem 1.4rem', backgroundColor: '#0f172a' }}
                >
                  <Plus size={18} /> Add New Service
                </button>
                <button
                  onClick={() => { setActiveTab('gallery'); setShowAddGallery(true); }}
                  style={{
                    backgroundColor: '#fff7ed',
                    color: '#ea580c',
                    border: '1.5px solid #fed7aa',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Upload size={18} /> Upload Photo to Gallery
                </button>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  style={{
                    backgroundColor: '#f8fafc',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    padding: '0.75rem 1.4rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <MessageSquare size={18} /> Review Incoming Quotes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>Projects Management</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
                  Add, update, or remove projects shown on the public projects page.
                </p>
              </div>

              <button
                onClick={() => setShowAddProject(!showAddProject)}
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
              >
                <Plus size={18} /> {showAddProject ? 'Close Form' : 'Add New Project'}
              </button>
            </div>

            {/* Add Project Form */}
            {showAddProject && (
              <div style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '20px',
                border: '2px solid #fed7aa',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                marginBottom: '2.5rem'
              }}>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  Create & Publish Project
                </h4>

                <form onSubmit={handleAddProjectSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern Residential Villa at Cheyyur"
                      value={newProjTitle}
                      onChange={e => setNewProjTitle(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Category *
                    </label>
                    <select
                      value={newProjCategory}
                      onChange={e => setNewProjCategory(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Renovation">Renovation</option>
                      <option value="Civil">Civil Construction</option>
                      <option value="Structural">Structural Work</option>
                      <option value="Interior">Interior Fitouts</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Status
                    </label>
                    <select
                      value={newProjStatus}
                      onChange={e => setNewProjStatus(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={newProjLocation}
                      onChange={e => setNewProjLocation(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Progress Percentage: {newProjProgress}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newProjProgress}
                      onChange={e => setNewProjProgress(e.target.value)}
                      style={{ width: '100%', marginTop: '0.5rem' }}
                    />
                  </div>

                  {/* Multi-Source Image Selector for Project */}
                  <div style={{ gridColumn: 'span 2', backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                      Attach Project Cover Image (Select Source)
                    </label>

                    {/* Source Selector Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setProjImageSource('desktop')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: projImageSource === 'desktop' ? '#f97316' : '#ffffff',
                          color: projImageSource === 'desktop' ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <FolderOpen size={16} /> Upload from Desktop / Folder
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProjImageSource('gallery');
                          setGalleryModalTarget('project');
                          setIsGalleryModalOpen(true);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: projImageSource === 'gallery' ? '#f97316' : '#ffffff',
                          color: projImageSource === 'gallery' ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <ImageIcon size={16} /> Choose from Gallery Photos
                      </button>

                      <button
                        type="button"
                        onClick={() => setProjImageSource('google')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: projImageSource === 'google' ? '#f97316' : '#ffffff',
                          color: projImageSource === 'google' ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <Globe size={16} /> Google Image / Web Link
                      </button>
                    </div>

                    {/* Desktop File Upload */}
                    {projImageSource === 'desktop' && (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, setNewProjFile, setNewProjPreview)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1.5px dashed #cbd5e1',
                            backgroundColor: '#ffffff'
                          }}
                        />
                        {newProjPreview && (
                          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={newProjPreview} alt="Preview" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #fed7aa' }} />
                            <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 700 }}>✓ File selected and ready to save</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Gallery Picker Selected Image */}
                    {projImageSource === 'gallery' && (
                      <div>
                        {newProjImage ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={newProjImage} alt="Selected" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #f97316' }} />
                            <div>
                              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Selected Gallery Photo</div>
                              <button
                                type="button"
                                onClick={() => { setGalleryModalTarget('project'); setIsGalleryModalOpen(true); }}
                                style={{ background: 'none', border: 'none', color: '#f97316', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', padding: 0 }}
                              >
                                Change Selection
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => { setGalleryModalTarget('project'); setIsGalleryModalOpen(true); }}
                            className="btn-primary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                          >
                            Browse & Select Photo from Gallery
                          </button>
                        )}
                      </div>
                    )}

                    {/* Google / Web URL */}
                    {projImageSource === 'google' && (
                      <div>
                        <input
                          type="url"
                          placeholder="Paste Google / Unsplash / Direct Image URL..."
                          value={newProjImage}
                          onChange={e => setNewProjImage(e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                        />
                        {newProjImage && (
                          <div style={{ marginTop: '0.75rem' }}>
                            <img src={newProjImage} alt="Preview" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #fed7aa' }} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Project Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief details about the structural build, location, and milestones..."
                      value={newProjDesc}
                      onChange={e => setNewProjDesc(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowAddProject(false)}
                      style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                      Save & Publish Project
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Existing Projects Grid */}
            <div className="grid-3" style={{ gap: '1.5rem' }}>
              {projects.map((p) => (
                <div key={p.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '170px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#0f172a', marginBottom: '0.85rem' }}>
                    <img src={p.main_image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{
                      backgroundColor: p.status === 'Completed' ? '#dcfce7' : p.status === 'Ongoing' ? '#fff7ed' : '#eff6ff',
                      color: p.status === 'Completed' ? '#16a34a' : p.status === 'Ongoing' ? '#ea580c' : '#2563eb',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '20px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase'
                    }}>
                      {p.status}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{p.category}</span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0.35rem 0' }}>{p.title}</h4>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>📍 {p.location}</div>

                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f97316' }}>{p.progress_percentage}% Done</span>
                    <button
                      onClick={() => handleDeleteProject(p.slug || p.id)}
                      style={{
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        padding: '0.4rem 0.85rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES MANAGEMENT (All 25 Services) */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>
                  25 Services & Specializations Management
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
                  Manage and customize the 25 construction services presented in the menu bar and services page.
                </p>
              </div>

              <button
                onClick={() => setShowAddService(!showAddService)}
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
              >
                <Plus size={18} /> {showAddService ? 'Close Form' : 'Add New Service'}
              </button>
            </div>

            {/* Add Service Form */}
            {showAddService && (
              <div style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '20px',
                border: '2px solid #fed7aa',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                marginBottom: '2.5rem'
              }}>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  Create New Construction Service
                </h4>

                <form onSubmit={handleAddServiceSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Service Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Specialized Waterproofing & Repair"
                      value={newServTitle}
                      onChange={e => setNewServTitle(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Category *
                    </label>
                    <select
                      value={newServCategory}
                      onChange={e => setNewServCategory(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                      <option value="Foundation & Structural">Foundation & Structural</option>
                      <option value="Structural & Metal Works">Structural & Metal Works</option>
                      <option value="Interior & Finishing">Interior & Finishing</option>
                      <option value="Interior Decoration">Interior Decoration</option>
                      <option value="Doors & Windows">Doors & Windows</option>
                      <option value="Maintenance & Protection">Maintenance & Protection</option>
                      <option value="Engineering & Approvals">Engineering & Approvals</option>
                      <option value="Realty & Development">Realty & Development</option>
                    </select>
                  </div>

                  {/* Multi-Source Image Selector for Service */}
                  <div style={{ gridColumn: 'span 2', backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
                      Service Image (Select Source)
                    </label>

                    {/* Source Selector Tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setServImageSource('desktop')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: servImageSource === 'desktop' ? '#f97316' : '#ffffff',
                          color: servImageSource === 'desktop' ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <FolderOpen size={16} /> Upload from Desktop / Folder
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setServImageSource('gallery');
                          setGalleryModalTarget('service');
                          setIsGalleryModalOpen(true);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: servImageSource === 'gallery' ? '#f97316' : '#ffffff',
                          color: servImageSource === 'gallery' ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <ImageIcon size={16} /> Choose from Gallery Photos
                      </button>

                      <button
                        type="button"
                        onClick={() => setServImageSource('google')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: servImageSource === 'google' ? '#f97316' : '#ffffff',
                          color: servImageSource === 'google' ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <Globe size={16} /> Google Image / Web Link
                      </button>
                    </div>

                    {servImageSource === 'desktop' && (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, setNewServFile, setNewServPreview)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1.5px dashed #cbd5e1',
                            backgroundColor: '#ffffff'
                          }}
                        />
                        {newServPreview && (
                          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={newServPreview} alt="Preview" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #fed7aa' }} />
                            <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 700 }}>✓ File ready to attach</span>
                          </div>
                        )}
                      </div>
                    )}

                    {servImageSource === 'gallery' && (
                      <div>
                        {newServImage ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={newServImage} alt="Selected" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #f97316' }} />
                            <div>
                              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>Selected Photo</div>
                              <button
                                type="button"
                                onClick={() => { setGalleryModalTarget('service'); setIsGalleryModalOpen(true); }}
                                style={{ background: 'none', border: 'none', color: '#f97316', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', padding: 0 }}
                              >
                                Change Selection
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => { setGalleryModalTarget('service'); setIsGalleryModalOpen(true); }}
                            className="btn-primary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                          >
                            Browse & Select Photo from Gallery
                          </button>
                        )}
                      </div>
                    )}

                    {servImageSource === 'google' && (
                      <div>
                        <input
                          type="url"
                          placeholder="Paste Google / Web Image URL..."
                          value={newServImage}
                          onChange={e => setNewServImage(e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                        />
                        {newServImage && (
                          <div style={{ marginTop: '0.75rem' }}>
                            <img src={newServImage} alt="Preview" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #fed7aa' }} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Short Summary *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Concise overview for service cards..."
                      value={newServShortDesc}
                      onChange={e => setNewServShortDesc(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Key Inclusions / Features (Comma Separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DTCP Norms, High-grade materials, 10-Year guarantee, Rapid execution"
                      value={newServFeatures}
                      onChange={e => setNewServFeatures(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowAddService(false)}
                      style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                      Save & Publish Service
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of 25 Services */}
            <div className="grid-3" style={{ gap: '1.5rem' }}>
              {services.map((s) => (
                <div key={s.id || s.slug} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}>
                  {s.image_url && (
                    <div style={{ height: '140px', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#0f172a', marginBottom: '0.85rem' }}>
                      <img src={s.image_url} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    {s.category || 'Service'}
                  </div>
                  <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {s.title}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.25rem', flexGrow: 1 }}>
                    {s.short_description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginTop: 'auto' }}>
                    <a
                      href={`/services/${s.slug || s.id}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '0.82rem', color: '#f97316', fontWeight: 700, textDecoration: 'none' }}
                    >
                      View Page ↗
                    </a>

                    <button
                      onClick={() => handleDeleteService(s.slug || s.id)}
                      style={{
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECT GALLERY UPLOADS */}
        {activeTab === 'gallery' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>Project Photo Gallery</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
                  Upload photos from your desktop / folders or add via Google image links.
                </p>
              </div>

              <button
                onClick={() => setShowAddGallery(!showAddGallery)}
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
              >
                <Plus size={18} /> {showAddGallery ? 'Close Form' : 'Upload New Photo'}
              </button>
            </div>

            {showAddGallery && (
              <div style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '20px',
                border: '2px solid #fed7aa',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                marginBottom: '2.5rem'
              }}>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  Upload Site Photograph
                </h4>

                <form onSubmit={handleAddGallerySubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Photo Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Reinforced Foundation Footing"
                      value={newGalleryTitle}
                      onChange={e => setNewGalleryTitle(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Category *
                    </label>
                    <select
                      value={newGalleryCategory}
                      onChange={e => setNewGalleryCategory(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', backgroundColor: '#ffffff' }}
                    >
                      <option value="Construction">Construction</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Structural">Structural</option>
                      <option value="Civil">Civil</option>
                      <option value="Interior">Interior</option>
                      <option value="Exterior">Exterior</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Multi-source Image Selector for Gallery */}
                  <div style={{ gridColumn: 'span 2', backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setGallerySourceTab('desktop')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: gallerySourceTab === 'desktop' ? '#f97316' : '#ffffff',
                          color: gallerySourceTab === 'desktop' ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <FolderOpen size={16} /> Choose File from Desktop / Folder
                      </button>

                      <button
                        type="button"
                        onClick={() => setGallerySourceTab('google')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: gallerySourceTab === 'google' ? '#f97316' : '#ffffff',
                          color: gallerySourceTab === 'google' ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <Globe size={16} /> Paste Google Image / Web URL
                      </button>
                    </div>

                    {gallerySourceTab === 'desktop' ? (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, setGalleryFile, setGalleryPreviewUrl)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1.5px dashed #cbd5e1',
                            backgroundColor: '#ffffff'
                          }}
                        />
                        {galleryPreviewUrl && (
                          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={galleryPreviewUrl} alt="Preview" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #fed7aa' }} />
                            <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 700 }}>✓ File selected and ready to upload</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <input
                          type="url"
                          placeholder="Paste image link URL..."
                          value={newGalleryUrl}
                          onChange={e => setNewGalleryUrl(e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#ffffff' }}
                        />
                        {newGalleryUrl && (
                          <div style={{ marginTop: '0.75rem' }}>
                            <img src={newGalleryUrl} alt="Preview" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #fed7aa' }} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowAddGallery(false)}
                      style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Cancel
                    </button>
                    <button type="submit" disabled={uploadingGallery} className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                      {uploadingGallery ? 'Uploading Photo...' : 'Publish to Gallery'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Gallery Grid */}
            <div className="grid-4" style={{ gap: '1.25rem' }}>
              {gallery.map((g) => (
                <div key={g.id} style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ height: '170px', backgroundColor: '#0f172a' }}>
                    <img src={g.image_url} alt={g.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '0.85rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase' }}>
                      {g.category}
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {g.title}
                    </div>

                    <button
                      onClick={() => handleDeleteGallery(g.id)}
                      style={{
                        marginTop: '0.75rem',
                        width: '100%',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        padding: '0.4rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={13} /> Delete Photo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SITE VIDEOS */}
        {activeTab === 'videos' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>Site Videos Management</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
                  Manage YouTube / Vimeo embed links for site walkthroughs.
                </p>
              </div>

              <button
                onClick={() => setShowAddVideo(!showAddVideo)}
                className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
              >
                <Plus size={18} /> {showAddVideo ? 'Close Form' : 'Add New Video'}
              </button>
            </div>

            {showAddVideo && (
              <div style={{
                backgroundColor: '#ffffff',
                padding: '2rem',
                borderRadius: '20px',
                border: '2px solid #fed7aa',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                marginBottom: '2.5rem'
              }}>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
                  Add Site Walkthrough Video
                </h4>

                <form onSubmit={handleAddVideoSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Video Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Slab Concrete Casting Inspection"
                      value={newVideoTitle}
                      onChange={e => setNewVideoTitle(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      YouTube Embed URL *
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://www.youtube.com/embed/..."
                      value={newVideoUrl}
                      onChange={e => setNewVideoUrl(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                      Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Short summary of the site footage..."
                      value={newVideoDesc}
                      onChange={e => setNewVideoDesc(e.target.value)}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowAddVideo(false)}
                      style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
                      Publish Video
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid-2" style={{ gap: '1.5rem' }}>
              {videos.map((vid) => (
                <div key={vid.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                  <div style={{ height: '220px', backgroundColor: '#0f172a', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <iframe src={vid.video_url} title={vid.title} style={{ width: '100%', height: '100%', border: 'none' }} allowFullScreen />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 800, marginBottom: '0.4rem' }}>{vid.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>{vid.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleDeleteVideo(vid.id)}
                      style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.4rem 0.85rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Trash2 size={14} /> Remove Video
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.45rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>Customer Enquiries Management</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
                  Direct incoming quote inquiries from website visitors.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    placeholder="Search customer, phone, location..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ padding: '0.55rem 0.75rem 0.55rem 2.25rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem' }}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  style={{ padding: '0.55rem', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.88rem', backgroundColor: '#ffffff' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                    <th style={{ padding: '1rem' }}>Customer Name</th>
                    <th style={{ padding: '1rem' }}>Contact Details</th>
                    <th style={{ padding: '1rem' }}>Project Type</th>
                    <th style={{ padding: '1rem' }}>Location</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem' }}>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>
                        No enquiries matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((enq) => (
                      <tr key={enq.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '1rem', fontWeight: 700, color: '#0f172a' }}>
                          {enq.full_name}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <a href={`tel:${enq.phone}`} style={{ fontWeight: 700, color: '#ea580c', textDecoration: 'none' }}>📞 {enq.phone}</a>
                          {enq.email && <div style={{ fontSize: '0.8rem', color: '#64748b' }}>✉️ {enq.email}</div>}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ backgroundColor: '#fff7ed', color: '#ea580c', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
                            {enq.project_type}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', color: '#475569' }}>
                          {enq.location || 'Cheyyur, TN'}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            backgroundColor: enq.status === 'New' ? '#fef3c7' : enq.status === 'Completed' ? '#dcfce7' : '#e0e7ff',
                            color: enq.status === 'New' ? '#d97706' : enq.status === 'Completed' ? '#16a34a' : '#4338ca',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 800
                          }}>
                            {enq.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <select
                            value={enq.status}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            style={{ padding: '0.35rem 0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', backgroundColor: '#ffffff' }}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="InProgress">InProgress</option>
                            <option value="Completed">Completed</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: REVIEWS */}
        {activeTab === 'reviews' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.45rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>Customer Reviews Moderation</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
                Approve or moderate testimonials submitted by clients.
              </p>
            </div>

            <div className="grid-2" style={{ gap: '1.5rem' }}>
              {reviews.map((r) => (
                <div key={r.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>{r.name}</div>
                    <span style={{
                      backgroundColor: r.status === 'Approved' ? '#dcfce7' : '#fef3c7',
                      color: r.status === 'Approved' ? '#16a34a' : '#d97706',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 800
                    }}>
                      {r.status}
                    </span>
                  </div>
                  <div style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                    {'★'.repeat(r.rating || 5)}{'☆'.repeat(5 - (r.rating || 5))}
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    "{r.comment}"
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    {r.status !== 'Approved' && (
                      <button
                        onClick={() => handleReviewApproval(r.id, 'Approved')}
                        style={{ backgroundColor: '#10b981', color: '#ffffff', border: 'none', padding: '0.45rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Approve Review
                      </button>
                    )}
                    {r.status === 'Approved' && (
                      <button
                        onClick={() => handleReviewApproval(r.id, 'Pending')}
                        style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '0.45rem 1rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Mark as Pending
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: PASSWORD & SECURITY */}
        {activeTab === 'password' && (
          <div style={{ maxWidth: '540px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.45rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>Administrator Security Settings</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '2px 0 0 0' }}>
                Update your admin credentials securely.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', padding: '2rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
              {pwdMessage.text && (
                <div style={{
                  backgroundColor: pwdMessage.type === 'success' ? '#ecfdf5' : '#fef2f2',
                  color: pwdMessage.type === 'success' ? '#065f46' : '#991b1b',
                  border: `1px solid ${pwdMessage.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {pwdMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{pwdMessage.text}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password (min 6 characters)"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={pwdLoading}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', marginTop: '0.5rem' }}
                >
                  {pwdLoading ? 'Updating Password...' : 'Update Password'} <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Interactive Gallery Selector Modal */}
      {isGalleryModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '850px',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Select Photo from Gallery
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '2px 0 0 0' }}>
                  Click any photo below to instantly attach it to your {galleryModalTarget}.
                </p>
              </div>
              <button
                onClick={() => setIsGalleryModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '1rem'
            }}>
              {allAvailablePhotos.map((item, index) => (
                <div
                  key={item.id || index}
                  onClick={() => {
                    if (galleryModalTarget === 'project') {
                      setNewProjImage(item.image_url);
                    } else if (galleryModalTarget === 'service') {
                      setNewServImage(item.image_url);
                    }
                    setIsGalleryModalOpen(false);
                    notifySuccess("Photo attached successfully!");
                  }}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    height: '130px',
                    backgroundColor: '#0f172a',
                    border: '2px solid transparent',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#f97316';
                    e.currentTarget.style.transform = 'scale(1.03)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '0.5rem',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            display: none !important;
          }
          .admin-main-content {
            padding: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
