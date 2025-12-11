// Alki Otis - Artist Link Hub JavaScript

class ArtistLinkHub {
    constructor() {
        this.data = this.loadData();
        this.analytics = this.loadAnalytics();
        this.isEditMode = false;
        this.init();
    }

    init() {
        this.hideLoadingScreen();
        this.renderArtistProfile();
        this.renderFeaturedTrack();
        this.renderMusicStreaming();
        this.renderSocialMedia();
        this.renderTourDates();
        this.renderMerchandise();
        this.renderFanClub();
        this.renderDirectContact();
        this.renderAnalytics();
        this.applyTheme();
        this.setupEventListeners();
        this.updateStats();
        this.initializeAnimations();
    }

    // Data Management
    loadData() {
        const defaultData = {
            artist: {
                name: "Alki Otis",
                title: "Music Artist • Songwriter",
                bio: "Creating music that moves souls and tells stories. Managed by HLPFL - Independent Artist Management.",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
                verified: true,
                hlpflManaged: true
            },
            featuredTrack: {
                title: "Latest Single",
                artist: "Alki Otis",
                artwork: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
                spotify: "https://open.spotify.com/track/yourtrackid",
                apple: "https://music.apple.com/track/yourtrackid",
                youtube: "https://youtube.com/watch?v=yourvideoid"
            },
            streaming: {
                spotify: {
                    url: "https://open.spotify.com/artist/alkiotis",
                    type: "Artist Profile",
                    listeners: "234K"
                },
                apple: {
                    url: "https://music.apple.com/artist/alkiotis",
                    type: "Music Library"
                },
                soundcloud: {
                    url: "https://soundcloud.com/alkiotis",
                    type: "Audio Tracks"
                },
                youtubeMusic: {
                    url: "https://music.youtube.com/artist/alkiotis",
                    type: "Videos & Music"
                },
                tidal: {
                    url: "https://tidal.com/artist/alkiotis",
                    type: "Hi-Fi Streaming"
                },
                bandcamp: {
                    url: "https://alkiotis.bandcamp.com",
                    type: "Direct Support"
                }
            },
            social: {
                instagram: {
                    url: "https://instagram.com/alkiotis",
                    handle: "@alkiotis",
                    followers: "12.5K",
                    posts: "892",
                    verified: false,
                    active: true
                },
                youtube: {
                    url: "https://youtube.com/@alkiotismusic",
                    handle: "Alki Otis Music",
                    subscribers: "45.2K",
                    videos: "128",
                    verified: true
                },
                tiktok: {
                    url: "https://tiktok.com/@alkiotis",
                    handle: "@alkiotis",
                    followers: "89.3K",
                    likes: "2.1M",
                    trending: true
                },
                twitter: {
                    url: "https://twitter.com/alkiotis",
                    handle: "@alkiotis",
                    followers: "8.7K",
                    tweets: "3.2K"
                }
            },
            tour: {
                dates: [
                    {
                        date: "Dec 15",
                        venue: "The Troubadour",
                        location: "Los Angeles, CA",
                        ticketsUrl: "https://tickets.example.com/troubadour"
                    },
                    {
                        date: "Dec 18",
                        venue: "The Bowery Ballroom",
                        location: "New York, NY",
                        ticketsUrl: "https://tickets.example.com/bowery"
                    },
                    {
                        date: "Jan 5",
                        venue: "Metro Chicago",
                        location: "Chicago, IL",
                        ticketsUrl: "https://tickets.example.com/metro"
                    }
                ]
            },
            merchandise: {
                featured: {
                    title: "Signature Collection",
                    description: "Limited edition apparel and accessories",
                    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
                    url: "https://shop.alkiotis.com/featured"
                },
                store: {
                    url: "https://shop.alkiotis.com",
                    title: "Official Store",
                    description: "Browse all merchandise"
                },
                music: {
                    url: "https://shop.alkiotis.com/music",
                    title: "Vinyl & CDs",
                    description: "Physical music collection"
                },
                packages: {
                    url: "https://shop.alkiotis.com/packages",
                    title: "Packages",
                    description: "Exclusive fan bundles"
                }
            },
            contact: {
                management: "management@hlpfl.org",
                press: "press@hlpfl.org",
                fanMail: "fans@alkiotis.com",
                booking: "https://calendly.com/alkiotis/booking",
                collaboration: "https://calendly.com/alkiotis/collaboration",
                pressKit: "https://press.alkiotis.com"
            },
            theme: {
                primaryColor: "#6b46c1",
                secondaryColor: "#8b5cf6",
                backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            }
        };

        const savedData = localStorage.getItem('artistlinkhub-data');
        return savedData ? JSON.parse(savedData) : defaultData;
    }

