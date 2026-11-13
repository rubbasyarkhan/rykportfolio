'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Mail, MapPin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { LinkedinIcon, WhatsappIcon } from '@/components/ui/SocialIcons';

interface ContactOption {
  id: string;
  title: string;
  description: string;
  handle: string;
  copyValue: string;
  ctaLabel: string;
  ctaHoverLabel: string;
  href: string;
  external: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const CONTACT_OPTIONS: ContactOption[] = [
  {
    id: 'whatsapp',
    title: 'Message on WhatsApp',
    description: 'Reach out directly on WhatsApp for quick discussions or project inquiries.',
    handle: '(+92) 371-029-0861',
    copyValue: '+923710290861',
    ctaLabel: 'Start Chat',
    ctaHoverLabel: 'Open App',
    href: 'https://wa.me/923710290861?text=Hi%20Rubbas%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!',
    external: true,
    icon: WhatsappIcon,
  },
  {
    id: 'email',
    title: 'Send a Mail',
    description: 'Send your project details or collaboration ideas straight to my email.',
    handle: 'rubbasyarkhan007@gmail.com',
    copyValue: 'rubbasyarkhan007@gmail.com',
    ctaLabel: 'Write Mail',
    ctaHoverLabel: 'Send Now',
    href: "mailto:rubbasyarkhan007@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Let's%20Work%20Together",
    external: false,
    icon: Mail,
  },
  {
    id: 'linkedin',
    title: 'Connect on LinkedIn',
    description: 'Connect with me on LinkedIn for professional opportunities and networking.',
    handle: 'linkedin.com/in/rubbas-yar-khan',
    copyValue: 'https://www.linkedin.com/in/rubbas-yar-khan',
    ctaLabel: 'Let’s Connect',
    ctaHoverLabel: 'View Profile',
    href: 'https://www.linkedin.com/in/rubbas-yar-khan',
    external: true,
    icon: LinkedinIcon,
  },
];

export default function ContactView() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconBadgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    document.body.setAttribute('theme', 'black');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.contact-header-title',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          '.contact-header-sub',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.65'
        )
        .fromTo(
          '.contact-card-item',
          { y: 45, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.14,
            ease: 'expo.out',
          },
          '-=0.5'
        )
        .fromTo(
          '.contact-footer-strip',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    idx: number
  ) => {
    const card = cardRefs.current[idx];
    const pill = pillRefs.current[idx];
    const iconBadge = iconBadgeRefs.current[idx];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set spotlight CSS custom properties
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Subtle magnetic pull on the right action orb/pill and left icon
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    if (pill) {
      gsap.to(pill, {
        x: deltaX * 10,
        y: deltaY * 6,
        duration: 0.35,
        ease: 'power2.out',
      });
    }

    if (iconBadge) {
      gsap.to(iconBadge, {
        x: deltaX * 5,
        y: deltaY * 5,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  };

  const handleCardMouseLeave = (idx: number) => {
    const pill = pillRefs.current[idx];
    const iconBadge = iconBadgeRefs.current[idx];

    if (pill) {
      gsap.to(pill, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    }

    if (iconBadge) {
      gsap.to(iconBadge, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    }
  };

  const handleCopy = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    value: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      data-color="black"
      className="min-h-screen bg-[#0B0D10] text-white py-24 sm:py-28 md:py-36 px-5 sm:px-8 md:px-16 lg:px-20 font-sans relative overflow-hidden"
    >
      {/* Subtle Ambient Gold Backlight */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(245, 185, 66, 0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 md:mb-20 gap-6 md:gap-8 pt-6">
          <div className="overflow-hidden">
            <h1 className="contact-header-title text-[clamp(3.5rem,8.5vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-tighter font-sans text-white">
              Let&apos;s Work <br /> Together
            </h1>
          </div>

          <div className="contact-header-sub text-left md:text-right max-w-sm md:max-w-md">
            <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
              I don&apos;t want you to fill out a form and wait 2–3 business days for a reply.{' '}
              <span className="text-[#F5B942] font-semibold">
                Let&apos;s solve the problem and cater to your needs right now.
              </span>
            </p>
          </div>
        </div>

        {/* 3 Direct Interactive Contact Cards */}
        <div className="space-y-5 sm:space-y-6">
          {CONTACT_OPTIONS.map((option, idx) => {
            const Icon = option.icon;
            const isCopied = copiedId === option.id;

            return (
              <a
                key={option.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                href={option.href}
                target={option.external ? '_blank' : undefined}
                rel={option.external ? 'noopener noreferrer' : undefined}
                onMouseMove={(e) => handleCardMouseMove(e, idx)}
                onMouseLeave={() => handleCardMouseLeave(idx)}
                style={
                  {
                    '--mouse-x': '50%',
                    '--mouse-y': '50%',
                  } as React.CSSProperties
                }
                className="contact-card-item card group block relative bg-[#13161B] border border-white/10 hover:border-[#F5B942]/45 rounded-2xl p-6 sm:p-8 md:p-9 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Cursor-Tracking Radial Spotlight Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(520px circle at var(--mouse-x) var(--mouse-y), rgba(245, 185, 66, 0.11), transparent 45%)',
                  }}
                />

                {/* Animated Bottom Gold Sweep Line */}
                <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-[#F5B942] via-[#ef9d71] to-[#F5B942] group-hover:w-full transition-all duration-700 ease-out" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
                  {/* Left Content */}
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    {/* Animated Icon Orb */}
                    <div
                      ref={(el) => {
                        iconBadgeRefs.current[idx] = el;
                      }}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.04] border border-white/10 group-hover:border-[#F5B942] group-hover:bg-[#F5B942] flex items-center justify-center text-[#F5B942] group-hover:text-[#0B0D10] transition-colors duration-500 flex-shrink-0 mt-0.5 shadow-inner"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                    </div>

                    <div className="space-y-2 flex-1">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#F5B942] transition-colors duration-300 font-sans">
                        {option.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed font-sans max-w-xl">
                        {option.description}
                      </p>

                      {/* Handle + Interactive Copy Button */}
                      <div className="pt-1.5 flex items-center gap-2.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-mono tracking-wide text-zinc-200 group-hover:text-white transition-colors break-all">
                          {option.handle}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleCopy(e, option.id, option.copyValue)}
                          aria-label={`Copy ${option.handle}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 text-[11px] font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-[#F5B942]" />
                              <span className="text-[#F5B942]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Signature Magnetic Pill + Relay Arrow Orb */}
                  <div className="flex items-center justify-end shrink-0 pt-2 md:pt-0">
                    <div
                      ref={(el) => {
                        pillRefs.current[idx] = el;
                      }}
                      className="inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full border border-white/15 bg-white/[0.03] backdrop-blur-md group-hover:border-[#F5B942] group-hover:bg-[#F5B942] group-hover:shadow-[0_0_30px_rgba(245,185,66,0.28)] transition-all duration-500"
                    >
                      {/* Rolling Dual-Layer Text Mask */}
                      <div className="masker relative h-[1.15rem] overflow-hidden flex flex-col justify-start">
                        <span className="block text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white leading-[1.15rem] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:-translate-y-full whitespace-nowrap">
                          {option.ctaLabel}
                        </span>
                        <span className="block text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#0B0D10] leading-[1.15rem] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:-translate-y-full whitespace-nowrap">
                          {option.ctaHoverLabel}
                        </span>
                      </div>

                      {/* Circular Arrow Orb with Diagonal Shoot-Through Relay */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 group-hover:bg-[#0B0D10] text-white group-hover:text-[#F5B942] flex items-center justify-center relative overflow-hidden transition-colors duration-500 shrink-0">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:translate-x-6 group-hover:-translate-y-6" />
                        <ArrowUpRight className="w-4 h-4 absolute -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Location Footer */}
        <div className="contact-footer-strip mt-14 sm:mt-16 pt-8 border-t border-white/10 flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F5B942] flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-zinc-200">
              Karachi, Pakistan — <span className="text-zinc-400">Available Worldwide</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
