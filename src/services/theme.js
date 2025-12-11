// Simplified Theme Service for JavaScript deployment
export class ThemeService {
  constructor() {
    this.currentTheme = 'auto';
    this.systemPreference = 'light';
    this.themes = new Map();
    this.initializeThemes();
    this.setupSystemPreferenceListener();
    this.loadSavedTheme();
    this.applyTheme();
  }

  initializeThemes() {
    this.themes.set('light', {
      primaryColor: '#000000',
      secondaryColor: '#6366f1',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      accentColor: '#10b981'
    });

    this.themes.set('dark', {
      primaryColor: '#ffffff',
      secondaryColor: '#818cf8',
      backgroundColor: '#111827',
      textColor: '#f9fafb',
      accentColor: '#34d399'
    });

    this.themes.set('sepia', {
      primaryColor: '#1a1a1a',
      secondaryColor: '#92400e',
      backgroundColor: '#fef3c7',
      textColor: '#451a03',
      accentColor: '#065f46'
    });
  }

  setupSystemPreferenceListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      this.systemPreference = mediaQuery.matches ? 'dark' : 'light';
      
      mediaQuery.addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        if (this.currentTheme === 'auto') {
          this.applyTheme();
        }
      });
    }
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem('alki_theme');
    if (savedTheme && ['light', 'dark', 'sepia', 'auto'].includes(savedTheme)) {
      this.currentTheme = savedTheme;
    }
  }

  applyTheme() {
    const effectiveTheme = this.currentTheme === 'auto' ? this.systemPreference : this.currentTheme;
    const themeConfig = this.themes.get(effectiveTheme);

    if (themeConfig) {
      this.applyThemeVariables(themeConfig);
      this.updateThemeClass(effectiveTheme);
      this.updateMetaThemeColor(themeConfig.backgroundColor);
    }
  }

  applyThemeVariables(themeConfig) {
    const root = document.documentElement;
    
    Object.entries(themeConfig).forEach(([key, value]) => {
      const cssVar = `--${this.camelToKebab(key)}`;
      root.style.setProperty(cssVar, value);
    });
  }

  updateThemeClass(theme) {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
    document.body.classList.add(`theme-${theme}`);
  }

  updateMetaThemeColor(color) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    }
  }

  camelToKebab(str) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  setTheme(theme) {
    if (['light', 'dark', 'sepia', 'auto'].includes(theme)) {
      this.currentTheme = theme;
      localStorage.setItem('alki_theme', theme);
      this.applyTheme();
    }
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  getEffectiveTheme() {
    return this.currentTheme === 'auto' ? this.systemPreference : this.currentTheme;
  }

  toggleTheme() {
    const themes = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }
}