    loadAnalytics() {
        const defaultAnalytics = {
            totalClicks: 0,
            uniqueVisitors: 0,
            platformClicks: {},
            linkClicks: {},
            topPlatform: "Spotify",
            lastVisit: null,
            sessions: []
        };

        const savedAnalytics = localStorage.getItem('artistlinkhub-analytics');
        return savedAnalytics ? JSON.parse(savedAnalytics) : defaultAnalytics;
    }

    saveData() {
        localStorage.setItem('artistlinkhub-data', JSON.stringify(this.data));
    }

    saveAnalytics() {
        localStorage.setItem('artistlinkhub-analytics', JSON.stringify(this.analytics));
    }

    // Loading Screen
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 1500);
    }

    // Artist Profile Rendering
    renderArtistProfile() {
        const profileImg = document.getElementById('profile-img');
        const artistName = document.getElementById('artist-name');
        const artistTitle = document.getElementById('artist-title');
        const artistBio = document.getElementById('artist-bio');
        const verifiedBadge = document.getElementById('verifiedBadge');
        const hlpflBadge = document.querySelector('.hlpfl-badge');

        if (profileImg) profileImg.src = this.data.artist.image;
        if (artistName) artistName.textContent = this.data.artist.name;
        if (artistTitle) artistTitle.textContent = this.data.artist.title;
        if (artistBio) artistBio.textContent = this.data.artist.bio;
        if (verifiedBadge) {
            verifiedBadge.style.display = this.data.artist.verified ? 'flex' : 'none';
        }
        if (hlpflBadge) {
            hlpflBadge.style.display = this.data.artist.hlpflManaged ? 'flex' : 'none';
        }
    }

    // Featured Track Rendering
    renderFeaturedTrack() {
        const trackTitle = document.getElementById('featuredTrackTitle');
        const trackArtist = document.getElementById('featuredTrackArtist');
        const trackImage = document.querySelector('.track-image');

        if (trackTitle) trackTitle.textContent = this.data.featuredTrack.title;
        if (trackArtist) trackArtist.textContent = this.data.featuredTrack.artist;
        if (trackImage) trackImage.src = this.data.featuredTrack.artwork;
    }

    // Music Streaming Rendering
    renderMusicStreaming() {
        const streamingPlatforms = ['spotify', 'apple', 'soundcloud', 'youtubeMusic', 'tidal', 'bandcamp'];
        
        streamingPlatforms.forEach(platform => {
            const card = document.querySelector(`.${platform}-card`);
            if (card && this.data.streaming[platform]) {
                const type = card.querySelector('.streaming-type');
                const listeners = card.querySelector('.stat-count');
                
                if (type) type.textContent = this.data.streaming[platform].type;
                if (listeners && this.data.streaming[platform].listeners) {
                    listeners.textContent = this.data.streaming[platform].listeners;
                }
            }
        });
    }

    // Social Media Rendering
    renderSocialMedia() {
        const platforms = ['instagram', 'youtube', 'tiktok', 'twitter'];
        
        platforms.forEach(platform => {
            const card = document.querySelector(`.${platform}-card`);
            if (card && this.data.social[platform]) {
                const handle = card.querySelector('.social-handle');
                const stats = card.querySelectorAll('.stat-count');
                
                if (handle) handle.textContent = this.data.social[platform].handle;
                
                if (stats.length > 0 && this.data.social[platform].followers) {
                    stats[0].textContent = this.data.social[platform].followers;
                }
                if (stats.length > 1) {
                    if (this.data.social[platform].posts) {
                        stats[1].textContent = this.data.social[platform].posts;
                    } else if (this.data.social[platform].videos) {
                        stats[1].textContent = this.data.social[platform].videos;
                    } else if (this.data.social[platform].tweets) {
                        stats[1].textContent = this.data.social[platform].tweets;
                    }
                }
            }
        });
    }

    // Tour Dates Rendering
    renderTourDates() {
        const tourDatesContainer = document.getElementById('tourDates');
        if (!tourDatesContainer) return;

        tourDatesContainer.innerHTML = '';
        
        this.data.tour.dates.forEach((date, index) => {
            const tourItem = document.createElement('div');
            tourItem.className = 'tour-date-item';
            tourItem.innerHTML = `
                <div class="tour-date-info">
                    <span class="tour-date">${date.date}</span>
                    <span class="tour-venue">${date.venue}</span>
                    <span class="tour-location">${date.location}</span>
                </div>
                <button class="tour-tickets-btn">Tickets</button>
            `;
            
            const ticketsBtn = tourItem.querySelector('.tour-tickets-btn');
            ticketsBtn.addEventListener('click', () => {
                this.handleLinkClick(date.ticketsUrl, 'tour', `date_${index}`);
            });
            
            tourDatesContainer.appendChild(tourItem);
        });
    }

    // Merchandise Rendering
    renderMerchandise() {
        // Featured merch
        const featuredTitle = document.querySelector('.featured-merch h3');
        const featuredDesc = document.querySelector('.featured-merch p');
        const featuredImage = document.querySelector('.product-image');
        
        if (featuredTitle) featuredTitle.textContent = this.data.merchandise.featured.title;
        if (featuredDesc) featuredDesc.textContent = this.data.merchandise.featured.description;
        if (featuredImage) featuredImage.src = this.data.merchandise.featured.image;

        // Store links
        const storeLinks = ['store', 'music', 'packages'];
        storeLinks.forEach((type, index) => {
            const linkItem = document.querySelectorAll('.merch-link-item')[index];
            if (linkItem && this.data.merchandise[type]) {
                const title = linkItem.querySelector('h4');
                const description = linkItem.querySelector('p');
                const button = linkItem.querySelector('.merch-link-btn');
                
                if (title) title.textContent = this.data.merchandise[type].title;
                if (description) description.textContent = this.data.merchandise[type].description;
                if (button) {
                    button.addEventListener('click', () => {
                        this.handleLinkClick(this.data.merchandise[type].url, 'merch', type);
                    });
                }
            }
        });
    }

    // Fan Club Rendering
    renderFanClub() {
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('newsletterEmail');
                if (emailInput && emailInput.value) {
                    this.trackClick('newsletter', 'subscribe');
                    this.showSuccessMessage('Successfully subscribed to newsletter!');
                    emailInput.value = '';
                }
            });
        }

        const fanClubBtn = document.querySelector('.fan-club-btn');
        if (fanClubBtn) {
            fanClubBtn.addEventListener('click', () => {
                this.handleLinkClick('/fan-club', 'fan-club', 'join');
            });
        }
    }

    // Direct Contact Rendering
    renderDirectContact() {
        const contactCards = [
            { type: 'management', email: this.data.contact.management },
            { type: 'press', email: this.data.contact.press },
            { type: 'fan-mail', email: this.data.contact.fanMail }
        ];

        contactCards.forEach((card, index) => {
            const contactCard = document.querySelectorAll('.contact-card')[index];
            if (contactCard) {
                const emailSpan = contactCard.querySelector('.contact-email');
                const button = contactCard.querySelector('.contact-btn');
                
                if (emailSpan) emailSpan.textContent = card.email;
                if (button) {
                    button.addEventListener('click', () => {
                        if (card.type === 'management') {
                            this.handleLinkClick(this.data.contact.booking, 'contact', 'booking');
                        } else if (card.type === 'press') {
                            this.handleLinkClick(this.data.contact.pressKit, 'contact', 'press-kit');
                        } else {
                            this.handleLinkClick(`mailto:${card.email}`, 'contact', card.type);
                        }
                    });
                }
            }
        });
    }

    // Analytics Rendering
    renderAnalytics() {
        const totalClicksElement = document.getElementById('totalClicksAnalytics');
        const uniqueVisitorsElement = document.getElementById('uniqueVisitors');
        const topPlatformElement = document.getElementById('topPlatform');
        const avgSessionElement = document.getElementById('avgSession');

        if (totalClicksElement) totalClicksElement.textContent = this.analytics.totalClicks;
        if (uniqueVisitorsElement) uniqueVisitorsElement.textContent = this.analytics.uniqueVisitors;
        if (topPlatformElement) topPlatformElement.textContent = this.analytics.topPlatform;
        if (avgSessionElement) {
            const avgTime = this.calculateAverageSessionTime();
            avgSessionElement.textContent = avgTime;
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Edit Toggle
        const editToggle = document.getElementById('editToggle');
        if (editToggle) {
            editToggle.addEventListener('click', () => this.toggleEditMode());
        }

        // Manage Button (HLPFL)
        const manageBtn = document.getElementById('manageBtn');
        if (manageBtn) {
            manageBtn.addEventListener('click', () => {
                this.handleLinkClick('https://hlpfl.org', 'management', 'hlpfl');
            });
        }

        // Modal Controls
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeEditModal());
        }

        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveChanges());
        }

        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetToDefault());
        }

        // Featured Track Actions
        this.setupFeaturedTrackActions();

        // Streaming Links
        this.setupStreamingLinks();

        // Social Media Links
        this.setupSocialMediaLinks();

        // Modal Background Click
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeEditModal();
                }
            });
        }

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isEditMode) {
                this.closeEditModal();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.toggleEditMode();
            }
        });
    }

    setupFeaturedTrackActions() {
        const spotifyBtn = document.getElementById('spotifyBtn');
        const appleBtn = document.getElementById('appleBtn');
        const youtubeBtn = document.getElementById('youtubeBtn');
        const playBtn = document.getElementById('playFeaturedBtn');

        if (spotifyBtn) {
            spotifyBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.featuredTrack.spotify, 'featured-track', 'spotify');
            });
        }

        if (appleBtn) {
            appleBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.featuredTrack.apple, 'featured-track', 'apple');
            });
        }

        if (youtubeBtn) {
            youtubeBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.featuredTrack.youtube, 'featured-track', 'youtube');
            });
        }

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                this.trackClick('featured-track', 'play');
                this.showSuccessMessage('Opening featured track...');
                this.handleLinkClick(this.data.featuredTrack.spotify, 'featured-track', 'play');
            });
        }
    }

    setupStreamingLinks() {
        const streamingPlatforms = ['spotify', 'apple', 'soundcloud', 'youtubeMusic', 'tidal', 'bandcamp'];
        
        streamingPlatforms.forEach(platform => {
            const button = document.querySelector(`.${platform}-card .streaming-btn`);
            if (button) {
                button.addEventListener('click', () => {
                    this.handleLinkClick(this.data.streaming[platform].url, 'streaming', platform);
                });
            }
        });
    }

    setupSocialMediaLinks() {
        // Instagram
        const instagramBtn = document.querySelector('.instagram-card .social-btn');
        const instagramMessageBtn = document.querySelector('.instagram-card .message-btn');
        
        if (instagramBtn) {
            instagramBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.instagram.url, 'social', 'instagram');
            });
        }
        
        if (instagramMessageBtn) {
            instagramMessageBtn.addEventListener('click', () => {
                this.handleLinkClick(`https://instagram.com/direct/new/`, 'social', 'instagram_message');
            });
        }

        // YouTube
        const youtubeBtn = document.querySelector('.youtube-card .social-btn');
        const youtubeSubscribeBtn = document.querySelector('.youtube-card .subscribe-btn');
        
        if (youtubeBtn) {
            youtubeBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.youtube.url, 'social', 'youtube');
            });
        }
        
        if (youtubeSubscribeBtn) {
            youtubeSubscribeBtn.addEventListener('click', () => {
                this.handleLinkClick(`${this.data.social.youtube.url}?sub_confirmation=1`, 'social', 'youtube_subscribe');
            });
        }

        // TikTok
        const tiktokBtn = document.querySelector('.tiktok-card .social-btn');
        const tiktokFollowBtn = document.querySelector('.tiktok-card .follow-btn');
        
        if (tiktokBtn) {
            tiktokBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.tiktok.url, 'social', 'tiktok');
            });
        }
        
        if (tiktokFollowBtn) {
            tiktokFollowBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.tiktok.url, 'social', 'tiktok_follow');
            });
        }

        // Twitter
        const twitterBtn = document.querySelector('.twitter-card .social-btn');
        const twitterMessageBtn = document.querySelector('.twitter-card .message-btn');
        
        if (twitterBtn) {
            twitterBtn.addEventListener('click', () => {
                this.handleLinkClick(this.data.social.twitter.url, 'social', 'twitter');
            });
        }
        
        if (twitterMessageBtn) {
            twitterMessageBtn.addEventListener('click', () => {
                this.handleLinkClick(`https://twitter.com/messages/compose?recipient_id=alkiotis`, 'social', 'twitter_message');
            });
        }
    }

    // Link Click Handler
    handleLinkClick(url, type, identifier) {
        // Track analytics
        this.trackClick(type, identifier);
        
        // Open link
        if (url.startsWith('mailto:') || url.startsWith('tel:')) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }

        // Add visual feedback
        this.showClickFeedback();
    }

    // Analytics Tracking
    trackClick(type, identifier) {
        this.analytics.totalClicks++;
        
        if (!this.analytics.platformClicks[type]) {
            this.analytics.platformClicks[type] = {};
        }
        
        if (!this.analytics.platformClicks[type][identifier]) {
            this.analytics.platformClicks[type][identifier] = 0;
        }
        
        this.analytics.platformClicks[type][identifier]++;
        
        // Update top platform
        this.updateTopPlatform();
        
        // Track session
        this.trackSession();
        
        this.saveAnalytics();
        this.updateStats();
    }

    updateTopPlatform() {
        let maxClicks = 0;
        let topPlatform = "Spotify";
        
        Object.keys(this.analytics.platformClicks).forEach(type => {
            Object.keys(this.analytics.platformClicks[type]).forEach(platform => {
                const clicks = this.analytics.platformClicks[type][platform];
                if (clicks > maxClicks) {
                    maxClicks = clicks;
                    topPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);
                }
            });
        });
        
        this.analytics.topPlatform = topPlatform;
    }

    trackSession() {
        const now = Date.now();
        const sessionId = this.getSessionId();
        
        if (!this.analytics.lastVisit || now - this.analytics.lastVisit > 30 * 60 * 1000) { // 30 minutes
            this.analytics.uniqueVisitors++;
        }
        
        this.analytics.lastVisit = now;
        
        if (!this.analytics.sessions.find(s => s.id === sessionId)) {
            this.analytics.sessions.push({
                id: sessionId,
                startTime: now,
                clicks: 0
            });
        }
        
        const session = this.analytics.sessions.find(s => s.id === sessionId);
        if (session) {
            session.clicks++;
            session.lastActivity = now;
        }
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('artistlinkhub-session');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('artistlinkhub-session', sessionId);
        }
        return sessionId;
    }

    calculateAverageSessionTime() {
        const completedSessions = this.analytics.sessions.filter(s => s.lastActivity);
        if (completedSessions.length === 0) return '0s';
        
        const totalTime = completedSessions.reduce((sum, session) => {
            const duration = session.lastActivity - session.startTime;
            return sum + duration;
        }, 0);
        
        const avgTime = totalTime / completedSessions.length;
        const seconds = Math.floor(avgTime / 1000);
        
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }

    // Stats Update
    updateStats() {
        const monthlyListenersElement = document.getElementById('monthlyListeners');
        const totalStreamsElement = document.getElementById('totalStreams');
        const totalClicksElement = document.getElementById('totalClicks');
        
        if (monthlyListenersElement) monthlyListenersElement.textContent = this.data.streaming.spotify.listeners;
        if (totalStreamsElement) totalStreamsElement.textContent = this.formatNumber(this.analytics.totalClicks * 100);
        if (totalClicksElement) totalClicksElement.textContent = this.analytics.totalClicks;
        
        this.renderAnalytics();
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Edit Mode Functions
    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        
        const analyticsDashboard = document.getElementById('analyticsDashboard');
        if (analyticsDashboard) {
            analyticsDashboard.style.display = this.isEditMode ? 'block' : 'none';
        }
        
        if (this.isEditMode) {
            this.openEditModal();
        }
    }

    openEditModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.classList.add('active');
            this.populateEditForm();
        }
    }

    closeEditModal() {
        const modal = document.getElementById('editModal');
        if (modal) {
            modal.classList.remove('active');
        }
        this.isEditMode = false;
    }

    populateEditForm() {
        // Artist Information
        const editName = document.getElementById('editName');
        const editTitle = document.getElementById('editTitle');
        const editBio = document.getElementById('editBio');
        const editImage = document.getElementById('editImage');
        
        if (editName) editName.value = this.data.artist.name;
        if (editTitle) editTitle.value = this.data.artist.title;
        if (editBio) editBio.value = this.data.artist.bio;
        if (editImage) editImage.value = this.data.artist.image;
        
        // Featured Track
        const editTrackTitle = document.getElementById('editTrackTitle');
        const editTrackArtwork = document.getElementById('editTrackArtwork');
        
        if (editTrackTitle) editTrackTitle.value = this.data.featuredTrack.title;
        if (editTrackArtwork) editTrackArtwork.value = this.data.featuredTrack.artwork;
        
        // Streaming Links
        const streamingInputs = {
            spotify: 'editSpotify',
            apple: 'editApple',
            soundcloud: 'editSoundCloud',
            youtubeMusic: 'editYouTube',
            tidal: 'editTidal',
            bandcamp: 'editBandcamp'
        };
        
        Object.keys(streamingInputs).forEach(platform => {
            const input = document.getElementById(streamingInputs[platform]);
            if (input && this.data.streaming[platform]) {
                input.value = this.data.streaming[platform].url;
            }
        });
        
        // Social Media Links
        const socialInputs = {
            instagram: 'editInstagram',
            youtube: 'editYouTubeSocial',
            tiktok: 'editTikTok',
            twitter: 'editTwitter'
        };
        
        Object.keys(socialInputs).forEach(platform => {
            const input = document.getElementById(socialInputs[platform]);
            if (input && this.data.social[platform]) {
                input.value = this.data.social[platform].url;
            }
        });
        
        // Theme
        const editPrimaryColor = document.getElementById('editPrimaryColor');
        const editSecondaryColor = document.getElementById('editSecondaryColor');
        
        if (editPrimaryColor) editPrimaryColor.value = this.data.theme.primaryColor;
        if (editSecondaryColor) editSecondaryColor.value = this.data.theme.secondaryColor;
    }

    saveChanges() {
        // Artist Information
        const editName = document.getElementById('editName');
        const editTitle = document.getElementById('editTitle');
        const editBio = document.getElementById('editBio');
        const editImage = document.getElementById('editImage');
        
        if (editName) this.data.artist.name = editName.value;
        if (editTitle) this.data.artist.title = editTitle.value;
        if (editBio) this.data.artist.bio = editBio.value;
        if (editImage) this.data.artist.image = editImage.value;
        
        // Featured Track
        const editTrackTitle = document.getElementById('editTrackTitle');
        const editTrackArtwork = document.getElementById('editTrackArtwork');
        
        if (editTrackTitle) this.data.featuredTrack.title = editTrackTitle.value;
        if (editTrackArtwork) this.data.featuredTrack.artwork = editTrackArtwork.value;
        
        // Streaming Links
        const streamingInputs = {
            spotify: 'editSpotify',
            apple: 'editApple',
            soundcloud: 'editSoundCloud',
            youtubeMusic: 'editYouTube',
            tidal: 'editTidal',
            bandcamp: 'editBandcamp'
        };
        
        Object.keys(streamingInputs).forEach(platform => {
            const input = document.getElementById(streamingInputs[platform]);
            if (input) {
                this.data.streaming[platform].url = input.value;
            }
        });
        
        // Social Media Links
        const socialInputs = {
            instagram: 'editInstagram',
            youtube: 'editYouTubeSocial',
            tiktok: 'editTikTok',
            twitter: 'editTwitter'
        };
        
        Object.keys(socialInputs).forEach(platform => {
            const input = document.getElementById(socialInputs[platform]);
            if (input) {
                this.data.social[platform].url = input.value;
            }
        });
        
        // Extract handles from URLs
        this.extractSocialHandles();
        
        // Theme
        const editPrimaryColor = document.getElementById('editPrimaryColor');
        const editSecondaryColor = document.getElementById('editSecondaryColor');
        
        if (editPrimaryColor) this.data.theme.primaryColor = editPrimaryColor.value;
        if (editSecondaryColor) this.data.theme.secondaryColor = editSecondaryColor.value;
        
        this.saveData();
        this.renderArtistProfile();
        this.renderFeaturedTrack();
        this.renderMusicStreaming();
        this.renderSocialMedia();
        this.applyTheme();
        this.closeEditModal();
        this.showSuccessMessage('Changes saved successfully!');
    }

    extractSocialHandles() {
        // Instagram
        if (this.data.social.instagram.url) {
            const match = this.data.social.instagram.url.match(/instagram\.com\/@?([^\/\?]+)/);
            if (match) this.data.social.instagram.handle = '@' + match[1];
        }
        
        // TikTok
        if (this.data.social.tiktok.url) {
            const match = this.data.social.tiktok.url.match(/tiktok\.com\/@?([^\/\?]+)/);
            if (match) this.data.social.tiktok.handle = '@' + match[1];
        }
        
        // Twitter
        if (this.data.social.twitter.url) {
            const match = this.data.social.twitter.url.match(/twitter\.com\/@?([^\/\?]+)/);
            if (match) this.data.social.twitter.handle = '@' + match[1];
        }
    }

    resetToDefault() {
        if (confirm('Are you sure you want to reset all data to default? This action cannot be undone.')) {
            localStorage.removeItem('artistlinkhub-data');
            localStorage.removeItem('artistlinkhub-analytics');
            this.data = this.loadData();
            this.analytics = this.loadAnalytics();
            this.init();
            this.closeEditModal();
            this.showSuccessMessage('Reset to default successfully!');
        }
    }

    // Theme Application
    applyTheme() {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', this.data.theme.primaryColor);
        root.style.setProperty('--secondary-color', this.data.theme.secondaryColor);
        document.body.style.background = this.data.theme.backgroundColor;
    }

    // Visual Feedback
    showClickFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'click-feedback';
        feedback.innerHTML = '<i class="fas fa-check"></i> Link opened!';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2s forwards;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (document.body.contains(feedback)) {
                document.body.removeChild(feedback);
            }
        }, 2500);
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 3s forwards;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 3500);
    }

    // Animations
    initializeAnimations() {
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .click-feedback, .success-message {
                font-family: var(--font-primary);
                font-weight: 500;
                font-size: 0.875rem;
            }
        `;
        document.head.appendChild(style);
        
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.streaming-card, .social-card, .tour-card, .booking-card, .merch-card, .fan-club-card, .newsletter-card, .contact-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Export/Import Functions
    exportData() {
        const exportData = {
            artist: this.data.artist,
            featuredTrack: this.data.featuredTrack,
            streaming: this.data.streaming,
            social: this.data.social,
            tour: this.data.tour,
            merchandise: this.data.merchandise,
            contact: this.data.contact,
            theme: this.data.theme
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'artist-link-hub-backup.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                this.data = { ...this.data, ...importData };
                this.saveData();
                this.init();
                this.showSuccessMessage('Data imported successfully!');
            } catch (error) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArtistLinkHub();
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}