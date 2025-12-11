import { ArtistProfile, ThemeMode } from './types/artist';
import { AnalyticsService } from './services/analytics';
import { ThemeService } from './services/theme';
import { PWAService } from './services/pwa';

export class ArtistLinkHub {
  private analytics: AnalyticsService;
  private theme: ThemeService;
  private pwa: PWAService;
  private artistData: ArtistProfile;

  constructor() {
    this.artistData = this.loadArtistData();
    this.analytics = new AnalyticsService();
    this.theme = new ThemeService();
    this.pwa = new PWAService();
    
    this.initialize();
  }

  private loadArtistData(): ArtistProfile {
    // Artist data configuration
    return {
      name: 'alki',
      title: '28 • musician',
      bio: 'Creating authentic music from the Pacific Northwest. Independent artist exploring the human experience through sound.',
      image: 'https://hlpfl.info/images/founder/0914B329-9D3E-421B-95D9-D027EC731771.jpeg',
      verified: true,
      socialLinks: {
        instagram: {
          url: 'https://instagram.com/alkiotis',
          handle: '@alkiotis',
          verified: true
        },
        tiktok: {
          url: 'https://tiktok.com/@alkiotis',
          handle: '@alkiotis'
        }
      },
      streamingPlatforms: {
        spotify: {
          url: 'https://open.spotify.com/artist/alki',
          verified: true
        },
        appleMusic: {
          url: 'https://music.apple.com/artist/alki'
        },
        youtube: {
          url: 'https://youtube.com/@alki',
          verified: true
        }
      },
      contactEmail: 'alki@hlpfl.org',
      website: 'https://hlpfl.org/alki'
    };
  }

  private initialize(): void {
    this.renderProfile();
    this.setupEventListeners();
    this.setupThemeControls();
    this.setupPWAControls();
    this.trackPageView();
    this.setupRealTimeMonitoring();
    this.initializeQRCodeGeneration();
  }

  private renderProfile(): void {
    const profileElement = document.querySelector('.profile-name');
    const titleElement = document.querySelector('.profile-title');
    const bioElement = document.querySelector('.profile-bio');
    const imageElement = document.querySelector('.profile-image');

    if (profileElement) profileElement.textContent = this.artistData.name;
    if (titleElement) titleElement.textContent = this.artistData.title;
    if (bioElement) bioElement.textContent = this.artistData.bio;
    if (imageElement) (imageElement as HTMLImageElement).src = this.artistData.image;
  }

