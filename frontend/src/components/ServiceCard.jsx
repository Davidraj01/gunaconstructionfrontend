import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Home, Building2, Wrench, HardHat, Layers, Paintbrush,
  Sparkles, Maximize2, Flame, LayoutDashboard, Grid, DoorOpen,
  ShieldCheck, Box, Droplets, Umbrella, FileCheck, Calculator,
  Compass, Award, Package, Zap, ShieldAlert, Truck
} from 'lucide-react';
import { ROUTES } from '../routes/routes';

const iconMap = {
  Home,
  Building2,
  Wrench,
  HardHat,
  Layers,
  Paintbrush,
  Sparkles,
  Maximize2,
  Flame,
  LayoutDashboard,
  Grid,
  DoorOpen,
  ShieldCheck,
  Box,
  Droplets,
  Umbrella,
  FileCheck,
  Calculator,
  Compass,
  Award,
  Package,
  Zap,
  ShieldAlert,
  Truck
};

const defaultImage = "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80";

const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon_name] || Building2;
  const [imgSrc, setImgSrc] = useState(service.image_url || defaultImage);
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '18px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 18px 36px -6px rgba(15, 23, 42, 0.14)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(15, 23, 42, 0.08)';
    }}>

      {/* Image Container */}
      <div style={{
        position: 'relative',
        height: '210px',
        overflow: 'hidden',
        backgroundColor: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {!imgError ? (
          <img
            src={imgSrc}
            alt={service.title}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f97316',
            gap: '0.5rem'
          }}>
            <IconComponent size={44} color="#f97316" />
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600 }}>GUNA CONSTRUCTION</span>
          </div>
        )}

        {/* Category Pill */}
        {service.category && (
          <div style={{
            position: 'absolute',
            top: '0.85rem',
            left: '0.85rem',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            padding: '0.3rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            {service.category}
          </div>
        )}

        {/* Floating Icon */}
        <div style={{
          position: 'absolute',
          bottom: '0.85rem',
          right: '0.85rem',
          backgroundColor: '#ffffff',
          color: '#ea580c',
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
          border: '1.5px solid #ffedd5'
        }}>
          <IconComponent size={20} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.35 }}>
          {service.title}
        </h3>

        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '1rem', flexGrow: 1 }}>
          {service.short_description}
        </p>

        {service.features && service.features.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
            {service.features.slice(0, 3).map((feat, idx) => (
              <span key={idx} style={{
                backgroundColor: '#fff7ed',
                color: '#c2410c',
                fontSize: '0.74rem',
                fontWeight: 600,
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                border: '1px solid #fed7aa'
              }}>
                ✓ {feat}
              </span>
            ))}
          </div>
        )}

        <Link
          to={ROUTES.SERVICE_DETAILS(service.slug || service.id)}
          style={{
            color: '#ea580c',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginTop: 'auto',
            textDecoration: 'none',
            transition: 'gap 0.2s ease'
          }}
          onMouseOver={e => e.currentTarget.style.gap = '0.7rem'}
          onMouseOut={e => e.currentTarget.style.gap = '0.4rem'}
        >
          View Service Details <ArrowRight size={15} />
        </Link>
      </div>

    </div>
  );
};

export default ServiceCard;
