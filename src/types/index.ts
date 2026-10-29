export interface Project {
  slug: string;
  id: string; // e.g. "01"
  title: string;
  category: string;
  labels: string[]; // e.g. ["Website", "UI/UX Design", "WordPress"]
  year: string;
  client?: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  heroImage: string;
  thumbnail: string;
  overview: string;
  challenge: string;
  solution: string;
  technologies: string[];
  gallery: string[];
  stats?: { label: string; value: string }[];
  nextSlug?: string;
  prevSlug?: string;
}

export interface Discipline {
  id: string; // e.g. "/ 01"
  title: string;
  description: string;
}
