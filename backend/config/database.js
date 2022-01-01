import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
const app = express();
const connectDB = async () => {

    mongoose.connect(CONNECTION_URL).then(() => {

        console.log(`Connected to database and running on port + ${PORT}`);

    }).catch((err) => {
        console.log("XYZ" + err.message);
    });
}


export default connectDB;