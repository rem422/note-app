import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello There");
})

app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);

app.listen(PORT,() => {
    console.log(`Server started at:http://localhost:${PORT}`);
    connectDB();
});