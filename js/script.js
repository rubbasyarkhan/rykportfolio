
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
    if (!menuToggle || !fullMenu) return;

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
    menuTl.to(navCenter, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.2,
        ease: "power2.out"
    }, "sync");

    /* ----------------------------------
       2. Morph hamburger → X
    ---------------------------------- */
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
    menuTl.from(".nav-link", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power4.out"
    }, "-=0.4");

    menuTl.from(".menu-right > div", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out"
    }, "-=0.3");

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
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            menuTl.reverse();
            isMenuOpen = false;
        });
    });
}


function initButtons() {
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
    const nowBtn = document.querySelector(".now-btn");
    const footer = document.querySelector(".footer-section");

    if (!nowBtn || !footer) return;

    // CTA hover expansion (only for devices with hover/pointer)
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
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
    gsap.timeline({
        scrollTrigger: {
            trigger: ".footer-section",
            start: "top 85%"
        }
    })
        .from(".cta-area h1", {
            y: 120,
            opacity: 0,
            stagger: 0.08,
            duration: 1.0,
            ease: "power4.out"
        })
        .from(".now-btn", {
            y: 30,
            scale: 0.85,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
            clearProps: "all"
        }, "-=0.5")
        .from(".footer-grid .info-block", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out"
        }, "-=0.4");
}

function initFooterCursorVideo() {
    // Only run on desktop devices that support fine hover
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const footer = document.querySelector(".footer-section");
    const cursorVideo = document.querySelector(".footer-cursor-video");
    if (!footer || !cursorVideo) return;
    const links = footer.querySelectorAll("a");

    let lastX = 0;
    let lastY = 0;

    footer.addEventListener("mouseenter", () => {
        gsap.to(cursorVideo, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "expo.out"
        });
    });

    footer.addEventListener("mouseleave", () => {
        gsap.to(cursorVideo, {
            opacity: 0,
            scale: 0.8,
            rotateX: 0,
            rotateY: 0,
            duration: 0.4,
            ease: "expo.out"
        });
    });

    footer.addEventListener("mousemove", (e) => {
        const x = e.clientX;
        const y = e.clientY;

        const dx = x - lastX;
        const dy = y - lastY;

        lastX = x;
        lastY = y;

        const tiltX = gsap.utils.clamp(-12, 12, dy * -0.6);
        const tiltY = gsap.utils.clamp(-12, 12, dx * 0.6);

        gsap.to(cursorVideo, {
            x,
            y,
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 800,
            duration: 0.35,
            ease: "power3.out"
        });
    });

    // Disable over links
    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            gsap.to(cursorVideo, {
                opacity: 0,
                scale: 0.7,
                duration: 0.25,
                ease: "power2.out"
            });
        });

        link.addEventListener("mouseleave", () => {
            gsap.to(cursorVideo, {
                opacity: 1,
                scale: 1,
                duration: 0.25,
                ease: "power2.out"
            });
        });
    });
}




// Ensure this is called in your main init block




function homepageanimation() {
    const home = document.querySelector(".home");
    const slmm = document.querySelector(".slmm");
    const vdiv = document.querySelector(".vdiv");
    if (!home || !slmm || !vdiv) return;

    const isMobile = window.innerWidth < 768;
    gsap.set(".slmm", {
        scale: isMobile ? 3.0 : 4.5
    });

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".home",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
        },
    });

    tl.to(".vdiv", {
        '--clip': "0%",
        ease: "none",
    }, 'a');

    tl.to(".slmm", {
        scale: 1,
        ease: "none",
    }, 'a');

    tl.to(".lft", {
        xPercent: -8,
        stagger: .02,
        ease: "none"
    }, 'b');

    tl.to(".rgt", {
        xPercent: 8,
        stagger: .02,
        ease: "none"
    }, 'b');

    tl.to(".botmtext", {
        opacity: 0,
        y: -40,
        ease: "none",
    }, 'a');
}

function servicesAnimation() {
    const servicesSection = document.querySelector(".services-section");
    if (!servicesSection) return;

    // Heading animation
    gsap.from(".services-section h1", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 75%",
            end: "top 30%",
            scrub: 1
        },
        y: 100,
        opacity: 0,
        ease: "power4.out"
    });

    // Subheading text
    gsap.from(".services-section p", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 70%",
            end: "top 40%",
            scrub: 1
        },
        y: 50,
        opacity: 0,
        ease: "power4.out"
    });

    // Service cards animation
    gsap.from(".service-box", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 65%",
            end: "bottom bottom",
            scrub: 1
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        ease: "power4.out"
    });
}

