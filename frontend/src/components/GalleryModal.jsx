import React from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const GalleryModal = ({ isOpen, items, currentIndex, onClose, onPrev, onNext }) => {
  if (!isOpen || !items || items.length === 0) return null;

  const currentItem = items[currentIndex] || items[0];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '1.5rem'
    }}>
      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'rgba(255,255,255,0.1)',
          color: '#ffffff',
          border: 'none',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          cursor: 'pointer',
          zIndex: 2010,
          transition: 'background 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.background = '#f97316'}
        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >
        <X size={24} />
      </button>

      {/* Prev Button */}
      <button
        onClick={onPrev}
        style={{
          position: 'absolute',
          left: '1.5rem',
          background: 'rgba(255,255,255,0.1)',
          color: '#ffffff',
          border: 'none',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          cursor: 'pointer',
          zIndex: 2010,
          transition: 'background 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.background = '#f97316'}
        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >
        <ChevronLeft size={30} />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        style={{
          position: 'absolute',
          right: '1.5rem',
          background: 'rgba(255,255,255,0.1)',
          color: '#ffffff',
          border: 'none',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          cursor: 'pointer',
          zIndex: 2010,
          transition: 'background 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.background = '#f97316'}
        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >
        <ChevronRight size={30} />
      </button>

      {/* Modal Content */}
      <div style={{
        maxWidth: '90vw',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          maxHeight: '75vh'
        }}>
          <img
            src={currentItem.image_url}
            alt={currentItem.title}
            style={{
              maxHeight: '75vh',
              maxWidth: '85vw',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        <div style={{
          textAlign: 'center',
          color: '#ffffff',
          marginTop: '1.25rem',
          backgroundColor: 'rgba(255,255,255,0.08)',
          padding: '0.65rem 1.25rem',
          borderRadius: '20px',
          backdropFilter: 'blur(4px)',
          maxWidth: '90vw'
        }}>
          <h4 style={{ fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
            {currentItem.title}
          </h4>
          <div style={{ fontSize: '0.8rem', color: '#f97316', fontWeight: 600 }}>
            {currentItem.category} • Image {currentIndex + 1} of {items.length}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .gallery-nav-btn {
            width: 38px !important;
            height: 38px !important;
          }
          .gallery-nav-btn svg {
            width: 20px !important;
            height: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GalleryModal;
