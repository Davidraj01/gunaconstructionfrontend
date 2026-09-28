import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { fetchBlogPosts } from '../services/api';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogPosts()
      .then(data => setPosts(data))
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
          <span className="section-subtitle">Articles & Guides</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Construction Insights & Planning Blog
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Expert advice on structural planning, material selection, budgeting, and home building guidelines in Tamil Nadu.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading articles...</div>
          ) : (
            <div className="grid-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
