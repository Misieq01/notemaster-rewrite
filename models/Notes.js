const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: {type: String,require:true},
    type: {type: String},
    content: {type: Object},
    labels: [{type: mongoose.Schema.Types.ObjectId,ref: 'Label'}
    ],
    color: {type: String, default: 'rgb(255,223,186)'},
    important: {type: Boolean, default: false},
    place: {type: String, default: 'Notes'}
},{timestamps:true})


NoteSchema.statics.ClearLabels = async (labelId) =>{
    const notes = await Note.find({})
    notes.forEach(async note=>{
        const index = note.labels.indexOf(labelId)
        note.labels.splice(index,1)
        await note.save()
    })
}

NoteSchema.statics.Copy = async (noteId) =>{
    const note = await Note.findById(noteId)
    note._id = mongoose.Types.ObjectId();
    note.isNew = true;
    note.save()
    return note
}



const Note = mongoose.model('Note',NoteSchema);


module.exports = Note

