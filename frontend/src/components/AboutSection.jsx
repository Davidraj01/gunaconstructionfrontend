import React from 'react';
import { CheckCircle2, Shield, Target, Compass, HardHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const AboutSection = () => {
  const pillars = [
    {
      icon: <Shield size={22} color="#f97316" />,
      title: "Quality Focus",
      desc: "Strict material specifications, concrete testing, and disciplined craftsmanship on every project."
    },
    {
      icon: <Target size={22} color="#f97316" />,
      title: "Customer Alignment",
      desc: "We listen to your specific requirements and design spatial solutions that match your functional needs."
    },
    {
      icon: <Compass size={22} color="#f97316" />,
      title: "Project Planning",
      desc: "Clear timelines, transparent cost estimation, and organized execution from start to finish."
    },
    {
      icon: <HardHat size={22} color="#f97316" />,
      title: "Professional Execution",
      desc: "Dedicated site supervision, safety standards, and practical engineering solutions."
    }
  ];

  return (
    <section className="about-section-wrapper">
      <div className="container" style={{ maxWidth: '1280px' }}>
        <div className="about-grid">

          {/* Left Column Image with Badge */}
          <div className="about-image-wrapper">
            <div className="about-image-card">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="GUNA CONSTRUCTION Workmanship"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Inset Responsive Badge */}
            <div className="about-badge">
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f97316', marginBottom: '0.25rem' }}>
                Cheyyur Base
              </div>
              <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                Dedicated local construction team delivering tailored building solutions across Tamil Nadu.
              </div>
            </div>
          </div>

          {/* Right Column Text */}
          <div className="about-content-col">
            <span className="section-subtitle" style={{ textAlign: 'left' }}>About GUNA CONSTRUCTION</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)', color: '#0f172a', marginBottom: '1.25rem', lineHeight: 1.25 }}>
              Dedicated to Practical Construction Solutions & Client Satisfaction
            </h2>

            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              GUNA CONSTRUCTION provides construction-related services with a focus on quality workmanship, practical solutions, and customer requirements. Headquartered in Cheyyur, Tamil Nadu, we serve homeowners, commercial clients, and site developers seeking reliable building execution.
            </p>

            <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Our engineering approach combines solid structural foundations, meticulous material selection, transparent project estimates, and continuous communication throughout construction.
            </p>

            {/* 4 Feature Pillars */}
            <div className="about-pillars-grid">
              {pillars.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: '0.2rem', fontWeight: 700 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-actions-row">
              <Link to={ROUTES.ABOUT} className="btn-primary" style={{ padding: '0.75rem 1.6rem' }}>
                Learn More About Us
              </Link>
              <Link to={ROUTES.CONTACT} className="btn-outline" style={{ padding: '0.75rem 1.6rem' }}>
                Contact Our Team
              </Link>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-section-wrapper {
          padding: clamp(3rem, 6vw, 4.5rem) 0;
          background-color: #ffffff;
          width: 100%;
          overflow: hidden;
          box-sizing: border-box;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
        }

        .about-image-wrapper {
          position: relative;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .about-image-card {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(15, 23, 42, 0.1);
          height: 440px;
          width: 100%;
          box-sizing: border-box;
        }

        .about-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background-color: #0f172a;
          color: #ffffff;
          padding: 1.25rem;
          border-radius: 16px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
          max-width: 280px;
          border: 2px solid var(--accent-orange);
          box-sizing: border-box;
        }

        .about-content-col {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .about-pillars-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-bottom: 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        .about-actions-row {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 960px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-image-card {
            height: 340px !important;
          }
        }

        @media (max-width: 600px) {
          .about-pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .about-image-card {
            height: 280px !important;
          }
          .about-badge {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin-top: -2.5rem !important;
            margin-left: 0.5rem !important;
            margin-right: 0.5rem !important;
            max-width: none !important;
          }
          .about-actions-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .about-actions-row a {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
