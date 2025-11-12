import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user.js';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

async function updateUserPassword() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
        
        // Update the specific user with password
        const result = await User.findByIdAndUpdate(
            "69130c194cba8a1cc9993d90",
            { $set: { password: "123456" } },
            { new: true }
        );
        
        console.log('Updated user:', result);
        
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

updateUserPassword();