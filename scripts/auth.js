// scripts/auth.js
const AuthManager = {
    // Check authentication status
    checkAuth: function() {
        if (typeof userDataManager === 'undefined') {
            console.error('UserDataManager not loaded');
            return false;
        }
        return userDataManager.checkLoginStatus();
    },

    // Require auth - redirect if not authenticated
    requireAuth: function() {
        if (!this.checkAuth()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Get current user
    getCurrentUser: function() {
        return this.checkAuth() ? userDataManager.getCurrentUser() : null;
    },

    // Initialize page with auth check
    initPage: function(callback) {
        if (!this.requireAuth()) return;
        
        if (typeof callback === 'function') {
            callback();
        }
    }
};

// Global helper
function requireAuth() {
    return AuthManager.requireAuth();
}
