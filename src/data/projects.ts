import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "ktown-cypher",
    id: "01",
    title: "K-Town Cypher",
    category: "WordPress & Community Platform",
    labels: ["Website", "Community Platform", "UI/UX Design"],
    year: "2024",
    client: "Adnan Taal",
    role: "Full-Stack Development & Art Direction",
    liveUrl: "https://ktowncypher.com/",
    heroImage: "/assets/images/project4.1.png",
    thumbnail: "/assets/images/project4.1.png",
    overview: "A dynamic community and street-dance platform for Pakistan's hip-hop culture, connecting dancers, artists, and event organizers across the country.",
    challenge: "The main challenge was to build a robust website and platform that connects Pakistan's street dance and hip-hop community, showcasing events, dance battles, and local talent in an engaging, performance-optimized layout.",
    solution: "I developed the custom website using WordPress, utilizing custom themes and optimized stylesheets to reflect the raw, energetic aesthetics of hip-hop culture. I integrated media galleries, event highlights, and a clean, responsive layout.",
    technologies: ["WordPress", "Custom PHP", "Tailwind CSS", "JavaScript", "GSAP Animations"],
    gallery: [
      "/assets/images/project4.1.png",
      "/assets/images/project4.2.png",
      "/assets/images/project4.3.png",
      "/assets/images/project4.4.png",
    ],
    stats: [
      { label: "Community Reach", value: "50K+" },
      { label: "Page Speed", value: "98/100" },
      { label: "Culture Impact", value: "#1 Hip-Hop" }
    ],
    nextSlug: "carving-production-agency",
    prevSlug: "interactive-3d-experience",
  },
  {
    slug: "carving-production-agency",
    id: "02",
    title: "Carving Production",
    category: "Media Production Agency Website",
    labels: ["Website", "Agency Portfolio", "Front-End Engineering"],
    year: "2024",
    client: "Carving Productions",
    role: "UI/UX Design & Front-End Engineering",
    liveUrl: "https://carvingproduction.com/",
    heroImage: "/assets/images/project2.1.png",
    thumbnail: "/assets/images/project2.1.png",
    overview: "A bold, cinematic portfolio platform showcasing high-end commercial film, photography, and creative campaigns with seamless video previews.",
    challenge: "Creating a cinematic website experience that handles large media assets effortlessly while maintaining ultra-fast load times and smooth mobile responsiveness.",
    solution: "Engineered an editorial layout with dynamic media preloading, fluid typography scales, custom cursor interactions, and responsive video embeds.",
    technologies: ["Next.js", "React", "Tailwind CSS", "GSAP", "Lenis Scroll"],
    gallery: [
      "/assets/images/project2.1.png",
      "/assets/images/project2.2.png",
    ],
    stats: [
      { label: "Load Time", value: "< 1.2s" },
      { label: "Bounce Rate", value: "-28%" },
      { label: "Client Inquiries", value: "+140%" }
    ],
    nextSlug: "coffee-shop-mobile-app",
    prevSlug: "ktown-cypher",
  },
  {
    slug: "coffee-shop-mobile-app",
    id: "03",
    title: "Brew & Co Mobile App",
    category: "Mobile UI/UX & React Native",
    labels: ["Mobile App", "iOS & Android", "UI/UX Design"],
    year: "2023",
    client: "Artisan Coffee Roasters",
    role: "Product Design & Mobile Development",
    heroImage: "/assets/images/project3main.jpg",
    thumbnail: "/assets/images/project3main.jpg",
    overview: "A seamless specialty coffee ordering app designed to streamline morning pickups, custom roasts, and customer loyalty rewards.",
    challenge: "Designing an intuitive ordering flow that lets users customize complex coffee drink orders in 3 taps or less without interface clutter.",
    solution: "Crafted a tactile, minimalist mobile interface featuring interactive ingredient selectors, real-time brewing trackers, and haptic feedback.",
    technologies: ["Figma", "React Native", "Tailwind CSS", "Redux Toolkit", "Framer Motion"],
    gallery: [
      "/assets/images/project3.1.png",
      "/assets/images/project3.3.png",
      "/assets/images/project3.4.png",
      "/assets/images/project3.5.png",
    ],
    stats: [
      { label: "Order Completion", value: "96%" },
      { label: "Average Checkout", value: "32s" },
      { label: "Daily Active Users", value: "12K+" }
    ],
    nextSlug: "albert-einstein-biography",
    prevSlug: "carving-production-agency",
  },
  {
    slug: "albert-einstein-biography",
    id: "04",
    title: "Albert Einstein Biography",
    category: "Digital Editorial Experience",
    labels: ["Website", "Editorial Experience", "Motion & Interactive"],
    year: "2023",
    role: "Creative Direction & Web Engineering",
    heroImage: "/assets/images/project1.1.png",
    thumbnail: "/assets/images/project1.1.png",
    overview: "An immersive digital biography celebrating the life, discoveries, thought experiments, and physics breakthroughs of Albert Einstein.",
    challenge: "Translating dense scientific achievements and historical archives into an engaging, visual web storytelling journey.",
    solution: "Combined kinetic typography, interactive timeline scrubbers, archival photography reveals, and mathematical formula animations.",
    technologies: ["JavaScript", "HTML5 Canvas", "Tailwind CSS", "GSAP ScrollTrigger"],
    gallery: [
      "/assets/images/project1.1.png",
      "/assets/images/project1.2.png",
      "/assets/images/project1.3.png",
    ],
    stats: [
      { label: "Time on Page", value: "4m 18s" },
      { label: "Awwwards Nominee", value: "Honorable" },
      { label: "Scroll Depth", value: "88%" }
    ],
    nextSlug: "the-aesthetic-palette",
    prevSlug: "coffee-shop-mobile-app",
  },
  {
    slug: "the-aesthetic-palette",
    id: "05",
    title: "The Aesthetic Palette",
    category: "Brand Identity & E-Commerce",
    labels: ["E-Commerce", "Website", "Brand Identity"],
    year: "2023",
    client: "Aesthetic Studio",
    role: "Brand Identity & Web Development",
    heroImage: "/assets/images/project5.1.png",
    thumbnail: "/assets/images/project5.1.png",
    overview: "A sophisticated e-commerce and visual design system for curated interior design palettes, textiles, and tactile art collections.",
    challenge: "Ensuring color accuracy and sensory appeal in a digital storefront, highlighting textures, materials, and lighting conditions.",
    solution: "Designed high-contrast editorial photography layouts with dynamic color swatch inspectors and instant cart checkout.",
    technologies: ["Shopify Liquid", "Tailwind CSS", "JavaScript", "Figma Design Systems"],
    gallery: [
      "/assets/images/project5.1.png",
      "/assets/images/project5.2.png",
      "/assets/images/project5.3.png",
      "/assets/images/project5.4.png",
    ],
    stats: [
      { label: "Conversion Rate", value: "4.8%" },
      { label: "Mobile Share", value: "72%" },
      { label: "Customer Rating", value: "4.9/5" }
    ],
    nextSlug: "azizography",
    prevSlug: "albert-einstein-biography",
  },
  {
    slug: "azizography",
    id: "06",
    title: "Azizography Studio",
    category: "Editorial & Tour Photography Platform",
    labels: ["Website", "Editorial Platform", "Full-Stack Development"],
    year: "2024",
    client: "Aziz (Tour & Concert Photographer)",
    role: "Full-Stack Engineering & Art Direction",
    liveUrl: "https://azizography.com/",
    heroImage: "/assets/images/project-azizography-main.png",
    thumbnail: "/assets/images/project-azizography-main.png",
    overview: "A high-performance editorial, concert, and tour photography curator platform engineered with dynamic masonry curation, WebGL liquid carousels, and client-side WebP compression.",
    challenge: "Developing an ultra-smooth visual storytelling portfolio capable of rendering high-resolution tour and arena photography with zero lag, fluid Lenis momentum scrolling, and a custom curator dashboard.",
    solution: "Built a bespoke Next.js and Firebase architecture featuring a 24-blade mathematical aperture intro loader, drag-and-drop exhibition curation with dnd-kit, and instant WebP compression reducing file sizes by up to 90%.",
    technologies: ["Next.js", "React 19", "Tailwind CSS", "Firebase Firestore", "Lenis Momentum", "dnd-kit"],
    gallery: [
      "/assets/images/project-azizography-gallery-1.png",
      "/assets/images/project-azizography-gallery-2.png",
      "/assets/images/project-azizography-gallery-3.png",
    ],
    stats: [
      { label: "Image Compression", value: "90% WebP" },
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Curation Latency", value: "< 80ms" }
    ],
    nextSlug: "interactive-3d-experience",
    prevSlug: "the-aesthetic-palette",
  },
  {
    slug: "interactive-3d-experience",
    id: "07",
    title: "Interactive 3D Web Experience",
    category: "WebGL & Creative Tech",
    labels: ["3D Interactive Web", "WebGL Experience", "Creative Tech"],
    year: "2024",
    role: "Creative Developer & 3D Specialist",
    heroImage: "/assets/images/project7.1.png",
    thumbnail: "/assets/images/project7.1.png",
    overview: "An experimental interactive 3D web experience exploring physics shaders, particle distortion fields, and real-time lighting.",
    challenge: "Rendering high-fidelity 3D meshes and dynamic particle shaders directly in the browser while maintaining a consistent 60fps across mobile devices.",
    solution: "Created custom GLSL vertex and fragment shaders with Three.js, instanced mesh rendering, and adaptive level-of-detail (LOD) controls.",
    technologies: ["Three.js", "WebGL", "GLSL Shaders", "GSAP", "TypeScript"],
    gallery: [
      "/assets/images/project7.1.png",
    ],
    stats: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Shader Complexity", value: "4 Pass" },
      { label: "Bundle Size", value: "145 KB" }
    ],
    nextSlug: "ktown-cypher",
    prevSlug: "azizography",
  },
];

