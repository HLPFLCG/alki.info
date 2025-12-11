// Admin Dashboard JavaScript

class AdminDashboard {
    constructor() {
        this.artists = this.loadArtists();
        this.analytics = this.loadAnalytics();
        this.init();
    }

    init() {
        this.renderArtistsGrid();
        this.renderStats();
        this.renderAnalytics();
        this.renderActivityFeed();
        this.setupEventListeners();
        this.initializeCharts();
    }

    // Data Management
    loadArtists() {
        const savedArtists = localStorage.getItem('hlpfl_artists');
        if (savedArtists) {
            return JSON.parse(savedArtists);
        }
        
        // Default artists data
        return [
            {
                id: 1,
                name: "Alki Otis",
                title: "Music Artist • Songwriter",
                template: "musician",
                domain: "alkiotis.hlpfl.org",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=48&h=48&fit=crop&crop=face",
                stats: {
                    clicks: 15234,
                    views: 45678,
                    conversions: 89
                },
                createdAt: "2024-01-15",
                lastActive: "2024-12-08"
            },
            {
                id: 2,
                name: "Luna Rose",
                title: "Indie Pop Artist",
                template: "musician",
                domain: "lunarose.hlpfl.org",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=48&h=48&fit=crop&crop=face",
                stats: {
                    clicks: 8901,
                    views: 23456,
                    conversions: 45
                },
                createdAt: "2024-02-20",
                lastActive: "2024-12-07"
            },
            {
                id: 3,
                name: "The Midnight Collective",
                title: "Alternative Band",
                template: "band",
                domain: "midnight.hlpfl.org",
                image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=48&h=48&fit=crop&crop=face",
                stats: {
                    clicks: 12456,
                    views: 34567,
                    conversions: 67
                },
                createdAt: "2024-03-10",
                lastActive: "2024-12-06"
            }
        ];
    }

    loadAnalytics() {
        return {
            totalClicks: 45200,
            totalViews: 128500,
            mobileUsers: 78,
            topPlatforms: {
                spotify: 35,
                instagram: 28,
                youtube: 22,
                soundcloud: 15
            },
            clicksTrend: [3200, 3800, 4100, 4500, 4200, 4800, 5200],
            viewsTrend: [8900, 9200, 9800, 10200, 9800, 11200, 12500]
        };
    }

