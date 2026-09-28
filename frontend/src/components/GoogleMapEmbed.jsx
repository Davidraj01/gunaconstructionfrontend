import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

const GoogleMapEmbed = () => {
  const mapAddress = "863/6B, Bazar Street, Cheyyur, Tamil Nadu 603302";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Cheyyur Bazar Street Tamil Nadu 603302")}`;

  return (
    <div style={{
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.1)',
      border: '1px solid #e2e8f0',
      backgroundColor: '#ffffff'
    }}>
      <div style={{
        padding: '1.25rem 1.5rem',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <MapPin color="#f97316" size={22} />
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
              Find GUNA CONSTRUCTION
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              {mapAddress}
            </div>
          </div>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
        >
          <Navigation size={14} /> Get Directions <ExternalLink size={12} />
        </a>
      </div>

      {/* Embed Iframe */}
      <div style={{ height: '380px', width: '100%', position: 'relative' }}>
        <iframe
          title="GUNA CONSTRUCTION Location Map Cheyyur"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://maps.google.com/maps?q=Cheyyur%20Bazar%20Street%20Tamil%20Nadu%20603302&t=&z=14&ie=UTF8&iwloc=&output=embed"
        />
      </div>
    </div>
  );
};

export default GoogleMapEmbed;
