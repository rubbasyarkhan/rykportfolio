'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import {
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
  DribbbleIcon,
  PinterestIcon,
} from '@/components/ui/SocialIcons';
import { usePageTransition } from './PageTransition';

interface FullMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'WORK', href: '/work' },
  { label: 'ABOUT ME', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/design_code_journey/',
    icon: InstagramIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rubbasyarkhan',
    icon: LinkedinIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/rubbasyarkhan',
    icon: GithubIcon,
  },
  {
    name: 'Dribbble',
    href: 'https://dribbble.com/rubbas',
    icon: DribbbleIcon,
  },
  {
    name: 'Pinterest',
    href: 'https://pinterest.com/rubbasyarkhan',
    icon: PinterestIcon,
  },
];

export default function FullMenu({ isOpen, onClose }: FullMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const { navigateTo } = usePageTransition();

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Handle GSAP circular clip-path and link reveals
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (!timelineRef.current) {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          gsap.set(menu, { display: 'none' });
        },
      });

      tl.set(menu, { display: 'flex' })
        .to(menu, {
          clipPath: 'circle(150% at 100% 0%)',
          duration: 0.85,
          ease: 'power3.inOut',
        })
        .from(
          menu.querySelectorAll('.full-menu-link'),
          {
            y: 50,
            opacity: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: 'power4.out',
          },
          '-=0.35'
        )
        .from(
          menu.querySelectorAll('.full-menu-meta'),
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: 'power3.out',
          },
          '-=0.3'
        );

      timelineRef.current = tl;
    }

    if (isOpen) {
      menu.setAttribute('data-open', 'true');
      timelineRef.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      menu.removeAttribute('data-open');
      if (timelineRef.current) {
        timelineRef.current.reverse();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    onClose();
    navigateTo(href);
  };

  return (
    <div
      ref={menuRef}
      id="full-menu"
      className="fixed top-0 left-0 w-full h-screen bg-[#0B0D10] text-white z-[90] hidden flex-col md:flex-row px-6 sm:px-10 md:px-[6%] py-24 md:py-0 items-center justify-center overflow-y-auto"
      style={{ clipPath: 'circle(0% at 100% 0%)' }}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      {/* Left Menu (Primary Navigation) */}
      <div className="menu-left w-full md:w-3/5 my-auto">
        <ul className="space-y-4 sm:space-y-6">
          {MENU_LINKS.map((item) => (
            <li key={item.label} className="overflow-hidden">
              <button
                type="button"
                onClick={() => handleLinkClick(item.href)}
                className="full-menu-link gsap-btn nav-link group inline-block relative overflow-hidden text-left bg-transparent border-0 p-0 cursor-pointer"
              >
                <div className="masker relative h-[1.1em] overflow-hidden text-[clamp(2.5rem,7vw,5.5rem)] font-black tracking-tighter leading-none font-machina">
                  <span className="btn-text block text-white transition-transform duration-300 group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span className="btn-text absolute left-0 top-0 translate-y-full text-[#F5B942] transition-transform duration-300 group-hover:translate-y-0">
                    {item.label}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column (Inquiries & Socials) */}
      <div className="menu-right w-full md:w-2/5 flex flex-col justify-center gap-8 md:gap-12 mt-12 md:mt-0 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-16 lg:pl-20 font-satoshi">
        <div className="full-menu-meta">
          <h4 className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-2 font-mono">
            Inquiries
          </h4>
          <a
            href="mailto:rubbasyarkhan007@gmail.com"
            className="text-base sm:text-lg md:text-xl text-white font-medium hover:text-[#F5B942] transition-colors break-all"
          >
            rubbasyarkhan007@gmail.com
          </a>
          <p className="text-xs text-zinc-500 mt-1 tracking-wider font-mono">
            (+92) 371-029-0861 &bull; Karachi, PK
          </p>
        </div>

        <div className="full-menu-meta">
          <h4 className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-4 font-mono">
            Social Networks
          </h4>
          <div className="flex flex-wrap gap-4 text-white">
            {SOCIAL_LINKS.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#F5B942] hover:bg-[#F5B942]/10 transition-all text-xs tracking-wider uppercase font-mono"
                >
                  <Icon className="w-3.5 h-3.5 text-zinc-300 group-hover:text-[#F5B942] transition-colors" />
                  <span className="text-zinc-300 group-hover:text-white transition-colors">
                    {soc.name}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-[#F5B942] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="full-menu-meta pt-2">
          <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
            AVAILABLE FOR FREELANCE &amp; CONTRACT WORK
          </p>
        </div>
      </div>
    </div>
  );
}
