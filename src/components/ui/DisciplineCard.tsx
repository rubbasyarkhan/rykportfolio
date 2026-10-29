'use client';

import React from 'react';
import { Discipline } from '@/types';

export interface DisciplineCardProps {
  discipline?: Discipline;
  id?: string;
  title?: string;
  description?: string;
  index?: number | string;
  className?: string;
}

export default function DisciplineCard({
  discipline,
  id: propId,
  title: propTitle,
  description: propDescription,
  index,
  className = '',
}: DisciplineCardProps) {
  let displayId = discipline?.id || propId;

  if (!displayId && index !== undefined) {
    const num = typeof index === 'number' ? index + 1 : index;
    displayId = `/ ${num.toString().padStart(2, '0')}`;
  } else if (!displayId) {
    displayId = '/ 01';
  } else if (!displayId.startsWith('/')) {
    displayId = `/ ${displayId}`;
  }

  const title = discipline?.title || propTitle || '';
  const description = discipline?.description || propDescription || '';

  return (
    <div
      className={`discipline-card group py-6 sm:py-8 border-b border-white/10 relative transition-colors duration-300 ${className}`}
    >
      {/* Bottom gold accent line on hover */}
      <div className="absolute left-0 bottom-0 w-full h-[1px] bg-white/10 group-hover:bg-[#F5B942] transition-colors duration-300" />

      <div className="flex items-start gap-4 sm:gap-5">
        {/* Discipline Index */}
        <span className="text-xs sm:text-sm font-mono text-zinc-500 font-bold tracking-widest pt-1 group-hover:text-[#F5B942] transition-colors duration-300 select-none">
          {displayId}
        </span>

        {/* Content Block */}
        <div className="flex-1">
          <h3
            className="text-lg sm:text-xl md:text-2xl font-bold uppercase text-white tracking-tight leading-snug group-hover:text-[#F5B942] transition-colors duration-300 font-sans"
            style={{ fontFamily: 'var(--font-space-grotesk), "Space Grotesk", sans-serif' }}
          >
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
