// music-data.js - Complete System for ndiidepzXmusic
const defaultMusicLibrary = {
    songs: [
        {
            id: 1,
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            duration: "3:20",
            cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            audio: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
            lyrics: `[Verse 1]
I been tryna call
I been on my own for long enough
Maybe you can show me how to love, maybe

[Chorus]
I'm going through withdrawals
You don't even have to do too much
You can turn me on with just a touch, baby`,
            genre: "Pop",
            releaseYear: 2020
        },
        {
            id: 2,
            title: "Save Your Tears",
            artist: "The Weeknd",
            album: "After Hours",
            duration: "3:35",
            cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            audio: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
            lyrics: `[Verse 1]
I saw you dancing in a crowded room
You look so happy when I'm not with you
But then you saw me, caught you by surprise
A single teardrop falling from your eye`,
            genre: "Pop",
            releaseYear: 2020
        },
        {
            id: 3,
            title: "Levitating",
            artist: "Dua Lipa",
            album: "Future Nostalgia",
            duration: "3:23",
            cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            audio: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
            lyrics: `[Verse 1]
If you wanna run away with me, I know a galaxy
And I can take you for a ride
I had a premonition that we fell into a rhythm
Where the music don't stop for life`,
            genre: "Pop",
            releaseYear: 2020
        },
        {
            id: 4,
            title: "Don't Start Now",
            artist: "Dua Lipa",
            album: "Future Nostalgia",
            duration: "3:03",
            cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            audio: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
            lyrics: `[Verse 1]
Did a full 180, crazy
Thinking 'bout the way I was
Did the heartbreak change me? Maybe`,
            genre: "Pop",
            releaseYear: 2019
        },
        {
            id: 5,
            title: "Stay",
            artist: "The Kid LAROI, Justin Bieber",
            album: "F*CK LOVE 3: OVER YOU",
            duration: "2:21",
            cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            audio: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
            lyrics: `[Chorus]
I do the same thing I told you that I never would
I told you I'd change, even when I knew I never could`,
            genre: "Pop",
            releaseYear: 2021
        },
        {
            id: 6,
            title: "Ghost",
            artist: "Justin Bieber",
            album: "Justice",
            duration: "2:33",
            cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            audio: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
            lyrics: `[Verse 1]
Youngblood thinks there's always tomorrow
I miss your touch some nights when I'm hollow`,
            genre: "Pop",
            releaseYear: 2021
        },
        {
            id: 7,
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            album: "SOUR",
            duration: "2:58",
            cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            audio: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
            lyrics: `[Verse 1]
Well, good for you, I guess you moved on really easily
You found a new girl and it only took a couple weeks`,
            genre: "Pop Rock",
            releaseYear: 2021
        },
        {
            id: 8,
            title: "Drivers License",
            artist: "Olivia Rodrigo",
            album: "SOUR",
            duration: "4:02",
            cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
            audio: "https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav",
            lyrics: `[Verse 1]
I got my driver's license last week
Just like we always talked about`,
            genre: "Pop",
            releaseYear: 2021
        }
    ],
    artists: [
        {
            id: 1,
            name: "The Weeknd",
            bio: "Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer.",
            profilePic: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 2,
            name: "Dua Lipa",
            bio: "Dua Lipa is an English singer and songwriter. Her musical style is primarily pop and she has received numerous awards.",
            profilePic: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 3,
            name: "The Kid LAROI",
            bio: "Charlton Kenneth Jeffrey Howard, known professionally as the Kid Laroi, is an Australian rapper and singer.",
            profilePic: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 4,
            name: "Justin Bieber",
            bio: "Justin Drew Bieber is a Canadian singer. He was discovered by American record executive Scooter Braun and signed with RBMG Records in 2008.",
            profilePic: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        },
        {
            id: 5,
            name: "Olivia Rodrigo",
            bio: "Olivia Isabel Rodrigo is an American singer-songwriter and actress. She gained recognition with her debut single 'Drivers License'.",
            profilePic: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
        }
    ]
};

