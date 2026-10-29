import type { Metadata } from 'next';
import AboutView from '@/components/views/AboutView';

export const metadata: Metadata = {
  title: 'About Me & Thought Leadership',
  description:
    'Learn about Rubbas Yar Khan — design philosophy, technical disciplines, creative development background, and digital product strategy.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    description:
      'Digital product designer and creative developer creating bespoke, high-performance web experiences.',
    url: 'https://rubbasyarkhan.netlify.app/about',
    images: [
      {
        url: '/assets/images/og-card.png',
        width: 1200,
        height: 630,
        alt: 'About Rubbas Yar Khan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    description:
      'Digital product designer and creative developer creating bespoke, high-performance web experiences.',
    images: ['/assets/images/og-card.png'],
  },
};

export default function AboutPage() {
  return <AboutView />;
}
