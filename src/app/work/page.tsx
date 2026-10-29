import type { Metadata } from 'next';
import WorkView from '@/components/views/WorkView';

export const metadata: Metadata = {
  title: 'Selected Works & Case Studies',
  description:
    'Explore 7 curated digital case studies across Web Development, UI/UX Design, and Interactive 3D by Rubbas Yar Khan.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Selected Works & Case Studies | Rubbas Yar Khan',
    description:
      'Curated case studies in high-performance web development and bespoke UI/UX design by Rubbas Yar Khan.',
    url: 'https://rubbasyarkhan.netlify.app/work',
    images: [
      {
        url: '/assets/images/og-card.png',
        width: 1200,
        height: 630,
        alt: 'Selected Works by Rubbas Yar Khan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selected Works & Case Studies | Rubbas Yar Khan',
    description:
      'Explore bespoke web design, interactive engineering, and UI/UX projects by Rubbas Yar Khan.',
    images: ['/assets/images/og-card.png'],
  },
};

export default function WorkPage() {
  return <WorkView />;
}
