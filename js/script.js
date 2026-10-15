let isMenuOpen = false;
let menuTl;

function initMenu() {
    const menuToggle = document.querySelector("#menu-toggle");
    const fullMenu = document.querySelector("#full-menu");
    const line1 = document.querySelector(".line-1");
    const line2 = document.querySelector(".line-2");
    const line3 = document.querySelector(".line-3");
    const navCenter = document.querySelector("#nav-center");

    // Safety check
    if (!menuToggle || !fullMenu || typeof gsap === 'undefined') return;

    // Initial states
    gsap.set(fullMenu, {
        display: "none",
        clipPath: "circle(0% at 100% 0%)"
    });

    // Unified Timeline
    menuTl = gsap.timeline({ paused: true });

    /* ----------------------------------
       1. Hide center nav links
    ---------------------------------- */
    if (navCenter) {
        menuTl.to(navCenter, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.2,
            ease: "power2.out"
        }, "sync");
    }

    /* ----------------------------------
       2. Morph hamburger → X
    ---------------------------------- */
    if (line1 && line2 && line3) {
        menuTl
            .to(line2, {
                opacity: 0,
                x: 20,
                duration: 0.3,
                ease: "power2.out"
            }, "sync")
            .to(line1, {
                rotate: 45,
                y: 8,
                duration: 0.3,
                ease: "power2.out"
            }, "sync")
            .to(line3, {
                rotate: -45,
                y: -8,
                scaleX: 1,
                duration: 0.3,
                ease: "power2.out"
            }, "sync");
    }

    /* ----------------------------------
       3. Reveal full screen menu
    ---------------------------------- */
    menuTl.to(fullMenu, {
        display: "flex",
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.8,
        ease: "power3.inOut"
    }, "sync");

    /* ----------------------------------
       4. Animate menu links
    ---------------------------------- */
    const navLinks = document.querySelectorAll(".nav-link");
    if (navLinks.length) {
        menuTl.from(navLinks, {
            y: 60,
            opacity: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: "power4.out"
        }, "-=0.4");
    }

    const menuRight = document.querySelectorAll(".menu-right > div");
    if (menuRight.length) {
        menuTl.from(menuRight, {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: "power3.out"
        }, "-=0.3");
    }

    /* ----------------------------------
       Toggle Logic
    ---------------------------------- */
    menuToggle.addEventListener("click", () => {
        if (!isMenuOpen) {
            menuTl.play();
            isMenuOpen = true;
        } else {
            menuTl.reverse();
            isMenuOpen = false;
        }
    });

    /* ----------------------------------
       Close menu when clicking links
    ---------------------------------- */
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (isMenuOpen) {
                menuTl.reverse();
                isMenuOpen = false;
            }
        });
    });
}

function initButtons() {
    if (typeof gsap === 'undefined') return;
    // Only attach hover listeners on pointer/hover devices to avoid stuck states on mobile taps
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const buttons = document.querySelectorAll('.gsap-btn');
    if (!buttons.length) return;

    buttons.forEach(btn => {
        const texts = btn.querySelectorAll('.btn-text');
        if (!texts.length) return;

        const tl = gsap.timeline({ paused: true });
        tl.to(texts, {
            yPercent: -100,
            duration: 0.4,
            ease: "power4.inOut"
        });

        btn.addEventListener('mouseenter', () => tl.play());
        btn.addEventListener('mouseleave', () => tl.reverse());
    });
}

function initFooterAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const footer = document.querySelector(".footer-section");
    if (!footer) return;

    const nowBtn = footer.querySelector(".now-btn");

    // CTA hover expansion (only for devices with hover/pointer)
    if (nowBtn && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        nowBtn.addEventListener("mouseenter", () => {
            gsap.to(nowBtn, {
                paddingLeft: 80,
                paddingRight: 80,
                duration: 0.5,
                ease: "expo.out"
            });
        });

        nowBtn.addEventListener("mouseleave", () => {
            gsap.to(nowBtn, {
                paddingLeft: 48,
                paddingRight: 48,
                duration: 0.5,
                ease: "expo.out"
            });
        });
    }

    // Footer reveal
    const footerTl = gsap.timeline({
        scrollTrigger: {
            trigger: footer,
            start: "top 85%"
        }
    });

    const ctaHeadings = footer.querySelectorAll(".cta-area h1");
    if (ctaHeadings.length) {
        footerTl.from(ctaHeadings, {
            y: 80,
            opacity: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "power4.out"
        });
    }

    if (nowBtn) {
        footerTl.from(nowBtn, {
            y: 25,
            scale: 0.9,
            opacity: 0,
            duration: 0.7,
            ease: "expo.out",
            clearProps: "all"
        }, "-=0.5");
    }

    const infoBlocks = footer.querySelectorAll(".footer-grid .info-block");
    if (infoBlocks.length) {
        footerTl.from(infoBlocks, {
            y: 25,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.4");
    }
}

function initCustomCursor() {
    // Only run on desktop devices that support fine hover
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (typeof gsap === 'undefined') return;

    // Clean up any old cursor elements if present
    const oldDot = document.querySelector(".custom-cursor-dot");
    if (oldDot) oldDot.remove();
    const oldRing = document.querySelector(".custom-cursor-ring");
    if (oldRing) oldRing.remove();

    // Inject sleek single cursor element
    let cursor = document.querySelector(".custom-cursor");
    if (!cursor) {
        cursor = document.createElement("div");
        cursor.className = "custom-cursor";
        document.body.appendChild(cursor);
    }

    gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        opacity: 0,
        pointerEvents: "none"
    });

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let isVisible = false;
    let isHovering = false;

    const setCursorX = gsap.quickSetter(cursor, "x", "px");
    const setCursorY = gsap.quickSetter(cursor, "y", "px");

    window.addEventListener("mousemove", (e) => {
        if (!isVisible) {
            isVisible = true;
            gsap.to(cursor, { opacity: 1, duration: 0.25 });
        }
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener("mouseleave", () => {
        isVisible = false;
        gsap.to(cursor, { opacity: 0, duration: 0.25 });
    });

    document.addEventListener("mouseenter", () => {
        isVisible = true;
        gsap.to(cursor, { opacity: 1, duration: 0.25 });
    });

    // Tactile press feedback on click
    document.addEventListener("mousedown", () => {
        gsap.to(cursor, { scale: isHovering ? 2.8 : 0.75, duration: 0.15, ease: "power2.out" });
    });

    document.addEventListener("mouseup", () => {
        gsap.to(cursor, { scale: isHovering ? 3.6 : 1, duration: 0.25, ease: "power2.out" });
    });

    // Animate smoothly using GSAP ticker with responsive lerp
    const cursorTicker = () => {
        pos.x += (mouse.x - pos.x) * 0.25;
        pos.y += (mouse.y - pos.y) * 0.25;

        setCursorX(pos.x);
        setCursorY(pos.y);
    };
    gsap.ticker.add(cursorTicker);

    // Performant event delegation for hover states
    const hoverSelector = "a, button, [role='button'], .skill-item, #menu-toggle, .gsap-btn, input, textarea, select, .project-card, .service-item";

    document.addEventListener("mouseover", (e) => {
        const target = e.target.closest(hoverSelector);
        const related = e.relatedTarget ? e.relatedTarget.closest(hoverSelector) : null;
        if (target && target !== related) {
            isHovering = true;
            cursor.classList.add("hover");
            gsap.to(cursor, { scale: 3.6, duration: 0.3, ease: "power2.out" });
        }
    });

    document.addEventListener("mouseout", (e) => {
        const target = e.target.closest(hoverSelector);
        const related = e.relatedTarget ? e.relatedTarget.closest(hoverSelector) : null;
        if (target && target !== related) {
            isHovering = false;
            cursor.classList.remove("hover");
            gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
        }
    });
}

function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
    });
    if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
    }
    if (typeof gsap !== 'undefined') {
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }
    window.lenis = lenis;
}

function homepageanimation() {
    const home = document.querySelector(".home");
    const slmm = document.querySelector(".slmm");
    const vdiv = document.querySelector(".vdiv");
    if (!home || !slmm || !vdiv) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    const initialScale = isMobile ? 2.5 : 3.5;
    const lftShift = isMobile ? -8 : -15;
    const rgtShift = isMobile ? 8 : 15;

    // Establish deterministic initial properties
    gsap.set(vdiv, { '--clip': "100%" });
    gsap.set(slmm, { scale: initialScale });

    const lft = document.querySelectorAll(".lft");
    if (lft.length) gsap.set(lft, { xPercent: 0 });

    const rgt = document.querySelectorAll(".rgt");
    if (rgt.length) gsap.set(rgt, { xPercent: 0 });

    const botmtext = document.querySelector(".botmtext");
    if (botmtext) gsap.set(botmtext, { opacity: 1, y: 0 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: home,
            start: "top top",
            end: "bottom bottom",
            scrub: isMobile ? 0.3 : 0.6,
        },
    });

    // Explicit fromTo ensures perfect 2-way scrubbing without getting stuck when scrolling back up
    tl.fromTo(vdiv, 
        { '--clip': "100%" }, 
        { '--clip': "0%", ease: "none" }, 
        'a'
    );

    tl.fromTo(slmm, 
        { scale: initialScale }, 
        { scale: 1, ease: "none" }, 
        'a'
    );

    if (botmtext) {
        tl.fromTo(botmtext, 
            { opacity: 1, y: 0 }, 
            { opacity: 0, y: isMobile ? -25 : -50, ease: "none" }, 
            'a'
        );
    }

    if (lft.length) {
        tl.fromTo(lft, 
            { xPercent: 0 }, 
            { xPercent: lftShift, stagger: 0.03, ease: "none" }, 
            'b'
        );
    }

    if (rgt.length) {
        tl.fromTo(rgt, 
            { xPercent: 0 }, 
            { xPercent: rgtShift, stagger: 0.03, ease: "none" }, 
            'b'
        );
    }
}

function servicesAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const servicesSection = document.querySelector(".services-section");
    if (!servicesSection) return;

    // Heading animation
    const heading = servicesSection.querySelector("h1");
    if (heading) {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: servicesSection,
                start: "top 75%",
                end: "top 30%",
                scrub: 1
            },
            y: 80,
            opacity: 0,
            ease: "power4.out"
        });
    }

    // Subheading text
    const paragraph = servicesSection.querySelector("p");
    if (paragraph) {
        gsap.from(paragraph, {
            scrollTrigger: {
                trigger: servicesSection,
                start: "top 70%",
                end: "top 40%",
                scrub: 1
            },
            y: 40,
            opacity: 0,
            ease: "power4.out"
        });
    }

    // Service cards animation
    const serviceBoxes = servicesSection.querySelectorAll(".service-box");
    if (serviceBoxes.length) {
        gsap.from(serviceBoxes, {
            scrollTrigger: {
                trigger: servicesSection,
                start: "top 65%",
                end: "bottom bottom",
                scrub: 1
            },
            y: 60,
            opacity: 0,
            stagger: 0.15,
            ease: "power4.out"
        });
    }
}

function capsule() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const capsules = document.querySelector(".capsules");
    const secondCapsule = document.querySelector(".capsule:nth-child(2)");
    if (!capsules || !secondCapsule) return;

    gsap.to(secondCapsule, {
        scrollTrigger: {
            trigger: capsules,
            start: "top 70%",
            end: "bottom bottom",
            scrub: 1
        },
        y: 0,
        ease: "power4.out",
    });
}

function colorchange() {
    if (typeof ScrollTrigger === 'undefined') return;
    const sections = document.querySelectorAll("section[data-color]");
    if (!sections.length) return;

    sections.forEach(function (e) {
        ScrollTrigger.create({
            trigger: e,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: function () {
                const theme = e.getAttribute("data-color");
                if (theme) {
                    document.body.setAttribute("theme", theme);
                }
            },
            onEnterBack: function () {
                const theme = e.getAttribute("data-color");
                if (theme) {
                    document.body.setAttribute("theme", theme);
                }
            }
        });
    });
}

// Skills Section Animations
function skillsAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems.length) return;

    const isMobile = window.innerWidth < 768;

    // Fade in skill items on scroll
    skillItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            y: 25,
            opacity: 0,
            duration: 0.6,
            delay: isMobile ? 0 : index * 0.08,
            ease: 'power3.out'
        });
    });

    // Micro-interactions on hover (only on hover/pointer devices)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        skillItems.forEach((item) => {
            const border = item.querySelector('.border-b');
            const number = item.querySelector('.skill-number');
            const title = item.querySelector('.skill-title');
            const percent = item.querySelector('.skill-percent');

            item.addEventListener('mouseenter', function () {
                if (border) gsap.to(border, { borderColor: 'var(--accent-primary)', duration: 0.3, ease: 'power2.out' });
                if (number) gsap.to(number, { opacity: 0.6, scale: 1.05, duration: 0.3, ease: 'power2.out' });
                if (title) gsap.to(title, { x: 8, color: 'var(--accent-primary)', duration: 0.3, ease: 'power2.out' });
                if (percent) gsap.to(percent, { opacity: 1, scale: 1.1, color: 'var(--accent-primary)', duration: 0.3, ease: 'power2.out' });
            });

            item.addEventListener('mouseleave', function () {
                if (border) gsap.to(border, { borderColor: 'var(--border-dark)', duration: 0.3, ease: 'power2.out' });
                if (number) gsap.to(number, { opacity: 0.3, scale: 1, duration: 0.3, ease: 'power2.out' });
                if (title) gsap.to(title, { x: 0, color: 'var(--text-primary-dark)', duration: 0.3, ease: 'power2.out' });
                if (percent) gsap.to(percent, { opacity: 0.5, scale: 1, color: 'var(--text-secondary-dark)', duration: 0.3, ease: 'power2.out' });
            });
        });
    }
}

