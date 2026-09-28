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
              Specialized in residential luxury homes, commercial complexes, structural renovations, and civil construction at 863/6B, Bazar Street, Cheyyur. Engineered for strength, durability, and complete customer satisfaction.
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
          padding: clamp(3rem, 6vw, 5.5rem) 0 clamp(3.5rem, 7vw, 6rem) 0;
          overflow: hidden;
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
          background-color: #0b1120;
          min-height: 88vh;
          display: flex;
          align-items: center;
        }

        /* 100% Sharp, Vibrant, Full-Color Background Image */
        .hero-bg-layer {
          position: absolute;
          inset: 0;
          background-image: url(${heroHouseImg});
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          filter: saturate(1.2) brightness(1.02) contrast(1.05);
          z-index: 1;
        }

        /* Directional Gradient: Dark on text side (left), fully clear & colorful on house side (right) */
        .hero-directional-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(11, 17, 32, 0.94) 0%,
            rgba(15, 23, 42, 0.85) 38%,
            rgba(15, 23, 42, 0.45) 58%,
            rgba(15, 23, 42, 0.1) 78%,
            transparent 100%
          ),
          linear-gradient(
            180deg,
            rgba(15, 23, 42, 0.3) 0%,
            transparent 30%,
            transparent 75%,
            rgba(11, 17, 32, 0.75) 100%
          );
          z-index: 2;
        }

        .hero-container {
          position: relative;
          z-index: 3;
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          box-sizing: border-box;
          width: 100%;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 680px);
          gap: 2.5rem;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }

        /* Left Side High-Contrast Text Card */
        .hero-text-card {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          background: rgba(11, 17, 32, 0.82);
          border: 1px solid rgba(249, 115, 22, 0.35);
          border-radius: 20px;
          padding: clamp(1.75rem, 3.5vw, 2.5rem);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(249, 115, 22, 0.15);
        }

        .hero-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(249, 115, 22, 0.22);
          border: 1px solid rgba(249, 115, 22, 0.5);
          padding: 0.4rem 0.95rem;
          border-radius: 30px;
          font-size: 0.84rem;
          color: #fb923c;
          font-weight: 700;
          margin-bottom: 1rem;
          max-width: 100%;
          flex-wrap: wrap;
          box-sizing: border-box;
          line-height: 1.3;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
        }

        .hero-heading {
          font-size: clamp(2rem, 4.2vw, 3.15rem);
          font-weight: 900;
          letter-spacing: -0.5px;
          line-height: 1.15;
          margin-bottom: 0.65rem;
          color: #ffffff;
          word-break: break-word;
          overflow-wrap: break-word;
          text-shadow: 0 3px 12px rgba(0, 0, 0, 0.9);
        }

        .hero-brand-accent {
          color: #f97316;
          text-shadow: 0 3px 18px rgba(249, 115, 22, 0.6);
        }

        .hero-subheading {
          font-size: clamp(1.15rem, 2.5vw, 1.55rem);
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          word-break: break-word;
          overflow-wrap: break-word;
          line-height: 1.3;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        .hero-subheading-accent {
          color: #34d399;
          text-shadow: 0 2px 10px rgba(52, 211, 153, 0.5);
        }

        .hero-description {
          font-size: clamp(0.92rem, 1.6vw, 1.02rem);
          color: #f1f5f9;
          line-height: 1.65;
          margin-bottom: 1.75rem;
          max-width: 580px;
          word-break: break-word;
          overflow-wrap: break-word;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.9);
        }

        .hero-buttons-container {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 1.75rem;
          width: 100%;
          box-sizing: border-box;
        }

        .hero-cta-btn {
          padding: 0.8rem 1.45rem;
          font-size: 0.95rem;
          font-weight: 700;
          border-radius: 10px;
          box-sizing: border-box;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hero-cta-btn:hover {
          transform: translateY(-2px);
        }

        .hero-whatsapp-btn {
          background-color: #16a34a;
          color: #ffffff;
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.4);
        }

        .hero-whatsapp-btn:hover {
          background-color: #15803d;
          box-shadow: 0 8px 24px rgba(22, 163, 74, 0.55);
        }

        .hero-services-btn {
          background-color: rgba(30, 41, 59, 0.9);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hero-highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
          padding-top: 1.25rem;
          width: 100%;
          box-sizing: border-box;
        }

        .highlight-item {
          min-width: 0;
          box-sizing: border-box;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 0.65rem 0.75rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .highlight-item:hover {
          transform: translateY(-2px);
          border-color: rgba(249, 115, 22, 0.6);
        }

        .highlight-title {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.86rem;
          line-height: 1.3;
          word-break: break-word;
        }

        .highlight-icon {
          color: #34d399;
          flex-shrink: 0;
        }

        .highlight-desc {
          font-size: 0.74rem;
          color: #cbd5e1;
          margin-top: 2px;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .hero-highlights-grid {
            grid-template-columns: 1fr !important;
            gap: 0.65rem !important;
          }
        }

        @media (max-width: 600px) {
          .hero-container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          .hero-text-card {
            padding: 1.25rem !important;
          }
          .hero-buttons-container {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0.55rem !important;
          }
          .hero-cta-btn {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
