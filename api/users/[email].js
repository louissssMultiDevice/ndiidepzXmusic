// api/users/[email].js
import { MongoClient } from 'mongodb';

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db(process.env.MONGODB_DB);
    cachedDb = db;
    return db;
}

export default async function handler(req, res) {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const db = await connectToDatabase();
        const usersCollection = db.collection('users');

        if (req.method === 'GET') {
            // Get user data
            const userData = await usersCollection.findOne({ email });
            
            if (userData) {
                res.status(200).json(userData);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } else if (req.method === 'POST') {
            // Create or update user data
            const userData = req.body;
            userData.email = email;
            userData.updatedAt = new Date();

            const result = await usersCollection.updateOne(
                { email },
                { $set: userData },
                { upsert: true }
            );

            res.status(200).json({ 
                success: true, 
                message: 'User data saved successfully',
                result 
            });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
