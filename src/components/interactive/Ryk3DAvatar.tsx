'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Ryk3DAvatarProps {
  className?: string;
}

export default function Ryk3DAvatar({ className = '' }: Ryk3DAvatarProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const orbitRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const rig = rigRef.current;
    const glare = glareRef.current;
    const glow = glowRef.current;
    const orbitRing = orbitRingRef.current;

    if (!card || !rig) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isHovering = false;
    let ringAngle = 0;
    const startTime = Date.now();

    const handleMouseEnter = () => {
      isHovering = true;
      gsap.to(card, {
        scale: 1.025,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
      gsap.to(card, {
        scale: 1.0,
        duration: 0.5,
        ease: 'power2.out',
      });
      if (glare) {
        gsap.to(glare, { opacity: 0, duration: 0.3 });
      }
      if (glow) {
        glow.style.background =
          'radial-gradient(circle at 50% 50%, rgba(244, 185, 70, 0.25), transparent 70%)';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Turn head and bust towards cursor
      targetRotY = x * 24; // max 24deg yaw
      targetRotX = -y * 18; // max 18deg pitch

      // Dynamic specular glare across glasses & vinyl
      if (glare) {
        const glareX = ((x + 1) / 2) * 100;
        const glareY = ((y + 1) / 2) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, transparent 55%)`;
        glare.style.opacity = '0.45';
      }

      // Shift amber ambient rim light
      if (glow) {
        const glowX = 50 + x * 25;
        const glowY = 50 + y * 25;
        glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(244, 185, 70, 0.38), transparent 70%)`;
      }
    };

    // Tap / Click squash & stretch pop bounce physics
    const handleClick = () => {
      gsap
        .timeline()
        .to(rig, {
          scale: 0.88,
          rotateZ: -5,
          duration: 0.12,
          ease: 'power2.in',
        })
        .to(rig, {
          scale: 1.14,
          rotateZ: 5,
          duration: 0.22,
          ease: 'back.out(2.5)',
        })
        .to(rig, {
          scale: 1.0,
          rotateZ: 0,
          duration: 0.35,
          ease: 'elastic.out(1, 0.45)',
        });

      // Flash orbit ring on pop
      if (orbitRing) {
        gsap.fromTo(
          orbitRing,
          { borderColor: 'rgba(255, 255, 255, 0.95)', scale: 1.2 },
          { borderColor: 'rgba(244, 185, 70, 0.3)', scale: 1.0, duration: 0.6, ease: 'power2.out' }
        );
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('click', handleClick);

    // Continuous physics ticker for autonomous idle movement & smooth lerp
    const tickerCallback = () => {
      const elapsed = (Date.now() - startTime) / 1000;

      // 1. Autonomous motion loop: continuous breathing and floating
      const floatY = Math.sin(elapsed * 2.2) * 6;
      const breathScale = 1 + Math.sin(elapsed * 2.8) * 0.012;
      const idleTilt = Math.sin(elapsed * 1.5) * 1.8;

      // 2. Smooth interpolation towards mouse orientation
      const lerpFactor = isHovering ? 0.1 : 0.04;
      currentRotX += (targetRotX - currentRotX) * lerpFactor;
      currentRotY += (targetRotY - currentRotY) * lerpFactor;

      // 3. Composite 3D transform
      rig.style.transform = `translate3d(0, ${floatY}px, 0) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg) rotateZ(${idleTilt}deg) scale(${breathScale})`;

      // 4. Continuously spin holographic 3D orbit ring
      if (orbitRing) {
        ringAngle = (ringAngle + 0.65) % 360;
        orbitRing.style.transform = `rotateX(72deg) rotateZ(${ringAngle}deg)`;
      }
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      gsap.ticker.remove(tickerCallback);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      id="ryk-avatar-card"
      className={`bento-card card bg-[#0B0D10] border border-[#1F232B] rounded-2xl overflow-hidden relative shadow-lg min-h-[240px] flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ perspective: '900px' }}
    >
      {/* Ambient 3D Rim Glow (Dynamically tracks cursor) */}
      <div
        ref={glowRef}
        id="avatar-ambient-glow"
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(244, 185, 70, 0.25), transparent 70%)',
        }}
      />

      {/* 3D Holographic Orbit Ring (Spins continuously in 3D space) */}
      <div
        ref={orbitRingRef}
        className="avatar-orbit-ring absolute w-44 h-44 rounded-full border border-[#F4B946]/30 pointer-events-none"
        style={{ transform: 'rotateX(72deg) rotateZ(0deg)' }}
      />

      {/* 3D Character Rig Container */}
      <div
        ref={rigRef}
        id="avatar-character-rig"
        className="relative w-full h-full flex items-center justify-center pointer-events-none py-2"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* 3D Avatar Render of RYK */}
        <img
          id="avatar-img"
          src="/assets/images/ryk-3d-avatar.png"
          alt="Rubbas Yar Khan 3D Avatar"
          className="w-full h-full max-h-[230px] object-contain object-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
          style={{ transform: 'translateZ(25px)' }}
        />

        {/* Dynamic Specular Glare (Glasses & vinyl reflection) */}
        <div
          ref={glareRef}
          id="avatar-glare"
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.7) 0%, transparent 55%)',
            transform: 'translateZ(35px)',
          }}
        />
      </div>

      {/* Top Status Badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono tracking-widest uppercase text-white/90">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B942] animate-pulse" />
        <span>RYK // 3D</span>
      </div>
    </div>
  );
}
