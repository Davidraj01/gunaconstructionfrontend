import React, { useEffect, useState } from 'react';
import { fetchVideos } from '../services/api';
import { Play, X } from 'lucide-react';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchVideos()
      .then(data => setVideos(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '4rem 0',
        textAlign: 'center',
        borderBottom: '4px solid #f97316'
      }}>
        <div className="container">
          <span className="section-subtitle">Site Media</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Construction Videos
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Watch site walkthroughs, structural concrete pouring, and completed building key handovers.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading videos...</div>
          ) : (
            <div className="grid-2">
              {videos.map((vid) => (
                <div key={vid.id} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  {/* Thumbnail & Play Overlay */}
                  <div
                    onClick={() => setActiveVideo(vid)}
                    style={{ position: 'relative', height: '280px', overflow: 'hidden', cursor: 'pointer' }}
                  >
                    <img
                      src={vid.thumbnail_url || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80'}
                      alt={vid.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(15, 23, 42, 0.45)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center'
                    }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: '#f97316',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'center',
                        boxShadow: '0 8px 25px rgba(249,115,22,0.5)',
                        transition: 'transform 0.2s'
                      }}>
                        <Play size={28} fill="#ffffff" style={{ marginLeft: '4px' }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase' }}>
                      {vid.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0.3rem 0 0.6rem 0' }}>
                      {vid.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5 }}>
                      {vid.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Embed Player Modal */}
      {activeVideo && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2500,
          backgroundColor: 'rgba(15,23,42,0.92)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '1.5rem'
        }}>
          <button
            onClick={() => setActiveVideo(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: 'none',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>

          <div style={{ width: '100%', maxWidth: '900px', height: '500px', borderRadius: '16px', overflow: 'hidden' }}>
            <iframe
              src={activeVideo.video_url}
              title={activeVideo.title}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideosPage;
