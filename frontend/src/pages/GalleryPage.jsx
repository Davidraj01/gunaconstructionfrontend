import React, { useEffect, useState } from "react";
import { fetchGallery } from "../services/api";
import GalleryModal from "../components/GalleryModal";
import { Maximize2, Image as ImageIcon } from "lucide-react";
import localGalleryItems from "../data/projectGallery";

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Construction",
    "Interior",
    "Exterior",
    "Completed",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    loadGallery(activeCategory);
  }, [activeCategory]);

  const loadGallery = async (cat) => {
    setLoading(true);
    try {
      const data = await fetchGallery(cat);
      const finalData = data && data.length ? data : localGalleryItems;
      setGalleryItems(finalData);
    } catch (err) {
      console.error(err);
      setGalleryItems(localGalleryItems);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <div>
      <section
        style={{
          backgroundColor: "#0f172a",
          color: "#ffffff",
          padding: "4rem 0",
          textAlign: "center",
          borderBottom: "4px solid #f97316",
        }}
      >
        <div className="container">
          <span className="section-subtitle">Real Site Work Portfolio</span>
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: 800,
              marginBottom: "0.75rem",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            Projects
          </h1>
          <p
            style={{
              color: "#cbd5e1",
              fontSize: "1.1rem",
              maxWidth: "650px",
              margin: "0 auto",
            }}
          >
            High-resolution photographs showcasing real building structures,
            site work, interior execution, and exterior elevations executed by GUNA CONSTRUCTION.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 0", backgroundColor: "#f8fafc" }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              justify: "center",
              gap: "0.65rem",
              marginBottom: "3rem",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  backgroundColor:
                    activeCategory === cat ? "#f97316" : "#ffffff",
                  color: activeCategory === cat ? "#ffffff" : "#0f172a",
                  border: activeCategory === cat ? "none" : "1px solid #cbd5e1",
                  padding: "0.55rem 1.25rem",
                  borderRadius: "25px",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow:
                    activeCategory === cat
                      ? "0 4px 12px rgba(249,115,22,0.3)"
                      : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div
              style={{ textAlign: "center", padding: "4rem", color: "#64748b" }}
            >
              Loading gallery photos...
            </div>
          ) : galleryItems.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
              }}
            >
              <p style={{ color: "#64748b" }}>
                No photos found in this category.
              </p>
            </div>
          ) : (
            <div className="grid-4" style={{ gap: "1.25rem" }}>
              {galleryItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenLightbox(idx)}
                  style={{
                    position: "relative",
                    borderRadius: "14px",
                    overflow: "hidden",
                    height: "240px",
                    cursor: "pointer",
                    backgroundColor: "#0f172a",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-4px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 60%)",
                      display: "flex",
                      flexDirection: "column",
                      justify: "flex-end",
                      padding: "1.25rem",
                      color: "#ffffff",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#f97316",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.category}
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{item.title}</span>
                      <Maximize2 size={16} color="#f97316" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <GalleryModal
        isOpen={isLightboxOpen}
        items={galleryItems}
        currentIndex={currentIndex}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={() =>
          setCurrentIndex(
            (currentIndex - 1 + galleryItems.length) % galleryItems.length,
          )
        }
        onNext={() => setCurrentIndex((currentIndex + 1) % galleryItems.length)}
      />
    </div>
  );
};

export default GalleryPage;
