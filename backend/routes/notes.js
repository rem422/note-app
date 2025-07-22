import express from "express";
import Notes from '../models/note.model.js';
import { protect } from "../middleware/auth.js";