import express from "express";
import Note from '../models/note.model.js';
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get all notes
router.get("/", protect, async (req, res) => {
    try {
        const notes = await Note.find({createdBy: req.user._id});
        res.json(notes);
    } catch(err) {
        console.error("Get all notes error:", err);
        res.status(500).json({message: "Server Error"});
    }
})

// Create a note
router.post("/", protect, async (req, res) => {
    const { title, description } = req.body;
    try {
        if (!title || !description) {
            return res.status(400).json({message: "Please fill all the fields"})
        }

        const note = await Note.create({ 
            title, 
            description, 
            createdBy: req.user._id
        });
        res.status(201).json(note)
    } catch(err) {
        res.status(500).json({message: "Server Error"});
    }
});

// Get a single note
router.post("/:id", protect, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).json({message: "Note not found"});
        }
    } catch(err) {
        res.status(500).json({message: "Server Error"});
    }
});

// Update a single note
router.put("/:id", protect, async (req, res) => {
    const { title, description } = req.body;
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).json({message: "Note not found"})
        }

        if (note.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: "Not authorized"});
        }

        note.title = title || note.title;
        note.description = description || note.description;

        const UpdatedNote = await note.save();
        res.status(200).json(UpdatedNote);
    } catch(err) {
        res.status(500).json({message: "Server Error"});
    }
});

// Delete a note
router.delete("/:id", protect, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).json({message: "Note not found"})
        }

        if (note.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({message: "Not authorized"});
        }
        await note.deleteOne();
        res.json({message: 'Note deleted successfully'})
    } catch(err) {
        res.status(500).json({message: "Server Error"});
    }
});

export default router;