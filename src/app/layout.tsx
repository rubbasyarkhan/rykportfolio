import type { Metadata } from 'next';
import Script from 'next/script';
import { Space_Grotesk, Playfair_Display, Allura, Poppins } from 'next/font/google';
import SmoothScroll from '@/components/interactive/SmoothScroll';
import CustomCursor from '@/components/interactive/CustomCursor';
import ChromaticCanvas from '@/components/interactive/ChromaticCanvas';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PageTransitionProvider } from '@/components/layout/PageTransition';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const allura = Allura({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-allura',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const siteUrl = 'https://rubbasyarkhan.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    template: '%s | Rubbas Yar Khan',
  },
  description:
    'Portfolio of Rubbas Yar Khan (RUBBAS .YK) — Creative Developer & UI/UX Designer crafting bespoke digital experiences, web animations, and design systems.',
  keywords: [
    'Rubbas Yar Khan',
    'RUBBAS .YK',
    'Creative Developer',
    'UI/UX Designer',
    'Frontend Developer',
    'Web Animation',
    'GSAP ScrollTrigger',
    'Next.js Portfolio',
    'Interactive 3D Web',
    'Product Designer',
    'Full-Stack Developer',
    'Bespoke Web Design',
    'Editorial Web Design',
  ],
  authors: [{ name: 'Rubbas Yar Khan', url: siteUrl }],
  creator: 'Rubbas Yar Khan',
  publisher: 'Rubbas Yar Khan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/favicon.svg',
    apple: '/assets/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Rubbas Yar Khan Portfolio',
    title: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    description:
      'Bespoke digital experiences, high-performance web animations, and UI/UX design by Rubbas Yar Khan.',
    images: [
      {
        url: '/assets/images/og-card.png',
        width: 1200,
        height: 630,
        alt: 'Rubbas Yar Khan — Creative Developer & UI/UX Designer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    description:
      'Bespoke digital experiences, high-performance web animations, and UI/UX design by Rubbas Yar Khan.',
    images: ['/assets/images/og-card.png'],
    creator: '@rubbasyarkhan',
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      'ygtRo14X-q0hvFEGZPfsIjmGp0pVJk1Pvoug_QPArSU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rubbas Yar Khan',
    alternateName: 'RUBBAS .YK',
    url: siteUrl,
    image: `${siteUrl}/assets/images/herobg1.png`,
    jobTitle: 'Creative Developer & UI/UX Designer',
    description:
      'Creative Developer and UI/UX Designer specializing in bespoke web experiences, interactive GSAP animations, and scalable digital interfaces.',
    sameAs: [
      'https://github.com/rubbasyarkhan',
      'https://www.linkedin.com/in/rubbas-yar-khan',
      'https://www.instagram.com/rubbas_yar_khan',
      'https://dribbble.com/rubbas',
      'https://pinterest.com/rubbasyarkhan',
    ],
    knowsAbout: [
      'UI/UX Design',
      'Frontend Development',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'GSAP Motion',
      'Interactive Web Design',
      'Three.js',
    ],
  };

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rubbas Yar Khan Portfolio',
    url: siteUrl,
    description:
      'Official portfolio of Rubbas Yar Khan — Creative Developer & UI/UX Designer.',
    author: {
      '@type': 'Person',
      name: 'Rubbas Yar Khan',
    },
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${playfair.variable} ${allura.variable} ${poppins.variable}`}
    >
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X4C6QXVWF3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X4C6QXVWF3');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#0B0D10] text-[#E6E6E6] selection:bg-[#F5B942] selection:text-[#0B0D10]">
        <SmoothScroll>
          <PageTransitionProvider>
            <CustomCursor />
            <ChromaticCanvas />
            <Navbar />
            <main className="main w-full">{children}</main>
            <Footer />
          </PageTransitionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
