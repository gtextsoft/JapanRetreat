document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    const closeMobileMenu = () => {
        if (!navLinks) return;
        navLinks.classList.remove('active');
        if (mobileBtn) {
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.setAttribute('aria-label', 'Open menu');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    };

    const toggleMobileMenu = () => {
        if (!navLinks || !mobileBtn) return;
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        mobileBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        const icon = mobileBtn.querySelector('i');
        if (!icon) return;
        if (isOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMobileMenu);
        mobileBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }

    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 24);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Smooth scrolling for in-page anchors only (avoids breaking #top / empty hash)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                e.preventDefault();
                return;
            }
            if (href === '#top') {
                e.preventDefault();
                closeMobileMenu();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            closeMobileMenu();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0'; // Initial state
        observer.observe(el);
    });
});
