const mongoose = require('mongoose')

const LabelSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true }
});

const Label = mongoose.model('Label',LabelSchema)

module.exports = Label