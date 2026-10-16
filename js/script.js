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
        gsap.to(cursor, { scale: isHovering ? 2.1 : 0.85, duration: 0.15, ease: "power2.out" });
    });

    document.addEventListener("mouseup", () => {
        gsap.to(cursor, { scale: isHovering ? 2.5 : 1, duration: 0.25, ease: "power2.out" });
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
    const hoverSelector = "a, button, [role='button'], .skill-item, .discipline-row, .discipline-card, #menu-toggle, .gsap-btn, input, textarea, select, .project-card, .service-item";

    document.addEventListener("mouseover", (e) => {
        const target = e.target.closest(hoverSelector);
        const related = e.relatedTarget ? e.relatedTarget.closest(hoverSelector) : null;
        if (target && target !== related) {
            isHovering = true;
            cursor.classList.add("hover");
            gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "power2.out" });
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

// Interactive Artistic Chromatic Drawing Canvas (Exclusive to light sections #F1EFEB)
function initDrawingCanvas() {
    // Only run on desktop devices with fine hover capability
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let canvas = document.querySelector(".interactive-draw-canvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.className = "interactive-draw-canvas";
        canvas.id = "interactive-draw-canvas";
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = window.devicePixelRatio || 1;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    function isOverLightSection(x, y) {
        // If full navigation menu is open, do not draw
        const fullMenu = document.getElementById("full-menu");
        if (fullMenu && fullMenu.classList.contains("active")) {
            return false;
        }

        const elem = document.elementFromPoint(x, y);
        if (!elem) return false;

        // Disallow black sections, dark hero, skills, and dark footer
        if (elem.closest('footer[data-color="black"]') ||
            elem.closest('section[data-color="black"]') ||
            elem.closest('.home') ||
            elem.closest('.skills-section') ||
            elem.closest('.dark-section')) {
            return false;
        }

        // Disallow cards, project items, media, and preview containers ("colors should not work on cards")
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
            'figure'
        ].join(', ');

        if (elem.closest(cardSelectors)) {
            return false;
        }

        // Disallow all text elements, text content sections, and typography across the full website
        const textSelectors = [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'span', 'a', 'blockquote', 'q', 'cite',
            'ul', 'ol', 'li',
            'button', 'input', 'textarea', 'label', 'select', 'form',
            'code', 'pre', 'em', 'strong', 'b', 'i',
            '.about-heading', '.about-content', '.quote-section',
            '.editorial-container', '.film-text', '.service-content',
            '.project-info', '.info-block', '.cta-area', 'nav',
            '#nav-center', '#full-menu', '.bento-card'
        ].join(', ');

        if (elem.closest(textSelectors)) {
            return false;
        }

        // If the element directly wraps any readable text nodes, do not draw
        if (elem.childNodes && elem.childNodes.length) {
            for (let i = 0; i < elem.childNodes.length; i++) {
                const node = elem.childNodes[i];
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
                    return false;
                }
            }
        }

        // Allow explicitly marked white sections or about section
        if (elem.closest('section[data-color="white"]') || elem.closest('.about-section')) {
            return true;
        }

        // Active white theme on body
        if (document.body.getAttribute("theme") === "white") {
            if (!elem.closest('footer') && !elem.closest('.home') && !elem.closest('.skills-section')) {
                return true;
            }
        }

        // Color brightness fallback for #F1EFEB or light containers
        let curr = elem;
        while (curr && curr !== document.documentElement) {
            const bg = window.getComputedStyle(curr).backgroundColor;
            if (bg && bg !== "transparent" && !bg.includes("rgba(0, 0, 0, 0)")) {
                const rgb = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                if (rgb) {
                    const brightness = (Number(rgb[1]) * 299 + Number(rgb[2]) * 587 + Number(rgb[3]) * 114) / 1000;
                    return brightness > 180;
                }
            }
            curr = curr.parentElement;
        }

        return false;
    }

    const strokes = [];
    let currentStroke = null;
    let lastPoint = null;
    let hue = 220; // Starting chromatic hue
    let isLoopRunning = false;

    function addPoint(clientX, clientY) {
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

            // Ignore jitter / imperceptible micro-movements
            if (dist < 2.5) return;

            // If mouse hopped across screen, start a fresh stroke
            if (dist > 120) {
                currentStroke = null;
            }
        }

        // Dynamic chromatic color shift based on cursor travel
        hue = (hue + Math.min(dist * 0.45, 6)) % 360;

        // Velocity-based brush width: fuller stroke when slow, elegant ribbon taper when fast
        const targetWidth = Math.max(10, Math.min(30, 36 - speed * 5));

        const point = {
            x: pageX,
            y: pageY,
            midX: pageX,
            midY: pageY,
            hue,
            width: targetWidth,
            age: 0,
            maxAge: 56, // ~0.9s - 1.2s graceful dissolve
            time: now
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
            requestAnimationFrame(render);
        }
    }

    window.addEventListener("mousemove", (e) => {
        addPoint(e.clientX, e.clientY);
    }, { passive: true });

    document.addEventListener("mouseleave", () => {
        currentStroke = null;
        lastPoint = null;
    });

    const wakeAnimation = () => {
        if (!isLoopRunning && strokes.length > 0) {
            isLoopRunning = true;
            requestAnimationFrame(render);
        }
    };

    window.addEventListener("scroll", wakeAnimation, { passive: true });
    if (window.lenis) {
        window.lenis.on('scroll', wakeAnimation);
    }

    function render() {
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
                const alpha = Math.max(0, 1 - (p.age / p.maxAge));
                if (alpha > 0.01) {
                    ctx.beginPath();
                    ctx.fillStyle = `hsla(${p.hue}, 92%, 46%, ${(alpha * 0.9).toFixed(3)})`;
                    ctx.arc(p.x - scrollX, p.y - scrollY, p.width * 0.5 * (0.35 + 0.65 * alpha), 0, Math.PI * 2);
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
                if ((p0MidX < -50 && p1MidX < -50) || (p0MidX > width + 50 && p1MidX > width + 50) ||
                    (p0MidY < -50 && p1MidY < -50) || (p0MidY > height + 50 && p1MidY > height + 50)) {
                    continue;
                }

                ctx.beginPath();
                ctx.strokeStyle = `hsla(${p1.hue}, 92%, 46%, ${(alpha * 0.9).toFixed(3)})`;
                ctx.lineWidth = Math.max(4, p1.width * (0.35 + 0.65 * alpha));
                ctx.lineCap = "round";
                ctx.lineJoin = "round";

                ctx.moveTo(p0MidX, p0MidY);
                ctx.quadraticCurveTo(p0X, p0Y, p1MidX, p1MidY);
                ctx.stroke();
            }
        }

        if (activeCount > 0) {
            requestAnimationFrame(render);
        } else {
            isLoopRunning = false;
            ctx.clearRect(0, 0, width, height);
        }
    }
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

// Skills & Disciplines Section Animations
function skillsAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Animate discipline cards (2-column responsive layout)
    const disciplineCards = document.querySelectorAll('.discipline-card');
    if (disciplineCards.length) {
        disciplineCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 35,
                opacity: 0,
                duration: 0.7,
                delay: (index % 2) * 0.1,
                ease: 'power3.out'
            });
        });
    }

    // Animate discipline typography rows
    const disciplineRows = document.querySelectorAll('.discipline-row');
    if (disciplineRows.length) {
        disciplineRows.forEach((row, index) => {
            gsap.from(row, {
                scrollTrigger: {
                    trigger: row,
                    start: 'top 88%',
                    toggleActions: 'play none none reverse'
                },
                y: 35,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
    }

    // Fallback for .skill-item if present
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length) {
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
                delay: index * 0.08,
                ease: 'power3.out'
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
    initDrawingCanvas();

    homepageanimation();
    servicesAnimation();
    colorchange();

    capsule();
    skillsAnimations();
    aboutAnimations();
    initAboutPageAnimations();
    initRyk3DAvatar();
    initTestimonialAnimation();
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

    // Bento Grid section animations
    const bentoCards = document.querySelectorAll('.bento-card');
    if (bentoCards.length) {
        gsap.from(bentoCards, {
            scrollTrigger: {
                trigger: '.bento-grid-section',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            y: 45,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out'
        });
    }
}

// ----------------------------------------------------
// Interactive 3D Avatar Controller (RYK Character Rig)
// ----------------------------------------------------
function initRyk3DAvatar() {
    const card = document.getElementById("ryk-avatar-card");
    const rig = document.getElementById("avatar-character-rig");
    const glare = document.getElementById("avatar-glare");
    const glow = document.getElementById("avatar-ambient-glow");
    const orbitRing = document.querySelector(".avatar-orbit-ring");

    if (!card || !rig || typeof gsap === 'undefined') return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isHovering = false;
    let ringAngle = 0;
    const startTime = Date.now();

    // Mouse tracking over card
    card.addEventListener("mouseenter", () => {
        isHovering = true;
        gsap.to(card, {
            scale: 1.025,
            duration: 0.35,
            ease: "power2.out"
        });
    });

    card.addEventListener("mouseleave", () => {
        isHovering = false;
        targetRotX = 0;
        targetRotY = 0;
        gsap.to(card, {
            scale: 1.0,
            duration: 0.5,
            ease: "power2.out"
        });
        if (glare) {
            gsap.to(glare, { opacity: 0, duration: 0.3 });
        }
        if (glow) {
            glow.style.background = `radial-gradient(circle at 50% 50%, rgba(244, 185, 70, 0.25), transparent 70%)`;
        }
    });

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        // Normalized coordinate from -1 to 1 relative to center of card
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        // Turn head and bust towards cursor with responsive limits
        targetRotY = x * 24;  // max 24deg yaw
        targetRotX = -y * 18; // max 18deg pitch

        // Dynamic specular glare across glasses
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
    });

    // Tap / Click pop bounce effect (funky squash & stretch)
    card.addEventListener("click", () => {
        gsap.timeline()
            .to(rig, {
                scale: 0.88,
                rotateZ: -5,
                duration: 0.12,
                ease: "power2.in"
            })
            .to(rig, {
                scale: 1.14,
                rotateZ: 5,
                duration: 0.22,
                ease: "back.out(2.5)"
            })
            .to(rig, {
                scale: 1.0,
                rotateZ: 0,
                duration: 0.35,
                ease: "elastic.out(1, 0.45)"
            });

        // Flash orbit ring on pop
        if (orbitRing) {
            gsap.fromTo(orbitRing,
                { borderColor: "rgba(255, 255, 255, 0.95)", scale: 1.2 },
                { borderColor: "rgba(244, 185, 70, 0.3)", scale: 1.0, duration: 0.6, ease: "power2.out" }
            );
        }
    });

    // Continuous physics ticker for autonomous idle movement & smooth lerp
    gsap.ticker.add(() => {
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
    });
}

// ----------------------------------------------------
// Testimonial Scroll Animation
// ----------------------------------------------------
function initTestimonialAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    const card = document.querySelector('.testimonial-card');
    if (!card) return;

    gsap.from(card, {
        scrollTrigger: {
            trigger: '.testimonial-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
    });
}
