// api/users/load.js - Simple file-based loading (for demo)
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.query;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const filename = `user_${email.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        const filePath = path.join(process.cwd(), 'data', 'users', filename);
        
        if (fs.existsSync(filePath)) {
            const userData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Load error:', error);
        res.status(500).json({ error: 'Failed to load user data' });
    }
}
