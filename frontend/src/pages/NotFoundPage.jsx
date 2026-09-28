import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, HardHat } from 'lucide-react';
import { ROUTES } from '../routes/routes';

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      backgroundColor: '#f8fafc',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '520px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        padding: '3.5rem 2rem',
        boxShadow: '0 15px 35px rgba(15, 23, 42, 0.08)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'rgba(249,115,22,0.1)',
          color: '#f97316',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto'
        }}>
          <HardHat size={36} />
        </div>

        <h1 style={{ fontSize: '2.4rem', color: '#0f172a', marginBottom: '0.75rem' }}>
          Page Not Found
        </h1>

        <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          The page you're looking for could not be found or has been relocated.
        </p>

        <Link to={ROUTES.HOME} className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }}>
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
