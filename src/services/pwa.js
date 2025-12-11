// Simplified PWA Service for JavaScript deployment
export class PWAService {
  constructor() {
    this.deferredPrompt = null;
    this.installPromptShown = false;
    this.setupInstallPrompt();
    this.setupServiceWorker();
  }

  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.installPromptShown = true;
      this.hideInstallButton();
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }

  async promptInstall() {
    if (!this.deferredPrompt || this.installPromptShown) {
      return false;
    }

    try {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      this.deferredPrompt = null;
      this.installPromptShown = true;
      
      return outcome === 'accepted';
    } catch (error) {
      console.error('Error prompting install:', error);
      return false;
    }
  }

  canInstall() {
    return this.deferredPrompt !== null && !this.installPromptShown;
  }

  showInstallButton() {
    let installButton = document.getElementById('pwa-install-button');
    
    if (!installButton) {
      installButton = this.createInstallButton();
      document.body.appendChild(installButton);
    }
    
    installButton.style.display = 'block';
  }

  hideInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  createInstallButton() {
    const button = document.createElement('button');
    button.id = 'pwa-install-button';
    button.innerHTML = `
      <i class="fas fa-download"></i>
      Install App
    `;
    button.className = 'pwa-install-button';
    button.style.cssText = `
      position: fixed;
      bottom: 80px;
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

    button.addEventListener('click', () => {
      this.promptInstall();
    });

    return button;
  }
}