function loco() {
    if (typeof LocomotiveScroll === 'undefined') return;
    try {
        new LocomotiveScroll();
    } catch (e) {
        console.warn("LocomotiveScroll init error:", e);
    }
}

function capsule() {
    const capsules = document.querySelector(".capsules");
    if (!capsules) return;

    gsap.to(".capsule:nth-child(2)", {
        scrollTrigger: {
            trigger: ".capsules",
            start: "top 70%",
            end: "bottom bottom",
            scrub: 1
        },
        y: 0,
        ease: "power4.out",
    });
}

function colorchange() {
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

function servicesPageAnimation() {
    const header = document.querySelector(".header-content");
    const serviceItems = document.querySelectorAll(".service-item");
    if (!header && !serviceItems.length) return;

    // 1. Reveal Header on Load
    if (header) {
        gsap.from(".header-content h1, .header-content p", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out"
        });
    }

    // 2. Scroll-triggered reveal for each service item
    serviceItems.forEach((item) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 80%", // Starts when item is 80% down the screen
                toggleActions: "play none none reverse"
            }
        });

        const leftCol = item.querySelector(".left-col");
        const rightCol = item.querySelector(".right-col");
        const borderT = item.querySelector(".border-t");

        if (leftCol) {
            tl.from(leftCol, {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "start");
        }
        if (rightCol) {
            tl.from(rightCol, {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                ease: "expo.out"
            }, "start");
        }
        if (borderT) {
            tl.from(borderT, {
                width: 0,
                duration: 1.5,
                ease: "power4.inOut"
            }, "start");
        }
    });

    // 3. Hover Effect: Magnetic Arrow for Links
    const links = document.querySelectorAll(".actions a");
    links.forEach(link => {
        const arrow = link.querySelector(".arrow");
        if (arrow) {
            link.addEventListener("mouseenter", () => {
                gsap.to(arrow, { x: 5, repeat: -1, yoyo: true, duration: 0.3 });
            });
            link.addEventListener("mouseleave", () => {
                gsap.to(arrow, { x: 0, overwrite: true });
            });
        }
    });
}


// Clean DOMContentLoaded registration and initialization block
window.addEventListener("DOMContentLoaded", () => {
    // Only call essential init functions once
    initMenu();
    initButtons();
    initFooterAnimations();
    initFooterCursorVideo();

    // Call your existing animations
    loco();
    homepageanimation();
    servicesPageAnimation();
    colorchange();

    capsule();
    skillsAnimations();
    aboutAnimations();
});




// Skills Section Animations
function skillsAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems.length) return;

    // Fade in skill items on scroll
    skillItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Micro-interactions on hover
    skillItems.forEach((item) => {
        const border = item.querySelector('.border-b');
        const number = item.querySelector('.skill-number');
        const title = item.querySelector('.skill-title');
        const percent = item.querySelector('.skill-percent');

        item.addEventListener('mouseenter', function () {
            if (border) {
                gsap.to(border, {
                    borderColor: 'var(--accent-primary)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            if (number) {
                gsap.to(number, {
                    opacity: 0.6,
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            if (title) {
                gsap.to(title, {
                    x: 8,
                    color: 'var(--accent-primary)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            if (percent) {
                gsap.to(percent, {
                    opacity: 1,
                    scale: 1.1,
                    color: 'var(--accent-primary)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        item.addEventListener('mouseleave', function () {
            if (border) {
                gsap.to(border, {
                    borderColor: 'var(--border-dark)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            if (number) {
                gsap.to(number, {
                    opacity: 0.3,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            if (title) {
                gsap.to(title, {
                    x: 0,
                    color: 'var(--text-primary-dark)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            if (percent) {
                gsap.to(percent, {
                    opacity: 0.5,
                    scale: 1,
                    color: 'var(--text-secondary-dark)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// ABOUT ME Section Animations
function aboutAnimations() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    // Fade in images on scroll
    gsap.to('.about-image-top', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        x: 20,
        y: 20,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.to('.about-image-bottom', {
        scrollTrigger: {
            trigger: '.about-section',
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
    gsap.to('.about-image-top', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -30,
        ease: 'none'
    });

    gsap.to('.about-image-bottom', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: 30,
        ease: 'none'
    });
}

// Window resize handler to maintain responsiveness
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 200);
});
