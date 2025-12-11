// Compiled JavaScript from TypeScript (simplified for deployment)
import { AnalyticsService } from './services/analytics.js';
import { ThemeService } from './services/theme.js';
import { PWAService } from './services/pwa.js';

class ArtistLinkHub {
  constructor() {
    this.analytics = new AnalyticsService();
    this.theme = new ThemeService();
    this.pwa = new PWAService();
    this.initialize();
  }

  initialize() {
    this.setupEventListeners();
    this.setupThemeControls();
    this.setupPWAControls();
    this.trackPageView();
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.link-item');
      if (link) {
        this.handleLinkClick(link);
      }
    });
  }

  handleLinkClick(link) {
    const linkId = link.dataset.linkId;
    const linkTitle = link.querySelector('.link-title')?.textContent || 'Unknown Link';
    
    this.analytics.trackLinkClick({
      linkId: linkId || 'unknown',
      linkTitle,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });

    this.animateLinkClick(link);
  }

  animateLinkClick(element) {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
      element.style.transform = '';
    }, 150);
  }

  setupThemeControls() {
    const themeToggle = this.createThemeToggle();
    document.body.appendChild(themeToggle);
  }

  createThemeToggle() {
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.innerHTML = '<i class="fas fa-palette"></i>';
    button.title = 'Toggle theme (Ctrl+Shift+T)';
    button.className = 'theme-toggle-button';
    
    button.addEventListener('click', () => {
      this.theme.toggleTheme();
      this.showThemeNotification();
    });

    return button;
  }

  showThemeNotification() {
    const currentTheme = this.theme.getCurrentTheme();
    this.showStatusBanner(`Theme: ${currentTheme}`, 'info');
  }

  setupPWAControls() {
    if (this.pwa.canInstall()) {
      setTimeout(() => {
        this.showInstallPrompt();
      }, 3000);
    }
  }

  showInstallPrompt() {
    const prompt = this.createInstallPrompt();
    document.body.appendChild(prompt);

    setTimeout(() => {
      if (prompt.parentElement) {
        prompt.remove();
      }
    }, 10000);
  }

  createInstallPrompt() {
    const prompt = document.createElement('div');
    prompt.id = 'install-prompt';
    prompt.innerHTML = `
      <div class="install-prompt-content">
        <i class="fas fa-download"></i>
        <div>
          <strong>Install alki app</strong>
          <p>Get instant access to music and updates</p>
        </div>
        <button id="install-app">Install</button>
        <button id="dismiss-install">×</button>
      </div>
    `;

    const installButton = prompt.querySelector('#install-app');
    const dismissButton = prompt.querySelector('#dismiss-install');

    if (installButton) {
      installButton.addEventListener('click', () => {
        this.pwa.promptInstall();
        prompt.remove();
      });
    }

    if (dismissButton) {
      dismissButton.addEventListener('click', () => {
        prompt.remove();
      });
    }

    return prompt;
  }

  trackPageView() {
    this.analytics.trackPageView();
  }

  showStatusBanner(message, type) {
    const banner = document.createElement('div');
    banner.className = `status-banner status-${type}`;
    banner.textContent = message;
    
    banner.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'info' ? '#3b82f6' : '#10b981'};
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
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  window.artistLinkHub = new ArtistLinkHub();
});

export default ArtistLinkHub;