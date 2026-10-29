'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TransitionLink } from './PageTransition';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';
  const footerRef = useRef<HTMLElement>(null);
  const nowBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const nowBtn = nowBtnRef.current;

      // CTA hover expansion (only for desktop devices with hover/pointer)
      if (!isContactPage && nowBtn && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const onEnter = () => {
          gsap.to(nowBtn, {
            paddingLeft: 80,
            paddingRight: 80,
            duration: 0.5,
            ease: 'expo.out',
          });
        };

        const onLeave = () => {
          gsap.to(nowBtn, {
            paddingLeft: 48,
            paddingRight: 48,
            duration: 0.5,
            ease: 'expo.out',
          });
        };

        nowBtn.addEventListener('mouseenter', onEnter);
        nowBtn.addEventListener('mouseleave', onLeave);

        return () => {
          nowBtn.removeEventListener('mouseenter', onEnter);
          nowBtn.removeEventListener('mouseleave', onLeave);
        };
      }

      // Footer Scroll Reveal
      const footerTl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
        },
      });

      if (!isContactPage) {
        const ctaHeadings = footer.querySelectorAll('.cta-area h1');
        if (ctaHeadings.length) {
          footerTl.from(ctaHeadings, {
            y: 80,
            opacity: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: 'power4.out',
          });
        }

        if (nowBtn) {
          footerTl.from(
            nowBtn,
            {
              y: 25,
              scale: 0.9,
              opacity: 0,
              duration: 0.7,
              ease: 'expo.out',
              clearProps: 'all',
            },
            '-=0.5'
          );
        }
      }

      const infoBlocks = footer.querySelectorAll('.footer-grid .info-block');
      if (infoBlocks.length) {
        footerTl.from(
          infoBlocks,
          {
            y: 25,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
          },
          isContactPage ? '+=0' : '-=0.4'
        );
      }
    }, footer);

    return () => ctx.revert();
  }, [isContactPage]);

  return (
    <footer
      ref={footerRef}
      data-color="black"
      className={`footer-section bg-black text-white w-full px-5 sm:px-8 md:px-[6%] border-t border-white/10 overflow-hidden ${
        isContactPage
          ? 'py-10 sm:py-14'
          : 'min-h-[75vh] md:min-h-screen py-10 sm:py-12 md:py-16 flex flex-col justify-between'
      }`}
    >
      {/* Top CTA Area (Hidden on Contact page to avoid redundant CTA loops) */}
      {!isContactPage && (
        <div className="cta-area flex flex-col items-end text-right">
          <div className="overflow-hidden">
            <h1 className="text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold tracking-tight leading-[0.9] font-machina uppercase text-white">
              LET’S
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold tracking-tight leading-[0.9] font-machina uppercase text-white">
              BUILD
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="text-[clamp(2.5rem,7.5vw,5.5rem)] font-extrabold tracking-tight leading-[0.9] font-machina uppercase text-white opacity-60">
              SOMETHING
            </h1>
          </div>

          <div className="flex justify-end mt-4 sm:mt-6">
            <div className="magnetic-wrap p-2 sm:p-4">
              <TransitionLink
                ref={nowBtnRef}
                href="/contact"
                className="now-btn group relative flex items-center justify-center border border-white/30 rounded-full px-8 sm:px-12 md:px-14 py-3 sm:py-4 backdrop-blur-md transition-all hover:border-white hover:bg-white hover:text-black"
              >
                <div className="masker relative h-[1.8rem] sm:h-[2.2rem] overflow-hidden pointer-events-none">
                  <span className="btn-text block text-xl sm:text-2xl font-bold italic tracking-widest uppercase">
                    START NOW
                  </span>
                  <span className="btn-text absolute left-0 top-0 block translate-y-full text-xl sm:text-2xl font-bold italic tracking-widest uppercase transition-transform group-hover:translate-y-0">
                    START NOW
                  </span>
                </div>
              </TransitionLink>
            </div>
          </div>
        </div>
      )}

      {/* Info Grid */}
      <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pt-8 border-t border-white/10 font-satoshi">
        {/* Col 1: Tagline & Video Preview */}
        <div className="info-block">
          <p className="text-sm sm:text-base font-medium leading-relaxed opacity-80 max-w-xs">
            Let&apos;s build something amazing together.
          </p>

          <div className="mt-4 w-full max-w-[160px] aspect-video rounded-lg overflow-hidden border border-white/10 relative">
            <video
              src="https://www.pexels.com/download/video/8818311/"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
        </div>

        {/* Col 2: Social Links */}
        <div className="info-block">
          <h4 className="text-[11px] uppercase tracking-[0.4em] opacity-40 mb-4 sm:mb-6 font-semibold font-mono">
            Social
          </h4>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:gap-y-4">
            <li>
              <a
                href="https://www.instagram.com/design_code_journey/"
                className="group flex items-center gap-1.5 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Instagram</span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/rubbasyarkhan"
                className="group flex items-center gap-1.5 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LinkedIn</span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/rubbasyarkhan"
                className="group flex items-center gap-1.5 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>GitHub</span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://dribbble.com/rubbas"
                className="group flex items-center gap-1.5 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Dribbble</span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://pinterest.com/rubbasyarkhan"
                className="group flex items-center gap-1.5 text-xs uppercase tracking-widest opacity-60 hover:opacity-100 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Pinterest</span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Contact Details */}
        <div className="info-block">
          <h4 className="text-[11px] uppercase tracking-[0.4em] opacity-40 mb-4 sm:mb-6 font-semibold font-mono">
            Contact
          </h4>
          <a
            href="mailto:rubbasyarkhan007@gmail.com"
            className="block text-xs tracking-widest opacity-60 hover:opacity-100 transition break-all font-mono"
          >
            rubbasyarkhan007@gmail.com
          </a>
          <p className="mt-3 text-xs tracking-widest opacity-60 font-mono">
            (+92) 371-029-0861
          </p>
        </div>

        {/* Col 4: Location */}
        <div className="info-block">
          <h4 className="text-[11px] uppercase tracking-[0.4em] opacity-40 mb-4 sm:mb-6 font-semibold font-mono">
            Location
          </h4>
          <p className="text-xs tracking-widest opacity-60 leading-relaxed font-mono">
            Karachi, Pakistan
            <br />
            Available Worldwide
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-6 border-t border-white/10 mt-8">
        <p className="text-xs opacity-40 tracking-wide font-mono">
          &copy; {new Date().getFullYear()} Rubbas Yar Khan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
