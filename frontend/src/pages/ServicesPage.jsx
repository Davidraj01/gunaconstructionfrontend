import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { fetchServices } from '../services/api';
import { servicesData } from '../data/servicesData';
import { ArrowRight, Search, ShieldCheck, Sparkles, Building, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const ServicesPage = () => {
  const [services, setServices] = useState(servicesData);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Civil & Infrastructure',
    'Foundation & Structural',
    'Structural & Metal Works',
    'Interior & Finishing',
    'Interior Decoration',
    'Doors & Windows',
    'Maintenance & Protection',
    'Engineering & Approvals',
    'Realty & Development'
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices()
      .then(data => {
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(servicesData);
        }
      })
      .catch(err => {
        console.warn("Using fallback local services data", err);
        setServices(servicesData);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter services by search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (service.short_description && service.short_description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (service.category && service.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header Banner */}
      <section style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '4.5rem 0',
        textAlign: 'center',
        borderBottom: '4px solid #f97316',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(249, 115, 22, 0.15)',
            color: '#f97316',
            padding: '0.4rem 1rem',
            borderRadius: '30px',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1rem',
            border: '1px solid rgba(249, 115, 22, 0.3)'
          }}>
            <Sparkles size={16} /> Complete 25 Civil & Architectural Specializations
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
            Our Construction & Engineering Services
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
            From road formation, deep piling, and structural RCC casting to turnkey luxury interiors, plan approvals, and licensed valuation in Cheyyur & Tamil Nadu.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ padding: '2.5rem 0 1rem 0', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Search Box */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '540px' }}>
              <Search size={18} color="#64748b" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search services (e.g. Road, Foundation, Electrical, Modular Kitchen, Painting, Valuation)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 3rem',
                  borderRadius: '30px',
                  border: '1.5px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f97316'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>

            {/* Category Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center'
            }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    backgroundColor: selectedCategory === cat ? '#f97316' : '#ffffff',
                    color: selectedCategory === cat ? '#ffffff' : '#334155',
                    border: selectedCategory === cat ? 'none' : '1px solid #cbd5e1',
                    padding: '0.45rem 1.1rem',
                    borderRadius: '20px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: selectedCategory === cat ? '0 4px 12px rgba(249,115,22,0.3)' : 'none'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
              Showing {filteredServices.length} of {services.length} Specialized Services
            </h2>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#f97316', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Clear Search
              </button>
            )}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>Loading services...</div>
          ) : filteredServices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '1rem' }}>
                No services matched your query "{searchQuery}".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="btn-primary"
                style={{ padding: '0.6rem 1.5rem', margin: '0 auto' }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid-3" style={{ gap: '2rem' }}>
              {filteredServices.map((service) => (
                <ServiceCard key={service.id || service.slug} service={service} />
              ))}
            </div>
          )}

          {/* Bottom Consultation Banner */}
          <div style={{
            marginTop: '5rem',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '24px',
            padding: '3rem',
            textAlign: 'center',
            color: '#ffffff',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
            border: '1px solid rgba(249, 115, 22, 0.25)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#f97316',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '0.75rem'
            }}>
              <ShieldCheck size={18} /> Transparent Pricing & Guaranteed Workmanship
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem', fontFamily: 'Outfit, sans-serif' }}>
              Need a Custom Construction Estimate for Your Project?
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
              Our expert civil engineers and surveyors evaluate your site parameters, blueprint plans, and budget requirements to deliver a transparent itemized estimate.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to={ROUTES.ENQUIRE} className="btn-primary" style={{ padding: '0.9rem 2.25rem', fontSize: '1rem' }}>
                Request a Custom Quote <ArrowRight size={18} />
              </Link>
              <a
                href="tel:7430004000"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  padding: '0.9rem 2rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Call Office: 9940696800/7430004000
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
