import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import { TransitionLink } from '@/components/layout/PageTransition';

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    return {
      title: 'Project Not Found | Rubbas Yar Khan',
    };
  }

  const siteUrl = 'https://rubbasyarkhan.netlify.app';
  const pageUrl = `${siteUrl}/projects/${project.slug}`;
  const heroImageUrl = project.heroImage.startsWith('http')
    ? project.heroImage
    : `${siteUrl}${project.heroImage}`;

  return {
    title: project.title,
    description: project.overview,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: 'article',
      url: pageUrl,
      title: `${project.title} — Case Study | Rubbas Yar Khan`,
      description: project.overview,
      siteName: 'Rubbas Yar Khan Portfolio',
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} — Case Study by Rubbas Yar Khan`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Case Study | Rubbas Yar Khan`,
      description: project.overview,
      images: [heroImageUrl],
      creator: '@rubbasyarkhan',
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const siteUrl = 'https://rubbasyarkhan.netlify.app';
  const pageUrl = `${siteUrl}/projects/${project.slug}`;
  const heroImageUrl = project.heroImage.startsWith('http')
    ? project.heroImage
    : `${siteUrl}${project.heroImage}`;

  // Structured Data (Schema.org CreativeWork)
  const jsonLdCreativeWork = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: project.title,
    name: project.title,
    description: project.overview,
    image: heroImageUrl,
    url: pageUrl,
    creator: {
      '@type': 'Person',
      name: 'Rubbas Yar Khan',
      url: siteUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Rubbas Yar Khan',
    },
    genre: project.category,
    keywords: [...project.labels, ...project.technologies].join(', '),
  };

  // Find next and previous projects
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject =
    project.nextSlug
      ? projects.find((p) => p.slug === project.nextSlug)
      : projects[(currentIndex + 1) % projects.length];
  const prevProject =
    project.prevSlug
      ? projects.find((p) => p.slug === project.prevSlug)
      : projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCreativeWork) }}
      />
      <div className="w-full bg-[#F1EFEB] text-[#0B0D10] font-sans transition-colors duration-500">
        {/* ---------------------------------------------------- */}
        {/* 1. PROJECT HEADER */}
        {/* ---------------------------------------------------- */}
        <section
          data-color="white"
          className="pt-28 sm:pt-36 px-5 sm:px-8 md:px-12 mb-12 sm:mb-16"
        >
          <div className="max-w-7xl mx-auto">
            {/* Back to Work Link */}
            <TransitionLink
              href="/work"
              className="inline-flex items-center gap-2 mb-8 sm:mb-12 group transition-all duration-300 text-black hover:text-zinc-600"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5" />
              <span className="text-xs sm:text-sm uppercase tracking-widest font-semibold font-mono">
                Back to Work
              </span>
            </TransitionLink>

            {/* Project Title & Overview */}
            <div className="mb-10 sm:mb-12">
              <h1 className="text-[clamp(2.5rem,7.5vw,6rem)] font-black tracking-tighter leading-[0.9] uppercase mb-6 text-black font-sans">
                {project.title}
              </h1>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-zinc-600 max-w-4xl leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Project Meta Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-6 sm:py-8 border-t border-b border-zinc-300">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] mb-2 sm:mb-3 font-bold text-zinc-400 font-mono">
                  PROJECT TYPE
                </h3>
                <p className="text-base sm:text-lg font-semibold text-black font-sans">
                  {project.category}
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] mb-2 sm:mb-3 font-bold text-zinc-400 font-mono">
                  ROLE
                </h3>
                <p className="text-base sm:text-lg font-semibold text-black font-sans">
                  {project.role || 'Full-Stack Development & Design'}
                </p>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] mb-2 sm:mb-3 font-bold text-zinc-400 font-mono">
                  PLATFORM
                </h3>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-base sm:text-lg font-semibold text-[#D99A1E] hover:underline font-sans"
                  >
                    <span>View Live Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-base sm:text-lg font-semibold text-zinc-500 font-sans">
                    Concept / Digital Experience
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 2. HERO IMAGE */}
        {/* ---------------------------------------------------- */}
        <section data-color="white" className="px-5 sm:px-8 md:px-12 mb-16 sm:mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="aspect-[16/10] sm:aspect-[21/9] overflow-hidden rounded-lg bg-zinc-900 relative shadow-xl">
              <Image
                src={project.heroImage}
                alt={`${project.title} - Case Study Hero by Rubbas Yar Khan`}
                fill
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 3. THE CHALLENGE & THE SOLUTION */}
        {/* ---------------------------------------------------- */}
        <section data-color="white" className="px-5 sm:px-8 md:px-12 mb-16 sm:mb-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
              <div className="p-6 sm:p-8 rounded-2xl bg-white/70 border border-zinc-200 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase tracking-tight text-black font-sans flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5B942]" />
                  THE CHALLENGE
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-700">
                  {project.challenge}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-white/70 border border-zinc-200 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase tracking-tight text-black font-sans flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F5B942]" />
                  THE SOLUTION
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-zinc-700">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Project Stats (if available) */}
            {project.stats && project.stats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 border-t border-zinc-300 pt-8">
                {project.stats.map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <span className="text-2xl sm:text-3xl font-black text-black font-sans block">
                      {stat.value}
                    </span>
                    <span className="text-xs uppercase font-mono tracking-widest text-zinc-500">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 4. INTERFACE SHOWCASE GALLERY */}
        {/* ---------------------------------------------------- */}
        {project.gallery && project.gallery.length > 0 && (
          <section data-color="white" className="px-5 sm:px-8 md:px-12 mb-16 sm:mb-24">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 uppercase tracking-tight text-black text-center font-sans">
                Interface Showcase
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((imgUrl, idx) => {
                  const isFirst = idx === 0;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl overflow-hidden bg-zinc-900 group relative border border-zinc-200 shadow-md ${
                        isFirst
                          ? 'md:col-span-2 aspect-[16/10] sm:aspect-[21/9]'
                          : 'aspect-[4/3] sm:aspect-[16/10]'
                      }`}
                    >
                      <Image
                        src={imgUrl}
                        alt={`${project.title} - Visual Showcase & Interface Details Screen ${idx + 1}`}
                        fill
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ---------------------------------------------------- */}
        {/* 5. TECHNOLOGIES USED */}
        {/* ---------------------------------------------------- */}
        <section data-color="white" className="px-5 sm:px-8 md:px-12 mb-16 sm:mb-24 py-10 sm:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 uppercase tracking-tight text-black text-center font-sans">
              Technologies Used
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="p-4 sm:p-5 bg-white rounded-xl border border-zinc-200 shadow-sm transition-transform hover:-translate-y-1"
                >
                  <p className="text-sm sm:text-base font-semibold text-black font-sans">
                    {tech}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 6. NEXT PROJECT FOOTER LINK */}
        {/* ---------------------------------------------------- */}
        {nextProject && (
          <section
            data-color="black"
            className="px-5 sm:px-8 md:px-12 py-16 sm:py-24 bg-[#0B0D10] text-white"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F5B942] font-bold">
                  [ UP NEXT ]
                </span>
                <span className="text-2xl sm:text-3xl uppercase tracking-[0.3em] font-bold text-zinc-500 font-mono">
                  {nextProject.id}
                </span>
              </div>

              <TransitionLink
                href={`/projects/${nextProject.slug}`}
                className="group block"
              >
                <div className="aspect-[16/10] md:aspect-[21/9] overflow-hidden mb-6 bg-zinc-900 rounded-lg relative">
                  <Image
                    src={nextProject.thumbnail}
                    alt={`${nextProject.title} - Case Study by Rubbas Yar Khan`}
                    fill
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                      {nextProject.category}
                    </span>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white group-hover:text-[#F5B942] transition-colors font-sans">
                      {nextProject.title}
                    </h3>
                  </div>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/10 group-hover:bg-[#F5B942] group-hover:text-black flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </TransitionLink>

              {prevProject && (
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono">
                  <TransitionLink
                    href={`/projects/${prevProject.slug}`}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous: {prevProject.title}</span>
                  </TransitionLink>
                  <TransitionLink
                    href="/work"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    All Projects
                  </TransitionLink>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