// WhatsApp Configuration
const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WhatsApp Anda

// User Management System
class UserMusicSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('ndiidepzXmusic_users') || '{}');
        this.currentUser = null;
        this.globalStats = JSON.parse(localStorage.getItem('ndiidepzXmusic_global_stats') || this.initializeGlobalStats());
        this.userViews = JSON.parse(localStorage.getItem('ndiidepzXmusic_user_views') || '{}');
    }

    initializeGlobalStats() {
        return {
            songPlays: {},
            artistPlays: {},
            userFollows: {},
            profileViews: {}
        };
    }

    // USER MANAGEMENT
    getUserData(email) {
        if (!this.users[email]) {
            this.users[email] = {
                profile: {
                    username: email.split('@')[0],
                    joinDate: new Date().toISOString(),
                    language: 'id',
                    theme: 'dark',
                    bio: '',
                    publicProfile: true,
                    publicHistory: true
                },
                playlists: [
                    {
                        id: 1,
                        name: "Favorit Saya",
                        description: "Lagu-lagu favorit Anda",
                        songs: [],
                        created: new Date().toISOString(),
                        isPublic: false
                    }
                ],
                favorites: {
                    songs: [],
                    artists: []
                },
                following: [],
                followers: [],
                history: {
                    playedSongs: [],
                    searchedTerms: [],
                    requests: []
                },
                statistics: {
                    totalPlayTime: 0,
                    mostPlayedSongs: [],
                    mostSearchedTerms: [],
                    favoriteGenres: [],
                    listeningHours: {}
                },
                lastActive: new Date().toISOString()
            };
            this.saveUsers();
        }
        return this.users[email];
    }

    setCurrentUser(email) {
        this.currentUser = email;
        localStorage.setItem('ndiidepzXmusic_currentUser', email);
        
        if (email) {
            const userData = this.getUserData(email);
            userData.lastActive = new Date().toISOString();
            this.saveUsers();
        }
    }

    getCurrentUserData() {
        if (!this.currentUser) {
            this.currentUser = localStorage.getItem('ndiidepzXmusic_currentUser');
        }
        return this.currentUser ? this.getUserData(this.currentUser) : null;
    }

    saveUsers() {
        localStorage.setItem('ndiidepzXmusic_users', JSON.stringify(this.users));
        localStorage.setItem('ndiidepzXmusic_global_stats', JSON.stringify(this.globalStats));
        localStorage.setItem('ndiidepzXmusic_user_views', JSON.stringify(this.userViews));
    }

    // MUSIC FEATURES
    addToPlaylist(playlistId, songId) {
        const userData = this.getCurrentUserData();
        const playlist = userData.playlists.find(p => p.id === playlistId);
        if (playlist && !playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            this.saveUsers();
            return true;
        }
        return false;
    }

    removeFromPlaylist(playlistId, songId) {
        const userData = this.getCurrentUserData();
        const playlist = userData.playlists.find(p => p.id === playlistId);
        if (playlist) {
            playlist.songs = playlist.songs.filter(id => id !== songId);
            this.saveUsers();
            return true;
        }
        return false;
    }

    createPlaylist(name, description = "", isPublic = false) {
        const userData = this.getCurrentUserData();
        const newPlaylist = {
            id: Date.now(),
            name,
            description,
            songs: [],
            created: new Date().toISOString(),
            isPublic
        };
        userData.playlists.push(newPlaylist);
        this.saveUsers();
        return newPlaylist;
    }

    toggleFavoriteSong(songId) {
        const userData = this.getCurrentUserData();
        const index = userData.favorites.songs.indexOf(songId);
        if (index > -1) {
            userData.favorites.songs.splice(index, 1);
        } else {
            userData.favorites.songs.push(songId);
        }
        this.saveUsers();
        return index === -1;
    }

    toggleFollowArtist(artistId) {
        const userData = this.getCurrentUserData();
        const index = userData.favorites.artists.indexOf(artistId);
        if (index > -1) {
            userData.favorites.artists.splice(index, 1);
        } else {
            userData.favorites.artists.push(artistId);
        }
        this.saveUsers();
        return index === -1;
    }

    // SOCIAL FEATURES
    toggleFollowUser(targetUsername) {
        const currentUserData = this.getCurrentUserData();
        if (!currentUserData) return false;

        const targetUserEmail = this.findUserEmailByUsername(targetUsername);
        if (!targetUserEmail || targetUserEmail === this.currentUser) return false;

        const targetUserData = this.getUserData(targetUserEmail);
        const currentUsername = currentUserData.profile.username;

        if (!currentUserData.following) currentUserData.following = [];
        if (!targetUserData.followers) targetUserData.followers = [];

        const isFollowing = currentUserData.following.includes(targetUsername);

        if (isFollowing) {
            currentUserData.following = currentUserData.following.filter(u => u !== targetUsername);
            targetUserData.followers = targetUserData.followers.filter(u => u !== currentUsername);
        } else {
            currentUserData.following.push(targetUsername);
            targetUserData.followers.push(currentUsername);
        }

        this.updateGlobalFollowStats(targetUsername, !isFollowing);
        this.saveUsers();
        return !isFollowing;
    }

    updateGlobalFollowStats(username, isFollow) {
        if (!this.globalStats.userFollows[username]) {
            this.globalStats.userFollows[username] = 0;
        }
        
        if (isFollow) {
            this.globalStats.userFollows[username]++;
        } else {
            this.globalStats.userFollows[username] = Math.max(0, this.globalStats.userFollows[username] - 1);
        }
    }

    getFollowerCount(username) {
        return this.globalStats.userFollows[username] || 0;
    }

    // PROFILE VIEWS TRACKING
    trackProfileView(viewedUsername) {
        const currentUserData = this.getCurrentUserData();
        if (!currentUserData || viewedUsername === currentUserData.profile.username) return;

        const today = new Date().toISOString().split('T')[0];
        const month = today.substring(0, 7);

        if (!this.userViews[viewedUsername]) {
            this.userViews[viewedUsername] = {
                daily: {},
                monthly: {},
                total: 0
            };
        }

        if (!this.userViews[viewedUsername].daily[today]) {
            this.userViews[viewedUsername].daily[today] = [];
        }
        if (!this.userViews[viewedUsername].daily[today].includes(currentUserData.profile.username)) {
            this.userViews[viewedUsername].daily[today].push(currentUserData.profile.username);
        }

        if (!this.userViews[viewedUsername].monthly[month]) {
            this.userViews[viewedUsername].monthly[month] = [];
        }
        if (!this.userViews[viewedUsername].monthly[month].includes(currentUserData.profile.username)) {
            this.userViews[viewedUsername].monthly[month].push(currentUserData.profile.username);
        }

        const allViewers = new Set();
        Object.values(this.userViews[viewedUsername].daily).forEach(day => {
            day.forEach(viewer => allViewers.add(viewer));
        });
        this.userViews[viewedUsername].total = allViewers.size;

        this.saveUsers();
    }

    getProfileViews(username) {
        const views = this.userViews[username];
        if (!views) {
            return {
                today: 0,
                thisMonth: 0,
                total: 0
            };
        }

        const today = new Date().toISOString().split('T')[0];
        const month = today.substring(0, 7);

        return {
            today: views.daily[today] ? views.daily[today].length : 0,
            thisMonth: views.monthly[month] ? views.monthly[month].length : 0,
            total: views.total || 0
        };
    }

    // USER SEARCH AND PROFILES
    getUserProfileByUsername(username) {
        const userEmail = this.findUserEmailByUsername(username);
        if (!userEmail) return null;

        const userData = this.getUserData(userEmail);
        const publicPlaylists = userData.playlists.filter(p => p.isPublic);
        
        this.trackProfileView(username);

        return {
            username: userData.profile.username,
            bio: userData.profile.bio,
            joinDate: userData.profile.joinDate,
            followers: this.getFollowerCount(username),
            following: userData.following ? userData.following.length : 0,
            publicPlaylists: publicPlaylists.map(p => ({
                ...p,
                songsData: p.songs.map(songId => 
                    defaultMusicLibrary.songs.find(song => song.id === songId)
                ).filter(song => song),
                songCount: p.songs.length
            })),
            isFollowed: this.isUserFollowed(username),
            totalPlays: userData.history.playedSongs.length,
            profileViews: this.getProfileViews(username),
            isPublic: userData.profile.publicProfile !== false
        };
    }

    findUserEmailByUsername(username) {
        return Object.keys(this.users).find(email => 
            this.users[email].profile.username === username
        );
    }

    isUserFollowed(username) {
        const userData = this.getCurrentUserData();
        return userData.following ? userData.following.includes(username) : false;
    }

    searchUsers(query) {
        const results = [];
        const lowercaseQuery = query.toLowerCase();

        Object.keys(this.users).forEach(email => {
            const userData = this.users[email];
            const username = userData.profile.username.toLowerCase();
            
            if (username.includes(lowercaseQuery) && email !== this.currentUser && userData.profile.publicProfile !== false) {
                results.push({
                    username: userData.profile.username,
                    bio: userData.profile.bio,
                    followers: this.getFollowerCount(userData.profile.username),
                    isPublic: userData.profile.publicProfile !== false
                });
            }
        });

        return results.sort((a, b) => b.followers - a.followers);
    }

    // ARTIST FEATURES
    getArtistProfile(artistName) {
        const artist = defaultMusicLibrary.artists.find(a => a.name === artistName);
        if (!artist) return null;

        const artistSongs = defaultMusicLibrary.songs.filter(song => song.artist === artistName);
        const topSongs = this.getArtistTopSongs(artistName);

        return {
            ...artist,
            songs: artistSongs,
            topSongs: topSongs.slice(0, 5),
            totalPlays: this.getArtistTotalPlays(artistName),
            monthlyListeners: this.getMonthlyListeners(artistName),
            followerCount: this.getArtistFollowerCount(artistName)
        };
    }

    getArtistTopSongs(artistName) {
        const artistSongs = defaultMusicLibrary.songs.filter(song => song.artist === artistName);
        
        return artistSongs.map(song => ({
            ...song,
            playCount: this.globalStats.songPlays[song.id] || 0
        })).sort((a, b) => b.playCount - a.playCount);
    }

    getArtistTotalPlays(artistName) {
        const artistSongs = defaultMusicLibrary.songs.filter(song => song.artist === artistName);
        return artistSongs.reduce((total, song) => {
            return total + (this.globalStats.songPlays[song.id] || 0);
        }, 0);
    }

    getMonthlyListeners(artistName) {
        const currentMonth = new Date().toISOString().substring(0, 7);
        let listeners = new Set();

        Object.keys(this.users).forEach(email => {
            const userData = this.users[email];
            userData.history.playedSongs.forEach(play => {
                const playMonth = play.timestamp.substring(0, 7);
                if (playMonth === currentMonth) {
                    const song = defaultMusicLibrary.songs.find(s => s.id === play.songId);
                    if (song && song.artist === artistName) {
                        listeners.add(email);
                    }
                }
            });
        });

        return listeners.size;
    }

    getArtistFollowerCount(artistName) {
        let count = 0;
        Object.keys(this.users).forEach(email => {
            const userData = this.users[email];
            if (userData.favorites.artists) {
                const artist = defaultMusicLibrary.artists.find(a => a.name === artistName);
                if (artist && userData.favorites.artists.includes(artist.id)) {
                    count++;
                }
            }
        });
        return count;
    }

    searchArtists(query) {
        const lowercaseQuery = query.toLowerCase();
        return defaultMusicLibrary.artists.filter(artist => 
            artist.name.toLowerCase().includes(lowercaseQuery)
        ).map(artist => ({
            ...artist,
            followerCount: this.getArtistFollowerCount(artist.name),
            songCount: defaultMusicLibrary.songs.filter(song => song.artist === artist.name).length
        }));
    }

    // STATISTICS AND HISTORY
    addPlayHistory(songId) {
        const userData = this.getCurrentUserData();
        const now = new Date().toISOString();
        
        userData.history.playedSongs.unshift({
            songId,
            timestamp: now
        });

        userData.history.playedSongs = userData.history.playedSongs.slice(0, 100);

        this.updateGlobalSongStats(songId);
        this.updateUserStatistics(songId);
        
        this.saveUsers();
    }

    updateGlobalSongStats(songId) {
        if (!this.globalStats.songPlays[songId]) {
            this.globalStats.songPlays[songId] = 0;
        }
        this.globalStats.songPlays[songId]++;

        const song = defaultMusicLibrary.songs.find(s => s.id === songId);
        if (song) {
            if (!this.globalStats.artistPlays[song.artist]) {
                this.globalStats.artistPlays[song.artist] = 0;
            }
            this.globalStats.artistPlays[song.artist]++;
        }
    }

    addSearchHistory(term) {
        const userData = this.getCurrentUserData();
        userData.history.searchedTerms.unshift({
            term,
            timestamp: new Date().toISOString()
        });

        userData.history.searchedTerms = userData.history.searchedTerms.slice(0, 50);
        this.updateSearchStatistics(term);
        this.saveUsers();
    }

    updateUserStatistics(songId) {
        const userData = this.getCurrentUserData();
        const song = defaultMusicLibrary.songs.find(s => s.id === songId);
        
        if (!song) return;

        userData.statistics.totalPlayTime += 180;

        const playedSongIndex = userData.statistics.mostPlayedSongs.findIndex(s => s.songId === songId);
        if (playedSongIndex > -1) {
            userData.statistics.mostPlayedSongs[playedSongIndex].count++;
        } else {
            userData.statistics.mostPlayedSongs.push({
                songId,
                title: song.title,
                artist: song.artist,
                count: 1
            });
        }

        userData.statistics.mostPlayedSongs.sort((a, b) => b.count - a.count);

        const genreIndex = userData.statistics.favoriteGenres.findIndex(g => g.genre === song.genre);
        if (genreIndex > -1) {
            userData.statistics.favoriteGenres[genreIndex].count++;
        } else {
            userData.statistics.favoriteGenres.push({
                genre: song.genre,
                count: 1
            });
        }

        const hour = new Date().getHours();
        userData.statistics.listeningHours[hour] = (userData.statistics.listeningHours[hour] || 0) + 1;
    }

    updateSearchStatistics(term) {
        const userData = this.getCurrentUserData();
        const searchIndex = userData.statistics.mostSearchedTerms.findIndex(s => s.term === term);
        
        if (searchIndex > -1) {
            userData.statistics.mostSearchedTerms[searchIndex].count++;
        } else {
            userData.statistics.mostSearchedTerms.push({
                term,
                count: 1
            });
        }

        userData.statistics.mostSearchedTerms.sort((a, b) => b.count - a.count);
    }

    // REQUEST SYSTEM
    saveRequestToHistory(requestData) {
        const userData = this.getCurrentUserData();
        if (!userData.history.requests) {
            userData.history.requests = [];
        }
        
        userData.history.requests.unshift({
            id: Date.now(),
            ...requestData
        });

        userData.history.requests = userData.history.requests.slice(0, 20);
        this.saveUsers();
        return true;
    }

    getRequestHistory() {
        const userData = this.getCurrentUserData();
        return userData.history.requests || [];
    }

    // PROFILE MANAGEMENT
    updateProfile(updates) {
        const userData = this.getCurrentUserData();
        userData.profile = { ...userData.profile, ...updates };
        this.saveUsers();
    }

    getFavoriteSongs() {
        const userData = this.getCurrentUserData();
        return defaultMusicLibrary.songs.filter(song => 
            userData.favorites.songs.includes(song.id)
        );
    }

    getFollowedArtists() {
        const userData = this.getCurrentUserData();
        return defaultMusicLibrary.artists.filter(artist => 
            userData.favorites.artists.includes(artist.id)
        );
    }

    getPlaylistsWithSongs() {
        const userData = this.getCurrentUserData();
        return userData.playlists.map(playlist => ({
            ...playlist,
            songsData: playlist.songs.map(songId => 
                defaultMusicLibrary.songs.find(song => song.id === songId)
            ).filter(song => song)
        }));
    }

    // UTILITY METHODS
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    getListeningTimeStats() {
        const userData = this.getCurrentUserData();
        const totalHours = Math.round(userData.statistics.totalPlayTime / 3600);
        return {
            totalHours,
            formatted: totalHours + ' jam',
            days: Math.round(totalHours / 24)
        };
    }
}

