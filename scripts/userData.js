// scripts/userData.js - Complete User Data Management System
// In UserDataManager constructor
this.apiBase = '/api';

// Update loadUserData method
async loadUserData(email) {
    try {
        const response = await fetch(`${this.apiBase}/users/load?email=${encodeURIComponent(email)}`);
        
        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            return this.initializeUserData(email);
        } else {
            throw new Error(`API error: ${response.status}`);
        }
    } catch (error) {
        console.error('API load failed, using localStorage:', error);
        return this.loadFromLocalStorage(email);
    }
}

// Update saveUserData method  
async saveUserData(email, userData) {
    try {
        userData.profile.lastLogin = new Date().toISOString();
        
        const response = await fetch(`${this.apiBase}/users/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, userData })
        });
        
        if (!response.ok) throw new Error('Save failed');
        
        // Also save to localStorage
        this.saveToLocalStorage(email, userData);
        return true;
    } catch (error) {
        console.error('API save failed, using localStorage:', error);
        return this.saveToLocalStorage(email, userData);
    }
}

    // Initialize user system
    init() {
        console.log('Initializing User Data Manager...');
        this.checkLoginStatus();
    }

    // Check if user is logged in
    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('ndiidepzXmusic_loggedIn');
        const userEmail = localStorage.getItem('ndiidepzXmusic_userEmail');
        
        if (isLoggedIn === 'true' && userEmail) {
            this.currentUser = userEmail;
            console.log('User logged in:', userEmail);
            return true;
        }
        
        this.currentUser = null;
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
        console.log('Current user set to:', email);
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
                location: '',
                status: 'active'
            },
            auth: {
                loginMethod: 'email',
                lastPasswordChange: new Date().toISOString()
            },
            preferences: {
                theme: 'dark',
                language: 'id',
                autoplay: true,
                quality: 'high',
                notifications: true,
                explicitContent: true,
                autoPlay: true,
                crossfade: 0
            },
            favorites: {
                songs: [],
                artists: [],
                albums: [],
                playlists: [],
                podcasts: []
            },
            history: {
                playedSongs: [],
                searchedTerms: [],
                visitedArtists: [],
                visitedPlaylists: [],
                lastPlayed: null
            },
            playlists: {
                created: [],
                followed: [],
                collaborative: []
            },
            social: {
                followers: [],
                following: [],
                blocked: [],
                pendingRequests: []
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
                },
                streak: {
                    current: 0,
                    longest: 0,
                    lastLogin: null
                }
            },
            uploads: {
                songs: [],
                albums: [],
                playlists: [],
                totalStorageUsed: 0
            },
            settings: {
                privacy: {
                    profile: 'public',
                    playlists: 'public',
                    listeningActivity: 'public',
                    following: 'public'
                },
                playback: {
                    crossfade: 0,
                    gapless: false,
                    normalize: true,
                    audioQuality: 'high'
                },
                social: {
                    allowMessages: true,
                    allowCollaborations: true,
                    showListeningActivity: true
                }
            },
            subscriptions: {
                premium: false,
                expiryDate: null,
                features: ['basic']
            },
            achievements: {
                unlocked: [],
                progress: {}
            }
        };

        this.saveUserData(email, userData);
        console.log('Initialized user data for:', email);
        return userData;
    }

    // Load user data from file
    async loadUserData(email) {
        try {
            const filename = `user_${this.sanitizeFilename(email)}.json`;
            const userKey = `ndiidepzXmusic_userData_${this.sanitizeFilename(email)}`;
            
            // Try localStorage first (for demo)
            const localData = localStorage.getItem(userKey);
            if (localData) {
                console.log('Loaded user data from localStorage:', email);
                return JSON.parse(localData);
            }

            // Fallback: Try to fetch from server
            const response = await fetch(`${this.usersFolder}${filename}`);
            if (response.ok) {
                const userData = await response.json();
                console.log('Loaded user data from server:', email);
                return userData;
            } else {
                // If file doesn't exist, create new user data
                console.log('Creating new user data for:', email);
                return this.initializeUserData(email);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            // Fallback to creating new data
            return this.initializeUserData(email);
        }
    }

    // Save user data to file
    async saveUserData(email, userData) {
        try {
            // Update last activity
            userData.profile.lastLogin = new Date().toISOString();
            userData.profile.lastActivity = new Date().toISOString();
            
            const filename = `user_${this.sanitizeFilename(email)}.json`;
            const userKey = `ndiidepzXmusic_userData_${this.sanitizeFilename(email)}`;
            
            // Save to localStorage (for demo)
            localStorage.setItem(userKey, JSON.stringify(userData, null, 2));
            console.log('Saved user data to localStorage:', email);

            // In real app, you would send to server here
            // await this.saveToServer(filename, userData);
            
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    }

    // Save to server (placeholder for real implementation)
    async saveToServer(filename, userData) {
        // This would be your actual server API call
        try {
            const response = await fetch('/api/save-user-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filename: filename,
                    userData: userData
                })
            });
            
            return response.ok;
        } catch (error) {
            console.error('Server save failed:', error);
            throw error;
        }
    }

    // Sanitize filename
    sanitizeFilename(email) {
        return email.replace(/[^a-zA-Z0-9]/g, '_');
    }

    // Update user statistics
    async updateUserStats(updates) {
        if (!this.currentUser) {
            throw new Error('No user logged in');
        }
        
        const userData = await this.loadUserData(this.currentUser);
        
        // Merge updates with existing statistics
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

        // Update streak
        this.updateLoginStreak(userData);

        await this.saveUserData(this.currentUser, userData);
        console.log('Updated user stats:', updates);
        return userData;
    }

    // Update login streak
    updateLoginStreak(userData) {
        const today = new Date().toDateString();
        const lastLogin = userData.statistics.streak.lastLogin;
        
        if (!lastLogin) {
            userData.statistics.streak.current = 1;
        } else {
            const lastLoginDate = new Date(lastLogin).toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            
            if (lastLoginDate === yesterday) {
                userData.statistics.streak.current += 1;
            } else if (lastLoginDate !== today) {
                userData.statistics.streak.current = 1;
            }
        }
        
        userData.statistics.streak.lastLogin = new Date().toISOString();
        userData.statistics.streak.longest = Math.max(
            userData.statistics.streak.longest,
            userData.statistics.streak.current
        );
    }

    // Add play history
    async addPlayHistory(songId, duration = 0) {
        if (!this.currentUser) return null;
        
        const userData = await this.loadUserData(this.currentUser);
        const playRecord = {
            songId: songId,
            timestamp: new Date().toISOString(),
            duration: duration,
            completed: duration > 30 // Consider completed if listened for more than 30 seconds
        };

        userData.history.playedSongs.unshift(playRecord);
        userData.history.lastPlayed = playRecord;
        
        // Keep only last 500 plays
        if (userData.history.playedSongs.length > 500) {
            userData.history.playedSongs = userData.history.playedSongs.slice(0, 500);
        }

        // Update statistics
        userData.statistics.totalPlays += 1;
        userData.statistics.totalPlayTime += duration;

        // Update most played songs
        this.updateMostPlayed(userData, songId);

        await this.saveUserData(this.currentUser, userData);
        console.log('Added play history for song:', songId);
        return userData;
    }

    // Update most played songs and artists
    updateMostPlayed(userData, songId) {
        // This would typically update based on play count
        // For now, we'll just add to the list if not already there
        if (!userData.statistics.mostPlayedSongs.includes(songId)) {
            userData.statistics.mostPlayedSongs.unshift(songId);
            // Keep only top 20
            if (userData.statistics.mostPlayedSongs.length > 20) {
                userData.statistics.mostPlayedSongs = userData.statistics.mostPlayedSongs.slice(0, 20);
            }
        }
    }

    // Add to favorites
    async addToFavorites(type, itemId) {
        if (!this.currentUser) return null;
        
        const userData = await this.loadUserData(this.currentUser);
        
        if (userData.favorites[type] && !userData.favorites[type].includes(itemId)) {
            userData.favorites[type].push(itemId);
            await this.saveUserData(this.currentUser, userData);
            console.log(`Added ${itemId} to ${type} favorites`);
        }
        
        return userData;
    }

    // Remove from favorites
    async removeFromFavorites(type, itemId) {
        if (!this.currentUser) return null;
        
        const userData = await this.loadUserData(this.currentUser);
        
        if (userData.favorites[type]) {
            userData.favorites[type] = userData.favorites[type].filter(id => id !== itemId);
            await this.saveUserData(this.currentUser, userData);
            console.log(`Removed ${itemId} from ${type} favorites`);
        }
        
        return userData;
    }

    // Follow user
    async followUser(userId) {
        if (!this.currentUser) return null;
        
        const userData = await this.loadUserData(this.currentUser);
        
        if (!userData.social.following.includes(userId)) {
            userData.social.following.push(userId);
            await this.saveUserData(this.currentUser, userData);
            console.log(`Started following user: ${userId}`);
        }
        
        return userData;
    }

    // Unfollow user
    async unfollowUser(userId) {
        if (!this.currentUser) return null;
        
        const userData = await this.loadUserData(this.currentUser);
        
        userData.social.following = userData.social.following.filter(id => id !== userId);
        await this.saveUserData(this.currentUser, userData);
        console.log(`Unfollowed user: ${userId}`);
        
        return userData;
    }

    // Add follower
    async addFollower(userId) {
        if (!this.currentUser) return null;
        
        const userData = await this.loadUserData(this.currentUser);
        
        if (!userData.social.followers.includes(userId)) {
            userData.social.followers.push(userId);
            await this.saveUserData(this.currentUser, userData);
            console.log(`Added follower: ${userId}`);
        }
        
        return userData;
    }

    // Remove follower
    async removeFollower(userId) {
        if (!this.currentUser) return null;
        
        const userData = await this.loadUserData(this.currentUser);
        
        userData.social.followers = userData.social.followers.filter(id => id !== userId);
        await this.saveUserData(this.currentUser, userData);
        console.log(`Removed follower: ${userId}`);
        
        return userData;
    }

    // Create playlist
    async createPlaylist(playlistData) {
        if (!this.currentUser) return null;
        
        const userData = await this.loadUserData(this.currentUser);
        const playlist = {
            id: 'playlist_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            title: playlistData.title,
            description: playlistData.description || '',
            cover: playlistData.cover || '/assets/default-playlist.jpg',
            created: new Date().toISOString(),
            updated: new Date().toISOString(),
            songs: playlistData.songs || [],
            followers: 0,
            plays: 0,
            public: playlistData.public !== false,
            collaborative: playlistData.collaborative || false,
            createdBy: this.currentUser
        };

        userData.playlists.created.push(playlist);
        await this.saveUserData(this.currentUser, userData);
        console.log('Created playlist:', playlist.id);
        
        return playlist;
    }

    // Add song to playlist
    async addSongToPlaylist(playlistId, songId) {
        if (!this.currentUser) return false;
        
        const userData = await this.loadUserData(this.currentUser);
        const playlist = userData.playlists.created.find(p => p.id === playlistId);
        
        if (playlist && !playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            playlist.updated = new Date().toISOString();
            await this.saveUserData(this.currentUser, userData);
            console.log(`Added song ${songId} to playlist ${playlistId}`);
            return true;
        }
        
        return false;
    }

    // Remove song from playlist
    async removeSongFromPlaylist(playlistId, songId) {
        if (!this.currentUser) return false;
        
        const userData = await this.loadUserData(this.currentUser);
        const playlist = userData.playlists.created.find(p => p.id === playlistId);
        
        if (playlist) {
            playlist.songs = playlist.songs.filter(id => id !== songId);
            playlist.updated = new Date().toISOString();
            await this.saveUserData(this.currentUser, userData);
            console.log(`Removed song ${songId} from playlist ${playlistId}`);
            return true;
        }
        
        return false;
    }

    // Delete playlist
    async deletePlaylist(playlistId) {
        if (!this.currentUser) return false;
        
        const userData = await this.loadUserData(this.currentUser);
        const initialLength = userData.playlists.created.length;
        
        userData.playlists.created = userData.playlists.created.filter(p => p.id !== playlistId);
        
        if (userData.playlists.created.length < initialLength) {
            await this.saveUserData(this.currentUser, userData);
            console.log('Deleted playlist:', playlistId);
            return true;
        }
        
        return false;
    }

    // SONG MANAGEMENT FUNCTIONS

    // Add song to user's library
    async addSongToLibrary(songData) {
        if (!this.currentUser) {
            throw new Error('User not logged in');
        }
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            
            // Initialize uploads if not exists
            if (!userData.uploads) {
                userData.uploads = { 
                    songs: [], 
                    albums: [], 
                    playlists: [],
                    totalStorageUsed: 0
                };
            }

            // Generate unique ID untuk song
            const songId = 'song_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            const song = {
                id: songId,
                title: songData.title,
                artist: songData.artist,
                album: songData.album || '',
                genre: songData.genre,
                description: songData.description || '',
                explicit: songData.explicit || false,
                allowDownloads: songData.allowDownloads !== false,
                monetization: songData.monetization || false,
                collaborative: songData.collaborative || false,
                audio: songData.audio,
                cover: songData.cover || '/assets/default-cover.jpg',
                duration: songData.duration || 0,
                uploadDate: new Date().toISOString(),
                plays: 0,
                likes: 0,
                status: 'active',
                userId: this.currentUser,
                fileSize: songData.fileSize || 0
            };

            // Add to user's uploads
            userData.uploads.songs.unshift(song);
            
            // Update storage usage
            userData.uploads.totalStorageUsed += song.fileSize;
            
            // Save updated user data
            await this.saveUserData(this.currentUser, userData);
            
            console.log('Song added to library:', songId);
            return song;
            
        } catch (error) {
            console.error('Error adding song to library:', error);
            throw error;
        }
    }

    // Get user's uploaded songs
    async getUserSongs() {
        if (!this.currentUser) return [];
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            return userData.uploads?.songs || [];
        } catch (error) {
            console.error('Error getting user songs:', error);
            return [];
        }
    }

    // Get song by ID
    async getSong(songId) {
        if (!this.currentUser) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            const songs = userData.uploads?.songs || [];
            return songs.find(song => song.id === songId) || null;
        } catch (error) {
            console.error('Error getting song:', error);
            return null;
        }
    }

    // Update song
    async updateSong(songId, updates) {
        if (!this.currentUser) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            const songs = userData.uploads?.songs || [];
            const songIndex = songs.findIndex(song => song.id === songId);
            
            if (songIndex !== -1) {
                userData.uploads.songs[songIndex] = { 
                    ...userData.uploads.songs[songIndex], 
                    ...updates,
                    updated: new Date().toISOString()
                };
                
                await this.saveUserData(this.currentUser, userData);
                console.log('Updated song:', songId);
                return userData.uploads.songs[songIndex];
            }
            
            return null;
        } catch (error) {
            console.error('Error updating song:', error);
            throw error;
        }
    }

    // Delete song
    async deleteSong(songId) {
        if (!this.currentUser) return false;
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            const initialLength = userData.uploads?.songs?.length || 0;
            
            if (userData.uploads?.songs) {
                // Find song to get file size for storage update
                const song = userData.uploads.songs.find(s => s.id === songId);
                if (song) {
                    userData.uploads.totalStorageUsed -= song.fileSize || 0;
                }
                
                userData.uploads.songs = userData.uploads.songs.filter(song => song.id !== songId);
            }
            
            if ((userData.uploads?.songs?.length || 0) < initialLength) {
                await this.saveUserData(this.currentUser, userData);
                console.log('Deleted song:', songId);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error deleting song:', error);
            throw error;
        }
    }

    // Like a song
    async likeSong(songId) {
        if (!this.currentUser) return false;
        
        try {
            // Add to favorites
            await this.addToFavorites('songs', songId);
            
            // Update song like count (if it's user's own song)
            const userData = await this.loadUserData(this.currentUser);
            const userSong = userData.uploads?.songs?.find(song => song.id === songId);
            
            if (userSong) {
                userSong.likes = (userSong.likes || 0) + 1;
                await this.saveUserData(this.currentUser, userData);
            }
            
            console.log('Liked song:', songId);
            return true;
        } catch (error) {
            console.error('Error liking song:', error);
            return false;
        }
    }

    // Unlike a song
    async unlikeSong(songId) {
        if (!this.currentUser) return false;
        
        try {
            // Remove from favorites
            await this.removeFromFavorites('songs', songId);
            console.log('Unliked song:', songId);
            return true;
        } catch (error) {
            console.error('Error unliking song:', error);
            return false;
        }
    }

    // Get user statistics
    async getUserStats() {
        if (!this.currentUser) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            return userData.statistics;
        } catch (error) {
            console.error('Error getting user stats:', error);
            return null;
        }
    }

    // Get recent activity
    async getRecentActivity(limit = 10) {
        if (!this.currentUser) return [];
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            return userData.history.playedSongs.slice(0, limit);
        } catch (error) {
            console.error('Error getting recent activity:', error);
            return [];
        }
    }

    // Update user profile
    async updateProfile(updates) {
        if (!this.currentUser) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            userData.profile = { ...userData.profile, ...updates };
            await this.saveUserData(this.currentUser, userData);
            console.log('Updated user profile');
            return userData;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    // Update user preferences
    async updatePreferences(updates) {
        if (!this.currentUser) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            userData.preferences = { ...userData.preferences, ...updates };
            await this.saveUserData(this.currentUser, userData);
            console.log('Updated user preferences');
            return userData;
        } catch (error) {
            console.error('Error updating preferences:', error);
            throw error;
        }
    }

    // Search user's songs
    async searchSongs(query) {
        if (!this.currentUser) return [];
        
        try {
            const songs = await this.getUserSongs();
            const lowerQuery = query.toLowerCase();
            
            return songs.filter(song => 
                song.title.toLowerCase().includes(lowerQuery) ||
                song.artist.toLowerCase().includes(lowerQuery) ||
                song.album.toLowerCase().includes(lowerQuery) ||
                song.genre.toLowerCase().includes(lowerQuery)
            );
        } catch (error) {
            console.error('Error searching songs:', error);
            return [];
        }
    }

    // Get storage info
    async getStorageInfo() {
        if (!this.currentUser) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            const uploads = userData.uploads || { songs: [], totalStorageUsed: 0 };
            
            return {
                totalStorageUsed: uploads.totalStorageUsed || 0,
                songCount: uploads.songs?.length || 0,
                maxStorage: 100 * 1024 * 1024, // 100MB for demo
                storagePercentage: Math.min(100, ((uploads.totalStorageUsed || 0) / (100 * 1024 * 1024)) * 100)
            };
        } catch (error) {
            console.error('Error getting storage info:', error);
            return null;
        }
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('ndiidepzXmusic_loggedIn');
        localStorage.removeItem('ndiidepzXmusic_userEmail');
        localStorage.removeItem('ndiidepzXmusic_username');
        console.log('User logged out');
    }

    // Export user data (for data portability)
    async exportUserData() {
        if (!this.currentUser) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUser);
            return {
                exportDate: new Date().toISOString(),
                user: this.currentUser,
                data: userData
            };
        } catch (error) {
            console.error('Error exporting user data:', error);
            throw error;
        }
    }

    // Import user data
    async importUserData(importData) {
        if (!this.currentUser) return false;
        
        try {
            // Validate import data
            if (!importData || !importData.data || !importData.user) {
                throw new Error('Invalid import data format');
            }

            // Merge with existing data (carefully)
            const existingData = await this.loadUserData(this.currentUser);
            const mergedData = this.mergeUserData(existingData, importData.data);
            
            await this.saveUserData(this.currentUser, mergedData);
            console.log('User data imported successfully');
            return true;
        } catch (error) {
            console.error('Error importing user data:', error);
            throw error;
        }
    }

    // Merge user data (helper for import)
    mergeUserData(existing, imported) {
        // Simple merge strategy - prefer imported data for most fields
        return {
            ...existing,
            profile: { ...existing.profile, ...imported.profile },
            preferences: { ...existing.preferences, ...imported.preferences },
            favorites: { ...existing.favorites, ...imported.favorites },
            history: { ...existing.history, ...imported.history },
            playlists: { ...existing.playlists, ...imported.playlists },
            social: { ...existing.social, ...imported.social },
            statistics: { ...existing.statistics, ...imported.statistics },
            uploads: { ...existing.uploads, ...imported.uploads },
            settings: { ...existing.settings, ...imported.settings }
        };
    }
}

// Create global instance
const userDataManager = new UserDataManager();

// Global helper functions for compatibility
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

// Additional global helpers
function getCurrentUserId() {
    const userEmail = userDataManager.getCurrentUser();
    return userEmail ? btoa(userEmail).replace(/[^a-zA-Z0-9]/g, '') : null;
}

function getAuthToken() {
    return localStorage.getItem('ndiidepzXmusic_authToken') || 'demo-token';
}

function isUserLoggedIn() {
    return userDataManager.checkLoginStatus();
}

function getUsername() {
    return localStorage.getItem('ndiidepzXmusic_username') || 'User';
}

// Initialize when script loads
console.log('UserData.js loaded successfully');

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UserDataManager, userDataManager };
}
