'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import { TransitionLink } from '@/components/layout/PageTransition';

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  useEffect(() => {
    document.body.setAttribute('theme', 'white');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-header-item',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.project-card-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 85%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#F1EFEB] text-[#0B0D10] min-h-screen font-sans transition-colors duration-500">
      <section
        data-color="white"
        className="py-24 sm:py-28 md:py-36 px-5 sm:px-8 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 gap-6 md:gap-8 pt-6 border-b border-black/10 pb-12">
            <h1 className="work-header-item text-[clamp(3rem,8vw,6.5rem)] font-black tracking-tighter leading-[0.85] uppercase font-sans">
              Selected
              <br />
              Work
            </h1>
            <div className="max-w-xs sm:max-w-sm work-header-item">
              <p className="text-xs sm:text-sm uppercase tracking-widest leading-relaxed font-semibold opacity-75 text-[#5E636E]">
                I am a UI/UX designer and developer specializing in high-end
                website development, user-centric design, and custom digital
                solutions tailored to elevate your brand in the modern digital
                landscape.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.map((project, idx) => {
              const isLastSingle =
                idx === projects.length - 1 &&
                projects.length % 2 !== 0;

              return (
                <TransitionLink
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`project-card-item project-card group cursor-pointer block ${
                    isLastSingle ? 'md:col-span-2' : ''
                  }`}
                >
                  <div
                    className={`overflow-hidden mb-5 bg-zinc-900 rounded-sm relative ${
                      isLastSingle
                        ? 'aspect-[16/10] md:aspect-[21/9]'
                        : 'aspect-[16/10]'
                    }`}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                  <div className="border-t border-black/15 pt-4">
                    <div className="flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-zinc-900">
                      <span className="hover:text-zinc-600 transition-colors">
                        {project.title}
                      </span>
                      <span className="text-zinc-500 font-mono text-xs">
                        {project.id}
                      </span>
                    </div>

                    {/* Labels below the project name */}
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-2 text-xs sm:text-sm font-sans font-medium text-zinc-600">
                      {project.labels.map((lbl, i) => (
                        <span key={lbl} className="inline-flex items-center gap-2.5">
                          {i > 0 && <span className="text-zinc-400 select-none">•</span>}
                          <span className="group-hover:text-zinc-900 transition-colors">{lbl}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </TransitionLink>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
