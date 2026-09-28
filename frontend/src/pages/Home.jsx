import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import ReviewCard from "../components/ReviewCard";
import GalleryModal from "../components/GalleryModal";
import EnquiryForm from "../components/EnquiryForm";
import GoogleMapEmbed from "../components/GoogleMapEmbed";
import SocialLinks from "../components/SocialLinks";
import {
  fetchServices,
  fetchProjects,
  fetchGallery,
  fetchReviews,
} from "../services/api";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Users,
  HardHat,
  Image as ImageIcon,
  Play,
  PhoneCall,
  Sparkles,
  Layers
} from "lucide-react";
import { ROUTES } from "../routes/routes";
import { servicesData } from "../data/servicesData";
import localGalleryItems from "../data/projectGallery";

const Home = () => {
  const [services, setServices] = useState(servicesData);
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState(localGalleryItems);
  const [reviews, setReviews] = useState([]);

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [sData, pData, gData, rData] = await Promise.all([
        fetchServices().catch(() => servicesData),
        fetchProjects().catch(() => []),
        fetchGallery()
          .catch(() => [])
          .then((data) => (data && data.length ? data : localGalleryItems)),
        fetchReviews().catch(() => []),
      ]);
      setServices(sData && sData.length ? sData : servicesData);
      setProjects(pData || []);
      setGallery(gData && gData.length ? gData : localGalleryItems);
      setReviews(rData || []);
    } catch (err) {
      console.error("Home data loading error:", err);
      setServices(servicesData);
      setGallery(localGalleryItems);
    }
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const whyChooseUs = [
    {
      title: "Quality Focus",
      desc: "Strict material selection, concrete grade testing, and high attention to construction craftsmanship.",
    },
    {
      title: "Professional Approach",
      desc: "Clear communication, scheduled milestones, and organized site management on every project.",
    },
    {
      title: "Customer Alignment",
      desc: "We listen to your specific requirements and design spatial solutions that match your functional needs.",
    },
    {
      title: "Practical Solutions",
      desc: "Architectural & engineering solutions tailored specifically to plot area, Vastu, and budget.",
    },
    {
      title: "Project Transparency",
      desc: "No hidden costs. Clear material estimates, progress reporting, and structural updates.",
    },
  ];

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section */}
      <AboutSection />

      {/* 3. Our Services Section */}
      <section style={{ padding: "clamp(3rem, 6vw, 4.5rem) 0", backgroundColor: "#f8fafc", width: "100%", overflow: "hidden" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Specialized Capabilities</span>
            <h2 className="section-title">Our Construction & Engineering Services</h2>
            <p className="section-desc">
              From road formation, deep piling, and structural RCC casting to turnkey luxury interiors, plan approvals, and licensed valuation in Cheyyur & Tamil Nadu.
            </p>
          </div>

          <div className="grid-3" style={{ gap: "1.75rem" }}>
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id || service.slug} service={service} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to={ROUTES.SERVICES} className="btn-primary" style={{ padding: "0.85rem 2.25rem", fontSize: "0.98rem" }}>
              Explore All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section style={{ padding: "clamp(3rem, 6vw, 4.5rem) 0", backgroundColor: "#ffffff", width: "100%", overflow: "hidden" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Why Choose Us</span>
            <h2 className="section-title">Why Choose GUNA CONSTRUCTION?</h2>
            <p className="section-desc">
              Building lasting customer trust through engineering discipline,
              practical guidance, and quality execution in Cheyyur.
            </p>
          </div>

          <div className="grid-3" style={{ gap: "1.75rem" }}>
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px",
                  padding: "1.75rem",
                  border: "1px solid #e2e8f0",
                  transition: "transform 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-4px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: "#0f172a",
                    color: "#f97316",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    marginBottom: "1rem",
                  }}
                >
                  0{idx + 1}
                </div>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    color: "#0f172a",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Project Gallery Preview Section */}
      <section style={{ padding: "clamp(3rem, 6vw, 4.5rem) 0", backgroundColor: "#f8fafc", width: "100%", overflow: "hidden" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Real Site Photography</span>
            <h2 className="section-title">Projects </h2>
            <p className="section-desc">
              High-resolution photographs showcasing real building structures, interior
              finishing, concrete framing, and exterior elevations executed by GUNA CONSTRUCTION.
            </p>
          </div>

          <div className="grid-4" style={{ gap: "1.25rem" }}>
            {gallery.slice(0, 8).map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => openLightbox(idx)}
                style={{
                  position: "relative",
                  borderRadius: "14px",
                  overflow: "hidden",
                  height: "210px",
                  cursor: "pointer",
                  backgroundColor: "#0f172a",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  transition: "transform 0.3s ease"
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.08)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(15, 23, 42, 0.4)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  <ImageIcon size={28} color="#f97316" />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to={ROUTES.GALLERY} className="btn-outline">
              Explore Full Project Gallery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryModal
        isOpen={isLightboxOpen}
        items={gallery}
        currentIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex(
            (lightboxIndex - 1 + gallery.length) % gallery.length,
          )
        }
        onNext={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)}
      />

      {/* 7. Customer Reviews Section */}
      <section style={{ padding: "clamp(3rem, 6vw, 4.5rem) 0", backgroundColor: "#ffffff", width: "100%", overflow: "hidden" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Client Feedback</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-desc">
              Customer satisfaction and reliability are at the center of every
              structure we build.
            </p>
          </div>

          {reviews && reviews.length > 0 ? (
            <div className="grid-2">
              {reviews.map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "2rem",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
              }}
            >
              <p style={{ color: "#64748b", textAlign: "center" }}>
                Customer reviews and verified feedback from completed builds.
              </p>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to={ROUTES.REVIEWS} className="btn-outline">
              View All & Write a Review <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Enquiry & Map Section */}
      <section style={{ padding: "clamp(3rem, 6vw, 4.5rem) 0", backgroundColor: "#f8fafc", width: "100%", overflow: "hidden" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "2.5rem",
              alignItems: "start",
            }}
            className="enquiry-grid"
          >
            <EnquiryForm />
            <GoogleMapEmbed />
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .enquiry-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        `}</style>
      </section>

      {/* 9. Social Media Connect Section (Bottom of Homepage) */}
      <section
        style={{
          backgroundColor: "#0f172a",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "clamp(2rem, 4vw, 3rem) 0",
          color: "#ffffff",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              background: "linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)",
              border: "1px solid rgba(249, 115, 22, 0.3)",
              borderRadius: "16px",
              padding: "clamp(1.5rem, 3vw, 2.25rem)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
            className="home-social-banner"
          >
            <div style={{ maxWidth: "540px" }}>
              <span
                style={{
                  color: "#f97316",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  display: "inline-block",
                  marginBottom: "0.35rem",
                }}
              >
                Official Social Channels
              </span>
              <h3
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "0.4rem",
                  lineHeight: 1.25,
                }}
              >
                Follow GUNA CONSTRUCTION Online
              </h3>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Connect with our official profiles on Facebook, Instagram, and Google Search Viewer for live site updates, completed villa tours, and client reviews.
              </p>
            </div>

            <div>
              <SocialLinks size="lg" align="center" />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .home-social-banner {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Home;

