import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://rubbasyarkhan.com'),
  title: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
  description:
    'Portfolio of Rubbas Yar Khan — Creative Developer & Designer specializing in modern web experiences, high-performance animations, and digital interfaces.',
  icons: {
    icon: '/assets/favicon.svg',
  },
  openGraph: {
    title: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    description:
      'Portfolio of Rubbas Yar Khan — Creative Developer & Designer specializing in modern web experiences, high-performance animations, and digital interfaces.',
    url: 'https://rubbasyarkhan.com',
    siteName: 'Rubbas Yar Khan Portfolio',
    images: [
      {
        url: '/assets/images/herobg1.png',
        width: 1200,
        height: 630,
        alt: 'Rubbas Yar Khan Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rubbas Yar Khan | Creative Developer & UI/UX Designer',
    description:
      'Portfolio of Rubbas Yar Khan — Creative Developer & Designer specializing in modern web experiences, high-performance animations, and digital interfaces.',
    images: ['/assets/images/herobg1.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${playfair.variable} ${allura.variable} ${poppins.variable}`}
    >
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
