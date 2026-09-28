import React, { useEffect } from 'react';
import EnquiryForm from '../components/EnquiryForm';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

const EnquiryPage = () => {
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
          <span className="section-subtitle">Start Your Project</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Enquire Now
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Request a detailed construction consultation or estimate from GUNA CONSTRUCTION.
          </p>
        </div>
      </section>

      <section style={{ padding: '5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <EnquiryForm />

          {/* Business Support Box */}
          <div style={{
            marginTop: '3rem',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid #e2e8f0',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                GUNA CONSTRUCTION Office
              </div>
              <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                863/6B, Bazar Street, Cheyyur, Tamil Nadu – 603302
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="tel:7430004000" style={{ color: '#f97316', fontWeight: 800, fontSize: '1.1rem' }}>
                📞 9940696800 /7430004000
              </a>
              <a href="mailto:Gunaconstruction005@gmail.com" style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.95rem' }}>
                ✉️ Gunaconstruction005@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnquiryPage;
