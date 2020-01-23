
export const getAllNotes = state => state.notes.notes
export const getNoteById = (state,id) => state.notes.notes.find(e => e._id === id)
export const GetNoteIndex = (state,id) => state.notes.notes.map(e=> e._id).indexOf(id)
export const getImportantNotes = state => state.notes.notes.filter(e=> e.important === true)
export const getNonImportantNotes = state => state.notes.notes.filter(e=> e.important === false)