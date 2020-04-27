const express = require("express");
const Note = require("../models/Notes");
const User = require("../models/Users");
const AuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/NewNote", AuthMiddleware, async (req, res) => {
  const note = new Note(req.body);
  try {
    await note.save();
    req.user.notes.push(note._id);
    await req.user.save();
    res.status(201).send(note);
  } catch (error) {
    res.send(error);
  }
});

router.post('/CopyNote:id',AuthMiddleware,async(req,res)=>{
  const id = req.params.id
  try {
    const note = await Note.Copy(id)
    req.user.notes.push(note._id)
    await req.user.save()
    await Note.populate(note,{path:'labels',model:'Label'})
    res.status(201).send(note)
  } catch (error) {
    res.send(error)
  }
})

router.get("/GetAllNotes", AuthMiddleware, async (req, res) => {
  try {
    const notes = await req.user.returnNotes();
    res.send(notes);
  } catch (error) {
    res.send(error);
  }
});

router.get('/OneNote/:id',AuthMiddleware,async(req,res)=>{
  const id = req.params.id
  try {
    const note = await Note.findOne({_id:id})
    res.send(note)
  } catch (error) {
    res.send(error);
  }
})

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
    note.labels.push(req.body.labelId);
    await note.save();
    await note.populate('labels').execPopulate()
    res.send(note);
  } catch (error) {
    res.send(error.message);
  }
});

router.patch("/NoteDeleteLabel/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  const labelId = req.body.labelId;
  try {
    const note = await Note.findById(id);
    const index = note.labels.indexOf(labelId);
    note.labels.splice(index,1)
    await note.save();
    await note.populate('labels').execPopulate()
    res.send(note);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/DeleteNote/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    await Note.findByIdAndDelete(id);
    await req.user.DeleteNote(id)
    // await req.user.save()
    const notes = await req.user.returnNotes()
    res.send(notes);
  } catch (error) {
    res.send(error);
  }
});
router.delete("/DeleteNotes/:notes", AuthMiddleware, async (req, res) => {
  const notesId = JSON.parse(req.params.notes);
  try {
    await Note.deleteMany({_id:notesId})
    await notesId.forEach((id) => req.user.DeleteNote(id));
    const notes = await req.user.returnNotes()
    res.send(notes);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