// Initialize system
const userMusicSystem = new UserMusicSystem();

// EXPORT FUNCTIONS FOR ALL PAGES

// User Management
function getCurrentUserData() {
    return userMusicSystem.getCurrentUserData();
}

function setCurrentUser(email) {
    return userMusicSystem.setCurrentUser(email);
}

function updateUserProfile(updates) {
    return userMusicSystem.updateProfile(updates);
}

// Music Library
function getDefaultMusicLibrary() {
    return defaultMusicLibrary;
}

// Playlist Management
function addToPlaylist(playlistId, songId) {
    return userMusicSystem.addToPlaylist(playlistId, songId);
}

function createPlaylist(name, description = "", isPublic = false) {
    return userMusicSystem.createPlaylist(name, description, isPublic);
}

function getPlaylistsWithSongs() {
    return userMusicSystem.getPlaylistsWithSongs();
}

// Favorites System
function toggleFavoriteSong(songId) {
    return userMusicSystem.toggleFavoriteSong(songId);
}

function toggleFollowArtist(artistId) {
    return userMusicSystem.toggleFollowArtist(artistId);
}

function getFavoriteSongs() {
    return userMusicSystem.getFavoriteSongs();
}

function getFollowedArtists() {
    return userMusicSystem.getFollowedArtists();
}

