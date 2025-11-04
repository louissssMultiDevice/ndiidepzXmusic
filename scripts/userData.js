// scripts/userData.js

class UserDataManager {
    constructor() {
        this.currentUser = null;
        this.usersFolder = 'data/users/';
    }
    // Di dalam class UserDataManager, tambahkan method:

// Verify email login
async verifyEmailLogin(email, password) {
    try {
        const userData = await this.loadUserData(email);
        
        // Check if user exists and has email auth
        if (userData && userData.auth && userData.auth.loginMethod === 'email') {
            // In real app, use proper password hashing verification
            // For demo, we're using simple base64 encoding
            return userData.auth.password === btoa(password);
        }
        
        return false;
    } catch (error) {
        console.error('Email login verification error:', error);
        return false;
    }
}

// Update user password
async updatePassword(email, newPassword) {
    try {
        const userData = await this.loadUserData(email);
        
        if (userData && userData.auth) {
            userData.auth.password = btoa(newPassword); // Use proper hashing in production
            await this.saveUserData(email, userData);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Password update error:', error);
        return false;
    }
}

    // Initialize user system
    init() {
        this.checkLoginStatus();
    }

    // Check if user is logged in
    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('ndiidepzXmusic_loggedIn');
        const userEmail = localStorage.getItem('ndiidepzXmusic_userEmail');
        
        if (isLoggedIn === 'true' && userEmail) {
            this.currentUser = userEmail;
            this.loadUserData(userEmail);
            return true;
        }
        return false;
    }

    // Get current user data
    getCurrentUser() {
        return this.currentUser;
    }

    // Set current user
    setCurrentUser(email) {
        this.currentUser = email;
        localStorage.setItem('ndiidepzXmusic_loggedIn', 'true');
        localStorage.setItem('ndiidepzXmusic_userEmail', email);
        this.initializeUserData(email);
    }

    // Initialize user data structure
    initializeUserData(email) {
        const userData = {
            profile: {
                username: email.split('@')[0],
                email: email,
                joinDate: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                avatar: '',
                bio: '',
                location: ''
            },
            preferences: {
                theme: 'dark',
                language: 'id',
                autoplay: true,
                quality: 'high',
                notifications: true
            },
            favorites: {
                songs: [],
                artists: [],
                albums: [],
                playlists: []
            },
            history: {
                playedSongs: [],
                searchedTerms: [],
                visitedArtists: [],
                visitedPlaylists: []
            },
            playlists: {
                created: [],
                followed: []
            },
            social: {
                followers: [],
                following: [],
                blocked: []
            },
            statistics: {
                totalPlayTime: 0,
                totalPlays: 0,
                favoriteGenres: [],
                mostPlayedSongs: [],
                mostPlayedArtists: [],
                listeningHours: {
                    morning: 0,
                    afternoon: 0,
                    evening: 0,
                    night: 0
                }
            },
            uploads: {
                songs: [],
                albums: [],
                playlists: []
            },
            settings: {
                privacy: {
                    profile: 'public',
                    playlists: 'public',
                    listeningActivity: 'public'
                },
                playback: {
                    crossfade: 0,
                    gapless: false,
                    normalize: true
                }
            }
        };

        this.saveUserData(email, userData);
        return userData;
    }

