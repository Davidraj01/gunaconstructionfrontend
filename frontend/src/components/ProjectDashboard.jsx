import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import {
  Activity,
  CheckCircle2,
  Clock,
  Building2,
  RefreshCw,
  ArrowRight,
  MapPin,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

const ProjectDashboard = ({ limit = null, title = "Project Status & Live Progress Dashboard" }) => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadProjectsData = async (showSyncingState = false) => {
    if (showSyncingState) setIsSyncing(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to load project dashboard data:", err);
    } finally {
      setIsLoading(false);
      if (showSyncingState) {
        setTimeout(() => setIsSyncing(false), 600);
      }
    }
  };

  useEffect(() => {
    loadProjectsData();
    // Real-time update auto-polling interval every 15 seconds
    const pollInterval = setInterval(() => {
      loadProjectsData(true);
    }, 15000);

    return () => clearInterval(pollInterval);
  }, []);

  // Stats calculation
  const totalCount = projects.length;
  const ongoingCount = projects.filter(p => p.status?.toLowerCase() === 'ongoing').length;
  const finishedCount = projects.filter(p => p.status?.toLowerCase() === 'completed').length;
  const upcomingCount = projects.filter(p => p.status?.toLowerCase() === 'upcoming').length;

  // Filter project items based on active tab
  const filteredProjects = projects.filter(p => {
    if (activeTab === 'Ongoing') return p.status?.toLowerCase() === 'ongoing';
    if (activeTab === 'Finished') return p.status?.toLowerCase() === 'completed';
    if (activeTab === 'Upcoming') return p.status?.toLowerCase() === 'upcoming';
    return true;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return { bg: '#fff7ed', text: '#ea580c', border: '#ffedd5', badgeBg: '#f97316' };
      case 'completed':
      case 'finished':
        return { bg: '#f0fdf4', text: '#16a34a', border: '#dcfce7', badgeBg: '#10b981' };
      case 'upcoming':
        return { bg: '#f0f9ff', text: '#0284c7', border: '#e0f2fe', badgeBg: '#0284c7' };
      default:
        return { bg: '#f8fafc', text: '#475569', border: '#e2e8f0', badgeBg: '#64748b' };
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '24px', padding: '2.5rem 2rem', boxShadow: '0 10px 40px -10px rgba(15, 23, 42, 0.08)', border: '1px solid #e2e8f0' }}>
      
      {/* Dashboard Top Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#fff7ed', color: '#f97316', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.5rem' }}>
            <Activity size={14} className="pulse-icon" /> Live Status Updates
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', margin: 0 }}>
            {title}
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '4px 0 0 0' }}>
            Track real-time construction site progress, completed deliveries, and upcoming developments.
          </p>
        </div>

        {/* Real-Time Sync Indicator & Refresh Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#64748b', backgroundColor: '#f8fafc', padding: '6px 14px', borderRadius: '30px', border: '1px solid #e2e8f0' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: isSyncing ? '#f97316' : '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: isSyncing ? '0 0 8px #f97316' : '0 0 8px #10b981' }} />
            <span>{isSyncing ? 'Syncing...' : `Live Sync (${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })})`}</span>
          </div>

          <button
            onClick={() => loadProjectsData(true)}
            style={{
              backgroundColor: '#f1f5f9',
              border: 'none',
              borderRadius: '10px',
              padding: '0.55rem',
              color: '#0f172a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            title="Refresh Live Data"
          >
            <RefreshCw size={18} className={isSyncing ? 'spin-icon' : ''} />
          </button>
        </div>
      </div>

      {/* Metric Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        {/* Total Projects */}
        <div
          onClick={() => setActiveTab('All')}
          style={{
            backgroundColor: activeTab === 'All' ? '#0f172a' : '#f8fafc',
            color: activeTab === 'All' ? '#ffffff' : '#0f172a',
            padding: '1.25rem 1.5rem',
            borderRadius: '16px',
            border: activeTab === 'All' ? '2px solid #0f172a' : '1px solid #e2e8f0',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: activeTab === 'All' ? '#94a3b8' : '#64748b' }}>Total Projects</span>
            <Building2 size={20} color={activeTab === 'All' ? '#f97316' : '#64748b'} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{totalCount}</div>
          <span style={{ fontSize: '0.75rem', color: activeTab === 'All' ? '#cbd5e1' : '#94a3b8' }}>Stored in database</span>
        </div>

        {/* Ongoing Projects */}
        <div
          onClick={() => setActiveTab('Ongoing')}
          style={{
            backgroundColor: activeTab === 'Ongoing' ? '#fff7ed' : '#ffffff',
            padding: '1.25rem 1.5rem',
            borderRadius: '16px',
            border: activeTab === 'Ongoing' ? '2px solid #f97316' : '1px solid #fed7aa',
            boxShadow: '0 4px 15px rgba(249, 115, 22, 0.06)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ea580c' }}>Ongoing Work</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f97316', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700 }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff' }} /> Active
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c2410c' }}>{ongoingCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#ea580c' }}>Current active construction</span>
        </div>

        {/* Finished / Completed Projects */}
        <div
          onClick={() => setActiveTab('Finished')}
          style={{
            backgroundColor: activeTab === 'Finished' ? '#f0fdf4' : '#ffffff',
            padding: '1.25rem 1.5rem',
            borderRadius: '16px',
            border: activeTab === 'Finished' ? '2px solid #10b981' : '1px solid #bbf7d0',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.06)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#16a34a' }}>Finished / Delivered</span>
            <CheckCircle2 size={20} color="#16a34a" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#15803d' }}>{finishedCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#16a34a' }}>Successfully handed over</span>
        </div>

        {/* Upcoming Projects */}
        <div
          onClick={() => setActiveTab('Upcoming')}
          style={{
            backgroundColor: activeTab === 'Upcoming' ? '#f0f9ff' : '#ffffff',
            padding: '1.25rem 1.5rem',
            borderRadius: '16px',
            border: activeTab === 'Upcoming' ? '2px solid #0284c7' : '1px solid #bae6fd',
            boxShadow: '0 4px 15px rgba(2, 132, 199, 0.06)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0284c7' }}>Upcoming Tasks</span>
            <Clock size={20} color="#0284c7" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0369a1' }}>{upcomingCount}</div>
          <span style={{ fontSize: '0.75rem', color: '#0284c7' }}>Blueprint & planning stage</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {['All', 'Ongoing', 'Finished', 'Upcoming'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 700,
              border: 'none',
              backgroundColor: activeTab === tab ? '#f97316' : '#f1f5f9',
              color: activeTab === tab ? '#ffffff' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            {tab === 'All' && 'All Projects'}
            {tab === 'Ongoing' && '⚡ Ongoing Projects'}
            {tab === 'Finished' && '✅ Finished Projects'}
            {tab === 'Upcoming' && '📅 Upcoming Tasks'}
          </button>
        ))}
      </div>

      {/* Projects Grid List */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>
          <RefreshCw size={32} className="spin-icon" style={{ marginBottom: '1rem', color: '#f97316' }} />
          <p style={{ fontWeight: 600 }}>Fetching live project status data...</p>
        </div>
      ) : displayedProjects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: '#f8fafc', borderRadius: '16px', color: '#64748b' }}>
          <Building2 size={36} color="#94a3b8" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem 0' }}>No {activeTab} Projects Found</h4>
          <p style={{ fontSize: '0.9rem', margin: 0 }}>There are currently no project records matching the selected status filter.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {displayedProjects.map((project) => {
            const statusTheme = getStatusColor(project.status);
            const progress = project.progress_percentage || (project.status?.toLowerCase() === 'completed' ? 100 : project.status?.toLowerCase() === 'ongoing' ? 65 : 15);

            return (
              <div
                key={project.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(15, 23, 42, 0.12)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.04)';
                }}
              >
                {/* Project Image & Status Badge */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={project.main_image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  
                  {/* Category Pill */}
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(4px)'
                  }}>
                    {project.category}
                  </span>

                  {/* Status Badge */}
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: statusTheme.badgeBg,
                    color: '#ffffff',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {project.status?.toLowerCase() === 'ongoing' && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff', animation: 'pulse 1.5s infinite' }} />}
                    {project.status?.toLowerCase() === 'completed' && <CheckCircle2 size={12} />}
                    {project.status?.toLowerCase() === 'upcoming' && <Clock size={12} />}
                    {project.status}
                  </span>
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {project.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
                    <MapPin size={14} color="#f97316" />
                    <span>{project.location || 'Cheyyur, Tamil Nadu'}</span>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem', flexGrow: 1 }}>
                    {project.short_description}
                  </p>

                  {/* Progress Bar & Percentage */}
                  <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #f1f5f9', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.82rem' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>Progress Completion</span>
                      <span style={{ fontWeight: 800, color: statusTheme.text }}>{progress}%</span>
                    </div>

                    {/* Progress Track */}
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${progress}%`,
                          height: '100%',
                          backgroundColor: statusTheme.badgeBg,
                          borderRadius: '10px',
                          transition: 'width 0.8s ease-in-out'
                        }}
                      />
                    </div>

                    {/* Timeline row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                      <span>Start: {project.start_date || 'Q1 2025'}</span>
                      <span>Target: {project.expected_completion || project.completion_date || 'Target 2026'}</span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
                      {project.highlights.slice(0, 2).map((hl, idx) => (
                        <span key={idx} style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600 }}>
                          • {hl}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View Details Link */}
                  <Link
                    to={ROUTES.PROJECT_DETAILS(project.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '0.65rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: '#0f172a',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#f97316'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#0f172a'}
                  >
                    View Project Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProjectDashboard;
