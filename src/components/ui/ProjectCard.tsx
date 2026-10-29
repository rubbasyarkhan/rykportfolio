'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { TransitionLink } from '@/components/layout/PageTransition';

export interface ProjectCardProps {
  project?: Project;
  slug?: string;
  id?: string;
  title?: string;
  category?: string;
  labels?: string[];
  thumbnail?: string;
  heroImage?: string;
  className?: string;
}

export default function ProjectCard({
  project,
  slug: propSlug,
  id: propId,
  title: propTitle,
  category: propCategory,
  labels: propLabels,
  thumbnail: propThumbnail,
  heroImage: propHeroImage,
  className = '',
}: ProjectCardProps) {
  const slug = project?.slug || propSlug || '';
  const id = project?.id || propId || '01';
  const title = project?.title || propTitle || 'Untitled Project';
  const category = project?.category || propCategory || 'Design & Development';
  const labels = project?.labels || propLabels || (category ? [category] : []);
  const imageSrc =
    project?.thumbnail ||
    project?.heroImage ||
    propThumbnail ||
    propHeroImage ||
    '/assets/images/project1.1.png';

  // Format id to ensure 2-digits (e.g. "1" -> "01")
  const formattedId = id.toString().padStart(2, '0');
  const isExternalImage = imageSrc.startsWith('http');

  return (
    <TransitionLink
      href={`/projects/${slug}`}
      className={`project-card group cursor-pointer block select-none ${className}`}
    >
      <div className="aspect-[16/10] overflow-hidden mb-5 bg-zinc-900 rounded-sm relative">
        {isExternalImage ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
        )}
      </div>
      <div className="border-t border-black/15 pt-4">
        <div className="flex flex-wrap justify-between items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-zinc-900">
          <span className="hover:text-zinc-600 transition-colors">
            {title}
          </span>
          <span className="text-zinc-500 font-mono text-xs">{formattedId}</span>
        </div>

        {/* Labels below the name */}
        {labels && labels.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-2 text-xs sm:text-sm font-sans font-medium text-zinc-600">
            {labels.map((lbl, i) => (
              <span key={lbl} className="inline-flex items-center gap-2.5">
                {i > 0 && <span className="text-zinc-400 select-none">•</span>}
                <span className="hover:text-zinc-900 transition-colors">{lbl}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </TransitionLink>
  );
}
