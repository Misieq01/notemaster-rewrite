const express = require("express");
const Label = require("../models/Labels");
const Note = require("../models/Notes");
const User = require("../models/Users");
const AuthMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/NewLabel", AuthMiddleware, async (req, res) => {
  try {
    const label = new Label(req.body);
    await label.save();
    req.user.labels.push(label._id);
    await req.user.save();
    res.status(201).send(label);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/Labels", AuthMiddleware, async (req, res) => {
  try {
    const { labels } = await User.findOne({ _id: req.user._id }).populate({
      path: "labels",
      model: "Label",
    });
    res.send(labels);
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/DeleteLabel/:id", AuthMiddleware, async (req, res) => {
  const id = req.params.id;
  try {
    await Label.findByIdAndDelete(id);
    await Note.ClearLabels(id);
    await req.user.deleteLabel(id);
    const { labels } = await User.findOne({ _id: req.user._id }).populate({
      path: "labels",
      model: "Label",
    });
    const notes = await req.user.returnNotes();
    res.send({ notes, labels });
  } catch (error) {
    res.send(error.message);
  }
});

router.patch("/ChangeLabel/:id", AuthMiddleware, async (req, res) => {
  try {
    const label = await Label.findById(req.params.id);
    label.name = req.body.name;
    label.save();
    const notes = await req.user.returnNotes();
    res.send({ label, notes });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