export const disciplines = [
  {
    id: "/ 01",
    title: "AI Orchestration & Intelligent Systems",
    description: "Deploying autonomous LLM agents, semantic vector search, dynamic function calling, and automated AI pipelines."
  },
  {
    id: "/ 02",
    title: "Backend Engineering & APIs",
    description: "Developing high-throughput microservices, robust RESTful & GraphQL endpoints, and optimized database architectures."
  },
  {
    id: "/ 03",
    title: "Interactive Web & Frontend",
    description: "Building responsive, high-performance web applications with modern component architecture and fluid states."
  },
  {
    id: "/ 04",
    title: "Mobile Apps (iOS & Android)",
    description: "Engineering native and cross-platform mobile apps with fluid gestures, offline caching, and native hardware integrations."
  },
  {
    id: "/ 05",
    title: "UI / UX & Product Design",
    description: "Architecting intuitive user interfaces, scalable design systems, and rapid interactive prototypes."
  },
  {
    id: "/ 06",
    title: "Security & Compliance",
    description: "Hardening data pipelines, enforcing zero-trust access controls, OAuth/JWT protocols, and privacy compliance."
  },
  {
    id: "/ 07",
    title: "Motion & 3D Interactive Web",
    description: "Breathing life into digital products with physics-driven kinetic timelines, WebGL shaders, and scroll-driven stories."
  }
];
