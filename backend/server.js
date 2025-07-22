import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoute from './router/auth.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello There!");
});

app.use("/user", userRoute);

app.listen(PORT,() => {
    console.log(`Server started at:http://localhost:${PORT}`);
    connectDB();
});