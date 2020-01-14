import {
  CHANGE_NOTE_COLOR,
  DELETE_LABEL_FROM_NOTE,
  ADD_LABEL_TO_NOTE
} from "../Types";
import {
  GetNoteIndex,
  getAllNotes,
  getNoteById
} from "../Selectors/notesSelectors";
import * as axios from "../../../utils/axiosHandlerRedux";

export const ChangeNoteColor = (id, color) => (dispatch, getState) => {
  console.log(color);
  const state = getState();
  const index = GetNoteIndex(state, id);
  const note = getNoteById(state, id);
  const notes = getAllNotes(state);
  const newNotes = [...notes];
  const newNote = { ...note, color: color };
  newNotes[index] = newNote;
  axios.Patch(
    "http://localhost:4000/UpdateNote/" + id,
    newNote,
    () => dispatch({ type: CHANGE_NOTE_COLOR.SUCCESS, payload: newNotes }),
    () => dispatch({ type: CHANGE_NOTE_COLOR.FAILED })
  );
};

export const AddLabelToNote = (noteId, label) => (dispatch, getState) => {
  const state = getState();
  const notes = [...getAllNotes(state)];
  const index = GetNoteIndex(state, noteId);
  notes[index].labels.push(label);
  axios.Patch(
    "http://localhost:4000/NoteAddLabel/" + noteId,
    { label: label._id },
    () => dispatch({ type: ADD_LABEL_TO_NOTE.SUCCESS, payload: notes }),
    ()=> dispatch({type: ADD_LABEL_TO_NOTE.FAILED})
  );
};
export const DeleteLabelFromNote = (noteId, labelId) => (dispatch, getState) => {
  const state = getState();
  const notes = [...getAllNotes(state)];
  const noteIndex = GetNoteIndex(state, noteId);
  const labelIndex = notes[noteIndex].labels.map(e=>e._id).indexOf(labelId)
  notes[noteIndex].labels.splice(labelIndex,1);
  axios.Patch(
    "http://localhost:4000/NoteDeleteLabel/" + noteId,
    { label: labelId },
    () => dispatch({ type: DELETE_LABEL_FROM_NOTE.SUCCESS, payload: notes }),
    () => dispatch({ type: DELETE_LABEL_FROM_NOTE.FAILED })
  );
};