  private setupEventListeners(): void {
    // Link click tracking
    document.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement).closest('.link-item') as HTMLAnchorElement;
      if (link) {
        this.handleLinkClick(link);
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e);
    });

    // Touch gestures
    this.setupTouchGestures();

    // Visibility change tracking
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackSessionEnd();
      } else {
        this.trackSessionStart();
      }
    });

    // Beforeunload for tracking
    window.addEventListener('beforeunload', () => {
      this.trackSessionEnd();
    });
  }

  private handleLinkClick(link: HTMLAnchorElement): void {
    const linkId = link.dataset.linkId;
    const linkTitle = link.querySelector('.link-title')?.textContent || 'Unknown Link';
    
    this.analytics.trackLinkClick({
      linkId: linkId || 'unknown',
      linkTitle,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });

    // Add click animation
    this.animateLinkClick(link);
  }

  private animateLinkClick(element: HTMLElement): void {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
      element.style.transform = '';
    }, 150);
  }

  private setupThemeControls(): void {
    // Create theme toggle button
    const themeToggle = this.createThemeToggle();
    document.body.appendChild(themeToggle);

    // Listen for theme changes
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        this.theme.toggleTheme();
        this.showThemeNotification();
      }
    });
  }

  private createThemeToggle(): HTMLElement {
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.innerHTML = '<i class="fas fa-palette"></i>';
    button.title = 'Toggle theme (Ctrl+Shift+T)';
    button.className = 'theme-toggle-button';
    
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #000;
      color: white;
      border: none;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      transition: transform 0.2s ease;
    `;

    button.addEventListener('click', () => {
      this.theme.toggleTheme();
      this.showThemeNotification();
    });

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });

    return button;
  }

  private showThemeNotification(): void {
    const currentTheme = this.theme.getCurrentTheme();
    const effectiveTheme = this.theme.getEffectiveTheme();
    
    this.showStatusBanner(`Theme: ${currentTheme} (${effectiveTheme})`, 'info');
  }

  private setupPWAControls(): void {
    // Show install prompt if available
    if (this.pwa.canInstall()) {
      setTimeout(() => {
        this.showInstallPrompt();
      }, 3000);
    }
  }

  private showInstallPrompt(): void {
    const prompt = this.createInstallPrompt();
    document.body.appendChild(prompt);

    setTimeout(() => {
      if (prompt.parentElement) {
        prompt.remove();
      }
    }, 10000);
  }

  private createInstallPrompt(): HTMLElement {
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

    prompt.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 20px;
      right: 20px;
      background: #000;
      color: white;
      padding: 16px;
      border-radius: 12px;
      z-index: 1001;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      animation: slideUp 0.3s ease;
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

  private setupTouchGestures(): void {
    let touchStartY = 0;
    let touchStartX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      
      const diffY = touchStartY - touchEndY;
      const diffX = touchStartX - touchEndX;

      // Swipe up for theme toggle
      if (diffY > 50 && Math.abs(diffX) < 50) {
        this.theme.toggleTheme();
        this.showThemeNotification();
      }

      // Swipe right for refresh
      if (diffX > 100 && Math.abs(diffY) < 50) {
        this.refreshContent();
      }
    });
  }

  private handleKeyboardNavigation(e: KeyboardEvent): void {
    const links = Array.from(document.querySelectorAll('.link-item'));
    const currentIndex = links.findIndex(link => link === document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < links.length - 1) {
          links[currentIndex + 1].focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          links[currentIndex - 1].focus();
        }
        break;
      case 'Home':
        e.preventDefault();
        links[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        links[links.length - 1]?.focus();
        break;
    }
  }

  private trackPageView(): void {
    this.analytics.trackPageView();
  }

  private trackSessionStart(): void {
    this.analytics.trackSessionStart?.();
  }

  private trackSessionEnd(): void {
    this.analytics.trackSessionEnd?.();
  }

  private setupRealTimeMonitoring(): void {
    // Monitor link performance
    setInterval(() => {
      this.updateLinkPerformanceMetrics();
    }, 30000); // Every 30 seconds

    // Monitor user engagement
    this.setupEngagementTracking();
  }

  private updateLinkPerformanceMetrics(): void {
    const analyticsData = this.analytics.getAnalyticsData();
    
    analyticsData.forEach(data => {
      const linkElement = document.querySelector(`[data-link-id="${data.linkId}"]`);
      if (linkElement) {
        const badge = linkElement.querySelector('.click-count-badge');
        if (badge) {
          badge.textContent = this.formatClickCount(data.clickCount);
        }
      }
    });
  }

  private formatClickCount(count: number): string {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  }

  private setupEngagementTracking(): void {
    let engagementTime = 0;
    let lastActiveTime = Date.now();

    setInterval(() => {
      if (document.hidden) return;
      
      const currentTime = Date.now();
      if (currentTime - lastActiveTime < 60000) { // Active within last minute
        engagementTime += 30; // Add 30 seconds
      }
      lastActiveTime = currentTime;
    }, 30000);

    // Track engagement when user leaves
    window.addEventListener('beforeunload', () => {
      this.analytics.trackEngagement?.(engagementTime);
    });
  }

  private initializeQRCodeGeneration(): void {
    // Generate QR codes for each link
    document.addEventListener('DOMContentLoaded', () => {
      this.generateQRCodes();
    });
  }

  private generateQRCodes(): void {
    const links = document.querySelectorAll('.link-item[data-link-id]');
    
    links.forEach(link => {
      const linkId = link.getAttribute('data-link-id');
      if (linkId) {
        this.createQRCodeForLink(link as HTMLElement, linkId);
      }
    });
  }

  private createQRCodeForLink(linkElement: HTMLElement, linkId: string): void {
    // QR code generation would be implemented here
    // For now, we'll add a QR code button
    const qrButton = document.createElement('button');
    qrButton.className = 'qr-code-button';
    qrButton.innerHTML = '<i class="fas fa-qrcode"></i>';
    qrButton.title = 'Show QR Code';
    
    qrButton.addEventListener('click', () => {
      this.showQRCode(linkId);
    });
    
    const linkActions = linkElement.querySelector('.link-action');
    if (linkActions) {
      linkActions.appendChild(qrButton);
    }
  }

  private showQRCode(linkId: string): void {
    // QR code display implementation
    this.showStatusBanner(`QR Code for ${linkId}`, 'info');
  }

  private showStatusBanner(message: string, type: 'info' | 'success' | 'warning' | 'error'): void {
    const banner = document.createElement('div');
    banner.className = `status-banner status-${type}`;
    banner.textContent = message;
    
    banner.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'info' ? '#3b82f6' : type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444'};
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

  private refreshContent(): void {
    this.showStatusBanner('Refreshing content...', 'info');
    
    // Simulate content refresh
    setTimeout(() => {
      this.renderProfile();
      this.showStatusBanner('Content updated!', 'success');
    }, 1000);
  }

  // Public API
  public getAnalytics() {
    return this.analytics.getAnalyticsData();
  }

  public setTheme(theme: ThemeMode): void {
    this.theme.setTheme(theme);
  }

  public async installPWA(): Promise<boolean> {
    return this.pwa.promptInstall();
  }

  public exportData(): string {
    return this.analytics.exportData();
  }

  public resetData(): void {
    this.analytics.resetData();
    this.showStatusBanner('All data has been reset', 'info');
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  window.artistLinkHub = new ArtistLinkHub();
});

// Export for module usage
export default ArtistLinkHub;