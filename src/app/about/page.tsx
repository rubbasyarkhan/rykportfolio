'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
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
              I&apos;m a digital product designer and developer focused on
              creating interesting, functional experiences that feel human. My
              work lives at the intersection of structure and emotion — where
              clarity meets craft.
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-[#5E636E]">
              Over the years, I&apos;ve learned that good design isn&apos;t about
              being loud or super complex. It&apos;s about removing friction,
              respecting the user&apos;s attention, and letting ideas breathe.
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
    </div>
  );
}