    // Load user data from file
    async loadUserData(email) {
        try {
            const filename = `user_${this.sanitizeFilename(email)}.json`;
            const response = await fetch(`${this.usersFolder}${filename}`);
            
            if (response.ok) {
                const userData = await response.json();
                return userData;
            } else {
                // If file doesn't exist, create new user data
                return this.initializeUserData(email);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            // Fallback to localStorage or create new data
            return this.getUserDataFromLocalStorage(email) || this.initializeUserData(email);
        }
    }

    // Save user data to file
    async saveUserData(email, userData) {
        try {
            // Update last login
            userData.profile.lastLogin = new Date().toISOString();
            
            const filename = `user_${this.sanitizeFilename(email)}.json`;
            const dataStr = JSON.stringify(userData, null, 2);
            
            // In a real application, you would send this to a server
            // For now, we'll use localStorage as a fallback
            this.saveUserDataToLocalStorage(email, userData);
            
            // Simulate API call
            console.log('Saving user data:', filename);
            
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            this.saveUserDataToLocalStorage(email, userData);
            return false;
        }
    }

    // Helper methods for localStorage fallback
    saveUserDataToLocalStorage(email, userData) {
        const key = `ndiidepzXmusic_userData_${this.sanitizeFilename(email)}`;
        localStorage.setItem(key, JSON.stringify(userData));
    }

    getUserDataFromLocalStorage(email) {
        const key = `ndiidepzXmusic_userData_${this.sanitizeFilename(email)}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // Sanitize filename
    sanitizeFilename(email) {
        return email.replace(/[^a-zA-Z0-9]/g, '_');
    }

    // Update user statistics
    async updateUserStats(updates) {
        if (!this.currentUser) return;
        
        const userData = await this.loadUserData(this.currentUser);
        
        // Merge updates
        Object.keys(updates).forEach(key => {
            if (userData.statistics[key] !== undefined) {
                if (typeof userData.statistics[key] === 'number') {
                    userData.statistics[key] += updates[key];
                } else if (Array.isArray(userData.statistics[key])) {
                    userData.statistics[key] = [...userData.statistics[key], ...updates[key]];
                } else {
                    userData.statistics[key] = updates[key];
                }
            }
        });

        await this.saveUserData(this.currentUser, userData);
        return userData;
    }

    // Add play history
    async addPlayHistory(songId, duration = 0) {
        if (!this.currentUser) return;
        
        const userData = await this.loadUserData(this.currentUser);
        const playRecord = {
            songId: songId,
            timestamp: new Date().toISOString(),
            duration: duration
        };

        userData.history.playedSongs.unshift(playRecord);
        
        // Keep only last 100 plays
        if (userData.history.playedSongs.length > 100) {
            userData.history.playedSongs = userData.history.playedSongs.slice(0, 100);
        }

        // Update statistics
        userData.statistics.totalPlays += 1;
        userData.statistics.totalPlayTime += duration;

        await this.saveUserData(this.currentUser, userData);
        return userData;
    }

    // Add to favorites
    async addToFavorites(type, itemId) {
        if (!this.currentUser) return;
        
        const userData = await this.loadUserData(this.currentUser);
        
        if (userData.favorites[type] && !userData.favorites[type].includes(itemId)) {
            userData.favorites[type].push(itemId);
            await this.saveUserData(this.currentUser, userData);
        }
        
        return userData;
    }

    // Remove from favorites
    async removeFromFavorites(type, itemId) {
        if (!this.currentUser) return;
        
        const userData = await this.loadUserData(this.currentUser);
        
        if (userData.favorites[type]) {
            userData.favorites[type] = userData.favorites[type].filter(id => id !== itemId);
            await this.saveUserData(this.currentUser, userData);
        }
        
        return userData;
    }

    // Follow user
    async followUser(userId) {
        if (!this.currentUser) return;
        
        const userData = await this.loadUserData(this.currentUser);
        
        if (!userData.social.following.includes(userId)) {
            userData.social.following.push(userId);
            await this.saveUserData(this.currentUser, userData);
        }
        
        return userData;
    }

    // Unfollow user
    async unfollowUser(userId) {
        if (!this.currentUser) return;
        
        const userData = await this.loadUserData(this.currentUser);
        
        userData.social.following = userData.social.following.filter(id => id !== userId);
        await this.saveUserData(this.currentUser, userData);
        
        return userData;
    }

    // Create playlist
    async createPlaylist(playlistData) {
        if (!this.currentUser) return;
        
        const userData = await this.loadUserData(this.currentUser);
        const playlist = {
            id: 'playlist_' + Date.now(),
            ...playlistData,
            created: new Date().toISOString(),
            songs: [],
            followers: 0,
            plays: 0
        };

        userData.playlists.created.push(playlist);
        await this.saveUserData(this.currentUser, userData);
        
        return playlist;
    }

    // Get user statistics
    async getUserStats() {
        if (!this.currentUser) return null;
        
        const userData = await this.loadUserData(this.currentUser);
        return userData.statistics;
    }

    // Get recent activity
    async getRecentActivity(limit = 5) {
        if (!this.currentUser) return [];
        
        const userData = await this.loadUserData(this.currentUser);
        return userData.history.playedSongs.slice(0, limit);
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('ndiidepzXmusic_loggedIn');
        localStorage.removeItem('ndiidepzXmusic_userEmail');
        localStorage.removeItem('ndiidepzXmusic_username');
    }
}

// Create global instance
const userDataManager = new UserDataManager();

// Initialize when script loads
userDataManager.init();

// Global functions for compatibility
function setCurrentUser(email) {
    return userDataManager.setCurrentUser(email);
}

function getCurrentUserData() {
    return userDataManager.loadUserData(userDataManager.getCurrentUser());
}

function addPlayHistory(songId, duration = 0) {
    return userDataManager.addPlayHistory(songId, duration);
}

function addToFavorites(type, itemId) {
    return userDataManager.addToFavorites(type, itemId);
}

function logoutUser() {
    return userDataManager.logout();
}
