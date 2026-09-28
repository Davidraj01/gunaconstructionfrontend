import React from 'react';
import { MessageCircle } from 'lucide-react';

const EnquiryMiniBanner = () => {
  const whatsappUrl = "https://wa.me/7430004000?text=Hello%20Guna%20Construction,%20I%20would%20like%20to%20enquire%20about%20your%20construction%20services.";

  return (
    <>
      {/* Floating WhatsApp Action Button */}
      <div
        className="floating-action-buttons"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9990,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-favicon-btn"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: '#16a34a',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(22, 163, 74, 0.45)',
            border: '2.5px solid #dcfce7',
            cursor: 'pointer',
            transition: 'transform 0.25s ease',
            textDecoration: 'none',
            position: 'relative'
          }}
          title="Chat with GUNA CONSTRUCTION on WhatsApp: 994069800 / 7430004000"
        >
          <MessageCircle size={28} color="#ffffff" />
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              backgroundColor: '#22c55e',
              borderRadius: '50%',
              border: '2px solid #ffffff'
            }}
          />
        </a>
      </div>

      <style>{`
        .whatsapp-favicon-btn:hover {
          transform: scale(1.08);
        }

        @media (max-width: 600px) {
          .floating-action-buttons {
            bottom: 12px !important;
            right: 12px !important;
          }
          .whatsapp-favicon-btn {
            width: 46px !important;
            height: 46px !important;
          }
          .whatsapp-favicon-btn svg {
            width: 24px !important;
            height: 24px !important;
          }
        }
      `}</style>
    </>
  );
};

export default EnquiryMiniBanner;
