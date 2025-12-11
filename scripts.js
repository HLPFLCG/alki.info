// Website Functionality for alki.info

// Cookie Consent Management
class CookieConsent {
    constructor() {
        this.consentGiven = localStorage.getItem('cookieConsent');
        this.init();
    }

    init() {
        const banner = document.getElementById('cookie-banner');
        const acceptBtn = document.getElementById('accept-cookies');
        const declineBtn = document.getElementById('decline-cookies');
        const settingsBtn = document.getElementById('cookie-settings');

        // Show banner if no consent has been given
        if (!this.consentGiven) {
            setTimeout(() => {
                banner.style.display = 'block';
            }, 1000);
        }

        // Handle accept button
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                this.setConsent('accepted');
                banner.style.display = 'none';
                this.loadAnalytics();
            });
        }

        // Handle decline button
        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                this.setConsent('declined');
                banner.style.display = 'none';
            });
        }

        // Handle settings button
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                banner.style.display = banner.style.display === 'block' ? 'none' : 'block';
            });
        }
    }

    setConsent(value) {
        localStorage.setItem('cookieConsent', value);
        this.consentGiven = value;
    }

    loadAnalytics() {
        // Load Google Analytics or other tracking scripts if consent is given
        console.log('Analytics loaded with consent');
    }
}

// Image Management for Header
class ImageManager {
    constructor() {
        this.headerImage = document.getElementById('header-image');
        this.availableImages = [
            'tac.jpeg',
            'sunset.jpeg',
            'hoodie.jpeg',
            'dominos.jpeg',
            'royalhat.jpeg',
            'wall.jpeg'
        ];
        this.currentImageIndex = 0;
        this.init();
    }

    init() {
        // You can implement image rotation or selection logic here
        // For now, we'll keep the current image
        this.preloadImages();
    }

    preloadImages() {
        this.availableImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    changeImage(imageName) {
        if (this.headerImage && this.availableImages.includes(imageName)) {
            this.headerImage.src = imageName;
            this.headerImage.alt = `alki - ${imageName}`;
        }
    }

    rotateImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.availableImages.length;
        this.changeImage(this.availableImages[this.currentImageIndex]);
    }
}

// Button Visibility Management
class ButtonVisibilityManager {
    constructor() {
        this.buttons = document.querySelectorAll('.link-card');
        this.init();
    }

    init() {
        this.updateButtonVisibility();
        this.setupKeyboardShortcuts();
    }

    updateButtonVisibility() {
        this.buttons.forEach(button => {
            const isVisible = button.getAttribute('data-visible') === 'true';
            const platform = button.getAttribute('data-platform');
            
            if (isVisible === 'false') {
                button.style.display = 'none';
            } else {
                button.style.display = 'flex';
            }
        });
    }

    toggleButton(platform, visible) {
        const button = document.querySelector(`[data-platform="${platform}"]`);
        if (button) {
            button.setAttribute('data-visible', visible);
            button.style.display = visible === 'true' ? 'flex' : 'none';
        }
    }

    showAllButtons() {
        this.buttons.forEach(button => {
            button.setAttribute('data-visible', 'true');
            button.style.display = 'flex';
        });
    }

    hideUnusedButtons() {
        const usedPlatforms = ['instagram', 'grouped', 'spotify', 'apple-music', 'label'];
        this.buttons.forEach(button => {
            const platform = button.getAttribute('data-platform');
            if (!usedPlatforms.includes(platform)) {
                button.setAttribute('data-visible', 'false');
                button.style.display = 'none';
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + B to toggle button visibility
            if (e.altKey && e.key === 'b') {
                this.toggleVisibilityMenu();
            }
        });
    }

    toggleVisibilityMenu() {
        // You can implement a modal or menu for managing button visibility
        console.log('Button visibility menu toggled');
    }
}

// SEO and Analytics Enhancements
class SEOManager {
    constructor() {
        this.init();
    }

    init() {
        this.updateDynamicMeta();
        this.trackPageView();
    }

    updateDynamicMeta() {
        // Update meta tags based on current content
        const title = document.title;
        const description = document.querySelector('meta[name="description"]').content;
        
        // Update page title with additional context
        if (!title.includes('alki')) {
            document.title = `alki - ${title}`;
        }
    }

    trackPageView() {
        // Track page views if consent is given
        const consent = localStorage.getItem('cookieConsent');
        if (consent === 'accepted') {
            // Google Analytics page view tracking
            if (typeof gtag !== 'undefined') {
                gtag('config', 'GTM-M8PZP937', {
                    page_title: document.title,
                    page_location: window.location.href
                });
            }
        }
    }
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cookie consent
    const cookieConsent = new CookieConsent();
    
    // Initialize image manager
    const imageManager = new ImageManager();
    
    // Initialize button visibility manager
    const buttonManager = new ButtonVisibilityManager();
    
    // Initialize SEO manager
    const seoManager = new SEOManager();

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading state removal
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    console.log('alki.info website functionality initialized');
});

// Export classes for potential external use
window.CookieConsent = CookieConsent;
window.ImageManager = ImageManager;
window.ButtonVisibilityManager = ButtonVisibilityManager;
window.SEOManager = SEOManager;