// Simplified Analytics Service for JavaScript deployment
export class AnalyticsService {
  constructor() {
    this.clicks = new Map();
    this.sessions = 0;
    this.loadStoredData();
    this.trackSession();
  }

  trackLinkClick(linkData) {
    const currentCount = this.clicks.get(linkData.linkId) || 0;
    this.clicks.set(linkData.linkId, currentCount + 1);
    this.storeClicks();
    console.log(`Link clicked: ${linkData.linkTitle} (${linkData.linkId})`);
  }

  trackSession() {
    this.sessions++;
    this.storeSessions();
  }

  trackPageView() {
    console.log('Page view tracked');
  }

  loadStoredData() {
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

  storeClicks() {
    const clicksObject = Object.fromEntries(this.clicks);
    localStorage.setItem('alki_link_clicks', JSON.stringify(clicksObject));
  }

  storeSessions() {
    localStorage.setItem('alki_sessions', this.sessions.toString());
  }

  getAnalyticsData() {
    const data = [];
    
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

  calculateConversionRate(linkId) {
    const totalClicks = linkId 
      ? this.clicks.get(linkId) || 0
      : Array.from(this.clicks.values()).reduce((sum, count) => sum + count, 0);

    return this.sessions > 0 ? (totalClicks / this.sessions) * 100 : 0;
  }

  exportData() {
    return JSON.stringify({
      clicks: Object.fromEntries(this.clicks),
      sessions: this.sessions
    }, null, 2);
  }

  resetData() {
    this.clicks.clear();
    this.sessions = 0;
    localStorage.removeItem('alki_link_clicks');
    localStorage.removeItem('alki_sessions');
  }
}