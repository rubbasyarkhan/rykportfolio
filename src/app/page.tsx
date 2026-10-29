import type { Metadata } from 'next';
import HomeView from '@/components/views/HomeView';

export const metadata: Metadata = {
  title: {
    absolute: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
  },
  description:
    'Award-winning portfolio of Rubbas Yar Khan (RUBBAS .YK) — Creative Developer & UI/UX Designer specializing in bespoke digital experiences, high-performance web animations, interactive web products, and modern design systems.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    description:
      'Award-winning portfolio of Rubbas Yar Khan (RUBBAS .YK) — Creative Developer & UI/UX Designer specializing in bespoke digital experiences, high-performance web animations, and interactive design.',
    url: 'https://rubbasyarkhan.netlify.app',
    siteName: 'Rubbas Yar Khan Portfolio',
    images: [
      {
        url: '/assets/images/herobg1.png',
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
      'Award-winning portfolio of Rubbas Yar Khan — Creative Developer & UI/UX Designer specializing in bespoke digital experiences and interactive animations.',
    images: ['/assets/images/herobg1.png'],
    creator: '@rubbasyarkhan',
  },
};

export default function HomePage() {
  return <HomeView />;
}
