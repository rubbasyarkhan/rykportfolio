'use client';

import React, { useEffect } from 'react';
import { TransitionLink } from '@/components/layout/PageTransition';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function NotFound() {
  useEffect(() => {
    document.body.setAttribute('theme', 'black');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.not-found-elem',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col justify-center px-5 sm:px-8 md:px-[5%] pt-36 pb-24 font-sans bg-[#0B0D10] text-white">
      <div className="max-w-6xl mx-auto w-full">
        {/* Status Badge */}
        <div className="not-found-elem mb-6 flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-40 text-white">
            404
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5B942]" />
          <span className="text-xs font-mono uppercase tracking-[0.3em] opacity-40 text-white">
            PAGE NOT FOUND
          </span>
        </div>

        {/* Main 404 Display */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pb-12 border-b border-white/10">
          <div className="max-w-3xl not-found-elem">
            <h1 className="text-[clamp(3.8rem,11vw,9.5rem)] font-black tracking-tighter leading-[0.88] uppercase text-white font-sans">
              PAGE NOT
              <br />
              <span className="text-[#F5B942]">FOUND</span>
            </h1>
          </div>

          <div className="max-w-sm lg:mb-2 not-found-elem">
            <p className="text-xs sm:text-sm uppercase tracking-widest leading-relaxed font-semibold opacity-60 text-white">
              The page you are looking for does not exist, has been relocated, or the link is broken.
            </p>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="not-found-elem pt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          <TransitionLink
            href="/"
            className="group inline-flex items-center gap-3 px-8 sm:px-9 py-4 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] rounded-full transition-all duration-300 hover:bg-[#F5B942] hover:text-black hover:scale-105 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Return Home</span>
          </TransitionLink>

          <TransitionLink
            href="/work"
            className="group inline-flex items-center gap-3 px-8 sm:px-9 py-4 border border-white/20 text-white font-bold uppercase text-xs tracking-[0.2em] rounded-full transition-all duration-300 hover:border-white hover:bg-white/10 hover:text-white"
          >
            <span>Explore Work</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
