// Self-Service Portal JavaScript

class SelfServicePortal {
    constructor() {
        this.currentStep = 1;
        this.selectedTemplate = 'musician';
        this.formData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSmoothScroll();
        this.initializeAnimations();
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('startFreeBtn')?.addEventListener('click', () => {
            this.showHubCreationModal();
        });

        document.getElementById('seeExamplesBtn')?.addEventListener('click', () => {
            this.scrollToSection('examples');
        });

        document.getElementById('ctaBtn')?.addEventListener('click', () => {
            this.showHubCreationModal();
        });

        document.getElementById('loginBtn')?.addEventListener('click', () => {
            this.showLoginModal();
        });

        // Modal controls
        document.getElementById('closeCreationModal')?.addEventListener('click', () => {
            this.hideHubCreationModal();
        });

        // Form step navigation
        document.getElementById('nextStepBtn')?.addEventListener('click', () => {
            this.nextStep();
        });

        document.getElementById('prevStepBtn')?.addEventListener('click', () => {
            this.prevStep();
        });

        // Hub creation form
        document.getElementById('hubCreationForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createHub();
        });

        // Hub URL input - auto-format
        document.getElementById('hubUrl')?.addEventListener('input', (e) => {
            e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        });

        // Close modal on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideHubCreationModal();
            }
        });

        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                this.selectTemplate(card.dataset.template);
            });
        });

        // Pricing buttons
        document.querySelectorAll('.pricing-card button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const plan = btn.closest('.pricing-card').querySelector('h3').textContent;
                this.handlePricingClick(plan);
            });
        });

        // Example links
        document.querySelectorAll('.example-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.viewExampleHub(link.closest('.example-card').querySelector('h3').textContent);
            });
        });
    }

    // Smooth scrolling
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // Initialize animations
    initializeAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.feature-card, .template-card, .pricing-card, .example-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Phone animation
        this.animatePhoneMockup();
    }

    // Phone mockup animation
    animatePhoneMockup() {
        const phone = document.querySelector('.phone-mockup');
        if (phone) {
            phone.style.animation = 'float 3s ease-in-out infinite';
        }

        // Add floating keyframes if not already present
        if (!document.querySelector('#float-animation')) {
            const style = document.createElement('style');
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Modal Management
    showHubCreationModal() {
        document.getElementById('hubCreationModal').classList.add('active');
        this.currentStep = 1;
        this.updateStepDisplay();
        document.body.style.overflow = 'hidden';
    }

    hideHubCreationModal() {
        document.getElementById('hubCreationModal').classList.remove('active');
        document.body.style.overflow = '';
        this.resetForm();
    }

    showLoginModal() {
        // Implementation for login modal
        this.showNotification('Login functionality coming soon!', 'info');
    }

    // Form Step Management
    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < 3) {
                this.currentStep++;
                this.updateStepDisplay();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepDisplay();
        }
    }

    updateStepDisplay() {
        // Update progress steps
        document.querySelectorAll('.step').forEach((step, index) => {
            if (index + 1 <= this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update form steps
        document.querySelectorAll('.form-step').forEach((step, index) => {
            if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update buttons
        const prevBtn = document.getElementById('prevStepBtn');
        const nextBtn = document.getElementById('nextStepBtn');
        const createBtn = document.getElementById('createHubBtn');

        if (this.currentStep === 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'block';
            createBtn.style.display = 'none';
        } else if (this.currentStep === 2) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            createBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'none';
            createBtn.style.display = 'block';
        }
    }

    // Form Validation
    validateCurrentStep() {
        let isValid = true;
        const currentStepElement = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);

        if (this.currentStep === 1) {
            const artistName = document.getElementById('artistName').value.trim();
            const artistTitle = document.getElementById('artistTitle').value.trim();

            if (!artistName) {
                this.showFieldError('artistName', 'Artist name is required');
                isValid = false;
            }

            if (!artistTitle) {
                this.showFieldError('artistTitle', 'Title/Genre is required');
                isValid = false;
            }
        }

        if (this.currentStep === 2) {
            // Optional validation for social links (URL format if provided)
            const urlFields = ['instagramUrl', 'spotifyUrl', 'youtubeUrl', 'soundcloudUrl', 'websiteUrl'];
            urlFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                const value = field.value.trim();
                if (value && !this.isValidUrl(value)) {
                    this.showFieldError(fieldId, 'Please enter a valid URL');
                    isValid = false;
                }
            });
        }

        if (this.currentStep === 3) {
            const hubUrl = document.getElementById('hubUrl').value.trim();
            if (!hubUrl) {
                this.showFieldError('hubUrl', 'Hub URL is required');
                isValid = false;
            } else if (hubUrl.length < 3) {
                this.showFieldError('hubUrl', 'Hub URL must be at least 3 characters');
                isValid = false;
            }
        }

        return isValid;
    }

    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const existingError = field.parentNode.querySelector('.field-error');
        
        if (existingError) {
            existingError.remove();
        }

        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color, #ef4444)';
        errorElement.style.fontSize = '0.75rem';
        errorElement.style.marginTop = '0.25rem';

        field.parentNode.appendChild(errorElement);
        field.style.borderColor = 'var(--error-color, #ef4444)';

        setTimeout(() => {
            errorElement.remove();
            field.style.borderColor = '';
        }, 5000);
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Template Selection
    selectTemplate(templateType) {
        this.selectedTemplate = templateType;
        
        // Update UI
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-template="${templateType}"]`)?.classList.add('active');

        // Update form if modal is open
        const templateSelect = document.getElementById('templateType');
        if (templateSelect) {
            templateSelect.value = templateType;
        }

        this.showNotification(`Selected ${templateType} template`, 'success');
    }

    // Hub Creation
    createHub() {
        // Collect form data
        this.formData = {
            artistName: document.getElementById('artistName').value.trim(),
            artistTitle: document.getElementById('artistTitle').value.trim(),
            artistBio: document.getElementById('artistBio').value.trim(),
            artistImage: document.getElementById('artistImage').value.trim(),
            instagramUrl: document.getElementById('instagramUrl').value.trim(),
            spotifyUrl: document.getElementById('spotifyUrl').value.trim(),
            youtubeUrl: document.getElementById('youtubeUrl').value.trim(),
            soundcloudUrl: document.getElementById('soundcloudUrl').value.trim(),
            websiteUrl: document.getElementById('websiteUrl').value.trim(),
            hubUrl: document.getElementById('hubUrl').value.trim(),
            theme: document.querySelector('input[name="theme"]:checked')?.value || 'purple',
            templateType: document.getElementById('templateType').value,
            createdAt: new Date().toISOString()
        };

        // Generate hub
        this.generateHub();
    }

    generateHub() {
        // Show loading state
        this.showNotification('Creating your artist hub...', 'info');

        // Simulate hub creation (in production, this would be an API call)
        setTimeout(() => {
            const hubUrl = `${this.formData.hubUrl}.hlpfl.org`;
            
            // Save to localStorage for demo purposes
            const hubs = JSON.parse(localStorage.getItem('artist_hubs') || '[]');
            hubs.push({
                ...this.formData,
                id: Date.now(),
                url: hubUrl,
                status: 'active'
            });
            localStorage.setItem('artist_hubs', JSON.stringify(hubs));

            this.hideHubCreationModal();
            this.showSuccessMessage(hubUrl);
        }, 2000);
    }

    showSuccessMessage(hubUrl) {
        const successModal = document.createElement('div');
        successModal.className = 'modal active';
        successModal.innerHTML = `
            <div class="modal-content" style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; color: var(--success-color); margin-bottom: 1rem;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2 style="margin-bottom: 1rem;">Your Artist Hub is Ready!</h2>
                <p style="color: var(--gray-600); margin-bottom: 1.5rem;">
                    Your hub is now live at:<br>
                    <strong>${hubUrl}</strong>
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-primary" onclick="window.open('https://${hubUrl}', '_blank')">
                        <i class="fas fa-external-link-alt"></i> View Hub
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(successModal);
        document.body.style.overflow = 'hidden';

        // Auto-close after 10 seconds
        setTimeout(() => {
            if (document.body.contains(successModal)) {
                successModal.remove();
                document.body.style.overflow = '';
            }
        }, 10000);
    }

    // Pricing Handlers
    handlePricingClick(plan) {
        if (plan === 'Free') {
            this.showHubCreationModal();
        } else if (plan === 'Pro') {
            this.showNotification('Starting your Pro trial...', 'info');
            setTimeout(() => this.showHubCreationModal(), 1000);
        } else if (plan === 'Enterprise') {
            this.showNotification('Contacting sales team...', 'info');
            // In production, this would open a contact form or email client
        }
    }

    // Example Hub Viewing
    viewExampleHub(artistName) {
        // Map example artist names to their hub URLs
        const exampleUrls = {
            'Alki Otis': 'https://8085-138f860a-b385-4c70-8fc2-6a9891eb0748.sandbox-service.public.prod.myninja.ai',
            'Luna Rose': 'https://example.com/lunarose',
            'The Midnight Collective': 'https://example.com/midnight'
        };

        const url = exampleUrls[artistName];
        if (url) {
            window.open(url, '_blank');
        } else {
            this.showNotification('Example hub coming soon!', 'info');
        }
    }

    // Utility Methods
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };

        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: colors[type] || colors.info,
            color: 'white',
            zIndex: '9999',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }, 4000);
    }

    resetForm() {
        document.getElementById('hubCreationForm')?.reset();
        this.currentStep = 1;
        this.formData = {};
        this.updateStepDisplay();
        
        // Remove any field errors
        document.querySelectorAll('.field-error').forEach(error => error.remove());
        
        // Reset field styles
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.style.borderColor = '';
        });
    }
}

// Initialize when DOM is ready
let selfServicePortal;
document.addEventListener('DOMContentLoaded', () => {
    selfServicePortal = new SelfServicePortal();
});

// Export for global access
window.selfServicePortal = null;
window.addEventListener('load', () => {
    window.selfServicePortal = selfServicePortal;
});

// Utility function for template selection
window.selectTemplate = (templateType) => {
    if (window.selfServicePortal) {
        window.selfServicePortal.selectTemplate(templateType);
    }
};