'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { projects, disciplines } from '@/data/projects';
import { TransitionLink } from '@/components/layout/PageTransition';

gsap.registerPlugin(ScrollTrigger);

export default function HomeView() {
  const homeRef = useRef<HTMLElement>(null);
  const slmmRef = useRef<HTMLDivElement>(null);
  const vdivRef = useRef<HTMLDivElement>(null);

  // Home scroll animation & section color changes
  useEffect(() => {
    const home = homeRef.current;
    const slmm = slmmRef.current;
    const vdiv = vdivRef.current;

    // Default theme to black on page load
    document.body.setAttribute('theme', 'black');

    const ctx = gsap.context(() => {
      // 1. Hero scroll scrub animation
      if (home && slmm && vdiv) {
        const isMobile = window.innerWidth < 768;
        const initialScale = isMobile ? 2.5 : 3.5;
        const lftShift = isMobile ? -8 : -15;
        const rgtShift = isMobile ? 8 : 15;

        gsap.set(vdiv, { '--clip': '100%' });
        gsap.set(slmm, { scale: initialScale });

        const lftRows = slmm.querySelectorAll('.lft');
        const rgtRows = slmm.querySelectorAll('.rgt');

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: home,
            start: 'top top',
            end: 'bottom bottom',
            scrub: isMobile ? 0.3 : 0.6,
          },
        });

        heroTl
          .fromTo(
            vdiv,
            { '--clip': '100%' },
            { '--clip': '0%', ease: 'none' },
            'hero'
          )
          .fromTo(
            slmm,
            { scale: initialScale },
            { scale: 1, ease: 'none' },
            'hero'
          );

        if (lftRows.length) {
          heroTl.fromTo(
            lftRows,
            { xPercent: 0 },
            { xPercent: lftShift, stagger: 0.03, ease: 'none' },
            'hero'
          );
        }

        if (rgtRows.length) {
          heroTl.fromTo(
            rgtRows,
            { xPercent: 0 },
            { xPercent: rgtShift, stagger: 0.03, ease: 'none' },
            'hero'
          );
        }
      }

      // 2. Color change triggers for body theme
      const sections = document.querySelectorAll('section[data-color]');
      sections.forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            const theme = sec.getAttribute('data-color');
            if (theme) document.body.setAttribute('theme', theme);
          },
          onEnterBack: () => {
            const theme = sec.getAttribute('data-color');
            if (theme) document.body.setAttribute('theme', theme);
          },
        });
      });

      // 3. Testimonial cards reveal
      const testimonialCards = document.querySelectorAll('.testimonial-card');
      testimonialCards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      });

      // 4. Discipline cards animation
      const cards = document.querySelectorAll('.discipline-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: (i % 2) * 0.1,
          ease: 'power3.out',
        });
      });
    });

    return () => ctx.revert();
  }, []);

  // Filter 4 selected works for the homepage grid
  const selectedSlugs = [
    'ktown-cypher',
    'carving-production-agency',
    'coffee-shop-mobile-app',
    'azizography',
  ];
  const selectedProjects = selectedSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <>
      {/* ---------------------------------------------------- */}
      {/* 1. HERO SECTION (EXPANDING CIRCLE MASK + DUAL MARQUEE) */}
      {/* ---------------------------------------------------- */}
      <section
        ref={homeRef}
        data-color="black"
        className="home w-full h-[140vh] relative font-sans"
      >
        <div className="w-full sticky left-0 top-0 h-screen overflow-hidden">
          {/* Expanding Circle Video/Image Mask Container */}
          <div
            ref={vdivRef}
            style={{ '--clip': '100%' } as React.CSSProperties}
            className="z-[3] vdiv w-full h-screen absolute top-0 left-0 overflow-hidden"
          >
            {/* Full Background Image */}
            <div className="w-full h-full absolute top-0 left-0 bg-[#13161B]">
              <Image
                src="/assets/images/herobg1.png"
                alt="Rubbas Yar Khan - Creative Developer & UI/UX Designer Hero Portrait"
                fill
                priority
                className="w-full h-full object-cover object-[center_25%] md:object-center grayscale-[0.2] contrast-110"
              />
            </div>

            {/* Hero Text Overlay at Bottom */}
            <div className="absolute bottom-0 left-0 w-full px-5 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-end text-white z-10 gap-6">
              <div className="flex items-start">
                <h1 className="text-[clamp(3.2rem,9.5vw,8.5rem)] leading-[0.85] font-black tracking-tighter uppercase font-sans">
                  Rubbas
                  <br />
                  Y.khan
                </h1>
              </div>

              <div className="mt-2 md:mt-0 max-w-xs sm:max-w-sm text-base sm:text-lg text-left md:text-right font-sans">
                <h3 className="font-bold uppercase mb-2 tracking-wider text-white text-sm sm:text-base">
                  Creative UI/UX Designer &amp; Developer
                </h3>
                <p className="leading-relaxed opacity-90 text-xs sm:text-sm">
                  I Design. I Build. I{' '}
                  <span className="italic font-bold text-[#F5B942]">
                    Obsess
                  </span>{' '}
                  over details most people miss.
                </p>
              </div>
            </div>
          </div>

          {/* Marquee Background Container (Underneath Mask) */}
          <div
            className="marqueescontainer w-full h-screen relative overflow-hidden flex items-center justify-center bg-[#0B0D10] text-[#E6E6E6]"
          >
            {/* Floating Headline */}
            <div className="heading text-center absolute bottom-7 sm:bottom-9 md:bottom-12 left-1/2 -translate-x-1/2 z-[2] w-full px-4 pointer-events-none">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-semibold tracking-tight text-white font-sans">
                I make pixels{' '}
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold inline-block ml-1 text-[#F5B942] font-script">
                  behave
                </span>
                <span className="text-[#F5B942]">.</span>
              </h1>
              <h2 className="text-xs sm:text-sm md:text-base font-normal tracking-wide mt-1.5 sm:mt-2 text-[#D4D4D8] font-sans">
                Design-first mindset, developer-level execution.
              </h2>
            </div>

            {/* Marquee Rows Container (Positioned in top-middle) */}
            <div
              ref={slmmRef}
              className="slmm w-full scale-[1] absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2.5 sm:gap-3.5 md:gap-4 overflow-hidden pointer-events-none"
            >
              {/* ROW 1 (Left Scrolling) */}
              <div className="row lft w-full leading-none tracking-tight flex items-center gap-4 sm:gap-6 whitespace-nowrap min-w-max -translate-x-[25%]">
                {[...Array(6)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-script text-[#E6E6E6]">
                        innovative
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rotate-45 flex-shrink-0 bg-[#F5B942]" />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-serif text-[#E6E6E6]">
                        pixel-perfect
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rounded-full flex-shrink-0 bg-[#D9A737]" />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-sans font-bold text-[#E6E6E6]">
                        responsive
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] flex-shrink-0 bg-[#F5B942]"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-script text-[#E6E6E6]">
                        creative
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] bg-gradient-to-br from-green-400 to-teal-500 flex-shrink-0"
                        style={{
                          clipPath:
                            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-serif text-[#E6E6E6]">
                        modern
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] flex-shrink-0 bg-[#F5B942]" />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-sans font-bold text-[#E6E6E6]">
                        dynamic
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] bg-gradient-to-br from-purple-400 to-pink-500 rotate-45 flex-shrink-0"
                        style={{
                          clipPath:
                            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        }}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* ROW 2 (Right Scrolling) */}
              <div className="row rgt w-full leading-none tracking-tight flex items-center gap-4 sm:gap-6 whitespace-nowrap min-w-max -translate-x-[40%]">
                {[...Array(6)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-sans font-bold text-[#E6E6E6]">
                        visionary
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rounded-full flex-shrink-0 bg-[#F5B942]" />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-script text-[#E6E6E6]">
                        elegant
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rotate-45 flex-shrink-0 bg-[#D9A737]"
                        style={{
                          clipPath:
                            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-serif text-[#E6E6E6]">
                        scalable
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] flex-shrink-0 bg-[#F5B942]"
                        style={{
                          clipPath:
                            'polygon(50% 0%, 100% 100%, 0% 100%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-sans font-bold text-[#E6E6E6]">
                        professional
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] flex-shrink-0 bg-[#D9A737]" />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-script text-[#E6E6E6]">
                        cutting-edge
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] bg-gradient-to-br from-violet-400 to-purple-600 flex-shrink-0"
                        style={{
                          clipPath:
                            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-serif text-[#E6E6E6]">
                        seamless
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rounded-full flex-shrink-0 bg-[#D9A737]" />
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* ROW 3 (Left Scrolling) */}
              <div className="row lft w-full leading-none tracking-tight flex items-center gap-4 sm:gap-6 whitespace-nowrap min-w-max -translate-x-[30%]">
                {[...Array(6)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-serif text-[#E6E6E6]">
                        bold
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rotate-45 flex-shrink-0 bg-[#F5B942]" />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-sans font-bold text-[#E6E6E6]">
                        stunning
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] bg-gradient-to-br from-sky-400 to-cyan-600 flex-shrink-0"
                        style={{
                          clipPath:
                            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-script text-[#E6E6E6]">
                        interactive
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] flex-shrink-0 bg-[#F5B942]"
                        style={{
                          clipPath:
                            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-serif text-[#E6E6E6]">
                        polished
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rounded-full flex-shrink-0 bg-[#D9A737]" />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-sans font-bold text-[#E6E6E6]">
                        refined
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] flex-shrink-0 bg-[#F5B942]"
                        style={{
                          clipPath:
                            'polygon(50% 0%, 100% 100%, 0% 100%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-script text-[#E6E6E6]">
                        immersive
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] bg-gradient-to-br from-yellow-400 to-amber-600 flex-shrink-0"
                        style={{
                          clipPath:
                            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        }}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* ROW 4 (Right Scrolling) */}
              <div className="row rgt w-full leading-none tracking-tight flex items-center gap-4 sm:gap-6 whitespace-nowrap min-w-max -translate-x-[35%]">
                {[...Array(6)].map((_, i) => (
                  <React.Fragment key={i}>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-sans font-bold text-[#E6E6E6]">
                        exceptional
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] flex-shrink-0 bg-[#F5B942]" />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-script text-[#E6E6E6]">
                        user-focused
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rounded-full flex-shrink-0 bg-[#D9A737]" />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-serif text-[#E6E6E6]">
                        transformative
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rotate-45 flex-shrink-0 bg-[#F5B942]"
                        style={{
                          clipPath:
                            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-sans font-bold text-[#E6E6E6]">
                        sophisticated
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] flex-shrink-0 bg-[#D9A737]"
                        style={{
                          clipPath:
                            'polygon(50% 0%, 100% 100%, 0% 100%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-script text-[#E6E6E6]">
                        impactful
                      </span>
                      <div
                        className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] bg-gradient-to-br from-red-400 to-pink-600 flex-shrink-0"
                        style={{
                          clipPath:
                            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                        }}
                      />
                    </div>
                    <div className="elem flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
                      <span className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-serif text-[#E6E6E6]">
                        memorable
                      </span>
                      <div className="w-[clamp(1.1rem,2vw,1.8rem)] h-[clamp(1.1rem,2vw,1.8rem)] rounded-full flex-shrink-0 bg-[#D9A737]" />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. SELECTED WORK SECTION */}
      {/* ---------------------------------------------------- */}
      <section
        data-color="white"
        className="py-20 md:py-28 px-5 sm:px-8 md:px-12 font-sans bg-[#F1EFEB] text-[#0B0D10]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-20 gap-6 md:gap-8">
            <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-black tracking-tighter leading-[0.85] uppercase">
              Selected
              <br />
              Work
            </h2>
            <div className="max-w-xs sm:max-w-sm">
              <p className="text-xs sm:text-sm uppercase tracking-widest leading-relaxed font-semibold opacity-75">
                I am a UI/UX designer and developer specializing in high-end
                website development, user-centric design, and custom digital
                solutions tailored to elevate your brand in the modern digital
                landscape.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {selectedProjects.map((project) => (
              <TransitionLink
                key={project!.slug}
                href={`/projects/${project!.slug}`}
                className="project-card group cursor-pointer block"
              >
                <div className="aspect-[16/10] overflow-hidden mb-5 bg-zinc-900 rounded-sm relative">
                  <Image
                    src={project!.thumbnail}
                    alt={`${project!.title} - ${project!.labels.join(', ')} Case Study by Rubbas Yar Khan`}
                    fill
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div className="border-t border-black/15 pt-4">
                  <div className="flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-zinc-900">
                    <span className="group-hover:text-zinc-600 transition-colors">
                      {project!.title}
                    </span>
                    <span className="text-zinc-500 font-mono text-xs">{project!.id}</span>
                  </div>

                  {/* Labels below the project name */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-2 text-xs sm:text-sm font-sans font-medium text-zinc-600">
                    {project!.labels.map((lbl, i) => (
                      <span key={lbl} className="inline-flex items-center gap-2.5">
                        {i > 0 && <span className="text-zinc-400 select-none">•</span>}
                        <span className="group-hover:text-zinc-900 transition-colors">{lbl}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>

          <div className="mt-14 text-center">
            <TransitionLink
              href="/work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-900 text-zinc-900 font-bold uppercase text-xs tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all duration-300"
            >
              <span>View All 7 Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </TransitionLink>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. TESTIMONIAL SECTION: CLIENT ENDORSEMENT & TRUST */}
      {/* ---------------------------------------------------- */}
      <section
        data-color="white"
        className="testimonial-section w-full px-5 sm:px-8 md:px-12 py-20 sm:py-24 md:py-32 font-sans relative bg-[#F1EFEB]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-10 sm:mb-14 pb-4 border-b border-zinc-300 gap-3">
            <div className="flex items-baseline gap-3">
              <h2 className="text-[clamp(2.4rem,6vw,5rem)] font-black tracking-tighter leading-none uppercase text-[#0B0D10]">
                Client Trust
              </h2>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500 font-bold hidden md:inline">
                // PRODUCTION LAUNCH • SOCIAL PROOF
              </span>
            </div>
          </div>

          {/* Testimonial Showcase Cards Container */}
          <div className="flex flex-col gap-10 sm:gap-14">
            {/* 1. Adnan Taal (K-Town Cypher) */}
            <div className="testimonial-card relative z-[45] bg-white border border-[#E5E2DC] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                {/* Left: Client Portrait (Adnan Taal) */}
                <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 min-h-[380px] sm:min-h-[440px]">
                  <Image
                    src="/assets/images/adnan taal.jpeg"
                    alt="Adnan Taal - K-Town Cypher Project Lead & Client Testimonial for Rubbas Yar Khan"
                    fill
                    className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Right: Endorsement Quote & Project Specs */}
                <div className="lg:col-span-7 flex flex-col justify-between py-2 sm:py-4">
                  <div className="my-auto py-6 sm:py-8">
                    <div className="text-4xl sm:text-5xl font-serif text-[#F4B946]/50 leading-none select-none -mb-3">
                      &ldquo;
                    </div>
                    <blockquote className="text-lg sm:text-xl lg:text-[1.65rem] font-medium text-zinc-900 leading-relaxed tracking-tight font-sans">
                      I’m really happy with the work you’ve done on the{' '}
                      <a
                        href="https://ktowncypher.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-900 font-bold underline decoration-[#F4B946] decoration-2 underline-offset-4 hover:text-[#D99A1E] transition-colors"
                      >
                        K-Town Cypher website
                      </a>
                      . You did an amazing job bringing the whole concept and
                      vision of K-Town Cypher to life. I’m genuinely very satisfied
                      with the final result and really appreciate your{' '}
                      <span className="text-[#B8810E] font-bold">
                        effort and creativity
                      </span>{' '}
                      throughout the process.
                    </blockquote>
                  </div>

                  <div className="pt-6 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 flex-1">
                      <div>
                        <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono font-semibold block mb-1">
                          Client
                        </span>
                        <span className="text-base sm:text-lg font-normal text-zinc-900 font-sans tracking-tight block">
                          Adnan Taal
                        </span>
                        <span className="text-xs text-zinc-500 font-sans block mt-0.5">
                          Founder • Director
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono font-semibold block mb-1">
                          Scope
                        </span>
                        <span className="text-base sm:text-lg font-normal text-zinc-700 font-sans tracking-tight block">
                          Digital Brand &amp; Web
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono font-semibold block mb-1">
                          Movement
                        </span>
                        <span className="text-base sm:text-lg font-normal text-[#B8810E] font-sans tracking-tight block">
                          Street Hip-Hop
                        </span>
                      </div>
                    </div>

                    {/* Awwwards-style Tilted Arrow Button to K-Town Cypher */}
                    <a
                      href="https://ktowncypher.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/arrow inline-flex items-center gap-3.5 px-6 sm:px-7 py-3.5 rounded-full bg-zinc-900 hover:bg-[#F5B942] text-white hover:text-zinc-950 transition-all duration-300 shadow-md hover:shadow-xl shrink-0 whitespace-nowrap cursor-pointer select-none self-start md:self-auto"
                      aria-label="Visit K-Town Cypher Website"
                    >
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider font-sans whitespace-nowrap">
                        Visit Website
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/15 group-hover/arrow:bg-black/15 flex items-center justify-center transition-colors duration-300 shrink-0">
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H7M17 7V17"
                          />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Faiq Aziz (Azizography Studio) */}
            <div className="testimonial-card relative z-[45] bg-white border border-[#E5E2DC] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                {/* Left: Client Portrait (Faiq Aziz) */}
                <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100 min-h-[380px] sm:min-h-[440px]">
                  <Image
                    src="/assets/images/faiq-aziz.jpeg"
                    alt="Faiq Aziz - Founder & Lead Photographer of Azizography Studio, Client Testimonial for Rubbas Yar Khan"
                    fill
                    className="object-cover object-[top] transition-transform duration-700 group-hover:scale-104"
                  />
                </div>

                {/* Right: Endorsement Quote & Project Specs */}
                <div className="lg:col-span-7 flex flex-col justify-between py-2 sm:py-4">
                  <div className="my-auto py-6 sm:py-8">
                    <div className="text-4xl sm:text-5xl font-serif text-[#F4B946]/50 leading-none select-none -mb-3">
                      &ldquo;
                    </div>
                    <blockquote className="text-lg sm:text-xl lg:text-[1.65rem] font-medium text-zinc-900 leading-relaxed tracking-tight font-sans">
                      Honestly, working with Rubbas on the{' '}
                      <a
                        href="hhttps://clicksbyazizography.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-900 font-bold underline decoration-[#F4B946] decoration-2 underline-offset-4 hover:text-[#D99A1E] transition-colors"
                      >
                        Azizography website
                      </a>{' '}
                      was an incredible experience. As a concert photographer, I needed a portfolio that felt just as fast, raw, and energetic as the live shows I shoot, without losing any photo quality. Rubbas totally understood the vision from day one. He brought so much creative energy to the table, and seeing how smoothly everything runs on the live site is amazing. Really appreciate the{' '}
                      <span className="text-[#B8810E] font-bold">
                        dedication and genuine craft
                      </span>{' '}
                      he put into every single detail.
                    </blockquote>
                  </div>

                  <div className="pt-6 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 flex-1">
                      <div>
                        <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono font-semibold block mb-1">
                          Client
                        </span>
                        <span className="text-base sm:text-lg font-normal text-zinc-900 font-sans tracking-tight block">
                          Faiq Aziz
                        </span>
                        <span className="text-xs text-zinc-500 font-sans block mt-0.5">
                          Founder • Lead Photographer
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono font-semibold block mb-1">
                          Scope
                        </span>
                        <span className="text-base sm:text-lg font-normal text-zinc-700 font-sans tracking-tight block">
                          Full-Stack &amp; Art Direction
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.2em] font-mono font-semibold block mb-1">
                          Movement
                        </span>
                        <span className="text-base sm:text-lg font-normal text-[#B8810E] font-sans tracking-tight block">
                          Tour Visuals
                        </span>
                      </div>
                    </div>

                    {/* Awwwards-style Tilted Arrow Button to Azizography */}
                    <a
                      href="hhttps://clicksbyazizography.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/arrow inline-flex items-center gap-3.5 px-6 sm:px-7 py-3.5 rounded-full bg-zinc-900 hover:bg-[#F5B942] text-white hover:text-zinc-950 transition-all duration-300 shadow-md hover:shadow-xl shrink-0 whitespace-nowrap cursor-pointer select-none self-start md:self-auto"
                      aria-label="Visit Azizography Website"
                    >
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider font-sans whitespace-nowrap">
                        Visit Website
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/15 group-hover/arrow:bg-black/15 flex items-center justify-center transition-colors duration-300 shrink-0">
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 17L17 7M17 7H7M17 7V17"
                          />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. ABOUT ME PREVIEW SECTION */}
      {/* ---------------------------------------------------- */}
      <section
        data-color="white"
        className="about-section w-full px-5 sm:px-8 md:px-12 py-20 sm:py-28 md:py-32 relative overflow-hidden bg-[#F1EFEB] text-[#0B0D10]"
      >
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16">
            <span className="text-xs uppercase tracking-[0.3em] font-bold mb-6 sm:mb-8 block text-[#5E636E]">
              ABOUT ME
            </span>

            <h2 className="text-[clamp(2rem,5vw,4.2rem)] font-black tracking-tighter leading-[1.1] mb-6 sm:mb-8 font-sans">
              HEY, I&apos;M <span className="text-[#F5B942]">RUBBAS</span>.
              <br />
              I DESIGN INTERFACES &amp;
              <br />
              BUILD DIGITAL PRODUCTS
            </h2>

            <div className="mt-8 sm:mt-12">
              <TransitionLink
                href="/contact"
                className="inline-block px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 bg-[#F5B942] text-[#0B0D10] shadow-md hover:shadow-xl"
              >
                Let’s Work Together
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. WHAT I DO SECTION - 7 CORE DISCIPLINES */}
      {/* ---------------------------------------------------- */}
      <section
        data-color="black"
        className="skills-section what-i-do-section w-full px-5 sm:px-8 md:px-12 py-24 sm:py-32 md:py-40 font-sans relative overflow-hidden bg-[#0B0D10] text-white"
      >
        {/* Subtle Ambient Backlight */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(245, 185, 66, 0.04) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Editorial Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-24 pb-8 border-b border-white/10 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#F5B942] font-bold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B942] animate-ping" />
                <span>[ 03 // DISCIPLINE &amp; SERVICES ]</span>
              </div>
              <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-black tracking-tighter leading-[0.88] uppercase text-white font-sans">
                What I Do
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-xs sm:text-sm uppercase tracking-widest leading-relaxed text-zinc-400 font-medium">
                Bridging cutting-edge art direction, modern full-stack
                engineering, and fluid micro-interactions to build memorable
                digital products.
              </p>
            </div>
          </div>

          {/* Core Disciplines Ranked by Market Demand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 sm:gap-y-12 border-t border-white/10 pt-10">
            {disciplines.map((item, idx) => (
              <div
                key={item.id}
                className={`discipline-card group py-6 sm:py-8 border-b border-white/10 relative transition-colors duration-300 ${idx === 6 ? 'md:col-span-2' : ''
                  }`}
              >
                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-white/10 group-hover:bg-[#F5B942] transition-colors duration-300" />
                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="text-xs sm:text-sm font-mono text-zinc-500 font-bold tracking-widest pt-1 group-hover:text-[#F5B942] transition-colors duration-300">
                    {item.id}
                  </span>
                  <div className={`flex-1 ${idx === 6 ? 'max-w-2xl' : ''}`}>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase text-white tracking-tight leading-snug group-hover:text-[#F5B942] transition-colors duration-300 font-sans">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------- */}
          {/* 6. INFINITE TYPOGRAPHY MARQUEE RIBBON */}
          {/* ---------------------------------------------------- */}
          <div className="w-full overflow-hidden mt-20 sm:mt-28 py-6 border-y border-white/10">
            <div className="tech-marquee-track flex items-center gap-10 whitespace-nowrap select-none animate-marquee">
              <div className="flex items-center gap-10 text-[clamp(1.2rem,2.8vw,2.2rem)] font-black uppercase tracking-tight text-zinc-500 font-sans">
                <span className="hover:text-white transition-colors">
                  UI/UX Design
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Creative Frontend
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  GSAP Animations
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Three.js &amp; 3D
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Design Systems
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Digital Branding
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Tailwind CSS
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Micro-Interactions
                </span>
                <span className="text-[#F5B942]">&bull;</span>
              </div>

              {/* Duplicate track for seamless infinite loop */}
              <div
                className="flex items-center gap-10 text-[clamp(1.2rem,2.8vw,2.2rem)] font-black uppercase tracking-tight text-zinc-500 font-sans"
                aria-hidden="true"
              >
                <span className="hover:text-white transition-colors">
                  UI/UX Design
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Creative Frontend
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  GSAP Animations
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Three.js &amp; 3D
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Design Systems
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Digital Branding
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Tailwind CSS
                </span>
                <span className="text-[#F5B942]">&bull;</span>
                <span className="hover:text-white transition-colors">
                  Micro-Interactions
                </span>
                <span className="text-[#F5B942]">&bull;</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
