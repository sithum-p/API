import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

async function addPasswordToUsers() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
        
        // Update all users without password field
        const result = await User.updateMany(
            { password: { $exists: false } },
            { $set: { password: "123456" } }
        );
        
        console.log(`Updated ${result.modifiedCount} users with default password`);
        
        // Show all users
        const users = await User.find();
        console.log('All users:', JSON.stringify(users, null, 2));
        
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

addPasswordToUsers();