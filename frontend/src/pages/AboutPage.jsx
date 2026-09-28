import React, { useEffect } from 'react';
import AboutSection from '../components/AboutSection';
import { Building2, ShieldCheck, Target, Award, Users, HardHat, Compass, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Page Header */}
      <section style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '4rem 0',
        textAlign: 'center',
        borderBottom: '4px solid #f97316'
      }}>
        <div className="container">
          <span className="section-subtitle">Who We Are</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            About GUNA CONSTRUCTION
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Building quality structures through practical engineering, transparent communication, and client commitment in Cheyyur, Tamil Nadu.
          </p>
        </div>
      </section>

      {/* About Main Component */}
      <AboutSection />

      {/* Capabilities & Quality Focus */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Capabilities</span>
            <h2 className="section-title">Construction Engineering & Site Execution</h2>
            <p className="section-desc">
              We focus on delivering durable building frameworks designed to perform reliably across generations.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '2rem' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <HardHat size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>Structural Discipline</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Every RCC column, beam erection, and roof slab casting strictly follows structural load calculation parameters and concrete curing practices.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <CheckCircle2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>Material Transparency</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We utilize verified TMT steel brands, standard OPC/PPC cement grades, well-seasoned brickwork, and anti-termite foundation treatments.
              </p>
            </div>

            <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.5rem' }}>Client Collaboration</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6 }}>
                We maintain direct lines of contact throughout site work, ensuring clients are informed at every structural milestone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Contact Info Box */}
      <section style={{ padding: '4rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{
            backgroundColor: '#0f172a',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '3rem',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            <div>
              <span style={{ color: '#f97316', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                Official Business Address
              </span>
              <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
                GUNA CONSTRUCTION
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1', fontSize: '0.95rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color="#f97316" /> 863/6B, Bazar Street, Cheyyur, Tamil Nadu, PIN Code: 603302
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} color="#f97316" /> 7430004000 / 9940696800
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} color="#f97316" /> Gunaconstruction005@gmail.com
                </div>
              </div>
            </div>

            <Link to={ROUTES.ENQUIRE} className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
              Request Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
