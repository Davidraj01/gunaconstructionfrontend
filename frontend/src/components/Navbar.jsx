import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ArrowRight, ShieldCheck, PhoneCall, ChevronDown,
  Layers, Hammer, Paintbrush, Sparkles, Building2, Droplets,
  Umbrella, Wrench, FileCheck, Calculator, Compass, Award,
  Home, Package, Zap, ShieldAlert, DoorOpen, Maximize2, Flame,
  LayoutDashboard, Grid, Box, Truck
} from 'lucide-react';
import { ROUTES, NAV_ITEMS } from '../routes/routes';
import { servicesData } from '../data/servicesData';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
      transition: 'all 0.3s ease',
      borderBottom: '2px solid #fff7ed',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'clip'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '76px',
        maxWidth: '1280px'
      }}>
        {/* Logo Branding */}
        <Link to={ROUTES.HOME} onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', minWidth: 0, flexShrink: 1 }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.15)',
            border: '1.5px solid #ffedd5',
            padding: '2px',
            flexShrink: 0
          }}>
            <img 
              src={logoImg} 
              alt="GUNA CONSTRUCTION" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <span style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              color: '#0f172a',
              letterSpacing: '-0.5px',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              display: 'block'
            }}>
              GUNA <span style={{ color: '#f97316' }}>CONSTRUCTION</span>
            </span>
            <div style={{
              fontSize: '0.65rem',
              color: '#16a34a',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginTop: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap'
            }}>
              <ShieldCheck size={11} color="#16a34a" /> 863/6B, Bazar St, Cheyyur
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.95rem' }}>
          {NAV_ITEMS.map((item) => {
            if (item.hasDropdown) {
              return (
                <div
                  key={item.name}
                  ref={dropdownRef}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '0.5rem 0',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.name}
                    <ChevronDown size={14} style={{
                      transform: servicesDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }} />
                  </NavLink>

                  {/* Mega Services Dropdown Menu */}
                  {servicesDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '740px',
                      maxWidth: '90vw',
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(249, 115, 22, 0.15)',
                      padding: '1.5rem',
                      zIndex: 1100,
                      animation: 'fadeIn 0.2s ease-out'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #fed7aa',
                        paddingBottom: '0.75rem',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Our 25 Construction Specializations
                          </div>
                          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                            Comprehensive Engineering & Building Services
                          </div>
                        </div>
                        <Link
                          to={ROUTES.SERVICES}
                          onClick={() => setServicesDropdownOpen(false)}
                          style={{
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: '#f97316',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: '#fff7ed',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '20px',
                            border: '1px solid #ffedd5',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          View All Services <ArrowRight size={14} />
                        </Link>
                      </div>

                      {/* 3-Column Service Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.4rem',
                        maxHeight: '360px',
                        overflowY: 'auto',
                        paddingRight: '0.5rem'
                      }}>
                        {servicesData.map((s) => (
                          <Link
                            key={s.id}
                            to={`/services/${s.slug}`}
                            onClick={() => setServicesDropdownOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.5rem',
                              padding: '0.5rem 0.65rem',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              color: '#334155',
                              transition: 'all 0.15s ease',
                              backgroundColor: 'transparent'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = '#fff7ed';
                              e.currentTarget.style.color = '#ea580c';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#334155';
                            }}
                          >
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: '#f97316',
                              marginTop: '6px',
                              flexShrink: 0
                            }} />
                            <div>
                              <div style={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.25 }}>
                                {s.title}
                              </div>
                              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                {s.category}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                style={{ fontSize: '0.88rem', fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          {/* Quick Phone Call Pill */}
          <a
            href="tel:7430004000"
            className="desktop-phone-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              backgroundColor: '#fff7ed',
              color: '#ea580c',
              padding: '0.45rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: '1px solid #ffedd5',
              textDecoration: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <PhoneCall size={13} /> 7430004000
          </a>

          {/* Get a Quote Button */}
          <Link
            to={ROUTES.ENQUIRE}
            className="btn-primary desktop-btn"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.84rem', whiteSpace: 'nowrap' }}
          >
            Get a Quote <ArrowRight size={14} />
          </Link>

          {/* Hamburger Icon for Mobile */}
          <button
            className="mobile-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            style={{
              background: '#f8fafc',
              color: '#0f172a',
              border: '1px solid #e2e8f0',
              padding: '0.45rem',
              borderRadius: '8px',
              display: 'none',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #fed7aa',
          padding: '1.25rem 1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
          maxHeight: '80vh',
          overflowY: 'auto',
          width: '100%'
        }}>
          {NAV_ITEMS.map((item) => {
            if (item.hasDropdown) {
              return (
                <div key={item.name} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                  <div
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{item.name} (25 Services)</span>
                    <ChevronDown size={18} style={{
                      transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s'
                    }} />
                  </div>

                  {mobileServicesOpen && (
                    <div style={{
                      paddingLeft: '0.5rem',
                      marginTop: '0.4rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      maxHeight: '240px',
                      overflowY: 'auto'
                    }}>
                      <Link
                        to={ROUTES.SERVICES}
                        onClick={closeMenu}
                        style={{
                          color: '#ea580c',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          textDecoration: 'none',
                          padding: '0.3rem 0'
                        }}
                      >
                        → View All Services Overview
                      </Link>
                      {servicesData.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.slug}`}
                          onClick={closeMenu}
                          style={{
                            color: '#475569',
                            fontSize: '0.84rem',
                            textDecoration: 'none',
                            padding: '0.25rem 0',
                            borderBottom: '1px dashed #f1f5f9'
                          }}
                        >
                          • {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                style={{ fontSize: '1rem', padding: '0.45rem 0', borderBottom: '1px solid #f1f5f9' }}
              >
                {item.name}
              </NavLink>
            );
          })}

          <a
            href="tel:7430004000"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#fff7ed',
              color: '#ea580c',
              padding: '0.7rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.92rem',
              border: '1px solid #fed7aa',
              textDecoration: 'none',
              marginTop: '0.4rem'
            }}
          >
            <PhoneCall size={16} /> Call: 7430004000
          </a>

          <Link
            to={ROUTES.ENQUIRE}
            onClick={closeMenu}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.2rem' }}
          >
            Get a Quote <ArrowRight size={16} />
          </Link>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (max-width: 1140px) {
          .desktop-phone-btn {
            display: none !important;
          }
        }
        @media (max-width: 1040px) {
          .desktop-nav, .desktop-btn, .desktop-phone-btn {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
