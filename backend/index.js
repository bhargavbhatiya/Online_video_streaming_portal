import mongoose from 'mongoose';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import router from './routes/routers.js';

connectDB();
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/", router);

app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`));












