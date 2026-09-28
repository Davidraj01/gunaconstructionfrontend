import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, MessageCircle, ArrowRight } from 'lucide-react';
import { ROUTES, NAV_ITEMS } from '../routes/routes';
import logoImg from '../assets/logo.png';

import SocialLinks from './SocialLinks';

const Footer = () => {
  const whatsappUrl = "https://wa.me/91994069800?text=Hello%20Guna%20Construction,%20I%20would%20like%20to%20enquire%20about%20your%20construction%20services.";

  return (
    <footer style={{
      backgroundColor: '#0f172a',
      color: '#cbd5e1',
      paddingTop: '4.5rem',
      paddingBottom: '2rem',
      borderTop: '4px solid #f97316'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.8fr 1.1fr 1.1fr 1.6fr',
          gap: '3rem',
          marginBottom: '3.5rem'
        }} className="footer-grid">

          {/* Col 1: Brand Info */}
          <div>
            <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none', marginBottom: '1.25rem' }}>
              <div style={{
                background: '#ffffff',
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)'
              }}>
                <img src={logoImg} alt="GUNA CONSTRUCTION" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <span style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  color: '#ffffff',
                  letterSpacing: '-0.5px',
                  lineHeight: 1
                }}>
                  GUNA <span style={{ color: '#f97316' }}>CONSTRUCTION</span>
                </span>
                <div style={{ fontSize: '0.68rem', color: '#16a34a', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>
                  Cheyyur, Tamil Nadu
                </div>
              </div>
            </Link>

            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '340px' }}>
              Professional construction solutions in Cheyyur, Tamil Nadu. Dedicated to building quality residential homes, commercial complexes, structural renovations, and civil works with customer trust.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>
              <ShieldCheck size={16} /> Verified Construction Contractor • Cheyyur, TN
            </div>

            {/* Social Media Links in Brand Column */}
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', marginBottom: '0.6rem', fontWeight: 700 }}>
                Connect With Us
              </div>
              <SocialLinks size="md" align="left" />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1.25rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              {NAV_ITEMS.slice(0, 4).map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    style={{ color: '#cbd5e1', transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseOver={e => e.target.style.color='#f97316'}
                    onMouseOut={e => e.target.style.color='#cbd5e1'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Media & Reviews */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1.25rem' }}>
              Explore More
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.92rem' }}>
              <li>
                <Link to={ROUTES.GALLERY} style={{ color: '#cbd5e1', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color='#f97316'} onMouseOut={e => e.target.style.color='#cbd5e1'}>
                  Project 
                </Link>
              </li>
              <li>
                <Link to={ROUTES.VIDEOS} style={{ color: '#cbd5e1', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color='#f97316'} onMouseOut={e => e.target.style.color='#cbd5e1'}>
                  Site Videos
                </Link>
              </li>
              <li>
                <Link to={ROUTES.REVIEWS} style={{ color: '#cbd5e1', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color='#f97316'} onMouseOut={e => e.target.style.color='#cbd5e1'}>
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} style={{ color: '#cbd5e1', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color='#f97316'} onMouseOut={e => e.target.style.color='#cbd5e1'}>
                  Contact Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', marginBottom: '1.25rem' }}>
              Office Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin color="#f97316" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>863/6B, Bazar Street, Cheyyur, Pin Code: 603302, Tamil Nadu</span>
              </div>

              <a href="tel:994069800" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#ffffff', fontWeight: 700, textDecoration: 'none' }}>
                <Phone color="#f97316" size={18} style={{ flexShrink: 0 }} />
                <span>994069800/7430004000</span>
              </a>

              <a href="mailto:gb@gunaconstruction.co.in" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#cbd5e1', textDecoration: 'none' }}>
                <Mail color="#f97316" size={18} style={{ flexShrink: 0 }} />
                <span>Gunaconstruction005@gamil.com</span>
              </a>

              {/* WhatsApp Button */}
              <div style={{ marginTop: '0.5rem' }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#16a34a',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.35)'
                  }}
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#94a3b8'
        }}>
          <div>
            © {new Date().getFullYear()} GUNA CONSTRUCTION. All Rights Reserved.
          </div>
          <div>
            863/6B, Bazar Street, Cheyyur, Pin Code: 603302
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
