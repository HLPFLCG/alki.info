import { AnalyticsData, LinkClickData, AnalyticsEvent, PerformanceMetrics } from '../types/artist';

export class AnalyticsService {
  private clicks: Map<string, number> = new Map();
  private sessions: number = 0;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.loadStoredData();
    this.trackSession();
    this.trackPerformance();
  }

  // Link tracking
  trackLinkClick(linkData: LinkClickData): void {
    const currentCount = this.clicks.get(linkData.linkId) || 0;
    this.clicks.set(linkData.linkId, currentCount + 1);
    
    this.storeClicks();
    this.sendEvent('link_click', linkData);
    
    console.log(`Link clicked: ${linkData.linkTitle} (${linkData.linkId})`);
  }

  // Session tracking
  private trackSession(): void {
    this.sessions++;
    this.storeSessions();
  }

  // Event tracking
  trackPageView(): void {
    this.sendEvent('page_view', {
      path: window.location.pathname,
      title: document.title,
      timestamp: Date.now()
    });
  }

  private sendEvent(eventName: string, data: any): void {
    const event: AnalyticsEvent = {
      event: eventName,
      data,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };

    this.events.push(event);
    this.sendToAnalyticsService(event);
  }

  // Performance tracking
  private trackPerformance(): void {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        const metrics: PerformanceMetrics = {
          loadTime: perfData.loadEventEnd - perfData.loadEventStart,
          firstContentfulPaint: 0,
          largestContentfulPaint: 0,
          cumulativeLayoutShift: 0,
          firstInputDelay: 0
        };

        this.sendEvent('performance_metrics', metrics);
      });
    }
  }

  // Data persistence
  private loadStoredData(): void {
    try {
      const storedClicks = localStorage.getItem('alki_link_clicks');
      const storedSessions = localStorage.getItem('alki_sessions');

      if (storedClicks) {
        const clicksData = JSON.parse(storedClicks);
        this.clicks = new Map(Object.entries(clicksData));
      }

      if (storedSessions) {
        this.sessions = parseInt(storedSessions);
      }
    } catch (error) {
      console.error('Error loading analytics data:', error);
    }
  }

  private storeClicks(): void {
    const clicksObject = Object.fromEntries(this.clicks);
    localStorage.setItem('alki_link_clicks', JSON.stringify(clicksObject));
  }

  private storeSessions(): void {
    localStorage.setItem('alki_sessions', this.sessions.toString());
  }

  // Analytics data retrieval
  getAnalyticsData(): AnalyticsData[] {
    const data: AnalyticsData[] = [];
    
    for (const [linkId, clickCount] of this.clicks.entries()) {
      data.push({
        linkId,
        clickCount,
        lastClicked: Date.now(),
        conversionRate: this.calculateConversionRate(linkId)
      });
    }

    return data.sort((a, b) => b.clickCount - a.clickCount);
  }

  getTopLinks(limit: number = 5): AnalyticsData[] {
    return this.getAnalyticsData().slice(0, limit);
  }

  calculateConversionRate(linkId?: string): number {
    const totalClicks = linkId 
      ? this.clicks.get(linkId) || 0
      : Array.from(this.clicks.values()).reduce((sum, count) => sum + count, 0);

    return this.sessions > 0 ? (totalClicks / this.sessions) * 100 : 0;
  }

  getTotalSessions(): number {
    return this.sessions;
  }

  getTotalClicks(): number {
    return Array.from(this.clicks.values()).reduce((sum, count) => sum + count, 0);
  }

  // External analytics service integration
  private sendToAnalyticsService(event: AnalyticsEvent): void {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event.event, event.data);
    }

    // Custom analytics endpoint
    if (typeof fetch !== 'undefined') {
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      }).catch(err => console.log('Analytics request failed:', err));
    }
  }

  // Data export
  exportData(): string {
    return JSON.stringify({
      clicks: Object.fromEntries(this.clicks),
      sessions: this.sessions,
      events: this.events.slice(-100) // Last 100 events
    }, null, 2);
  }

  // Data reset
  resetData(): void {
    this.clicks.clear();
    this.sessions = 0;
    this.events = [];
    
    localStorage.removeItem('alki_link_clicks');
    localStorage.removeItem('alki_sessions');
  }
}