// ABOUT ME Section Animations
function aboutAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    const imgTop = aboutSection.querySelector('.about-image-top');
    const imgBottom = aboutSection.querySelector('.about-image-bottom');

    // Fade in images on scroll
    if (imgTop) {
        gsap.to(imgTop, {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: 20,
            y: 20,
            duration: 1,
            ease: 'power3.out'
        });

        // Parallax effect on images
        gsap.to(imgTop, {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -30,
            ease: 'none'
        });
    }

    if (imgBottom) {
        gsap.to(imgBottom, {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            x: -20,
            y: -20,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });

        // Parallax effect on images
        gsap.to(imgBottom, {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: 30,
            ease: 'none'
        });
    }
}

// Window resize handler: only refresh on width changes (ignore mobile address bar height toggles)
let lastWidth = window.innerWidth;
let resizeTimeout;
window.addEventListener("resize", () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 200);
});

// Clean DOMContentLoaded registration and initialization block
window.addEventListener("DOMContentLoaded", () => {
    initSmoothScroll();
    initMenu();
    initButtons();
    initFooterAnimations();
    initCustomCursor();

    homepageanimation();
    servicesAnimation();
    colorchange();

    capsule();
    skillsAnimations();
    aboutAnimations();
    initAboutPageAnimations();
});

function initAboutPageAnimations() {
    const heading = document.querySelector('.about-heading');
    if (!heading) return;

    gsap.set('.about-heading', { y: 50 });
    gsap.set('.about-content', { x: 50 });
    gsap.set('.quote-text', { y: 30 });
    gsap.set('.quote-author', { x: -20 });
    gsap.set('.workspace-image', { scale: 0.95 });
    gsap.set('.outside-work-section', { y: 40 });

    // Hero section
    gsap.to('.about-heading', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.to('.about-content', {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5
    });

    // Quote section
    if (document.querySelector('.quote-section')) {
        const quoteTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.quote-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        quoteTimeline.to('.quote-text', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out'
        })
        .to('.quote-author', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4');
    }

    // Workspace image
    if (document.querySelector('.workspace-image')) {
        gsap.to('.workspace-image', {
            scrollTrigger: {
                trigger: '.workspace-image',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out'
        });
    }

    // Outside of work section
    const filmSection = document.querySelector('.outside-work-section');
    const filmCamera = document.querySelector('.film-camera');

    if (filmCamera) {
        gsap.to(filmCamera, {
            scrollTrigger: {
                trigger: '.outside-work-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0.6,
            rotation: 360,
            duration: 2,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.to('.film-camera-svg circle', {
                    rotation: 360,
                    transformOrigin: 'center',
                    duration: 4,
                    repeat: -1,
                    ease: 'none'
                });

                gsap.to('.lens-letter', {
                    rotation: 360,
                    transformOrigin: 'center',
                    duration: 3,
                    repeat: -1,
                    ease: 'linear'
                });
            }
        });

        filmCamera.addEventListener('mouseenter', () => {
            gsap.to('.lens-letter', {
                opacity: 1,
                duration: 0.3,
                scale: 1.2,
                ease: 'power2.out'
            });
        });

        filmCamera.addEventListener('mouseleave', () => {
            gsap.to('.lens-letter', {
                opacity: 0.8,
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    }

    if (filmSection) {
        gsap.to('.outside-work-section', {
            scrollTrigger: {
                trigger: '.outside-work-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }

    if (document.querySelector('.film-title')) {
        gsap.to('.film-title', {
            scrollTrigger: {
                trigger: '.film-title',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            ease: 'steps(1)',
            onComplete: () => {
                gsap.set('.film-title', { opacity: 1 });
            }
        });
    }

    if (filmSection && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        filmSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = filmSection.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            const filmTexts = document.querySelectorAll('.film-text');
            filmTexts.forEach((text, index) => {
                const depth = (index + 1) * 15;
                gsap.to(text, {
                    x: x * depth,
                    y: y * depth,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });
        });

        filmSection.addEventListener('mouseleave', () => {
            const filmTexts = document.querySelectorAll('.film-text');
            filmTexts.forEach(text => {
                gsap.to(text, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });
        });
    }
}
