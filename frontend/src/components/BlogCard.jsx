import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Calendar } from 'lucide-react';
import { ROUTES } from '../routes/routes';

const BlogCard = ({ post }) => {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
      transition: 'all 0.3s ease',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(15, 23, 42, 0.12)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(15, 23, 42, 0.08)';
    }}>

      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img
          src={post.featured_image}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          backgroundColor: '#0f172a',
          color: '#f97316',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '0.25rem 0.75rem',
          borderRadius: '20px'
        }}>
          {post.category}
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.65rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={13} /> {post.author}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={13} /> {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Recent'}</span>
        </div>

        <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.65rem', lineHeight: 1.35 }}>
          {post.title}
        </h3>

        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1.25rem', flexGrow: 1 }}>
          {post.excerpt}
        </p>

        <Link
          to={ROUTES.BLOG_DETAILS(post.slug || post.id)}
          style={{
            color: '#f97316',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginTop: 'auto'
          }}
        >
          Read Full Article <ArrowRight size={15} />
        </Link>
      </div>

    </div>
  );
};

export default BlogCard;
