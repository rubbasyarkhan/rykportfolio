'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

interface PageTransitionContextType {
  navigateTo: (href: string) => void;
  isTransitioning: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  navigateTo: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentPathRef = useRef(pathname);
  const isFirstRender = useRef(true);

  // Navigate to target route with high-speed circular curtain wipe
  const navigateTo = (href: string) => {
    // If same route, do nothing
    if (href === pathname || href === currentPathRef.current) return;

    const overlay = overlayRef.current;
    if (!overlay) {
      router.push(href);
      return;
    }

    setIsTransitioning(true);

    // Warm up the target route chunk immediately
    router.prefetch(href);

    // Fast, ultra-smooth circular curtain from top right (hamburger origin)
    gsap.killTweensOf(overlay);
    gsap.fromTo(
      overlay,
      { clipPath: 'circle(0% at 100% 0%)', display: 'block' },
      {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 0.32,
        ease: 'power3.inOut',
        onComplete: () => {
          router.push(href);
        },
      }
    );
  };

  // When pathname changes (new route has mounted), reveal page smoothly & instantly
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    currentPathRef.current = pathname;
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Reset scroll to top before revealing
    window.scrollTo(0, 0);

    // Snappy outward reveal toward bottom left
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      clipPath: 'circle(0% at 0% 100%)',
      duration: 0.28,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set(overlay, { display: 'none', clipPath: 'circle(0% at 100% 0%)' });
        setIsTransitioning(false);
      },
    });
  }, [pathname]);

  // Safety fallback: auto-dismiss if route transition ever stalls
  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        const overlay = overlayRef.current;
        if (overlay) {
          gsap.to(overlay, {
            clipPath: 'circle(0% at 0% 100%)',
            duration: 0.25,
            ease: 'power2.out',
            onComplete: () => {
              if (overlayRef.current) {
                gsap.set(overlayRef.current, { display: 'none', clipPath: 'circle(0% at 100% 0%)' });
              }
              setIsTransitioning(false);
            },
          });
        }
      }, 1400);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <PageTransitionContext.Provider value={{ navigateTo, isTransitioning }}>
      {children}
      {/* Fullscreen Circular Wipe Transition Overlay */}
      <div
        ref={overlayRef}
        id="page-transition-curtain"
        className={`fixed inset-0 w-screen h-screen z-[99999] bg-[#0B0D10] ${
          isTransitioning ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          clipPath: 'circle(0% at 100% 0%)',
          display: 'none',
          willChange: 'clip-path',
        }}
        aria-hidden="true"
      />
    </PageTransitionContext.Provider>
  );
}

// Reusable TransitionLink component with instant prefetching on hover & touch
export const TransitionLink = React.forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    onTouchStart?: (e: React.TouchEvent<HTMLAnchorElement>) => void;
    [key: string]: any;
  }
>(function TransitionLink(
  { href, children, className = '', onClick, onMouseEnter, onTouchStart, ...props },
  ref
) {
  const { navigateTo } = usePageTransition();
  const router = useRouter();

  const handlePrefetch = () => {
    if (
      !href.startsWith('http') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !href.startsWith('#')
    ) {
      router.prefetch(href);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // External links or hash anchors pass through normally
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);
    navigateTo(href);
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseEnter={(e) => {
        handlePrefetch();
        if (onMouseEnter) onMouseEnter(e);
      }}
      onTouchStart={(e) => {
        handlePrefetch();
        if (onTouchStart) onTouchStart(e);
      }}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
});
