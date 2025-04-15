import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Database URI is not defined. Please set the DB_URI environment variable inside .env.<development/production>.local");
}

async function connectToDatabase() {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to Database succesfully");
    } catch (error) {
        console.error("Error connecting to Database:", error.message);
        process.exit(1);
    }
}

export default connectToDatabase