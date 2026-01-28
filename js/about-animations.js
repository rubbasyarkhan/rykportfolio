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
