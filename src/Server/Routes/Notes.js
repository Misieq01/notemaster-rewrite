const express = require("express");
const Note = require("../Schemas/Notes");
const User = require("../Schemas/Users");
const Label = require("../Schemas/Labels");
const AuthMiddleware = require("../Middleware/auth");

const router = express.Router();

router.post("/NewNote", AuthMiddleware, async (req, res) => {
  
  const note = new Note(req.body);
  console.log(req.body);
  try {
    await note.save();
    req.user.notes.push(note._id);
    await req.user.save();
    res.status(201).send();
  } catch (error) {
    res.send(error);
  }
});

router.get("/GetAllNotes", AuthMiddleware, async (req, res) => {
  try {
    const { notes } = await User.findOne({ _id: req.user._id }).populate({
      path: "notes",
      model: "Note",
      populate: {
        path: "labels",
        model: "Label",
        select: { name: 1, _id: 0 }
      }
    });
    res.send(notes);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/UpdateNote/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    await Note.findOneAndUpdate({ _id: id }, req.body);
    res.send();
  } catch (error) {
    res.send(error);
  }
});

router.patch("/NoteAddLabel/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    const note = await Note.findById(id);
    note.labels.push(req.body.label);
    await note.save();
    res.send();
  } catch (error) {
    res.send(error.message);
  }
});

router.patch("/NoteDeleteLabel/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  const label = req.body.label;
  try {
    const note = await Note.findById(id);
    const index = note.labels.indexOf(label)
    note.labels.splice(index,1)
    await note.save();
    res.send();
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/DeleteNote/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    await Note.findByIdAndDelete(id);
    res.send();
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
