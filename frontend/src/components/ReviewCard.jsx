import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '1.75rem',
      boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      height: '100%',
      position: 'relative'
    }}>
      <Quote size={36} color="rgba(249, 115, 22, 0.15)" style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }} />

      <div>
        {/* Rating Stars */}
        <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
          {[...Array(5)].map((_, idx) => (
            <Star
              key={idx}
              size={18}
              fill={idx < review.rating ? '#f97316' : '#e2e8f0'}
              color={idx < review.rating ? '#f97316' : '#cbd5e1'}
            />
          ))}
        </div>

        <p style={{
          color: '#334155',
          fontSize: '0.98rem',
          lineHeight: 1.6,
          marginBottom: '1.5rem',
          fontStyle: 'italic'
        }}>
          "{review.comment}"
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        borderTop: '1px solid #f1f5f9',
        paddingTop: '1rem',
        marginTop: 'auto'
      }}>
        <div>
          <h4 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 700 }}>
            {review.name}
          </h4>
          <span style={{ fontSize: '0.8rem', color: '#f97316', fontWeight: 600 }}>
            {review.project_type}
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3px',
          color: '#10b981',
          fontSize: '0.75rem',
          fontWeight: 700,
          backgroundColor: '#f0fdf4',
          padding: '0.25rem 0.6rem',
          borderRadius: '12px'
        }}>
          <ShieldCheck size={13} /> Verified
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
