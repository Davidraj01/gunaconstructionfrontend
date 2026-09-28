import React, { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import GoogleMapEmbed from '../components/GoogleMapEmbed';
import { MapPin, Phone, Mail, Navigation, Clock, ShieldCheck } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
          <span className="section-subtitle">Get In Touch</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Contact GUNA CONSTRUCTION
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Have a project requirement or question? Reach out to our engineering team in Cheyyur.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr',
            gap: '3.5rem',
            alignItems: 'start',
            marginBottom: '4rem'
          }} className="contact-grid">

            {/* Left Box: Business Details */}
            <div>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
                border: '1px solid #e2e8f0',
                marginBottom: '2rem'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase' }}>
                  Head Office Address
                </span>
                <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginTop: '0.2rem', marginBottom: '1.5rem' }}>
                  GUNA CONSTRUCTION
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>OFFICE LOCATION</div>
                      <div style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 700, marginTop: '2px' }}>
                        863/6B, Bazar Street, Cheyyur, Tamil Nadu – 603302
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>PHONE NUMBER</div>
                      <a href="tel:7430004000" style={{ fontSize: '1.1rem', color: '#f97316', fontWeight: 800, marginTop: '2px', display: 'block' }}>
                        7430004000 / 9940696800
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>EMAIL ADDRESS</div>
                      <a href="mailto:Gunaconstruction005@gmail.com" style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 700, marginTop: '2px', display: 'block' }}>
                        Gunaconstruction005@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  <a href="tel:7430004000" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
                    <Phone size={15} /> Call Now
                  </a>
                  <a href="mailto:Gunaconstruction005@gmail.com" className="btn-outline" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
                    <Mail size={15} /> Email Us
                  </a>
                </div>
              </div>
            </div>

            {/* Right Box: Form */}
            <ContactForm />

          </div>

          {/* Map Embed Section */}
          <div>
            <div className="section-header" style={{ marginBottom: '2rem' }}>
              <span className="section-subtitle">Location Map</span>
              <h2 className="section-title">Find Us in Cheyyur</h2>
            </div>
            <GoogleMapEmbed />
          </div>

        </div>

        <style>{`
          @media (max-width: 900px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ContactPage;
