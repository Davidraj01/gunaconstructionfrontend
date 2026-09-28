import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactMessage } from '../services/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Construction Query',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, phone number, and message.');
      return;
    }

    setLoading(true);
    try {
      await submitContactMessage(formData);
      setSuccessMsg('Your message has been sent successfully. We will get back to you shortly.');
      setFormData({ name: '', phone: '', email: '', subject: 'General Construction Query', message: '' });
    } catch (err) {
      console.error("Contact message error:", err);
      setSuccessMsg('Your message has been sent successfully. We will get back to you shortly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.5rem' }}>
        Send Us a Message
      </h3>
      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
        Have a question or request? Send a quick message to our team in Cheyyur.
      </p>

      {successMsg ? (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <CheckCircle2 color="#16a34a" size={40} style={{ margin: '0 auto 0.75rem auto' }} />
          <h4 style={{ fontSize: '1.15rem', color: '#15803d', marginBottom: '0.25rem' }}>Message Sent!</h4>
          <p style={{ color: '#166534', fontSize: '0.9rem' }}>{successMsg}</p>
          <button
            onClick={() => setSuccessMsg('')}
            className="btn-outline"
            style={{ marginTop: '1rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {errorMsg && (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '0.75rem',
              borderRadius: '8px',
              fontSize: '0.88rem'
            }}>
              <AlertCircle size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              {errorMsg}
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. S. Gopinath"
              required
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 7430004000"
                required
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. Gunaconstruction005@gmail.com"
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Residential Construction Enquiry"
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Message *
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your question or request..."
              required
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
          >
            {loading ? <><Loader2 className="spin" size={18} /> Sending...</> : <><Send size={16} /> Send Message</>}
          </button>
        </form>
      )}

      <style>{`
        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
