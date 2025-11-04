// scripts/userData.js - Enhanced with Unique ID & Session System

class UserDataManager {
    constructor() {
        this.currentUser = null;
        this.currentUserId = null;
        this.currentSessionId = null;
        this.apiBase = '/api';
        this.usersFolder = 'data/users/';
        this.init();
    }

    // Initialize user system
    init() {
        console.log('Initializing User Data Manager...');
        this.checkLoginStatus();
        this.updateUrlWithAuth(); // Update URL on init
    }

    // Check if user is logged in dengan session
    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('ndiidepzXmusic_loggedIn');
        const userEmail = localStorage.getItem('ndiidepzXmusic_userEmail');
        const userId = localStorage.getItem('ndiidepzXmusic_userId');
        const sessionId = localStorage.getItem('ndiidepzXmusic_sessionId');
        
        if (isLoggedIn === 'true' && userEmail && userId && sessionId) {
            this.currentUser = userEmail;
            this.currentUserId = userId;
            this.currentSessionId = sessionId;
            console.log('User logged in:', {
                email: userEmail,
                userId: userId,
                sessionId: sessionId
            });
            return true;
        }
        
        this.currentUser = null;
        this.currentUserId = null;
        this.currentSessionId = null;
        return false;
    }

    // Generate unique user ID dengan kombinasi kompleks
    generateUserId(email) {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 16);
        const emailHash = btoa(email).replace(/[^a-zA-Z0-9]/g, '').substr(0, 12);
        const browserHash = btoa(navigator.userAgent).replace(/[^a-zA-Z0-9]/g, '').substr(0, 8);
        const screenHash = btoa(`${screen.width}x${screen.height}`).replace(/[^a-zA-Z0-9]/g, '').substr(0, 6);
        
        return `user_${timestamp}_${random}_${emailHash}_${browserHash}_${screenHash}`.toLowerCase();
    }

    // Generate unique session ID
    generateSessionId(userId) {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 20);
        const deviceHash = btoa(navigator.platform + navigator.language + navigator.hardwareConcurrency).replace(/[^a-zA-Z0-9]/g, '').substr(0, 10);
        const timeHash = btoa(new Date().getTimezoneOffset().toString()).replace(/[^a-zA-Z0-9]/g, '').substr(0, 6);
        
        return `sess_${userId}_${timestamp}_${random}_${deviceHash}_${timeHash}`.toLowerCase();
    }

    // Generate unique hash untuk metadata
    generateUniqueHash(email, userId) {
        const data = email + userId + Date.now() + Math.random().toString(36).substr(2, 25);
        return btoa(data).replace(/[^a-zA-Z0-9]/g, '').substr(0, 32);
    }

    // Get current user data
    getCurrentUser() {
        return this.currentUser;
    }

    // Get current user ID
    getCurrentUserId() {
        return this.currentUserId;
    }

    // Get current session ID
    getCurrentSessionId() {
        return this.currentSessionId;
    }

    // Set current user dengan ID dan Session
    setCurrentUser(email) {
        this.currentUser = email;
        this.currentUserId = this.generateUserId(email);
        this.currentSessionId = this.generateSessionId(this.currentUserId);
        
        // Save to localStorage
        localStorage.setItem('ndiidepzXmusic_loggedIn', 'true');
        localStorage.setItem('ndiidepzXmusic_userEmail', email);
        localStorage.setItem('ndiidepzXmusic_userId', this.currentUserId);
        localStorage.setItem('ndiidepzXmusic_sessionId', this.currentSessionId);
        localStorage.setItem('ndiidepzXmusic_loginTime', new Date().toISOString());
        
        // Update URL dengan parameters
        this.updateUrlWithAuth();
        
        this.initializeUserData(email, this.currentUserId, this.currentSessionId);
        
        console.log('User session started:', {
            email: email,
            userId: this.currentUserId,
            sessionId: this.currentSessionId,
            loginTime: new Date().toISOString()
        });
        
        return {
            userId: this.currentUserId,
            sessionId: this.currentSessionId
        };
    }

    // Update URL dengan auth parameters
    updateUrlWithAuth() {
        if (!this.currentUserId || !this.currentSessionId || !this.currentUser) return;
        
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('id', this.currentUserId);
        currentUrl.searchParams.set('sessions', this.currentSessionId);
        currentUrl.searchParams.set('user', this.currentUser);
        
        // Update URL tanpa reload page
        window.history.replaceState({}, '', currentUrl.toString());
    }

    // Initialize user data structure dengan session info
    initializeUserData(email, userId, sessionId) {
        const userData = {
            userInfo: {
                id: userId,
                email: email,
                username: email.split('@')[0],
                joinDate: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                avatar: '',
                bio: '',
                location: '',
                status: 'active',
                isVerified: false,
                registrationIp: 'web-client',
                userAgent: navigator.userAgent,
                deviceInfo: {
                    platform: navigator.platform,
                    language: navigator.language,
                    userAgent: navigator.userAgent,
                    screen: `${screen.width}x${screen.height}`,
                    cores: navigator.hardwareConcurrency || 'unknown'
                }
            },
            auth: {
                loginMethod: 'email',
                lastPasswordChange: new Date().toISOString(),
                lastActive: new Date().toISOString(),
                sessions: [
                    {
                        sessionId: sessionId,
                        startTime: new Date().toISOString(),
                        lastActivity: new Date().toISOString(),
                        userAgent: navigator.userAgent,
                        ip: 'web-client',
                        isActive: true
                    }
                ]
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
            },
            metadata: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                dataVersion: '2.0',
                uniqueHash: this.generateUniqueHash(email, userId)
            }
        };

        this.saveUserData(email, userId, userData);
        console.log('Initialized user data for:', email, 'ID:', userId);
        return userData;
    }

    // Add new session to user data
    addNewSession(userData) {
        if (!this.currentSessionId) return;
        
        const newSession = {
            sessionId: this.currentSessionId,
            startTime: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            userAgent: navigator.userAgent,
            ip: 'web-client',
            isActive: true
        };

        // Remove old sessions (keep last 5)
        userData.auth.sessions = userData.auth.sessions.filter(session => 
            session.sessionId !== this.currentSessionId
        );
        
        userData.auth.sessions.unshift(newSession);
        userData.auth.sessions = userData.auth.sessions.slice(0, 5);
    }

    // Load user data dari API atau localStorage
    async loadUserData(identifier) {
        try {
            // Try API first
            const response = await fetch(`${this.apiBase}/users/load?email=${encodeURIComponent(identifier)}`);
            
            if (response.ok) {
                const userData = await response.json();
                console.log('Loaded user data from API:', userData.userInfo.id);
                return userData;
            } else if (response.status === 404) {
                // If user doesn't exist in API, try localStorage
                return this.loadFromLocalStorage(identifier);
            } else {
                throw new Error(`API error: ${response.status}`);
            }
        } catch (error) {
            console.error('API load failed, using localStorage:', error);
            return this.loadFromLocalStorage(identifier);
        }
    }

    // Load dari localStorage
    loadFromLocalStorage(identifier) {
        try {
            const isEmail = identifier.includes('@');
            const userKey = isEmail ? 
                `ndiidepzXmusic_userData_${this.sanitizeFilename(identifier)}` :
                `ndiidepzXmusic_userData_${identifier}`;
            
            const localData = localStorage.getItem(userKey);
            
            if (localData) {
                console.log('Loaded user data from localStorage:', identifier);
                return JSON.parse(localData);
            } else {
                // If no data exists and identifier is email, create new
                if (isEmail) {
                    console.log('Creating new user data for:', identifier);
                    const userId = this.generateUserId(identifier);
                    const sessionId = this.generateSessionId(userId);
                    return this.initializeUserData(identifier, userId, sessionId);
                } else {
                    throw new Error('User not found');
                }
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            throw error;
        }
    }

    // Save user data ke API atau localStorage
    async saveUserData(email, userId, userData) {
        try {
            // Update last activity dan session
            userData.userInfo.lastLogin = new Date().toISOString();
            userData.userInfo.lastActivity = new Date().toISOString();
            userData.metadata.updatedAt = new Date().toISOString();
            
            // Update current session activity
            this.updateSessionActivity(userData);

            // Try API first
            const response = await fetch(`${this.apiBase}/users/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, userId, userData })
            });
            
            if (!response.ok) throw new Error('API save failed');
            
            console.log('Saved user data via API:', userId);
            
            // Also save to localStorage as backup
            this.saveToLocalStorage(userId, userData);
            return true;
            
        } catch (error) {
            console.error('API save failed, using localStorage:', error);
            return this.saveToLocalStorage(userId, userData);
        }
    }

    // Save ke localStorage
    saveToLocalStorage(userId, userData) {
        try {
            const userKey = `ndiidepzXmusic_userData_${userId}`;
            localStorage.setItem(userKey, JSON.stringify(userData, null, 2));
            console.log('Saved user data to localStorage:', userId);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    // Update session activity
    updateSessionActivity(userData) {
        if (!this.currentSessionId) return;
        
        const currentSession = userData.auth.sessions.find(session => 
            session.sessionId === this.currentSessionId
        );
        
        if (currentSession) {
            currentSession.lastActivity = new Date().toISOString();
        } else {
            // Add new session if not exists
            this.addNewSession(userData);
        }
    }

    // Verify user ownership untuk security
    verifyUserOwnership(resourceUserId) {
        if (!this.currentUserId) {
            console.error('No user logged in');
            return false;
        }

        if (resourceUserId !== this.currentUserId) {
            console.error('User ownership verification failed');
            console.log('Current user:', this.currentUserId, 'Resource user:', resourceUserId);
            return false;
        }

        return true;
    }

    // Verify session validity
    verifySession() {
        if (!this.currentSessionId || !this.currentUserId) {
            return false;
        }

        const loginTime = localStorage.getItem('ndiidepzXmusic_loginTime');
        if (!loginTime) return false;

        // Check if session is older than 24 hours
        const sessionAge = Date.now() - new Date(loginTime).getTime();
        const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours

        if (sessionAge > maxSessionAge) {
            console.log('Session expired');
            this.logout();
            return false;
        }

        return true;
    }

    // SONG MANAGEMENT dengan ID verification

    // Add song to user's library
    async addSongToLibrary(songData) {
        if (!this.currentUser || !this.currentUserId) {
            throw new Error('User not logged in');
        }
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            
            // Initialize uploads if not exists
            if (!userData.uploads) {
                userData.uploads = { 
                    songs: [], 
                    albums: [], 
                    playlists: [],
                    totalStorageUsed: 0
                };
            }

            // Generate unique ID untuk song dengan user prefix
            const songId = `song_${this.currentUserId}_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
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
                userId: this.currentUserId,
                userEmail: this.currentUser,
                fileSize: songData.fileSize || 0,
                metadata: {
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    sessionId: this.currentSessionId
                }
            };

            // Add to user's uploads
            userData.uploads.songs.unshift(song);
            
            // Update storage usage
            userData.uploads.totalStorageUsed += song.fileSize;
            
            // Save updated user data
            await this.saveUserData(this.currentUser, this.currentUserId, userData);
            
            console.log('Song added to library:', songId, 'by user:', this.currentUserId);
            return song;
            
        } catch (error) {
            console.error('Error adding song to library:', error);
            throw error;
        }
    }

    // Get user's uploaded songs
    async getUserSongs(userId = null) {
        if (!this.currentUserId) return [];
        
        // If specific userId provided, verify ownership
        if (userId && !this.verifyUserOwnership(userId)) {
            throw new Error('Unauthorized access to user songs');
        }
        
        const targetUserId = userId || this.currentUserId;
        
        try {
            const userData = await this.loadUserData(targetUserId);
            return userData.uploads?.songs || [];
        } catch (error) {
            console.error('Error getting user songs:', error);
            return [];
        }
    }

    // Get song by ID dengan ownership check
    async getSong(songId) {
        if (!this.currentUserId) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            const songs = userData.uploads?.songs || [];
            const song = songs.find(song => song.id === songId);
            
            // Verify song belongs to current user
            if (song && song.userId !== this.currentUserId) {
                console.error('Song ownership verification failed');
                return null;
            }
            
            return song || null;
        } catch (error) {
            console.error('Error getting song:', error);
            return null;
        }
    }

    // Update song dengan ownership verification
    async updateSong(songId, updates) {
        if (!this.currentUserId) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            const songs = userData.uploads?.songs || [];
            const songIndex = songs.findIndex(song => song.id === songId);
            
            if (songIndex !== -1) {
                // Verify ownership
                if (songs[songIndex].userId !== this.currentUserId) {
                    throw new Error('Unauthorized to update this song');
                }
                
                userData.uploads.songs[songIndex] = { 
                    ...userData.uploads.songs[songIndex], 
                    ...updates,
                    metadata: {
                        ...userData.uploads.songs[songIndex].metadata,
                        updatedAt: new Date().toISOString(),
                        sessionId: this.currentSessionId
                    }
                };
                
                await this.saveUserData(this.currentUser, this.currentUserId, userData);
                console.log('Updated song:', songId, 'by user:', this.currentUserId);
                return userData.uploads.songs[songIndex];
            }
            
            return null;
        } catch (error) {
            console.error('Error updating song:', error);
            throw error;
        }
    }

    // Delete song dengan ownership verification
    async deleteSong(songId) {
        if (!this.currentUserId) return false;
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            const initialLength = userData.uploads?.songs?.length || 0;
            
            if (userData.uploads?.songs) {
                // Find song to verify ownership and get file size
                const songIndex = userData.uploads.songs.findIndex(song => song.id === songId);
                
                if (songIndex !== -1) {
                    // Verify ownership
                    if (userData.uploads.songs[songIndex].userId !== this.currentUserId) {
                        throw new Error('Unauthorized to delete this song');
                    }
                    
                    // Update storage
                    userData.uploads.totalStorageUsed -= userData.uploads.songs[songIndex].fileSize || 0;
                    
                    // Remove song
                    userData.uploads.songs.splice(songIndex, 1);
                }
            }
            
            if ((userData.uploads?.songs?.length || 0) < initialLength) {
                await this.saveUserData(this.currentUser, this.currentUserId, userData);
                console.log('Deleted song:', songId, 'by user:', this.currentUserId);
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
        if (!this.currentUserId) return false;
        
        try {
            // Add to favorites
            await this.addToFavorites('songs', songId);
            
            // Update song like count (if it's user's own song)
            const userData = await this.loadUserData(this.currentUserId);
            const userSong = userData.uploads?.songs?.find(song => song.id === songId);
            
            if (userSong) {
                userSong.likes = (userSong.likes || 0) + 1;
                await this.saveUserData(this.currentUser, this.currentUserId, userData);
            }
            
            console.log('Liked song:', songId, 'by user:', this.currentUserId);
            return true;
        } catch (error) {
            console.error('Error liking song:', error);
            return false;
        }
    }

    // Unlike a song
    async unlikeSong(songId) {
        if (!this.currentUserId) return false;
        
        try {
            // Remove from favorites
            await this.removeFromFavorites('songs', songId);
            console.log('Unliked song:', songId, 'by user:', this.currentUserId);
            return true;
        } catch (error) {
            console.error('Error unliking song:', error);
            return false;
        }
    }

    // Add to favorites
    async addToFavorites(type, itemId) {
        if (!this.currentUserId) return null;
        
        const userData = await this.loadUserData(this.currentUserId);
        
        if (userData.favorites[type] && !userData.favorites[type].includes(itemId)) {
            userData.favorites[type].push(itemId);
            await this.saveUserData(this.currentUser, this.currentUserId, userData);
            console.log(`Added ${itemId} to ${type} favorites by user:`, this.currentUserId);
        }
        
        return userData;
    }

    // Remove from favorites
    async removeFromFavorites(type, itemId) {
        if (!this.currentUserId) return null;
        
        const userData = await this.loadUserData(this.currentUserId);
        
        if (userData.favorites[type]) {
            userData.favorites[type] = userData.favorites[type].filter(id => id !== itemId);
            await this.saveUserData(this.currentUser, this.currentUserId, userData);
            console.log(`Removed ${itemId} from ${type} favorites by user:`, this.currentUserId);
        }
        
        return userData;
    }

    // Get user statistics
    async getUserStats() {
        if (!this.currentUserId) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            return userData.statistics;
        } catch (error) {
            console.error('Error getting user stats:', error);
            return null;
        }
    }

    // Get recent activity
    async getRecentActivity(limit = 10) {
        if (!this.currentUserId) return [];
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            return userData.history.playedSongs.slice(0, limit);
        } catch (error) {
            console.error('Error getting recent activity:', error);
            return [];
        }
    }

    // Update user profile
    async updateProfile(updates) {
        if (!this.currentUserId) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            userData.userInfo = { ...userData.userInfo, ...updates };
            await this.saveUserData(this.currentUser, this.currentUserId, userData);
            console.log('Updated user profile for:', this.currentUserId);
            return userData;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    }

    // Update user preferences
    async updatePreferences(updates) {
        if (!this.currentUserId) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            userData.preferences = { ...userData.preferences, ...updates };
            await this.saveUserData(this.currentUser, this.currentUserId, userData);
            console.log('Updated user preferences for:', this.currentUserId);
            return userData;
        } catch (error) {
            console.error('Error updating preferences:', error);
            throw error;
        }
    }

    // Add play history
    async addPlayHistory(songId, duration = 0) {
        if (!this.currentUserId) return null;
        
        const userData = await this.loadUserData(this.currentUserId);
        const playRecord = {
            songId: songId,
            timestamp: new Date().toISOString(),
            duration: duration,
            completed: duration > 30,
            sessionId: this.currentSessionId,
            userId: this.currentUserId
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

        await this.saveUserData(this.currentUser, this.currentUserId, userData);
        console.log('Added play history for song:', songId, 'by user:', this.currentUserId);
        return userData;
    }

    // Update most played songs and artists
    updateMostPlayed(userData, songId) {
        if (!userData.statistics.mostPlayedSongs.includes(songId)) {
            userData.statistics.mostPlayedSongs.unshift(songId);
            if (userData.statistics.mostPlayedSongs.length > 20) {
                userData.statistics.mostPlayedSongs = userData.statistics.mostPlayedSongs.slice(0, 20);
            }
        }
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

    // Update user statistics
    async updateUserStats(updates) {
        if (!this.currentUserId) {
            throw new Error('No user logged in');
        }
        
        const userData = await this.loadUserData(this.currentUserId);
        
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

        this.updateLoginStreak(userData);
        await this.saveUserData(this.currentUser, this.currentUserId, userData);
        console.log('Updated user stats for:', this.currentUserId, updates);
        return userData;
    }

    // Search user's songs
    async searchSongs(query) {
        if (!this.currentUserId) return [];
        
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
        if (!this.currentUserId) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
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

    // Create playlist
    async createPlaylist(playlistData) {
        if (!this.currentUserId) return null;
        
        const userData = await this.loadUserData(this.currentUserId);
        const playlist = {
            id: `playlist_${this.currentUserId}_${Date.now()}_${Math.random().toString(36).substr(2, 12)}`,
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
            createdBy: this.currentUserId,
            userEmail: this.currentUser
        };

        userData.playlists.created.push(playlist);
        await this.saveUserData(this.currentUser, this.currentUserId, userData);
        console.log('Created playlist:', playlist.id, 'by user:', this.currentUserId);
        
        return playlist;
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.currentUserId = null;
        this.currentSessionId = null;
        localStorage.removeItem('ndiidepzXmusic_loggedIn');
        localStorage.removeItem('ndiidepzXmusic_userEmail');
        localStorage.removeItem('ndiidepzXmusic_userId');
        localStorage.removeItem('ndiidepzXmusic_sessionId');
        localStorage.removeItem('ndiidepzXmusic_loginTime');
        localStorage.removeItem('ndiidepzXmusic_username');
        console.log('User logged out');
    }

    // Sanitize filename
    sanitizeFilename(email) {
        return email.replace(/[^a-zA-Z0-9]/g, '_');
    }

    // Export user data
    async exportUserData() {
        if (!this.currentUserId) return null;
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            return {
                exportDate: new Date().toISOString(),
                user: this.currentUser,
                userId: this.currentUserId,
                sessionId: this.currentSessionId,
                data: userData
            };
        } catch (error) {
            console.error('Error exporting user data:', error);
            throw error;
        }
    }

    // Get user sessions info
    async getUserSessions() {
        if (!this.currentUserId) return [];
        
        try {
            const userData = await this.loadUserData(this.currentUserId);
            return userData.auth.sessions || [];
        } catch (error) {
            console.error('Error getting user sessions:', error);
            return [];
        }
    }

    // Get current user info
    getCurrentUserInfo() {
        if (!this.currentUserId) return null;
        
        return {
            email: this.currentUser,
            userId: this.currentUserId,
            sessionId: this.currentSessionId,
            username: localStorage.getItem('ndiidepzXmusic_username') || this.currentUser.split('@')[0]
        };
    }
}

// Create global instance
const userDataManager = new UserDataManager();

// Global helper functions
function setCurrentUser(email) {
    return userDataManager.setCurrentUser(email);
}

function getCurrentUserData() {
    return userDataManager.loadUserData(userDataManager.getCurrentUserId());
}

function getCurrentUserId() {
    return userDataManager.getCurrentUserId();
}

function getCurrentSessionId() {
    return userDataManager.getCurrentSessionId();
}

function getCurrentUserInfo() {
    return userDataManager.getCurrentUserInfo();
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

function verifyUserOwnership(resourceUserId) {
    return userDataManager.verifyUserOwnership(resourceUserId);
}

function getAuthToken() {
    return localStorage.getItem('ndiidepzXmusic_authToken') || 'demo-token';
}

function isUserLoggedIn() {
    return userDataManager.checkLoginStatus() && userDataManager.verifySession();
}

function getUsername() {
    return localStorage.getItem('ndiidepzXmusic_username') || 'User';
}

// Initialize when script loads
console.log('UserData.js loaded successfully with Enhanced ID System');

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UserDataManager, userDataManager };
}
