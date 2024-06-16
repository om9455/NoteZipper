const asyncHandler = require("express-async-handler");
const Note = require('./../models/noteModel')

const createNotes = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
        res.status(400);
        throw new Error("Please Fill all the Feilds");
    }
    else {
        const note = new Note({ user: req.user._id, title, content, category });
        const createdNote = await note.save();
        res.status(201).json(createdNote);
    }
});

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
})
const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note) {
        res.json(note);
    }
    else {
        res.status(404).json({ message: "Note not found" });
    }
})
const updateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("you can't perform this action")
    }
    if (note) {
        note.title = title || note.title;
        note.content = content || note.content;
        note.category = category || note.category;
        const updatedNote = await note.save();
        res.json(updatedNote);
    }
    else {
        throw new Error("Note not found");
    }
})
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
      if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("you can't perform this action");
      }
    if (note) {
        await note.deleteOne({ _id: req.params.id });
        res.json({message:"Note Removed"})
    } else {
      res.status(404).json({ message: "Note not found" });
    }
})
module.exports = { createNotes, getNotes, getNoteById, updateNote, deleteNote };