
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

    buttons.forEach(btn => {
        const texts = btn.querySelectorAll('.btn-text');

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

    // CTA hover expansion
    nowBtn.addEventListener("mouseenter", () => {
        gsap.to(nowBtn, {
            paddingLeft: 110,
            paddingRight: 110,
            duration: 0.6,
            ease: "expo.out"
        });
    });

    nowBtn.addEventListener("mouseleave", () => {
        gsap.to(nowBtn, {
            paddingLeft: 56,
            paddingRight: 56,
            duration: 0.6,
            ease: "expo.out"
        });
    });

    // Footer reveal
    gsap.timeline({
        scrollTrigger: {
            trigger: ".footer-section",
            start: "top 85%"
        }
    })
        .from(".cta-area h1", {
            y: 180,
            rotateX: 10,
            opacity: 0,
            stagger: 0.08,
            duration: 1.1,
            ease: "power4.out"
        })
        .from(".now-btn", {
            y: 40,
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
            clearProps: "all" // Clear all properties after animation
        }, "-=0.6")
        .from(".footer-grid .info-block", {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5");
}
function initFooterCursorVideo() {
    const footer = document.querySelector(".footer-section");
    const cursorVideo = document.querySelector(".footer-cursor-video");
    const links = footer.querySelectorAll("a");

    if (!footer || !cursorVideo) return;

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

    gsap.set(".slmm", {
        scale: 5
    })
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".home",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
        },
    })

    tl.to(".vdiv", {
        '--clip': "0%",
        ease: "none",
    }, 'a')
    tl.to(".slmm", {
        scale: 1,
        ease: "none",
    }, 'a')

    tl.to(".lft", {
        xPercent: -15,
        stagger: .03,
        ease: "none"
    }, 'b')
    tl.to(".rgt", {
        xPercent: 15,
        stagger: .03,
        ease: "none"
    }, 'b')

    tl.to(".botmtext", {
        opacity: 0,
        y: -50,
        ease: "none",
    }, 'a')
}

function servicesAnimation() {

    // Heading animation
    gsap.from(".services-section h1", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 75%",
            end: "top 30%",
            scrub: 1
        },
        y: 120,
        opacity: 0,
        ease: Power4
    });

    // Subheading text
    gsap.from(".services-section p", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 70%",
            end: "top 40%",
            scrub: 1
        },
        y: 60,
        opacity: 0,
        ease: Power4
    });

    // Service cards animation
    gsap.from(".service-box", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 65%",
            end: "bottom bottom",
            scrub: 1
        },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        ease: Power4
    });

}





function loco() {
    (function () {
        const locomotiveScroll = new LocomotiveScroll();
    })();
}

function capsule(params) {
    gsap.to(".capsule:nth-child(2)", {
        scrollTrigger: {
            trigger: ".capsules",
            start: "top 70",
            end: "bottom bottom",
            scrub: 1
        },
        y: 0,
        ease: Power4,
    })
}


function colorchange() {
    document.querySelectorAll("section").forEach(function (e, index, sections) {
        ScrollTrigger.create({
            trigger: e,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: function () {
                document.body.setAttribute("theme", e.dataset.color);
                sections.forEach((section, i) => {
                    gsap.to(section, {
                        opacity: i === index ? 1 : 0.05, // Full opacity for current section, reduced for others
                        duration: 0.5 // Smooth transition
                    });
                });
            },
            onEnterBack: function () {
                document.body.setAttribute("theme", e.dataset.color);
                sections.forEach((section, i) => {
                    gsap.to(section, {
                        opacity: i === index ? 1 : 0.05, // Full opacity for current section, reduced for others
                        duration: 0.5 // Smooth transition
                    });
                });
            }
        });
    });


}

function servicesPageAnimation() {
    // 1. Reveal Header on Load
    gsap.from(".header-content h1, .header-content p", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    });

    // 2. Scroll-triggered reveal for each service item
    const serviceItems = document.querySelectorAll(".service-item");

    serviceItems.forEach((item) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 80%", // Starts when item is 80% down the screen
                toggleActions: "play none none reverse"
            }
        });

        tl.from(item.querySelector(".left-col"), {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "start")
            .from(item.querySelector(".right-col"), {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                ease: "expo.out"
            }, "start")
            .from(item.querySelector(".border-t"), {
                width: 0,
                duration: 1.5,
                ease: "power4.inOut"
            }, "start");
    });

    // 3. Hover Effect: Magnetic Arrow for Links
    const links = document.querySelectorAll(".actions a");
    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            gsap.to(link.querySelector(".arrow"), { x: 5, repeat: -1, yoyo: true, duration: 0.3 });
        });
        link.addEventListener("mouseleave", () => {
            gsap.to(link.querySelector(".arrow"), { x: 0, overwrite: true });
        });
    });
}


function initButtons() {
    const buttons = document.querySelectorAll('.gsap-btn');

    buttons.forEach(btn => {
        const texts = btn.querySelectorAll('.btn-text');

        // Create a timeline for this specific button
        const tl = gsap.timeline({ paused: true });

        tl.to(texts, {
            yPercent: -100, // Moves both spans up by 100% of their height
            duration: 0.5,
            ease: "power4.inOut"
        });

        // Event Listeners
        btn.addEventListener('mouseenter', () => tl.play());
        btn.addEventListener('mouseleave', () => tl.reverse());
    });
}









window.addEventListener("DOMContentLoaded", initButtons);





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
});




// Skills Section Animations
function skillsAnimations() {
    // Fade in skill items on scroll
    gsap.utils.toArray('.skill-item').forEach((item, index) => {
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
    gsap.utils.toArray('.skill-item').forEach((item) => {
        const border = item.querySelector('.border-b');
        const number = item.querySelector('.skill-number');
        const title = item.querySelector('.skill-title');
        const percent = item.querySelector('.skill-percent');

        item.addEventListener('mouseenter', function () {
            // Border color to accent
            gsap.to(border, {
                borderColor: 'var(--accent-primary)',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Number becomes more visible
            gsap.to(number, {
                opacity: 0.6,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Title shifts slightly right
            gsap.to(title, {
                x: 8,
                color: 'var(--accent-primary)',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Percentage becomes more prominent
            gsap.to(percent, {
                opacity: 1,
                scale: 1.1,
                color: 'var(--accent-primary)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', function () {
            // Reset border
            gsap.to(border, {
                borderColor: 'var(--border-dark)',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Reset number
            gsap.to(number, {
                opacity: 0.3,
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Reset title
            gsap.to(title, {
                x: 0,
                color: 'var(--text-primary-dark)',
                duration: 0.3,
                ease: 'power2.out'
            });

            // Reset percentage
            gsap.to(percent, {
                opacity: 0.5,
                scale: 1,
                color: 'var(--text-secondary-dark)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ABOUT ME Section Animations
function aboutAnimations() {
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

colorchange()

loco()

homepageanimation()
servicesAnimation()
capsule()
skillsAnimations()
aboutAnimations()
