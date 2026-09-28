import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Calendar, Building2 } from 'lucide-react';
import { ROUTES } from '../routes/routes';

const defaultImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

const ProjectCard = ({ project }) => {
  const [imgSrc, setImgSrc] = useState(project.main_image || defaultImage);
  const [imgError, setImgError] = useState(false);

  const getBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'badge-completed';
      case 'ongoing': return 'badge-ongoing';
      case 'upcoming': return 'badge-upcoming';
      default: return 'badge-completed';
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
      transition: 'all 0.35s ease',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(15, 23, 42, 0.15)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(15, 23, 42, 0.08)';
    }}>

      {/* Image & Status Badge */}
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', backgroundColor: '#1e293b' }}>
        {!imgError ? (
          <img
            src={imgSrc}
            alt=""
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            color: '#f97316'
          }}>
            <Building2 size={40} />
          </div>
        )}

        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <span className={`badge ${getBadgeClass(project.status)}`}>
            {project.status}
          </span>
        </div>
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          color: '#ffffff',
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '0.25rem 0.65rem',
          borderRadius: '6px',
          backdropFilter: 'blur(4px)'
        }}>
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
          <MapPin size={14} color="#f97316" />
          <span>{project.location}</span>
        </div>

        <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '0.65rem', lineHeight: 1.3 }}>
          {project.title}
        </h3>

        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem', flexGrow: 1 }}>
          {project.short_description}
        </p>

        {project.completion_date && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
            <Calendar size={13} />
            <span>Target/Completion: {project.completion_date}</span>
          </div>
        )}

        <Link
          to={ROUTES.PROJECT_DETAILS(project.slug || project.id)}
          className="btn-outline"
          style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
        >
          View Project Details <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
};

export default ProjectCard;
