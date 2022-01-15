const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
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

module.exports = connectDB;
// export default connectDB;