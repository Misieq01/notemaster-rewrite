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
import * as axios from "../../../utils/axiosHandler";

export const ChangeNoteColor = (id, color) => (dispatch, getState) => {
  const state = getState();
  const index = GetNoteIndex(state, id);
  const note = {...getNoteById(state, id),color:color};
  const notes = getAllNotes(state);
  notes[index] = note;
  axios.Patch(
    "/UpdateNote/" + id,
    note,
    () => dispatch({ type: CHANGE_NOTE_COLOR.SUCCESS, notes: notes }),
    () => dispatch({ type: CHANGE_NOTE_COLOR.FAILED })
  );
};

export const AddLabelToNote = (noteId, label) => (dispatch, getState) => {
  const state = getState();
  const notes = getAllNotes(state);
  const note = {...getNoteById(state,noteId)}
  const index = GetNoteIndex(state, noteId);
  note.labels.push(label)
  axios.Patch(
    "/NoteAddLabel/" + noteId,
    { label: label._id },
    () => {
      notes[index] = note;
      dispatch({ type: ADD_LABEL_TO_NOTE.SUCCESS, notes: notes })},
    ()=> dispatch({type: ADD_LABEL_TO_NOTE.FAILED})
  );
};
export const DeleteLabelFromNote = (noteId, labelId) => (dispatch, getState) => {
  const state = getState();
  const notes = getAllNotes(state);
  const note = {...getNoteById(state,noteId)}
  const noteIndex = GetNoteIndex(state, noteId);
  const labelIndex = notes[noteIndex].labels.map(e=>e._id).indexOf(labelId)
  note.labels.splice(labelIndex,1)
  axios.Patch(
    "/NoteDeleteLabel/" + noteId,
    { label: labelId },
    () => {
      notes[noteIndex] = note;
      dispatch({ type: DELETE_LABEL_FROM_NOTE.SUCCESS, notes: notes })},
    () => dispatch({ type: DELETE_LABEL_FROM_NOTE.FAILED })
  );
};
