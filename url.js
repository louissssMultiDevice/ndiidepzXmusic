// Auto-update URL parameters on every page load
    document.addEventListener('DOMContentLoaded', function() {
        // Check if user is logged in
        if (userDataManager.checkLoginStatus()) {
            // Force URL update dengan parameter terbaru
            userDataManager.updateUrlWithAuth();
            
            console.log('Page loaded with auth parameters:', {
                id: userDataManager.getCurrentUserId(),
                sessions: userDataManager.getCurrentSessionId(), 
                user: userDataManager.getCurrentUser()
            });
        }
    });
