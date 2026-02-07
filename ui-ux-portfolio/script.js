document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Cursor scale on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .case-study, .process-card');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(4)';
            cursor.style.background = 'rgba(93, 95, 239, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'var(--primary)';
        });
    });

    // 2. Parallax Blobs
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');

        blob1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        blob2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    });

    // 3. Intersection Observer for Smooth Reveal
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    // Initial styles and classes for reveal
    const revealElements = document.querySelectorAll('.case-study, .process-card, .timeline-item, .hero h1, .hero .description');

    // Inject dynamic CSS for reveal
    const style = document.createElement('style');
    style.textContent = `
        .reveal-hidden {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-visible {
            opacity: 1;
            transform: translateY(0);
        }
        .case-study:nth-child(even).reveal-hidden {
            transform: translateY(40px);
        }
    `;
    document.head.appendChild(style);

    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
        observer.observe(el);
    });

    // 4. Smooth Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
