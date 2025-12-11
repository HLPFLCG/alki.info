// TypeScript type definitions for Artist Link Hub

export interface PlatformLink {
  url: string;
  handle?: string;
  followers?: number;
  verified?: boolean;
}

export interface SocialLinks {
  instagram?: PlatformLink;
  twitter?: PlatformLink;
  youtube?: PlatformLink;
  tiktok?: PlatformLink;
  facebook?: PlatformLink;
}

export interface StreamingPlatforms {
  spotify?: PlatformLink;
  appleMusic?: PlatformLink;
  soundCloud?: PlatformLink;
  youtubeMusic?: PlatformLink;
  tidal?: PlatformLink;
  bandcamp?: PlatformLink;
}

export interface AnalyticsData {
  linkId: string;
  clickCount: number;
  lastClicked: Date;
  conversionRate: number;
}

export interface ArtistProfile {
  name: string;
  title: string;
  bio: string;
  image: string;
  verified: boolean;
  socialLinks: SocialLinks;
  streamingPlatforms: StreamingPlatforms;
  contactEmail?: string;
  website?: string;
}

export interface LinkClickData {
  linkId: string;
  linkTitle: string;
  timestamp: number;
  userAgent: string;
  referrer: string;
}

export interface AnalyticsEvent {
  event: string;
  data: any;
  timestamp: number;
  userAgent: string;
  referrer: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export interface SiteConfig {
  theme: ThemeConfig;
  analytics: {
    enabled: boolean;
    trackingId?: string;
  };
  pwa: {
    enabled: boolean;
    installPrompt: boolean;
  };
}

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}