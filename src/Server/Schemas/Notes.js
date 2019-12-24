const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: {type: String,require:true,},
    type: {type: String},
    content: {type: Object},
    labels: [{type: mongoose.Schema.Types.ObjectId,ref: 'Label'}
    ],
    color: {type: String, default: 'rgb(255,223,186)'}
},{timestamps:true})

const Note = mongoose.model('Note',NoteSchema);


module.exports = Note

