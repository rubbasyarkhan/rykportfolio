// Skills Section Animations

function initSkillsAnimations() {
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

    // Reveal skill percentages on scroll
    gsap.utils.toArray('.skill-percent').forEach((element) => {
        const value = element.getAttribute('data-value');

        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            innerHTML: value + '%',
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out'
        });
    });

    // Subtle border color change on hover
    gsap.utils.toArray('.skill-item').forEach((item) => {
        const border = item.querySelector('.border-b');

        item.addEventListener('mouseenter', function () {
            gsap.to(border, {
                borderColor: 'var(--accent-primary)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', function () {
            gsap.to(border, {
                borderColor: 'var(--border-dark)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Stats fade in
    gsap.utils.toArray('.stat-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillsAnimations);
} else {
    initSkillsAnimations();
}
