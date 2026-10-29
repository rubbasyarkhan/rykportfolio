'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import FullMenu from './FullMenu';
import { TransitionLink } from './PageTransition';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    const checkThemeAndScroll = () => {
      // 1. Check scroll position
      setIsScrolled(window.scrollY > 20);

      // 2. Fixed light/dark pages
      if (
        pathname?.startsWith('/work') ||
        pathname?.startsWith('/about') ||
        pathname?.startsWith('/projects')
      ) {
        setIsLightTheme(true);
        return;
      }
      if (pathname === '/contact') {
        setIsLightTheme(false);
        return;
      }

      // 3. Dynamic pages (e.g. homepage '/')
      // Find which section with data-color intersects the navbar line (Y = 45px)
      const sections = document.querySelectorAll<HTMLElement>('section[data-color]');
      const navY = 45;
      let detectedTheme = 'black';

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= navY && rect.bottom >= navY) {
          detectedTheme = sections[i].getAttribute('data-color') || 'black';
          break;
        }
      }

      if (sections.length === 0) {
        detectedTheme = document.body.getAttribute('theme') || 'black';
      }

      setIsLightTheme(detectedTheme === 'white');
    };

    checkThemeAndScroll();

    window.addEventListener('scroll', checkThemeAndScroll, { passive: true });

    const observer = new MutationObserver(() => {
      checkThemeAndScroll();
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['theme'],
    });

    return () => {
      window.removeEventListener('scroll', checkThemeAndScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const lineColor = isLightTheme && !isMenuOpen ? '#0B0D10' : '#ffffff';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] px-5 sm:px-8 md:px-[5%] flex justify-between items-center transition-all duration-300 ease-out select-none ${
          isScrolled ? 'py-3.5 sm:py-4 md:py-5' : 'py-5 sm:py-6 md:py-7'
        }`}
        style={{
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          backgroundColor: isMenuOpen
            ? 'transparent'
            : isLightTheme
            ? isScrolled
              ? 'rgba(241, 239, 235, 0.58)'
              : 'rgba(241, 239, 235, 0.35)'
            : isScrolled
            ? 'rgba(11, 13, 16, 0.58)'
            : 'rgba(11, 13, 16, 0.35)',
          borderBottom: isMenuOpen
            ? '1px solid transparent'
            : isLightTheme
            ? isScrolled
              ? '1px solid rgba(0, 0, 0, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.04)'
            : isScrolled
            ? '1px solid rgba(255, 255, 255, 0.10)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: isMenuOpen
            ? 'none'
            : isLightTheme
            ? isScrolled
              ? '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
              : '0 2px 8px rgba(0, 0, 0, 0.02)'
            : isScrolled
            ? '0 4px 24px -2px rgba(0, 0, 0, 0.30)'
            : '0 2px 10px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* LOGO */}
        <TransitionLink
          href="/"
          className={`logo font-bold text-lg sm:text-xl tracking-tighter cursor-pointer font-sans transition-colors duration-300 ${
            isLightTheme && !isMenuOpen ? 'text-[#0B0D10]' : 'text-white'
          }`}
        >
          RUBBAS .YK
        </TransitionLink>

        {/* CENTER LINKS */}
        <div
          id="nav-center"
          className={`hidden md:flex gap-10 font-sans transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* WORK */}
          <TransitionLink href="/work" className="nav-cta group relative overflow-hidden">
            <div className="masker h-[1.2rem] overflow-hidden uppercase tracking-[0.2em] text-sm font-medium">
              <span
                className={`block transition-all duration-300 group-hover:-translate-y-full ${
                  isLightTheme && !isMenuOpen ? 'text-[#0B0D10]' : 'text-white'
                }`}
              >
                Work
              </span>
              <span className="absolute left-0 top-0 translate-y-full text-[#F5B942] transition-transform duration-300 group-hover:translate-y-0">
                Work
              </span>
            </div>
          </TransitionLink>

          {/* ABOUT ME */}
          <TransitionLink href="/about" className="nav-cta group relative overflow-hidden">
            <div className="masker h-[1.2rem] overflow-hidden uppercase tracking-[0.2em] text-sm font-medium">
              <span
                className={`block transition-all duration-300 group-hover:-translate-y-full ${
                  isLightTheme && !isMenuOpen ? 'text-[#0B0D10]' : 'text-white'
                }`}
              >
                ABOUT ME
              </span>
              <span className="absolute left-0 top-0 translate-y-full text-[#F5B942] transition-transform duration-300 group-hover:translate-y-0">
                ABOUT ME
              </span>
            </div>
          </TransitionLink>
        </div>

        {/* HAMBURGER TOGGLE BUTTON */}
        <button
          id="menu-toggle"
          onClick={toggleMenu}
          className="group relative w-8 h-5 flex flex-col justify-center gap-1.5 cursor-pointer border-0 bg-transparent p-0 focus:outline-none select-none"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {/* Line 1 */}
          <span
            className="line-1 w-8 h-[2px] block transition-all duration-300 ease-out origin-center"
            style={{
              width: '32px',
              height: '2px',
              backgroundColor: lineColor,
              transform: isMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
            }}
          />

          {/* Line 2 */}
          <span
            className="line-2 w-8 h-[2px] block transition-all duration-200 ease-out origin-center"
            style={{
              width: '32px',
              height: '2px',
              backgroundColor: lineColor,
              opacity: isMenuOpen ? 0 : 1,
              transform: isMenuOpen ? 'translateX(20px)' : 'none',
            }}
          />

          {/* Line 3 */}
          <span
            className={`line-3 w-8 h-[2px] block transition-all duration-300 ease-out ${
              isMenuOpen ? 'origin-center' : 'origin-right scale-x-50 group-hover:scale-x-100'
            }`}
            style={{
              width: '32px',
              height: '2px',
              backgroundColor: lineColor,
              transformOrigin: isMenuOpen ? 'center' : 'right',
              transform: isMenuOpen ? 'translateY(-8px) rotate(-45deg)' : undefined,
            }}
          />
        </button>
      </nav>

      {/* FULLSCREEN POPUP MENU */}
      <FullMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
