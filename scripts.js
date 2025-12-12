// alki.info - Advanced JavaScript for Premium Link in Bio
// Built with cutting-edge web technologies

class AlkiWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupCustomCursor();
        this.setupThemeToggle();
        this.setupScrollAnimations();
        this.setupCountUpAnimation();
        this.setupIntersectionObserver();
        this.setupHoverEffects();
        this.setupKeyboardNavigation();
        this.setupPerformanceOptimizations();
        this.setupCookieConsent();
        this.initAnalytics();
    }

    // Loading Screen Management - Fixed for Safari
    setupLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        const loadingProgress = document.querySelector('.loading-progress');
        let progress = 0;
        let loadingInterval;

        // Skip loading screen on mobile for better performance
        if (window.innerWidth <= 768) {
            loadingScreen.style.display = 'none';
            document.body.classList.remove('loading');
            this.triggerPageLoadAnimations();
            return;
        }

        const updateProgress = () => {
            progress += 15;
            if (progress > 100) progress = 100;
            
            if (loadingProgress) {
                loadingProgress.style.width = `${progress}%`;
            }
            
            if (progress < 100) {
                loadingInterval = setTimeout(updateProgress, 50);
            } else {
                setTimeout(() => {
                    if (loadingScreen) {
                        loadingScreen.classList.add('hidden');
                    }
                    document.body.classList.remove('loading');
                    this.triggerPageLoadAnimations();
                }, 300);
            }
        };

        loadingInterval = setTimeout(updateProgress, 100);
        
        // Cleanup function to prevent memory leaks
        window.addEventListener('beforeunload', () => {
            if (loadingInterval) {
                clearTimeout(loadingInterval);
            }
        });
    }

    // Custom Cursor - Optimized for Safari
    setupCustomCursor() {
        // Skip custom cursor on mobile and Safari for performance
        if (window.innerWidth <= 768 || /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            document.body.style.cursor = 'auto';
            return;
        }

        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        const cursorDot = cursor.querySelector('.cursor-dot');
        const cursorRing = cursor.querySelector('.cursor-ring');

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let rafId;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            if (cursorDot) {
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
            }
            if (cursorRing) {
                cursorRing.style.left = `${cursorX}px`;
                cursorRing.style.top = `${cursorY}px`;
            }

            rafId = requestAnimationFrame(animateCursor);
        };

        document.addEventListener('mousemove', handleMouseMove);
        rafId = requestAnimationFrame(animateCursor);

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .link-card, .social-link');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursor) cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                if (cursor) cursor.classList.remove('hover');
            });
        });

        // Cleanup
        const cleanup = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };

        window.addEventListener('beforeunload', cleanup);
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('alki-theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('alki-theme', newTheme);
            
            this.triggerThemeChangeAnimation(newTheme);
        });
    }

    // Scroll Animations - Optimized for mobile Safari
    setupScrollAnimations() {
        // Skip heavy animations on mobile
        if (window.innerWidth <= 768) {
            return;
        }

        let ticking = false;
        let lastKnownScrollPosition = 0;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            
            // Skip if scroll position hasn't changed significantly
            if (Math.abs(scrolled - lastKnownScrollPosition) < 5) {
                ticking = false;
                return;
            }

            const parallaxElements = document.querySelectorAll('.gradient-orb, .particle');
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });

            // Header parallax
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const yPos = scrolled * 0.3;
                heroSection.style.transform = `translateY(${yPos}px)`;
                heroSection.style.opacity = 1 - (scrolled * 0.001);
            }

            lastKnownScrollPosition = scrolled;
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        // Use passive listeners for better performance
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Count Up Animation for Stats
    setupCountUpAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number');

        const countUp = (element, target) => {
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCount = () => {
                current += step;
                if (current < target) {
                    element.textContent = this.formatNumber(Math.floor(current));
                    requestAnimationFrame(updateCount);
                } else {
                    element.textContent = this.formatNumber(target);
                }
            };

            updateCount();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    countUp(entry.target, target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.link-card, .featured-release, .exclusive-drop');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    // Advanced Hover Effects
    setupHoverEffects() {
        const linkCards = document.querySelectorAll('.link-card');

        linkCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Alt + T: Toggle theme
            if (e.altKey && e.key === 't') {
                document.getElementById('themeToggle').click();
            }
            
            // Escape: Close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Focus trap for modals
        this.setupFocusTrap();
    }

    // Performance Optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    // Cookie Consent
    setupCookieConsent() {
        const cookieBanner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-cookies');
        const declineBtn = document.getElementById('decline-cookies');
        const settingsBtn = document.getElementById('cookieSettings');

        const consent = localStorage.getItem('alki-cookie-consent');
        
        if (!consent) {
            setTimeout(() => {
                cookieBanner.style.display = 'block';
            }, 2000);
        }

        acceptBtn.addEventListener('click', () => {
            this.setCookieConsent('accepted');
            cookieBanner.style.display = 'none';
            this.loadAnalytics();
        });

        declineBtn.addEventListener('click', () => {
            this.setCookieConsent('declined');
            cookieBanner.style.display = 'none';
        });

        settingsBtn.addEventListener('click', () => {
            cookieBanner.style.display = cookieBanner.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Analytics Integration
    initAnalytics() {
        const consent = localStorage.getItem('alki-cookie-consent');
        if (consent === 'accepted') {
            this.loadAnalytics();
        }

        // Track page interactions
        this.setupEventTracking();
    }

    // Event Tracking
    setupEventTracking() {
        // Track link clicks
        document.querySelectorAll('a[data-platform]').forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.getAttribute('data-platform');
                this.trackEvent('link_click', { platform });
            });
        });

        // Track theme changes
        document.getElementById('themeToggle').addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            this.trackEvent('theme_change', { theme });
        });
    }

    // Utility Functions
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    setCookieConsent(consent) {
        localStorage.setItem('alki-cookie-consent', consent);
    }

    loadAnalytics() {
        // Load Google Analytics or other tracking scripts
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GTM-M8PZP937', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    trackEvent(eventName, params) {
        // Track events with analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
        }
        console.log('Event tracked:', eventName, params);
    }

    triggerPageLoadAnimations() {
        // Trigger animations after page loads
        const elements = document.querySelectorAll('.hero-name, .hero-tagline, .profile-frame');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    triggerThemeChangeAnimation(theme) {
        const body = document.body;
        body.style.transition = 'background 0.3s ease';
        
        // Flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme === 'light' ? 'white' : 'black'};
            opacity: 0.3;
            pointer-events: none;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 300);
        }, 100);
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.style.display = 'none');
    }

    setupFocusTrap() {
        // Implementation for focus trap in modals
    }

    handleResize() {
        // Handle responsive changes
        if (window.innerWidth <= 768) {
            document.querySelector('.custom-cursor').style.display = 'none';
            document.body.style.cursor = 'auto';
        } else {
            document.querySelector('.custom-cursor').style.display = 'block';
            document.body.style.cursor = 'none';
        }
    }
}

