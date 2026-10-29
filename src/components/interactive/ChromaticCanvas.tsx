'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  midX: number;
  midY: number;
  hue: number;
  width: number;
  age: number;
  maxAge: number;
  time: number;
}

export default function ChromaticCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run on desktop devices with fine hover capability
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;
    let rafId: number | null = null;
    let isLoopRunning = false;

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    function isOverLightSection(x: number, y: number): boolean {
      // If full navigation menu is open, do not draw
      const fullMenu = document.getElementById('full-menu');
      if (fullMenu && (fullMenu.classList.contains('active') || fullMenu.getAttribute('data-open') === 'true')) {
        return false;
      }

      const elem = document.elementFromPoint(x, y);
      if (!elem) return false;

      // Disallow black sections, dark hero, skills, and dark footer
      if (
        elem.closest('footer[data-color="black"]') ||
        elem.closest('section[data-color="black"]') ||
        elem.closest('.home') ||
        elem.closest('.skills-section') ||
        elem.closest('.dark-section')
      ) {
        return false;
      }

      // Disallow cards, project items, media, and preview containers
      const cardSelectors = [
        '.project-card',
        'a[href*="project"]',
        '.card',
        '[class*="card"]',
        '.service-box',
        '.service-item',
        '.workspace-image',
        '.film-camera',
        'img',
        'video',
        'picture',
        'figure',
      ].join(', ');

      if (elem.closest(cardSelectors)) {
        return false;
      }

      // Disallow all text elements, text content sections, and typography
      const textSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'a', 'blockquote', 'q', 'cite',
        'ul', 'ol', 'li',
        'button', 'input', 'textarea', 'label', 'select', 'form',
        'code', 'pre', 'em', 'strong', 'b', 'i',
        '.about-heading', '.about-content', '.quote-section',
        '.editorial-container', '.film-text', '.service-content',
        '.project-info', '.info-block', '.cta-area', 'nav',
        '#nav-center', '#full-menu', '.bento-card',
      ].join(', ');

      if (elem.closest(textSelectors)) {
        return false;
      }

      // If the element directly wraps any readable text nodes, do not draw
      if (elem.childNodes && elem.childNodes.length) {
        for (let i = 0; i < elem.childNodes.length; i++) {
          const node = elem.childNodes[i];
          if (node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > 0) {
            return false;
          }
        }
      }

      // Allow explicitly marked white sections or about section
      if (elem.closest('section[data-color="white"]') || elem.closest('.about-section')) {
        return true;
      }

      // Active white theme on body
      if (document.body.getAttribute('theme') === 'white') {
        if (!elem.closest('footer') && !elem.closest('.home') && !elem.closest('.skills-section')) {
          return true;
        }
      }

      // Color brightness fallback for #F1EFEB or light containers
      let curr: HTMLElement | null = elem as HTMLElement;
      while (curr && curr !== document.documentElement) {
        const bg = window.getComputedStyle(curr).backgroundColor;
        if (bg && bg !== 'transparent' && !bg.includes('rgba(0, 0, 0, 0)')) {
          const rgb = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (rgb) {
            const brightness =
              (Number(rgb[1]) * 299 + Number(rgb[2]) * 587 + Number(rgb[3]) * 114) / 1000;
            return brightness > 180;
          }
        }
        curr = curr.parentElement;
      }

      return false;
    }

    const strokes: Point[][] = [];
    let currentStroke: Point[] | null = null;
    let lastPoint: { x: number; y: number; time: number } | null = null;
    let hue = 220; // Starting chromatic hue

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const scrollX = window.scrollX || window.pageXOffset || 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      let activeCount = 0;

      for (let s = strokes.length - 1; s >= 0; s--) {
        const stroke = strokes[s];

        // Age points
        for (let i = 0; i < stroke.length; i++) {
          stroke[i].age++;
        }

        // Prune expired points
        while (stroke.length > 0 && stroke[0].age >= stroke[0].maxAge) {
          stroke.shift();
        }

        if (stroke.length === 0) {
          strokes.splice(s, 1);
          continue;
        }

        activeCount += stroke.length;

        if (stroke.length === 1) {
          const p = stroke[0];
          const alpha = Math.max(0, 1 - p.age / p.maxAge);
          if (alpha > 0.01) {
            ctx.beginPath();
            ctx.fillStyle = `hsla(${p.hue}, 92%, 46%, ${(alpha * 0.9).toFixed(3)})`;
            ctx.arc(
              p.x - scrollX,
              p.y - scrollY,
              p.width * 0.5 * (0.35 + 0.65 * alpha),
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
          continue;
        }

        // Draw smooth quadratic bezier curve segments
        for (let i = 1; i < stroke.length; i++) {
          const p0 = stroke[i - 1];
          const p1 = stroke[i];

          const progress = p1.age / p1.maxAge;
          const alpha = Math.max(0, 1 - Math.pow(progress, 1.4));
          if (alpha <= 0.01) continue;

          const p0MidX = p0.midX - scrollX;
          const p0MidY = p0.midY - scrollY;
          const p0X = p0.x - scrollX;
          const p0Y = p0.y - scrollY;
          const p1MidX = p1.midX - scrollX;
          const p1MidY = p1.midY - scrollY;

          // Culling offscreen segments
          if (
            (p0MidX < -50 && p1MidX < -50) ||
            (p0MidX > width + 50 && p1MidX > width + 50) ||
            (p0MidY < -50 && p1MidY < -50) ||
            (p0MidY > height + 50 && p1MidY > height + 50)
          ) {
            continue;
          }

          ctx.beginPath();
          ctx.strokeStyle = `hsla(${p1.hue}, 92%, 46%, ${(alpha * 0.9).toFixed(3)})`;
          ctx.lineWidth = Math.max(4, p1.width * (0.35 + 0.65 * alpha));
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          ctx.moveTo(p0MidX, p0MidY);
          ctx.quadraticCurveTo(p0X, p0Y, p1MidX, p1MidY);
          ctx.stroke();
        }
      }

      if (activeCount > 0) {
        rafId = requestAnimationFrame(render);
      } else {
        isLoopRunning = false;
        ctx.clearRect(0, 0, width, height);
      }
    }

    function addPoint(clientX: number, clientY: number) {
      if (!isOverLightSection(clientX, clientY)) {
        currentStroke = null;
        lastPoint = null;
        return;
      }

      const scrollX = window.scrollX || window.pageXOffset || 0;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const pageX = clientX + scrollX;
      const pageY = clientY + scrollY;

      const now = performance.now();
      let dist = 0;
      let speed = 0;

      if (lastPoint) {
        const dx = pageX - lastPoint.x;
        const dy = pageY - lastPoint.y;
        dist = Math.hypot(dx, dy);
        const dt = Math.max(1, now - lastPoint.time);
        speed = dist / dt;

        // Ignore micro-movements
        if (dist < 2.5) return;

        // If mouse jumped across screen, start a fresh stroke
        if (dist > 120) {
          currentStroke = null;
        }
      }

      // Dynamic chromatic color shift based on cursor travel
      hue = (hue + Math.min(dist * 0.45, 6)) % 360;

      // Velocity-based brush width: fuller stroke when slow, ribbon taper when fast
      const targetWidth = Math.max(10, Math.min(30, 36 - speed * 5));

      const point: Point = {
        x: pageX,
        y: pageY,
        midX: pageX,
        midY: pageY,
        hue,
        width: targetWidth,
        age: 0,
        maxAge: 56, // ~0.9s - 1.2s dissolve
        time: now,
      };

      if (!currentStroke || currentStroke.length === 0) {
        currentStroke = [point];
        strokes.push(currentStroke);
      } else {
        const prev = currentStroke[currentStroke.length - 1];
        point.midX = (prev.x + pageX) / 2;
        point.midY = (prev.y + pageY) / 2;
        currentStroke.push(point);
      }

      lastPoint = { x: pageX, y: pageY, time: now };

      if (!isLoopRunning) {
        isLoopRunning = true;
        rafId = requestAnimationFrame(render);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      addPoint(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      currentStroke = null;
      lastPoint = null;
    };

    const wakeAnimation = () => {
      if (!isLoopRunning && strokes.length > 0) {
        isLoopRunning = true;
        rafId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', wakeAnimation, { passive: true });

    const lenisInstance = (window as unknown as { lenis?: { on: (event: string, cb: () => void) => void } }).lenis;
    if (lenisInstance) {
      lenisInstance.on('scroll', wakeAnimation);
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', wakeAnimation);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="interactive-draw-canvas"
      className="interactive-draw-canvas fixed top-0 left-0 w-screen h-screen pointer-events-none z-10 mix-blend-multiply"
      aria-hidden="true"
    />
  );
}
