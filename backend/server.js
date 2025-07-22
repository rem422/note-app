import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello There!");
});

app.listen(PORT,() => {
    console.log(`Server started at:http://localhost:${PORT}`);
});