import { localGalleryItems } from './projectGallery';
import projectImage1 from "../assets/project-gallery/WhatsApp_Image_2026-09-23_at_2.44.36_PM.jpeg";
import projectImage4 from "../assets/project-gallery/WhatsApp_Image_2026-09-23_at_2.44.37_PM.jpeg";
import projectImage5 from "../assets/project-gallery/WhatsApp_Image_2026-09-23_at_2.44.41_PM.jpeg";
import projectImage7 from "../assets/project-gallery/WhatsApp_Image_2026-09-23_at_2.44.43_PM.jpeg";
import projectImage10 from "../assets/project-gallery/WhatsApp_Image_2026-09-23_at_2.44.46_PM__1_.jpeg";

export const mockProjects = [
  {
    id: 1,
    slug: "residential-luxury-villa-cheyyur",
    title: "Luxury Residential Villa Construction",
    category: "Residential",
    location: "Bazar Street, Cheyyur, Tamil Nadu",
    status: "Completed",
    completion_date: "2025",
    main_image: projectImage7,
    short_description: "Turnkey 2-storey contemporary residential villa built with reinforced RCC framing, premium brick masonry, and custom interior finishing.",
    full_description: "A premier turnkey residential villa project executed by GUNA CONSTRUCTION in Cheyyur. The project featured complete architectural planning, licensed structural approval, deep column foundation, earthquake-resistant RCC frame casting, and luxury interior woodwork.",
    highlights: [
      "Vastu-compliant architectural floor planning",
      "Grade M25 tested concrete slab and column framing",
      "Complete electrical conduit & CPVC plumbing installation",
      "Premium weather-resistant exterior elevation paint"
    ],
    images: [
      { image_url: projectImage4, caption: "Brickwork & Elevation" },
      { image_url: projectImage7, caption: "Completed Villa View" },
      { image_url: projectImage10, caption: "Finishing Details" }
    ]
  },
  {
    id: 2,
    slug: "commercial-shopping-complex",
    title: "Commercial Retail & Office Complex",
    category: "Commercial",
    location: "Main Road, Cheyyur, Tamil Nadu",
    status: "Completed",
    completion_date: "2024",
    main_image: projectImage5,
    short_description: "Multi-level commercial structure designed for heavy retail foot traffic, spacious open floor layouts, and dedicated parking.",
    full_description: "Engineered for maximum commercial durability, this multi-storey commercial complex features high-load beam structures, modern storefront glass elevation, and complete compliance with local municipality safety norms.",
    highlights: [
      "Heavy load-bearing column framework",
      "Fire safety and emergency exit provisions",
      "Wide vehicle parking basement and access ramp",
      "Commercial grade electrical power distribution"
    ],
    images: [
      { image_url: projectImage5, caption: "Front Elevation" },
      { image_url: projectImage1, caption: "Roof Slab Casting" }
    ]
  },
  {
    id: 3,
    slug: "structural-foundation-and-rcc-framing",
    title: "Foundation Piling & RCC Structural Casting",
    category: "Structural",
    location: "Cheyyur, Chengalpattu Dist",
    status: "Completed",
    completion_date: "2025",
    main_image: projectImage1,
    short_description: "Deep column footing, high-grade steel rebar reinforcement, and precision concrete casting for high-durability buildings.",
    full_description: "Specialized structural engineering execution ensuring maximum stability on coastal and clay soil conditions around Cheyyur through deep pile foundations and certified tensile steel rebar grids.",
    highlights: [
      "Soil bearing capacity testing and analysis",
      "Fe-550D grade corrosion-resistant TMT rebar",
      "Vibrator-compacted monolithic slab casting",
      "Waterproofing additives for saltwater protection"
    ],
    images: [
      { image_url: projectImage1, caption: "Slab Casting" },
      { image_url: projectImage4, caption: "Wall Framing" }
    ]
  }
];

export const mockReviews = [
  {
    id: 1,
    name: "Karthik R.",
    contact_info: "Cheyyur",
    project_type: "Residential Construction",
    rating: 5,
    comment: "GUNA CONSTRUCTION completed our family villa in Cheyyur on time and within our agreed budget. The structural quality, material transparency, and regular site updates were truly commendable.",
    created_at: "2025-08-14"
  },
  {
    id: 2,
    name: "S. Venkatesan",
    contact_info: "Cheyyur",
    project_type: "Commercial Complex",
    rating: 5,
    comment: "Extremely professional civil engineering team. Their planning approval assistance and durable RCC work gave us total peace of mind. Highly recommended contractor in this region!",
    created_at: "2025-09-02"
  },
  {
    id: 3,
    name: "P. Murugan",
    contact_info: "Tamil Nadu",
    project_type: "Home Renovation",
    rating: 5,
    comment: "Excellent structural renovation and plastering work. The team listened to all our custom requirements and delivered top-notch results with zero hassle.",
    created_at: "2025-09-18"
  }
];

export const mockVideos = [
  {
    id: 1,
    title: "Villa Foundation & Concrete Casting Walkthrough",
    category: "Structural",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Live site footage showcasing steel reinforcement binding and machine-mix slab casting in Cheyyur."
  }
];

export const mockBlogPosts = [
  {
    id: 1,
    slug: "essential-steps-before-building-house-in-tamil-nadu",
    title: "5 Essential Steps Before Constructing Your Home in Tamil Nadu",
    excerpt: "Crucial insights on soil testing, DTCP plan approvals, choosing high-grade TMT steel, and contractor agreements.",
    date: "2025-09-10",
    author: "Guna Construction Team"
  }
];
