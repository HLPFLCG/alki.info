// Template System for Artist Link Hub
// This system allows easy creation and deployment of artist link hubs

class ArtistTemplateSystem {
    constructor() {
        this.templates = this.loadTemplates();
        this.currentTemplate = null;
        this.init();
    }

    init() {
        this.createTemplateInterface();
        this.setupEventListeners();
    }

    // Load available templates
    loadTemplates() {
        return {
            musician: {
                name: "Musician/Artist",
                description: "Complete solution for musicians and artists",
                features: [
                    "Streaming platforms (Spotify, Apple Music, etc.)",
                    "Social media integration",
                    "Tour dates and booking",
                    "Merchandise store",
                    "Fan club and newsletter",
                    "Analytics dashboard"
                ],
                colorScheme: {
                    primary: "#6b46c1",
                    secondary: "#8b5cf6",
                    accent: "#ec4899"
                },
                sections: [
                    "artist-profile",
                    "featured-track", 
                    "music-streaming",
                    "social-media",
                    "tour-booking",
                    "merchandise",
                    "fan-club",
                    "direct-contact"
                ]
            },
            band: {
                name: "Band/Group",
                description: "Multi-member band solution with individual member profiles",
                features: [
                    "Band member profiles",
                    "Collaborative streaming",
                    "Group social media",
                    "Band merchandise",
                    "Tour management",
                    "Album releases"
                ],
                colorScheme: {
                    primary: "#000000",
                    secondary: "#333333",
                    accent: "#ff0000"
                },
                sections: [
                    "band-profile",
                    "members",
                    "music-streaming",
                    "social-media",
                    "tour-booking",
                    "merchandise",
                    "album-releases"
                ]
            },
            producer: {
                name: "Music Producer",
                description: "For music producers and beat makers",
                features: [
                    "Production portfolio",
                    "Beat store",
                    "Collaboration requests",
                    "Studio bookings",
                    "Client testimonials",
                    "Production credits"
                ],
                colorScheme: {
                    primary: "#1a1a1a",
                    secondary: "#4a4a4a",
                    accent: "#6366f1"
                },
                sections: [
                    "producer-profile",
                    "portfolio",
                    "beat-store",
                    "services",
                    "testimonials",
                    "contact",
                    "collaboration"
                ]
            },
            venue: {
                name: "Music Venue",
                description: "For concert venues and music spaces",
                features: [
                    "Event calendar",
                    "Ticket integration",
                    "Venue information",
                    "Artist lineup",
                    "Food and drinks",
                    "Private bookings"
                ],
                colorScheme: {
                    primary: "#dc2626",
                    secondary: "#991b1b",
                    accent: "#fbbf24"
                },
                sections: [
                    "venue-info",
                    "event-calendar",
                    "ticketing",
                    "lineup",
                    "services",
                    "contact",
                    "gallery"
                ]
            },
            podcast: {
                name: "Podcast Host",
                description: "For podcast hosts and audio creators",
                features: [
                    "Episode player",
                    "Podcast platforms",
                    "Guest booking",
                    "Show notes",
                    "Sponsor information",
                    "Listener support"
                ],
                colorScheme: {
                    primary: "#059669",
                    secondary: "#047857",
                    accent: "#34d399"
                },
                sections: [
                    "podcast-profile",
                    "episode-player",
                    "platforms",
                    "guest-booking",
                    "sponsors",
                    "show-notes",
                    "support"
                ]
            }
        };
    }

    // Create template selection interface
    createTemplateInterface() {
        // This would normally create a UI for template selection
        // For now, we'll create the structure programmatically
        console.log('Template System initialized with templates:', Object.keys(this.templates));
    }

    // Generate artist hub from template
    generateArtistHub(templateType, artistData) {
        const template = this.templates[templateType];
        if (!template) {
            throw new Error(`Template "${templateType}" not found`);
        }

        // Clone the base template data
        const hubData = {
            template: templateType,
            ...this.getDefaultData(),
            theme: {
                ...this.getDefaultData().theme,
                ...template.colorScheme
            },
            sections: template.sections
        };

        // Merge artist-specific data
        if (artistData) {
            hubData.artist = { ...hubData.artist, ...artistData.artist };
            if (artistData.streaming) hubData.streaming = { ...hubData.streaming, ...artistData.streaming };
            if (artistData.social) hubData.social = { ...hubData.social, ...artistData.social };
            if (artistData.contact) hubData.contact = { ...hubData.contact, ...artistData.contact };
        }

        return hubData;
    }

    // Get default data structure
    getDefaultData() {
        return {
            artist: {
                name: "Your Artist Name",
                title: "Music Artist • Songwriter",
                bio: "Your artist bio goes here. Tell fans about your music and journey.",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
                verified: false,
                hlpflManaged: false
            },
            featuredTrack: {
                title: "Latest Single",
                artist: "Your Artist Name",
                artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
                spotify: "",
                apple: "",
                youtube: ""
            },
            streaming: {
                spotify: { url: "", type: "Artist Profile", listeners: "0" },
                apple: { url: "", type: "Music Library" },
                soundcloud: { url: "", type: "Audio Tracks" },
                youtubeMusic: { url: "", type: "Videos & Music" },
                tidal: { url: "", type: "Hi-Fi Streaming" },
                bandcamp: { url: "", type: "Direct Support" }
            },
            social: {
                instagram: { url: "", handle: "@yourhandle", followers: "0", posts: "0" },
                youtube: { url: "", handle: "Your Channel", subscribers: "0", videos: "0" },
                tiktok: { url: "", handle: "@yourhandle", followers: "0", likes: "0" },
                twitter: { url: "", handle: "@yourhandle", followers: "0", tweets: "0" }
            },
            tour: {
                dates: []
            },
            merchandise: {
                featured: {
                    title: "Signature Collection",
                    description: "Limited edition apparel and accessories",
                    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
                    url: ""
                },
                store: { url: "", title: "Official Store", description: "Browse all merchandise" },
                music: { url: "", title: "Vinyl & CDs", description: "Physical music collection" },
                packages: { url: "", title: "Packages", description: "Exclusive fan bundles" }
            },
            contact: {
                management: "",
                press: "",
                fanMail: "",
                booking: "",
                collaboration: "",
                pressKit: ""
            },
            theme: {
                primaryColor: "#6b46c1",
                secondaryColor: "#8b5cf6",
                backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            }
        };
    }

