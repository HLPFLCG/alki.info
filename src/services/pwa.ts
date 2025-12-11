export class PWAService {
  private deferredPrompt: any = null;
  private installPromptShown = false;

  constructor() {
    this.setupInstallPrompt();
    this.setupServiceWorker();
    this.setupOfflineSupport();
  }

  // Install prompt handling
  private setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.installPromptShown = true;
      this.hideInstallButton();
      
      // Track installation
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_installed');
      }
    });
  }

  // Service worker setup
  private setupServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  this.showUpdateAvailable();
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }

  // Offline support
  private setupOfflineSupport(): void {
    window.addEventListener('online', () => {
      this.showOnlineStatus();
    });

    window.addEventListener('offline', () => {
      this.showOfflineStatus();
    });
  }

  // Public API for install prompt
  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt || this.installPromptShown) {
      return false;
    }

    try {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      this.deferredPrompt = null;
      this.installPromptShown = true;
      
      // Track installation attempt
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_install_prompt', {
          outcome: outcome
        });
      }

      return outcome === 'accepted';
    } catch (error) {
      console.error('Error prompting install:', error);
      return false;
    }
  }

  canInstall(): boolean {
    return this.deferredPrompt !== null && !this.installPromptShown;
  }

  // UI helpers
  private showInstallButton(): void {
    let installButton = document.getElementById('pwa-install-button');
    
    if (!installButton) {
      installButton = this.createInstallButton();
      document.body.appendChild(installButton);
    }
    
    installButton.style.display = 'block';
  }

  private hideInstallButton(): void {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  private createInstallButton(): HTMLElement {
    const button = document.createElement('button');
    button.id = 'pwa-install-button';
    button.innerHTML = `
      <i class="fas fa-download"></i>
      Install App
    `;
    button.className = 'pwa-install-button';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #000;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: transform 0.2s ease;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', () => {
      this.promptInstall();
    });

    return button;
  }

  private showUpdateAvailable(): void {
    const updateBanner = this.createUpdateBanner();
    document.body.appendChild(updateBanner);
  }

  private createUpdateBanner(): HTMLElement {
    const banner = document.createElement('div');
    banner.id = 'pwa-update-banner';
    banner.innerHTML = `
      <div class="update-banner-content">
        <i class="fas fa-sync"></i>
        <span>A new version is available</span>
        <button id="update-button">Update</button>
        <button id="dismiss-button">Later</button>
      </div>
    `;
    
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #000;
      color: white;
      padding: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1001;
      font-size: 14px;
    `;

    const content = banner.querySelector('.update-banner-content');
    if (content) {
      content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 600px;
        width: 100%;
      `;
    }

    const updateButton = banner.querySelector('#update-button');
    const dismissButton = banner.querySelector('#dismiss-button');

    if (updateButton) {
      updateButton.style.cssText = `
        background: #6366f1;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      `;
      updateButton.addEventListener('click', () => {
        window.location.reload();
      });
    }

    if (dismissButton) {
      dismissButton.style.cssText = `
        background: transparent;
        color: white;
        border: 1px solid white;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      `;
      dismissButton.addEventListener('click', () => {
        banner.remove();
      });
    }

    return banner;
  }

  private showOnlineStatus(): void {
    this.showStatusBanner('Back online', 'success');
  }

  private showOfflineStatus(): void {
    this.showStatusBanner('You\'re offline', 'warning');
  }

  private showStatusBanner(message: string, type: 'success' | 'warning'): void {
    const banner = document.createElement('div');
    banner.className = `status-banner status-${type}`;
    banner.textContent = message;
    
    banner.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'success' ? '#10b981' : '#f59e0b'};
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 1002;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      animation: slideDown 0.3s ease;
    `;

    document.body.appendChild(banner);

    setTimeout(() => {
      banner.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => {
        banner.remove();
      }, 300);
    }, 3000);
  }

  // Utility methods
  isPWA(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true ||
           document.referrer.includes('android-app://');
  }

  getInstallPromptStatus(): {
    canInstall: boolean;
    installPromptShown: boolean;
    isInstalled: boolean;
  } {
    return {
      canInstall: this.canInstall(),
      installPromptShown: this.installPromptShown,
      isInstalled: this.isPWA()
    };
  }
}