import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, User, HardHat, MessageCircle, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { submitEnquiry } from '../services/api';
import logoImg from '../assets/logo.png';

const AutoEnquiryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    project_type: 'Residential Construction',
    location: 'Cheyyur, Tamil Nadu',
    estimated_budget: '',
    preferred_start_date: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const whatsappUrl = "https://wa.me/7430004000?text=Hello%20Guna%20Construction,%20I%20would%20like%20to%20enquire%20about%20your%20construction%20services.";

  useEffect(() => {
    // Check if user already dismissed in this session
    const dismissed = sessionStorage.getItem('guna_enquiry_modal_dismissed');
    if (dismissed === 'true') {
      return;
    }

    // Auto-open on initial page landing after slight gentle delay
    const initialTimer = setTimeout(() => {
      if (!sessionStorage.getItem('guna_enquiry_modal_dismissed')) {
        setIsOpen(true);
      }
    }, 800);

    // Also trigger on first user tap / click anywhere on the page
    const handleUserInteraction = () => {
      if (!sessionStorage.getItem('guna_enquiry_modal_dismissed')) {
        setIsOpen(true);
      }
    };

    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('guna_enquiry_modal_dismissed', 'true');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.full_name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Please enter your project requirements.');
      return;
    }

    setLoading(true);

    try {
      await submitEnquiry(formData);
      setSuccessMsg('Thank you for your enquiry! Our engineering team will contact you shortly.');
      setFormData({
        full_name: '',
        phone: '',
        email: '',
        project_type: 'Residential Construction',
        location: 'Cheyyur, Tamil Nadu',
        estimated_budget: '',
        preferred_start_date: '',
        message: ''
      });
      sessionStorage.setItem('guna_enquiry_modal_dismissed', 'true');
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setSuccessMsg('Thank you for your enquiry! Our engineering team will contact you shortly.');
      sessionStorage.setItem('guna_enquiry_modal_dismissed', 'true');
    } finally {
      setLoading(false);
    }
  };

  // Keyboard accessibility: Escape key to exit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="auto-enquiry-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div
        className="auto-enquiry-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close / Exit Button Outside the Header Div */}
        <button
          onClick={handleClose}
          className="enquiry-close-btn"
          title="Exit and View Website"
          aria-label="Exit Enquiry Form and View Website"
        >
          <X size={20} />
        </button>

        {/* Header Bar */}
        <div className="enquiry-header">
          <div className="enquiry-brand-group">
            <div className="enquiry-logo-wrap">
              <img src={logoImg} alt="GUNA CONSTRUCTION" />
            </div>
            <div>
              <div className="enquiry-brand-title">
                GUNA <span style={{ color: '#f97316' }}>CONSTRUCTION</span>
              </div>
              <div className="enquiry-brand-badge">
                <ShieldCheck size={12} color="#34d399" /> Cheyyur, TN • Direct Contractor Consultation
              </div>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <div className="enquiry-body">
          {successMsg ? (
            <div className="enquiry-success-box">
              <CheckCircle2 color="#16a34a" size={54} className="enquiry-success-icon" />
              <h4 className="enquiry-success-heading">
                Enquiry Received!
              </h4>
              <p className="enquiry-success-desc">
                {successMsg}
              </p>
              <button
                onClick={handleClose}
                className="btn-primary enquiry-continue-btn"
              >
                Continue to Explore Website <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <>
              <div className="enquiry-title-wrap">
                <h3 id="enquiry-modal-title" className="enquiry-main-title">
                  Request Free Construction Consultation
                </h3>
                <p className="enquiry-sub-text">
                  Enter your project requirements below or connect directly with our engineering team in Cheyyur.
                </p>
              </div>

              {/* Fast Direct Contacts */}
              <div className="enquiry-quick-contacts">
                <a
                  href="tel:7430004000"
                  className="enquiry-call-pill"
                >
                  <Phone size={14} /> Call: 7430004000
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enquiry-wa-pill"
                >
                  <MessageCircle size={15} /> WhatsApp Us
                </a>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="enquiry-form">
                {errorMsg && (
                  <div className="enquiry-error-banner">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                {/* Name & Phone Grid */}
                <div className="enquiry-row-grid">
                  <div className="enquiry-field-col">
                    <label className="enquiry-label">
                      Full Name *
                    </label>
                    <div className="enquiry-input-wrap">
                      <User size={16} className="enquiry-input-icon" />
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="e.g. Bhaarath kumar G"
                        required
                        className="enquiry-input"
                      />
                    </div>
                  </div>

                  <div className="enquiry-field-col">
                    <label className="enquiry-label">
                      Phone Number *
                    </label>
                    <div className="enquiry-input-wrap">
                      <Phone size={16} className="enquiry-input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 7430004000"
                        required
                        className="enquiry-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Category Selection */}
                <div className="enquiry-field-col">
                  <label className="enquiry-label">
                    Construction Category *
                  </label>
                  <select
                    name="project_type"
                    value={formData.project_type}
                    onChange={handleChange}
                    className="enquiry-select"
                  >
                    <option value="Residential Construction">Residential House & Villa Construction</option>
                    <option value="Commercial Construction">Commercial Building / Complex</option>
                    <option value="Building Renovation">Home & Structural Renovation</option>
                    <option value="Civil Construction">Civil Contracting & Road Formation</option>
                    <option value="Structural Work">Structural RCC Framing & Deep Piling</option>
                    <option value="Interior & Finishing">Interior & Architectural Design</option>
                  </select>
                </div>

                {/* Message & Details */}
                <div className="enquiry-field-col">
                  <label className="enquiry-label">
                    Project Requirements / Location *
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your plot size, location, estimated budget, or specific requirements..."
                    required
                    className="enquiry-textarea"
                  />
                </div>

                {/* Action Buttons: Submit & Exit to Website */}
                <div className="enquiry-actions-row">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary enquiry-submit-btn"
                  >
                    {loading ? <><Loader2 className="spin" size={18} /> Submitting...</> : <><Send size={16} /> Submit Enquiry</>}
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="enquiry-exit-btn"
                  >
                    Exit to Website
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        .auto-enquiry-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(11, 17, 32, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(0.75rem, 3vw, 1.5rem);
          overflow-y: auto;
          animation: enquiryModalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .auto-enquiry-card {
          background-color: #ffffff;
          border-radius: 20px;
          width: 100%;
          max-width: 620px;
          max-height: 92vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(249, 115, 22, 0.25);
          position: relative;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          -webkit-overflow-scrolling: touch;
        }

        /* Floating Close Button positioned outside the header div */
        .enquiry-close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 50;
          background-color: rgba(15, 23, 42, 0.65);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        }

        .enquiry-close-btn:hover {
          background-color: #f97316;
          border-color: #f97316;
          transform: scale(1.08);
          box-shadow: 0 4px 16px rgba(249, 115, 22, 0.5);
        }

        .enquiry-header {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          padding: clamp(0.9rem, 2vw, 1.25rem) clamp(1rem, 2.5vw, 1.5rem);
          padding-right: 3.5rem;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          display: flex;
          justifyContent: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 2px solid #f97316;
          box-sizing: border-box;
        }

        .enquiry-brand-group {
          display: flex;
          align-items: center;
          gap: clamp(0.5rem, 1.5vw, 0.75rem);
          min-width: 0;
        }

        .enquiry-logo-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background-color: #ffffff;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .enquiry-logo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .enquiry-brand-title {
          font-family: var(--font-heading, 'Outfit', sans-serif);
          font-weight: 800;
          font-size: clamp(0.98rem, 2vw, 1.15rem);
          color: #ffffff;
          line-height: 1.2;
          white-space: nowrap;
        }

        .enquiry-brand-badge {
          font-size: clamp(0.65rem, 1.2vw, 0.72rem);
          color: #34d399;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
          white-space: nowrap;
        }

        .enquiry-body {
          padding: clamp(1rem, 2.5vw, 1.5rem);
          flex-grow: 1;
          box-sizing: border-box;
        }

        .enquiry-main-title {
          font-size: clamp(1.1rem, 2.2vw, 1.35rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.35rem;
          line-height: 1.3;
        }

        .enquiry-sub-text {
          color: #64748b;
          font-size: clamp(0.82rem, 1.4vw, 0.88rem);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .enquiry-quick-contacts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
          margin-bottom: 1.15rem;
          width: 100%;
          box-sizing: border-box;
        }

        .enquiry-call-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background-color: #fff7ed;
          color: #ea580c;
          padding: 0.55rem 0.75rem;
          border-radius: 8px;
          font-size: clamp(0.78rem, 1.4vw, 0.84rem);
          font-weight: 700;
          border: 1px solid #ffedd5;
          text-decoration: none;
          transition: all 0.2s ease;
          min-height: 40px;
        }

        .enquiry-call-pill:hover {
          background-color: #ffedd5;
          transform: translateY(-1px);
        }

        .enquiry-wa-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background-color: #ecfdf5;
          color: #15803d;
          padding: 0.55rem 0.75rem;
          border-radius: 8px;
          font-size: clamp(0.78rem, 1.4vw, 0.84rem);
          font-weight: 700;
          border: 1px solid #d1fae5;
          text-decoration: none;
          transition: all 0.2s ease;
          min-height: 40px;
        }

        .enquiry-wa-pill:hover {
          background-color: #d1fae5;
          transform: translateY(-1px);
        }

        .enquiry-form {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          width: 100%;
          box-sizing: border-box;
        }

        .enquiry-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          width: 100%;
          box-sizing: border-box;
        }

        .enquiry-field-col {
          width: 100%;
          box-sizing: border-box;
        }

        .enquiry-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 0.3rem;
        }

        .enquiry-input-wrap {
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        .enquiry-input-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        .enquiry-input {
          width: 100%;
          padding: 0.65rem 0.65rem 0.65rem 2.2rem;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 0.88rem;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }

        .enquiry-input:focus, .enquiry-select:focus, .enquiry-textarea:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
        }

        .enquiry-select {
          width: 100%;
          padding: 0.65rem;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 0.88rem;
          outline: none;
          background-color: #ffffff;
          box-sizing: border-box;
        }

        .enquiry-textarea {
          width: 100%;
          padding: 0.65rem;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          font-size: 0.88rem;
          outline: none;
          resize: vertical;
          box-sizing: border-box;
          font-family: inherit;
        }

        .enquiry-actions-row {
          display: flex;
          gap: 0.65rem;
          margin-top: 0.35rem;
          width: 100%;
          box-sizing: border-box;
        }

        .enquiry-submit-btn {
          flex: 1.5;
          justify-content: center;
          padding: 0.75rem;
          font-size: 0.92rem;
          min-height: 44px;
        }

        .enquiry-exit-btn {
          flex: 1;
          justify-content: center;
          padding: 0.75rem;
          font-size: 0.88rem;
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
        }

        .enquiry-exit-btn:hover {
          background-color: #e2e8f0;
          color: #0f172a;
        }

        .enquiry-error-banner {
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          font-size: 0.84rem;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .enquiry-success-box {
          background-color: #f0fdf4;
          border: 1.5px solid #bbf7d0;
          border-radius: 16px;
          padding: clamp(1.5rem, 3vw, 2rem) clamp(1rem, 2.5vw, 1.5rem);
          text-align: center;
        }

        .enquiry-success-heading {
          font-size: 1.35rem;
          color: #15803d;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .enquiry-success-desc {
          color: #166534;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .enquiry-continue-btn {
          width: 100%;
          justify-content: center;
          padding: 0.85rem;
        }

        @keyframes enquiryModalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive Breakpoints */
        @media (max-width: 580px) {
          .enquiry-row-grid {
            grid-template-columns: 1fr !important;
            gap: 0.7rem !important;
          }
          .enquiry-quick-contacts {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
          .enquiry-actions-row {
            flex-direction: column !important;
            gap: 0.55rem !important;
          }
          .enquiry-submit-btn, .enquiry-exit-btn {
            width: 100% !important;
            flex: none !important;
          }
        }

        @media (max-width: 380px) {
          .auto-enquiry-overlay {
            padding: 0.5rem !important;
          }
          .enquiry-header {
            padding: 0.75rem 0.85rem !important;
          }
          .enquiry-body {
            padding: 0.85rem !important;
          }
          .enquiry-brand-title {
            font-size: 0.92rem !important;
          }
          .enquiry-brand-badge {
            font-size: 0.62rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AutoEnquiryModal;