    // Deploy artist hub
    deployArtistHub(artistData, deploymentConfig) {
        const hubData = this.generateArtistHub('musician', artistData);
        
        // Create deployment package
        const deploymentPackage = {
            data: hubData,
            config: deploymentConfig,
            generatedAt: new Date().toISOString(),
            version: "1.0.0"
        };

        // Generate deployment files
        return this.generateDeploymentFiles(deploymentPackage);
    }

    // Generate deployment files
    generateDeploymentFiles(deploymentPackage) {
        const files = {
            'index.html': this.generateHTML(deploymentPackage.data),
            'style.css': this.generateCSS(deploymentPackage.data),
            'script.js': this.generateJS(deploymentPackage.data),
            'manifest.json': this.generateManifest(deploymentPackage.data),
            'config.json': JSON.stringify(deploymentPackage, null, 2)
        };

        return files;
    }

    // Generate HTML for specific template
    generateHTML(data) {
        // This would generate HTML based on the template sections
        // For now, return the existing HTML as base
        return document.documentElement.outerHTML;
    }

    // Generate CSS for specific template
    generateCSS(data) {
        // Generate custom CSS based on theme
        const customCSS = `
            :root {
                --primary-color: ${data.theme.primaryColor};
                --secondary-color: ${data.theme.secondaryColor};
                --background: ${data.theme.backgroundColor};
            }
        `;
        
        return customCSS + document.querySelector('style').textContent;
    }

    // Generate JavaScript for specific template
    generateJS(data) {
        // Generate custom JS configuration
        return `
            // Generated configuration for ${data.artist.name}
            window.artistConfig = ${JSON.stringify(data, null, 2)};
            ` + document.querySelector('script').textContent;
    }

    // Generate PWA manifest
    generateManifest(data) {
        return {
            "name": `${data.artist.name} - Artist Hub`,
            "short_name": data.artist.name,
            "description": data.artist.bio,
            "start_url": "/",
            "display": "standalone",
            "background_color": data.theme.primaryColor,
            "theme_color": data.theme.primaryColor,
            "icons": [
                {
                    "src": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=192&h=192&fit=crop&crop=face",
                    "sizes": "192x192",
                    "type": "image/png"
                }
            ]
        };
    }

    // Setup event listeners
    setupEventListeners() {
        // Template selection events
        // Deployment events
        // Customization events
    }

    // Export template system
    exportTemplateSystem() {
        return {
            templates: this.templates,
            version: "1.0.0",
            exportDate: new Date().toISOString()
        };
    }

    // Import template configuration
    importTemplateSystem(config) {
        if (config.templates) {
            this.templates = { ...this.templates, ...config.templates };
        }
    }

    // Create new template
    createTemplate(templateConfig) {
        const templateId = templateConfig.id || `template_${Date.now()}`;
        this.templates[templateId] = {
            name: templateConfig.name,
            description: templateConfig.description,
            features: templateConfig.features || [],
            colorScheme: templateConfig.colorScheme || this.templates.musician.colorScheme,
            sections: templateConfig.sections || this.templates.musician.sections
        };
        
        return templateId;
    }

    // Get template by type
    getTemplate(templateType) {
        return this.templates[templateType];
    }

    // List all available templates
    listTemplates() {
        return Object.keys(this.templates).map(key => ({
            id: key,
            ...this.templates[key]
        }));
    }

    // Validate template configuration
    validateTemplate(templateConfig) {
        const required = ['name', 'description', 'colorScheme', 'sections'];
        const missing = required.filter(field => !templateConfig[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        
        return true;
    }
}

// Template Management API
class TemplateManagerAPI {
    constructor() {
        this.templateSystem = new ArtistTemplateSystem();
        this.setupAPIRoutes();
    }

    setupAPIRoutes() {
        // This would set up Express.js routes or similar
        // For now, we'll provide the interface methods
    }

    // API: Get available templates
    async getTemplates() {
        return this.templateSystem.listTemplates();
    }

    // API: Create artist hub
    async createArtistHub(templateType, artistData, deploymentConfig) {
        try {
            return this.templateSystem.deployArtistHub(artistData, deploymentConfig);
        } catch (error) {
            throw new Error(`Failed to create artist hub: ${error.message}`);
        }
    }

    // API: Get template details
    async getTemplate(templateType) {
        const template = this.templateSystem.getTemplate(templateType);
        if (!template) {
            throw new Error(`Template "${templateType}" not found`);
        }
        return template;
    }

    // API: Validate template configuration
    async validateTemplate(templateConfig) {
        return this.templateSystem.validateTemplate(templateConfig);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ArtistTemplateSystem, TemplateManagerAPI };
} else {
    window.ArtistTemplateSystem = ArtistTemplateSystem;
    window.TemplateManagerAPI = TemplateManagerAPI;
}