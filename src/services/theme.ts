import { ThemeConfig, ThemeMode } from '../types/artist';

export class ThemeService {
  private currentTheme: ThemeMode = 'auto';
  private systemPreference: ThemeMode = 'light';
  private themes: Map<string, ThemeConfig> = new Map();

  constructor() {
    this.initializeThemes();
    this.setupSystemPreferenceListener();
    this.loadSavedTheme();
    this.applyTheme();
  }

  private initializeThemes(): void {
    // Light theme
    this.themes.set('light', {
      primaryColor: '#000000',
      secondaryColor: '#6366f1',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      accentColor: '#10b981'
    });

    // Dark theme
    this.themes.set('dark', {
      primaryColor: '#ffffff',
      secondaryColor: '#818cf8',
      backgroundColor: '#111827',
      textColor: '#f9fafb',
      accentColor: '#34d399'
    });

    // Sepia theme (for accessibility)
    this.themes.set('sepia', {
      primaryColor: '#1a1a1a',
      secondaryColor: '#92400e',
      backgroundColor: '#fef3c7',
      textColor: '#451a03',
      accentColor: '#065f46'
    });
  }

  private setupSystemPreferenceListener(): void {
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

  private loadSavedTheme(): void {
    const savedTheme = localStorage.getItem('alki_theme') as ThemeMode;
    if (savedTheme && ['light', 'dark', 'sepia', 'auto'].includes(savedTheme)) {
      this.currentTheme = savedTheme;
    }
  }

  private applyTheme(): void {
    const effectiveTheme = this.currentTheme === 'auto' ? this.systemPreference : this.currentTheme;
    const themeConfig = this.themes.get(effectiveTheme);

    if (themeConfig) {
      this.applyThemeVariables(themeConfig);
      this.updateThemeClass(effectiveTheme);
      this.updateMetaThemeColor(themeConfig.backgroundColor);
    }
  }

  private applyThemeVariables(themeConfig: ThemeConfig): void {
    const root = document.documentElement;
    
    Object.entries(themeConfig).forEach(([key, value]) => {
      const cssVar = `--${this.camelToKebab(key)}`;
      root.style.setProperty(cssVar, value);
    });
  }

  private updateThemeClass(theme: ThemeMode): void {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
    document.body.classList.add(`theme-${theme}`);
  }

  private updateMetaThemeColor(color: string): void {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color);
    }
  }

  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  // Public API
  setTheme(theme: ThemeMode): void {
    if (['light', 'dark', 'sepia', 'auto'].includes(theme)) {
      this.currentTheme = theme;
      localStorage.setItem('alki_theme', theme);
      this.applyTheme();
      
      // Track theme change
      if (typeof gtag !== 'undefined') {
        gtag('event', 'theme_change', {
          theme: theme
        });
      }
    }
  }

  getCurrentTheme(): ThemeMode {
    return this.currentTheme;
  }

  getEffectiveTheme(): ThemeMode {
    return this.currentTheme === 'auto' ? this.systemPreference : this.currentTheme;
  }

  getAvailableThemes(): ThemeMode[] {
    return ['light', 'dark', 'sepia', 'auto'];
  }

  toggleTheme(): void {
    const themes: ThemeMode[] = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    this.setTheme(themes[nextIndex]);
  }

  // Custom theme support
  setCustomTheme(name: string, config: ThemeConfig): void {
    this.themes.set(name, config);
  }

  getThemeConfig(theme: ThemeMode): ThemeConfig | undefined {
    const effectiveTheme = theme === 'auto' ? this.systemPreference : theme;
    return this.themes.get(effectiveTheme);
  }

  // Accessibility features
  increaseContrast(): void {
    const currentConfig = this.getThemeConfig(this.getEffectiveTheme());
    if (currentConfig) {
      const highContrastConfig = {
        ...currentConfig,
        backgroundColor: currentConfig.backgroundColor === '#ffffff' ? '#000000' : '#ffffff',
        textColor: currentConfig.textColor === '#1f2937' ? '#ffffff' : '#000000'
      };
      this.applyThemeVariables(highContrastConfig);
    }
  }

  resetToDefault(): void {
    this.setTheme('auto');
    this.initializeThemes();
  }
}