// Social Features
function toggleFollowUser(targetUsername) {
    return userMusicSystem.toggleFollowUser(targetUsername);
}

function getUserProfileByUsername(username) {
    return userMusicSystem.getUserProfileByUsername(username);
}

function searchUsers(query) {
    return userMusicSystem.searchUsers(query);
}

// Artist Features
function getArtistProfile(artistName) {
    return userMusicSystem.getArtistProfile(artistName);
}

function searchArtists(query) {
    return userMusicSystem.searchArtists(query);
}

// Statistics & History
function addPlayHistory(songId) {
    return userMusicSystem.addPlayHistory(songId);
}

function addSearchHistory(term) {
    return userMusicSystem.addSearchHistory(term);
}

// Request System
function saveRequestToHistory(requestData) {
    return userMusicSystem.saveRequestToHistory(requestData);
}

function getRequestHistory() {
    return userMusicSystem.getRequestHistory();
}

// Utility Functions
function formatNumber(num) {
    return userMusicSystem.formatNumber(num);
}

function getListeningTimeStats() {
    return userMusicSystem.getListeningTimeStats();
}

// WhatsApp Integration
function generateWhatsAppLink(message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Initialize default data if not exists
function initializeDefaultData() {
    if (!localStorage.getItem('ndiidepzXmusic_users')) {
        console.log('Initializing default music data...');
    }
}

// Call initialization
initializeDefaultData();
