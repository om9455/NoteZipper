const express = require('express');
const router = express.Router();
const Note = require('./../models/noteModel');

const {
  createNotes,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("./../controllers/noteControllers");
const protect = require('../middlewares/authMiddleware');
router.get("/",protect,getNotes);
// router.get("/:id", async (req, res) => {
//   const note = await Note.find((note) => note._id === req.params.id);
//   res.json(note);
// });
router.post('/create',protect ,createNotes);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);
module.exports = router;