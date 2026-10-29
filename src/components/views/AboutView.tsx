'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Award, BookOpen, Globe2 } from 'lucide-react';
import { TransitionLink } from '@/components/layout/PageTransition';

gsap.registerPlugin(ScrollTrigger);

export default function AboutView() {
  useEffect(() => {
    document.body.setAttribute('theme', 'white');

    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        '.about-heading',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.about-content',
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.2 }
      );

      // Quote animation
      gsap.fromTo(
        '.quote-text',
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.quote-section',
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.quote-author',
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.quote-section',
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
        }
      );

      // Statement reveal
      gsap.fromTo(
        '.statement-p',
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.about-statement-section',
            start: 'top 80%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Press & Backlinks section reveal
      gsap.fromTo(
        '.press-card',
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.about-press-section',
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#F1EFEB] text-[#0B0D10] font-sans transition-colors duration-500">
      {/* ---------------------------------------------------- */}
      {/* 1. HERO / EDITORIAL BIO */}
      {/* ---------------------------------------------------- */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-[5%] py-20 sm:py-24 pt-28 sm:pt-36">
        <section
          data-color="white"
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20 md:mb-32"
        >
          {/* Left: ABOUT ME Heading */}
          <div className="about-heading">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F5B942] font-bold block mb-3">
              [ AUTHOR BIO &amp; PROFILE ]
            </span>
            <h1 className="text-[clamp(3rem,8vw,6.5rem)] font-black tracking-tighter leading-[0.85] uppercase font-sans">
              About <br />
              Me
            </h1>
          </div>

          {/* Right: Editorial Bio */}
          <div className="space-y-6 sm:space-y-8 about-content">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight font-sans text-[#0B0D10]">
              I design with intention,
              <br />
              not noise.
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-[#5E636E]">
              I&apos;m Rubbas Yar Khan (RUBBAS .YK) — a digital product designer and creative developer focused on
              creating bespoke, high-performance web experiences that feel human and tactile. My
              work lives at the intersection of structural engineering and emotional resonance — where
              clean typography meets 60fps motion.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-[#5E636E]">
              Over the years, I&apos;ve learned that good design isn&apos;t about
              being loud or unnecessarily complex. It&apos;s about removing friction,
              respecting the user&apos;s attention, and letting ideas breathe with purpose.
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 2. PHILOSOPHY & QUOTE SECTION */}
        {/* ---------------------------------------------------- */}
        <section
          data-color="white"
          className="py-16 sm:py-24 md:py-28 mb-12 sm:mb-20 border-t border-zinc-300"
        >
          <div className="quote-section max-w-4xl">
            <blockquote className="space-y-6">
              <p className="quote-text text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold leading-[1.2] tracking-tight text-[#0B0D10] font-sans">
                &ldquo;Good design is as little design as possible.&rdquo;
              </p>
              <footer className="quote-author text-base sm:text-lg text-[#5E636E]">
                — Dieter Rams, Industrial Designer
              </footer>
            </blockquote>
          </div>
        </section>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. CENTERED EDITORIAL STATEMENT */}
      {/* ---------------------------------------------------- */}
      <section
        data-color="white"
        className="about-statement-section w-full px-5 sm:px-8 md:px-[6%] py-16 sm:py-24 md:py-32 border-t border-zinc-300 font-sans"
      >
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="statement-p text-lg sm:text-xl md:text-2xl leading-relaxed text-[#0B0D10] font-sans font-medium tracking-tight">
            I build digital products that marry thoughtful aesthetic rigor with bulletproof engineering. Whether architecting real-time mobile platforms, fluid web experiences, or intuitive design systems, my focus is always on clarity, performance, and genuine human craft.
          </p>

          <p className="statement-p text-base sm:text-lg md:text-xl leading-relaxed text-[#5E636E] font-sans">
            Based in Karachi and collaborating globally, I partner with forward-thinking brands, founders, and creative studios to transform ambitious ideas into memorable, responsive digital experiences that resonate and scale.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. PRESS, THOUGHT LEADERSHIP & BACKLINK AUTHORITY */}
      {/* ---------------------------------------------------- */}
      <section
        data-color="white"
        className="about-press-section w-full px-5 sm:px-8 md:px-[6%] py-16 sm:py-24 md:py-28 border-t border-zinc-300 font-sans bg-white/40"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#F5B942] font-bold block mb-2">
                [ RECOGNITION &amp; THOUGHT LEADERSHIP ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#0B0D10]">
                Press &amp; Publications
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5E636E] font-mono uppercase tracking-wider max-w-sm">
              Featured insights on UI/UX engineering, modern web performance, and creative development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Press Card 1: Forbes & Tech Media */}
            <div className="press-card bg-[#F1EFEB] p-6 sm:p-8 rounded-lg border border-black/10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5 font-bold text-zinc-900">
                    <BookOpen className="w-4 h-4 text-[#F5B942]" />
                    Forbes Tech Insights
                  </span>
                  <span>Featured</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B0D10] tracking-tight mb-2">
                  Micro-Interactions &amp; Physics-Based Web Animations
                </h3>
                <p className="text-xs sm:text-sm text-[#5E636E] leading-relaxed">
                  Contributed perspectives on why 60fps web animation and tactile responsiveness dramatically elevate digital brand retention in modern e-commerce and creative platforms.
                </p>
              </div>
              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider font-semibold text-zinc-800">
                <span>Editorial Perspective</span>
                <Globe2 className="w-4 h-4 text-zinc-500" />
              </div>
            </div>

            {/* Press Card 2: Design Awards & Recognition */}
            <div className="press-card bg-[#F1EFEB] p-6 sm:p-8 rounded-lg border border-black/10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5 font-bold text-zinc-900">
                    <Award className="w-4 h-4 text-[#F5B942]" />
                    Design Awards
                  </span>
                  <span>Excellence</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B0D10] tracking-tight mb-2">
                  Awwwards &amp; CSSDA Showcases
                </h3>
                <p className="text-xs sm:text-sm text-[#5E636E] leading-relaxed">
                  Curated showcases across international design platforms recognizing high-contrast typography, seamless clip-path scene transitions, and zero-jank scrolling.
                </p>
              </div>
              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider font-semibold text-zinc-800">
                <span>Creative Direction</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </div>
            </div>

            {/* Press Card 3: Open Source & Community */}
            <div className="press-card bg-[#F1EFEB] p-6 sm:p-8 rounded-lg border border-black/10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5 font-bold text-zinc-900">
                    <Globe2 className="w-4 h-4 text-[#F5B942]" />
                    Global Community
                  </span>
                  <span>Articles</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B0D10] tracking-tight mb-2">
                  Open Source Motion Tooling
                </h3>
                <p className="text-xs sm:text-sm text-[#5E636E] leading-relaxed">
                  Authoring modular Next.js animation boilerplates, custom cursor controllers, and accessible UI kits distributed freely to thousands of creative engineers worldwide.
                </p>
              </div>
              <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono uppercase tracking-wider font-semibold text-zinc-800">
                <span>Community Contribution</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
