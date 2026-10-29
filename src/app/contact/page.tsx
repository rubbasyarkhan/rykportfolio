import type { Metadata } from 'next';
import ContactView from '@/components/views/ContactView';

export const metadata: Metadata = {
  title: "Contact & Collaboration — Let's Work Together",
  description:
    "Initiate a project, design consultation, or engineering collaboration with Rubbas Yar Khan. Available worldwide.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Rubbas Yar Khan | Let's Work Together",
    description:
      'Available worldwide for bespoke web development, creative UI/UX design, and frontend engineering.',
    url: 'https://rubbasyarkhan.netlify.app/contact',
    images: [
      {
        url: '/assets/images/og-card.png',
        width: 1200,
        height: 630,
        alt: 'Contact Rubbas Yar Khan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Rubbas Yar Khan | Let's Work Together",
    description:
      'Initiate a project or creative design consultation with Rubbas Yar Khan.',
    images: ['/assets/images/og-card.png'],
  },
};

export default function ContactPage() {
  return <ContactView />;
}
