import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  HardHat,
  MessageCircle,
} from "lucide-react";
import { ROUTES } from "../routes/routes";
import heroHouseImg from "../assets/hero-house.jpg";

const Hero = () => {
  const whatsappUrl = "https://wa.me/7430004000?text=Hello%20Guna%20Construction,%20I%20would%20like%20to%20enquire%20about%20your%20construction%20services.";

  return (
    <section className="hero-section">
      {/* 100% Crystal-Clear, Colorful House Elevation Background */}
      <div className="hero-bg-layer" />
      
      {/* Directional gradient that shades only the text area on the left and leaves the house completely bright & colorful */}
      <div className="hero-directional-overlay" />

      <div className="container hero-container">
        <div className="hero-grid">
          {/* Left Column: High-Contrast Crisp Text Card */}
          <div className="hero-text-card">
            <div className="hero-location-pill">
              <HardHat size={16} style={{ flexShrink: 0, color: "#fb923c" }} />
              <span>Guna Trusted Building Contractors • PIN: 603302</span>
            </div>

            <h1 className="hero-heading">
              GUNA <span className="hero-brand-accent">CONSTRUCTION</span>
            </h1>

            <h2 className="hero-subheading">
              Building Quality.{" "}
              <span className="hero-subheading-accent">Creating Trust.</span>
            </h2>

            <p className="hero-description">
              Specialized in residential luxury homes, commercial complexes, 
              <p>structural renovations,and civil construction at 863/6B,Bazar Street,Cheyyur</p>
              <p>Engineered for strengthdurability,</p>
              and complete customer satisfaction.
            </p>

            {/* CTA Action Buttons */}
            <div className="hero-buttons-container">
              <Link
                to={ROUTES.ENQUIRE}
                className="btn-primary hero-cta-btn"
              >
                Enquire Now <ArrowRight size={17} />
              </Link>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn hero-whatsapp-btn"
              >
                <MessageCircle size={17} /> WhatsApp Us
              </a>

              <Link
                to={ROUTES.SERVICES}
                className="btn-secondary hero-cta-btn hero-services-btn"
              >
                Our Services
              </Link>
            </div>

            {/* Quick Key Highlights */}
            <div className="hero-highlights-grid">
              <div className="highlight-item">
                <div className="highlight-title">
                  <CheckCircle2 size={16} className="highlight-icon" />
                  <span>Quality Work</span>
                </div>
                <div className="highlight-desc">
                  Strict structural testing
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-title">
                  <CheckCircle2 size={16} className="highlight-icon" />
                  <span>Customer First</span>
                </div>
                <div className="highlight-desc">
                  Transparent estimates
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-title">
                  <CheckCircle2 size={16} className="highlight-icon" />
                  <span>Local Expertise</span>
                </div>
                <div className="highlight-desc">
                  Bazar St, Cheyyur
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          color: #ffffff;
          padding: clamp(2.75rem, 5vw + 1rem, 5.5rem) 0 clamp(3rem, 6vw + 1rem, 6rem) 0;
          overflow: hidden;
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
          background-color: #0b1120;
          min-height: clamp(540px, 86vh, 820px);
          display: flex;
          align-items: center;
        }

        /* 100% Crystal-Clear, Vibrant House Elevation Background */
        .hero-bg-layer {
          position: absolute;
          inset: 0;
          background-image: url(${heroHouseImg});
          background-size: cover;
          background-position: right 25% center;
          background-repeat: no-repeat;
          filter: saturate(1.28) brightness(1.06) contrast(1.08);
          z-index: 1;
          transform: scale(1.01);
        }

        /* Directional Gradient: Shading on the left for maximum text contrast, 100% clear house elevation on right */
        .hero-directional-overlay {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(
              90deg,
              rgba(11, 17, 32, 0.94) 0%,
              rgba(11, 17, 32, 0.88) 32%,
              rgba(15, 23, 42, 0.55) 54%,
              rgba(15, 23, 42, 0.12) 74%,
              transparent 100%
            ),
            linear-gradient(
              180deg,
              rgba(11, 17, 32, 0.45) 0%,
              transparent 25%,
              transparent 75%,
              rgba(11, 17, 32, 0.75) 100%
            );
         // z-index: 2;
          transition: background 0.3s ease;
        }

        .hero-container {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
          padding-left: clamp(1rem, 3vw, 1.75rem);
          padding-right: clamp(1rem, 3vw, 1.75rem);
          box-sizing: border-box;
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 720px);
          gap: clamp(1.5rem, 3vw, 2.5rem);
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }

        /* Left Side High-Contrast Text Card */
        .hero-text-card {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .hero-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(249, 115, 22, 0.22);
          border: 1px solid rgba(249, 115, 22, 0.55);
          padding: clamp(0.35rem, 0.8vw, 0.45rem) clamp(0.75rem, 1.5vw, 1.05rem);
          border-radius: 30px;
          font-size: clamp(0.72rem, 0.65rem + 0.35vw, 0.85rem);
          color: #fb923c;
          font-weight: 700;
          margin-bottom: clamp(0.75rem, 1.5vw, 1.15rem);
          max-width: 100%;
          flex-wrap: wrap;
          box-sizing: border-box;
          line-height: 1.35;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4), 0 0 12px rgba(249, 115, 22, 0.2);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(6px);
        }

        .hero-heading {
          font-size: clamp(1.95rem, 1.5rem + 3vw, 3.4rem);
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.14;
          margin-bottom: clamp(0.5rem, 1vw, 0.75rem);
          color: #ffffff;
          word-break: break-word;
          overflow-wrap: break-word;
          text-shadow: 0 3px 15px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9);
        }

        .hero-brand-accent {
          color: #f97316;
          text-shadow: 0 0 25px rgba(249, 115, 22, 0.65), 0 3px 15px rgba(0, 0, 0, 0.9);
        }

        .hero-subheading {
          font-size: clamp(1.1rem, 0.95rem + 1.25vw, 1.6rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: clamp(0.75rem, 1.5vw, 1.15rem);
          word-break: break-word;
          overflow-wrap: break-word;
          line-height: 1.3;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);
        }

        .hero-subheading-accent {
          color: #34d399;
          text-shadow: 0 0 18px rgba(52, 211, 153, 0.65), 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .hero-description {
          font-size: clamp(0.9rem, 0.84rem + 0.4vw, 1.05rem);
          color: #f8fafc;
          line-height: 1.68;
          font-weight: 500;
          margin-bottom: clamp(1.25rem, 2.5vw, 1.85rem);
          max-width: 620px;
          word-break: break-word;
          overflow-wrap: break-word;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.95);
        }

        .hero-buttons-container {
          display: flex;
          gap: clamp(0.55rem, 1.2vw, 0.85rem);
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: clamp(1.25rem, 2.5vw, 1.85rem);
          width: 100%;
          box-sizing: border-box;
        }

        .hero-cta-btn {
          padding: clamp(0.7rem, 0.6rem + 0.4vw, 0.85rem) clamp(1.25rem, 1rem + 0.8vw, 1.75rem);
          font-size: clamp(0.85rem, 0.8rem + 0.25vw, 0.96rem);
          font-weight: 700;
          border-radius: 10px;
          box-sizing: border-box;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          min-height: 44px;
        }

        .hero-cta-btn:hover {
          transform: translateY(-2px);
        }

        .hero-whatsapp-btn {
          background-color: #16a34a;
          color: #ffffff;
          box-shadow: 0 6px 22px rgba(22, 163, 74, 0.45);
        }

        .hero-whatsapp-btn:hover {
          background-color: #15803d;
          box-shadow: 0 8px 28px rgba(22, 163, 74, 0.6);
        }

        .hero-services-btn {
          background-color: rgba(15, 23, 42, 0.85);
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(6px);
        }

        .hero-highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.5rem, 1vw, 0.85rem);
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: clamp(0.85rem, 1.8vw, 1.35rem);
          width: 100%;
          box-sizing: border-box;
        }

        .highlight-item {
          min-width: 0;
          box-sizing: border-box;
          background: rgba(15, 23, 42, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 10px;
          padding: clamp(0.55rem, 0.9vw, 0.78rem);
          backdrop-filter: blur(8px);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .highlight-item:hover {
          transform: translateY(-2px);
          border-color: rgba(249, 115, 22, 0.7);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
        }

        .highlight-title {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #ffffff;
          font-weight: 700;
          font-size: clamp(0.78rem, 0.72rem + 0.3vw, 0.88rem);
          line-height: 1.3;
          word-break: break-word;
        }

        .highlight-icon {
          color: #34d399;
          flex-shrink: 0;
        }

        .highlight-desc {
          font-size: clamp(0.68rem, 0.65rem + 0.2vw, 0.76rem);
          color: #cbd5e1;
          margin-top: 2px;
          line-height: 1.3;
        }

        /* Media Query: Tablets & Small Laptops (max-width: 960px) */
        @media (max-width: 1440px) {
          .hero-section {
            min-height: auto;
            padding: clamp(2.5rem, 6vw, 4.25rem) 0;
          }
          .hero-bg-layer {
            background-position: center center;
          }
          .hero-directional-overlay {
            background: 
              linear-gradient(
                180deg,
                rgba(11, 17, 32, 0.9) 0%,
                rgba(15, 23, 42, 0.82) 48%,
                rgba(11, 17, 32, 0.92) 100%
              ),
              linear-gradient(
                90deg,
                rgba(11, 17, 32, 0.7) 0%,
                rgba(15, 23, 42, 0.45) 100%
              );
          }
          .hero-text-card {
            background: rgba(11, 17, 32, 0.45);
            //backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: clamp(1.25rem, 3vw, 1.75rem);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
          }
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-description {
            max-width: 100%;
          }
        }

        /* Media Query: Tablets Portrait (max-width: 768px) */
        @media (max-width: 768px) {
          .hero-highlights-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
        }

        /* Media Query: Phablets / Large Phones (max-width: 600px) */
        @media (max-width: 600px) {
          .hero-highlights-grid {
            grid-template-columns: 1fr;
            gap: 0.55rem;
          }
          .hero-buttons-container {
            flex-direction: column;
            align-items: stretch;
            gap: 0.55rem;
          }
          .hero-cta-btn {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
        }

        /* Media Query: Standard Mobile Phones (max-width: 480px) */
        @media (max-width: 480px) {
          .hero-section {
            padding: 2.25rem 0 3rem 0;
          }
          .hero-container {
            padding-left: 0.85rem;
            padding-right: 0.85rem;
          }
          .hero-text-card {
            padding: 1.15rem 0.95rem;
          }
          .hero-directional-overlay {
            background: linear-gradient(
              180deg,
              rgba(11, 17, 32, 0.92) 0%,
              rgba(15, 23, 42, 0.85) 50%,
              rgba(11, 17, 32, 0.95) 100%
            );
          }
          .hero-location-pill {
            width: 100%;
          }
        }

        /* Media Query: Small Screen Mobile Phones (max-width: 360px) */
        @media (max-width: 360px) {
          .hero-heading {
            font-size: 1.7rem;
          }
          .hero-subheading {
            font-size: 1rem;
          }
          .hero-description {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
