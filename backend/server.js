import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import path from 'path';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());



app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);


const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT,() => {
    console.log(`Server started at:http://localhost:${PORT}`);
    connectDB();
});