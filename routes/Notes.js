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
    res.status(201).send();
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
    const { notes } = await User.findOne({ _id: req.user._id }).populate({
      path: "notes",
      model: "Note",
      populate: {
        path: "labels",
        model: "Label",
        select: { name: 1, _id: 1 }
      }
    });
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
    await req.user.DeleteNote(id)
    res.send();
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
