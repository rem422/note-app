import express from 'express';
import { User } from '../models/user.model.js';

const router = express.Router();

// Route to register user
router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    try {
        if(!username || !email || !password) {
            return res.status(400).res.json({message: "Please fill all the fields"});
        }
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({ username, email, password });
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email
        });
    } catch(err) {
        res.status(500).json({message: "Server Error:", err});
    }
})

// Router to login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).res.json({message: "Please fill all fields"});
        }
        const user = await User.findOne({email});
        if(!user || (await user.matchPassword(password))) {
            res.status(401).json({message: "Invalid credentials"});
        }
        res.json({
            id: user._id,
            username: user.username,
            email: user.email
        })
    } catch(err) {
        res.status(500).json({message: "Server Error:", err})
    }
});

// Me
// router.get("/me", protect, async (req, res) => {
//     res.status(200).json(req.user);
//     try {

//     }catch(err) {

//     }
// })

export default router;