// api/users/save.js - Simple file-based storage (for demo)
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, userData } = req.body;
        
        if (!email || !userData) {
            return res.status(400).json({ error: 'Email and userData are required' });
        }

        // Create users directory if it doesn't exist
        const usersDir = path.join(process.cwd(), 'data', 'users');
        if (!fs.existsSync(usersDir)) {
            fs.mkdirSync(usersDir, { recursive: true });
        }

        // Save user data to file
        const filename = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        const filePath = path.join(usersDir, filename);
        
        fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
        
        res.status(200).json({ 
            success: true, 
            message: 'User data saved successfully',
            filePath 
        });
    } catch (error) {
        console.error('Save error:', error);
        res.status(500).json({ error: 'Failed to save user data' });
    }
}
