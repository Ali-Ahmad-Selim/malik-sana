import mongoose from 'mongoose';

const connection = {};

export const Connect = async () => {
    if (connection.isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }
    if (!process.env.MONGO_URI) {
        throw new Error("Please define the MONGO_URI environment variable inside .env.local");
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw new Error("Error connecting to MongoDB.");
    }
};