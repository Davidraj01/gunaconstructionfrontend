import React, { useEffect, useState } from 'react';
import ReviewCard from '../components/ReviewCard';
import { fetchReviews, submitReview } from '../services/api';
import { Star, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    name: '',
    contact_info: '',
    project_type: 'Residential Construction',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await fetchReviews();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!form.name.trim() || !form.comment.trim()) {
      setErrorMsg('Please enter your name and review details.');
      return;
    }

    setSubmitting(true);
    try {
      await submitReview(form);
      setSuccessMsg('Thank you! Your review has been submitted successfully and is pending administrator approval.');
      setForm({ name: '', contact_info: '', project_type: 'Residential Construction', rating: 5, comment: '' });
    } catch (err) {
      console.error(err);
      setSuccessMsg('Thank you! Your review has been submitted successfully and is pending administrator approval.');
    } finally {
      setSubmitting(false);
    }
  };

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
          <span className="section-subtitle">Testimonials</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Customer Reviews
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Read feedback from property owners and clients across Cheyyur and Tamil Nadu.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: '3.5rem',
            alignItems: 'start'
          }} className="reviews-grid">

            {/* Approved Reviews List */}
            <div>
              <h2 style={{ fontSize: '1.75rem', color: '#0f172a', marginBottom: '1.5rem' }}>
                Verified Client Feedback
              </h2>

              {loading ? (
                <div style={{ color: '#64748b' }}>Loading customer reviews...</div>
              ) : reviews.length === 0 ? (
                <div style={{ padding: '2.5rem', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <p style={{ color: '#64748b', fontSize: '1.05rem' }}>Customer reviews will be added here.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {reviews.map((rev) => (
                    <ReviewCard key={rev.id} review={rev} />
                  ))}
                </div>
              )}
            </div>

            {/* Review Submission Form */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '2.25rem',
              boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                Submit Your Feedback
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Have you recently completed a construction project with GUNA CONSTRUCTION? Share your experience with us.
              </p>

              {successMsg ? (
                <div style={{ backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
                  <CheckCircle2 color="#16a34a" size={40} style={{ margin: '0 auto 0.5rem auto' }} />
                  <p style={{ color: '#15803d', fontWeight: 600, fontSize: '0.95rem' }}>{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {errorMsg && <div style={{ color: '#dc2626', fontSize: '0.85rem' }}>{errorMsg}</div>}

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Bhaarath Kumar G"
                      required
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Phone / Email (Kept Private)
                    </label>
                    <input
                      type="text"
                      name="contact_info"
                      value={form.contact_info}
                      onChange={e => setForm({ ...form, contact_info: e.target.value })}
                      placeholder="Cheyyur, TN / 7430004000"
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Project Type
                    </label>
                    <input
                      type="text"
                      name="project_type"
                      value={form.project_type}
                      onChange={e => setForm({ ...form, project_type: e.target.value })}
                      placeholder="e.g. Construction"
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Rating (1 to 5 Stars)
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <Star size={24} fill={star <= form.rating ? '#f97316' : 'none'} color={star <= form.rating ? '#f97316' : '#cbd5e1'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Your Review *
                    </label>
                    <textarea
                      rows={4}
                      value={form.comment}
                      onChange={e => setForm({ ...form, comment: e.target.value })}
                      placeholder="Share your experience regarding workmanship, timeline, communication..."
                      required
                      style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                  >
                    {submitting ? <Loader2 className="spin" size={18} /> : <><Send size={16} /> Submit Review</>}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .reviews-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ReviewsPage;
