'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on devices with fine hover capability (desktop mice/trackpads)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      opacity: 0,
      pointerEvents: 'none',
    });

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isVisible = false;
    let isHovering = false;

    const setCursorX = gsap.quickSetter(cursor, 'x', 'px');
    const setCursorY = gsap.quickSetter(cursor, 'y', 'px');

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      isVisible = true;
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    const handleMouseDown = () => {
      gsap.to(cursor, {
        scale: isHovering ? 2.1 : 0.8,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, {
        scale: isHovering ? 2.5 : 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    // GSAP ticker for smooth 60fps lerp
    const cursorTicker = () => {
      pos.x += (mouse.x - pos.x) * 0.25;
      pos.y += (mouse.y - pos.y) * 0.25;

      setCursorX(pos.x);
      setCursorY(pos.y);
    };

    gsap.ticker.add(cursorTicker);

    // Event delegation for hover states
    const hoverSelector =
      "a, button, [role='button'], .skill-item, .discipline-card, .discipline-row, #menu-toggle, .gsap-btn, .project-card, .bento-card, .service-item, .card";

    const handleMouseOver = (e: MouseEvent) => {
      const isInput = (e.target as Element | null)?.closest('input, textarea, select');
      if (isInput) {
        gsap.to(cursor, { opacity: 0, duration: 0.15 });
        return;
      }

      const target = (e.target as Element | null)?.closest(hoverSelector);
      const related = (e.relatedTarget as Element | null)?.closest(hoverSelector);
      if (target && target !== related) {
        gsap.to(cursor, { opacity: 1, duration: 0.15 });
        isHovering = true;
        cursor.classList.add('hover');
        gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const isInput = (e.target as Element | null)?.closest('input, textarea, select');
      if (isInput) {
        gsap.to(cursor, { opacity: 1, duration: 0.15 });
      }

      const target = (e.target as Element | null)?.closest(hoverSelector);
      const related = (e.relatedTarget as Element | null)?.closest(hoverSelector);
      if (target && target !== related) {
        isHovering = false;
        cursor.classList.remove('hover');
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      gsap.ticker.remove(cursorTicker);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed top-0 left-0 w-7 h-7 rounded-full bg-white pointer-events-none z-[999999] mix-blend-difference will-change-transform"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  );
}