    // Rendering Methods
    renderArtistsGrid() {
        const grid = document.getElementById('artistsGrid');
        const searchTerm = document.getElementById('artistSearch')?.value.toLowerCase() || '';
        const filterTemplate = document.getElementById('filterTemplate')?.value || 'all';

        let filteredArtists = this.artists.filter(artist => {
            const matchesSearch = artist.name.toLowerCase().includes(searchTerm) || 
                                artist.title.toLowerCase().includes(searchTerm);
            const matchesTemplate = filterTemplate === 'all' || artist.template === filterTemplate;
            return matchesSearch && matchesTemplate;
        });

        grid.innerHTML = filteredArtists.map(artist => `
            <div class="artist-card" data-artist-id="${artist.id}">
                <div class="artist-card-header">
                    <img src="${artist.image}" alt="${artist.name}" class="artist-card-avatar">
                    <div class="artist-card-info">
                        <h4>${artist.name}</h4>
                        <p>${artist.title}</p>
                    </div>
                </div>
                <div class="artist-card-stats">
                    <div class="artist-stat">
                        <div class="artist-stat-value">${this.formatNumber(artist.stats.clicks)}</div>
                        <div class="artist-stat-label">Clicks</div>
                    </div>
                    <div class="artist-stat">
                        <div class="artist-stat-value">${this.formatNumber(artist.stats.views)}</div>
                        <div class="artist-stat-label">Views</div>
                    </div>
                </div>
                <div class="artist-card-actions">
                    <button onclick="adminDashboard.editArtist(${artist.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button onclick="adminDashboard.viewAnalytics(${artist.id})">
                        <i class="fas fa-chart-line"></i> Analytics
                    </button>
                    <button onclick="adminDashboard.viewHub(${artist.id})">
                        <i class="fas fa-external-link-alt"></i> View
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderStats() {
        document.getElementById('totalArtists').textContent = this.artists.length;
        document.getElementById('totalClicks').textContent = this.formatNumber(this.analytics.totalClicks);
        document.getElementById('totalViews').textContent = this.formatNumber(this.analytics.totalViews);
        document.getElementById('mobileUsers').textContent = this.analytics.mobileUsers + '%';
    }

    renderAnalytics() {
        // Analytics charts will be rendered by Chart.js
        this.updateCharts();
    }

    renderActivityFeed() {
        const activities = [
            {
                type: 'click',
                artist: 'Alki Otis',
                action: 'New high click rate on Spotify link',
                time: '2 hours ago',
                icon: 'fas fa-mouse-pointer',
                color: '#10b981'
            },
            {
                type: 'view',
                artist: 'Luna Rose',
                action: '500 new profile views this week',
                time: '4 hours ago',
                icon: 'fas fa-eye',
                color: '#3b82f6'
            },
            {
                type: 'artist',
                artist: 'The Midnight Collective',
                action: 'Updated tour dates',
                time: '6 hours ago',
                icon: 'fas fa-calendar',
                color: '#f59e0b'
            },
            {
                type: 'conversion',
                artist: 'Alki Otis',
                action: 'Merchandise purchase conversion',
                time: '1 day ago',
                icon: 'fas fa-shopping-cart',
                color: '#ec4899'
            },
            {
                type: 'social',
                artist: 'Luna Rose',
                action: 'Instagram followers increased by 500',
                time: '2 days ago',
                icon: 'fas fa-instagram',
                color: '#bc1888'
            }
        ];

        const feed = document.getElementById('activityFeed');
        feed.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon" style="background: ${activity.color}20; color: ${activity.color};">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p><strong>${activity.artist}:</strong> ${activity.action}</p>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }

    // Chart Methods
    initializeCharts() {
        // Clicks Trend Chart
        const clicksCtx = document.getElementById('clicksChart')?.getContext('2d');
        if (clicksCtx) {
            this.clicksChart = new Chart(clicksCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Clicks',
                        data: this.analytics.clicksTrend,
                        borderColor: '#6b46c1',
                        backgroundColor: 'rgba(107, 70, 193, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Platform Performance Chart
        const platformCtx = document.getElementById('platformChart')?.getContext('2d');
        if (platformCtx) {
            this.platformChart = new Chart(platformCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Spotify', 'Instagram', 'YouTube', 'SoundCloud'],
                    datasets: [{
                        data: Object.values(this.analytics.topPlatforms),
                        backgroundColor: [
                            '#1db954',
                            '#bc1888',
                            '#ff0000',
                            '#ff5500'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    updateCharts() {
        if (this.clicksChart) {
            this.clicksChart.update();
        }
        if (this.platformChart) {
            this.platformChart.update();
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Add Artist Button
        document.getElementById('addArtistBtn')?.addEventListener('click', () => {
            this.showAddArtistModal();
        });

        // Modal Controls
        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('cancelAdd')?.addEventListener('click', () => {
            this.hideModal();
        });

        // Artist Form
        document.getElementById('artistForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addArtist();
        });

        // Search and Filter
        document.getElementById('artistSearch')?.addEventListener('input', () => {
            this.renderArtistsGrid();
        });

        document.getElementById('filterTemplate')?.addEventListener('change', () => {
            this.renderArtistsGrid();
        });

        // Time Range
        document.getElementById('timeRange')?.addEventListener('change', (e) => {
            this.updateTimeRange(e.target.value);
        });

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(item.getAttribute('href').substring(1));
                
                // Update active state
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Close modal on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal();
            }
        });
    }

    // Artist Management Methods
    showAddArtistModal() {
        document.getElementById('addArtistModal').classList.add('active');
    }

    hideModal() {
        document.getElementById('addArtistModal').classList.remove('active');
        document.getElementById('artistForm').reset();
    }

    addArtist() {
        const formData = new FormData(document.getElementById('artistForm'));
        const newArtist = {
            id: Date.now(),
            name: formData.get('artistName') || document.getElementById('artistName').value,
            title: formData.get('artistTitle') || document.getElementById('artistTitle').value,
            bio: formData.get('artistBio') || document.getElementById('artistBio').value,
            image: formData.get('artistImage') || document.getElementById('artistImage').value,
            template: formData.get('artistTemplate') || document.getElementById('artistTemplate').value,
            domain: formData.get('artistDomain') || document.getElementById('artistDomain').value,
            stats: {
                clicks: 0,
                views: 0,
                conversions: 0
            },
            createdAt: new Date().toISOString().split('T')[0],
            lastActive: new Date().toISOString().split('T')[0]
        };

        this.artists.push(newArtist);
        this.saveArtists();
        this.renderArtistsGrid();
        this.renderStats();
        this.hideModal();

        // Show success message
        this.showNotification('Artist hub created successfully!', 'success');
    }

    editArtist(artistId) {
        const artist = this.artists.find(a => a.id === artistId);
        if (artist) {
            // Populate form with artist data
            document.getElementById('artistName').value = artist.name;
            document.getElementById('artistTitle').value = artist.title;
            document.getElementById('artistBio').value = artist.bio || '';
            document.getElementById('artistImage').value = artist.image || '';
            document.getElementById('artistTemplate').value = artist.template;
            document.getElementById('artistDomain').value = artist.domain || '';
            
            // Show modal in edit mode
            this.showAddArtistModal();
            
            // Update form submission handler for edit mode
            const form = document.getElementById('artistForm');
            form.onsubmit = (e) => {
                e.preventDefault();
                this.updateArtist(artistId);
            };
        }
    }

    updateArtist(artistId) {
        const artistIndex = this.artists.findIndex(a => a.id === artistId);
        if (artistIndex !== -1) {
            this.artists[artistIndex] = {
                ...this.artists[artistIndex],
                name: document.getElementById('artistName').value,
                title: document.getElementById('artistTitle').value,
                bio: document.getElementById('artistBio').value,
                image: document.getElementById('artistImage').value,
                template: document.getElementById('artistTemplate').value,
                domain: document.getElementById('artistDomain').value,
                lastActive: new Date().toISOString().split('T')[0]
            };

            this.saveArtists();
            this.renderArtistsGrid();
            this.hideModal();
            
            // Reset form handler
            document.getElementById('artistForm').onsubmit = (e) => {
                e.preventDefault();
                this.addArtist();
            };
            
            this.showNotification('Artist updated successfully!', 'success');
        }
    }

    deleteArtist(artistId) {
        if (confirm('Are you sure you want to delete this artist hub?')) {
            this.artists = this.artists.filter(a => a.id !== artistId);
            this.saveArtists();
            this.renderArtistsGrid();
            this.renderStats();
            this.showNotification('Artist hub deleted successfully!', 'success');
        }
    }

    viewAnalytics(artistId) {
        const artist = this.artists.find(a => a.id === artistId);
        if (artist) {
            // Switch to analytics section and filter for this artist
            this.switchSection('analytics');
            document.querySelector('.nav-item[href="#analytics"]').classList.add('active');
            document.querySelector('.nav-item[href="#dashboard"]').classList.remove('active');
            
            // Show artist-specific analytics (implementation depends on requirements)
            this.showNotification(`Viewing analytics for ${artist.name}`, 'info');
        }
    }

    viewHub(artistId) {
        const artist = this.artists.find(a => a.id === artistId);
        if (artist) {
            // Open artist hub in new tab
            const url = artist.domain ? 
                `https://${artist.domain}` : 
                `https://8085-138f860a-b385-4c70-8fc2-6a9891eb0748.sandbox-service.public.prod.myninja.ai`;
            window.open(url, '_blank');
        }
    }

    // Section Navigation
    switchSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show selected section
        const targetSection = document.querySelector(`.${sectionName}-section`);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    // Utility Methods
    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    saveArtists() {
        localStorage.setItem('hlpfl_artists', JSON.stringify(this.artists));
    }

    updateTimeRange(range) {
        // Update analytics data based on time range
        // This would typically fetch new data from an API
        console.log(`Updating analytics for time range: ${range}`);
        this.updateCharts();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            zIndex: '9999',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize dashboard when DOM is ready
let adminDashboard;
document.addEventListener('DOMContentLoaded', () => {
    adminDashboard = new AdminDashboard();
});

// Export for global access
window.adminDashboard = null;
window.addEventListener('load', () => {
    window.adminDashboard = adminDashboard;
});