// Advanced Link Card Component
class LinkCard {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.addRippleEffect();
        this.addSoundEffect();
        this.addHapticFeedback();
    }

    addRippleEffect() {
        this.element.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = this.element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.element.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }

    addSoundEffect() {
        // Add subtle sound effects on hover/click
        this.element.addEventListener('mouseenter', () => {
            this.playSound('hover');
        });

        this.element.addEventListener('click', () => {
            this.playSound('click');
        });
    }

    addHapticFeedback() {
        if ('vibrate' in navigator) {
            this.element.addEventListener('click', () => {
                navigator.vibrate(10);
            });
        }
    }

    playSound(type) {
        // Placeholder for sound effects
        // Could be implemented with Web Audio API
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const particleContainer = document.querySelector('.animated-bg');
        const particleCount = 5;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
                animation-duration: ${15 + Math.random() * 10}s;
            `;
            particleContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }

    animate() {
        const animateParticles = () => {
            this.particles.forEach(particle => {
                const rect = particle.getBoundingClientRect();
                // Add custom animation logic
            });
            requestAnimationFrame(animateParticles);
        };
        animateParticles();
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const website = new AlkiWebsite();
    
    // Initialize link cards
    document.querySelectorAll('.link-card').forEach(card => {
        new LinkCard(card);
    });

    // Initialize particle system
    if (window.innerWidth > 768) {
        new ParticleSystem();
    }

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('alki.info - Premium Link in Bio loaded successfully 🚀');
});

// Export for potential use
window.AlkiWebsite = AlkiWebsite;
window.LinkCard = LinkCard;
window.ParticleSystem = ParticleSystem;