import type { Metadata } from 'next';
import HomeView from '@/components/views/HomeView';

export const metadata: Metadata = {
  title: {
    absolute: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
  },
  description:
    'Portfolio of Rubbas Yar Khan (RUBBAS .YK) — Creative Developer & UI/UX Designer crafting bespoke digital experiences, web animations, and design systems.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    description:
      'Bespoke digital experiences, high-performance web animations, and UI/UX design by Rubbas Yar Khan.',
    url: 'https://rubbasyarkhan.netlify.app',
    siteName: 'Rubbas Yar Khan Portfolio',
    images: [
      {
        url: '/assets/images/og-card.png',
        width: 1200,
        height: 630,
        alt: 'Rubbas Yar Khan — Creative Developer & UI/UX Designer Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    description:
      'Bespoke digital experiences, high-performance web animations, and UI/UX design by Rubbas Yar Khan.',
    images: ['/assets/images/og-card.png'],
    creator: '@rubbasyarkhan',
  },
};

export default function HomePage() {
  return <HomeView />;
}
