import {
  FETCH_NOTES,
  CHANGE_NOTE_FIELD_VALUE,
  COPY_NOTE,
  DELETE_NOTE,
  POST_UPDATED_NOTE,
  ADD_NOTE
} from "../Types";

import {
  getAllNotes,
  getNoteById,
  GetNoteIndex
} from "../Selectors/notesSelectors";

import * as axios from "../../../utils/axiosHandler";

export const fetchAllNotes = () => dispatch => {
  axios.Get(
    "/GetAllNotes",
    response => {
      setTimeout(
        () => dispatch({ type: FETCH_NOTES.SUCCESS, payload: response.data }),
        1000
      );
    },
    () => {
      dispatch({ type: FETCH_NOTES.FAILED });
    }
  );
};

export const changeNoteFieldValue = (id, field, value) => (
  dispatch,
  getState
) => {
  const state = getState();
  const notes = [...getAllNotes(state)];
  const index = GetNoteIndex(state, id);
  const note = { ...getNoteById(state, id), [field]: value };
  notes[index] = note;
  dispatch({ type: CHANGE_NOTE_FIELD_VALUE, notes: notes });
};

export const copyNote = id => (dispatch, getState) => {
  const state = getState();
  const notes = [...getAllNotes(state)];
  axios.Post(
    "/CopyNote" + id,
    null,
    response => {
      notes.push(response.data);
      dispatch({ type: COPY_NOTE.SUCCESS, notes: notes });
    },
    () => dispatch({ type: COPY_NOTE.FAILED })
  );
};
export const deleteNote = id => (dispatch, getState) => {
  const state = getState();
  const notes = [...getAllNotes(state)];
  const index = GetNoteIndex(state, id);
  notes.splice(index, 1);
  axios.Delete(
    "/DeleteNote/" + id,
    () => dispatch({ type: DELETE_NOTE.SUCCESS, notes: notes }),
    () => dispatch({ type: DELETE_NOTE.FAILED })
  );
};

export const postUpdatedNote = id => (dispatch, getState) => {
  const state = getState();
  const note = getNoteById(state, id);
  axios.Patch(
    "/UpdateNote/" + id,
    note,
    () => dispatch({ type: POST_UPDATED_NOTE.SUCCESS }),
    () => dispatch({ type: POST_UPDATED_NOTE.FAILED })
  );
};

export const AddNote = (id, type) => (dispatch, getState) => {
  const state = getState();
  const notes = [...getAllNotes(state)];
  const note = {
    _id: id,
    labels: [],
    color: "rgb(255,255,186)",
    important: false,
    title: "",
    content: "",
    type: type,
    place: 'Notes'
  };

  return axios.Post(
    "/NewNote",
    note,
    () => {
      notes.push(note);
      dispatch({ type: ADD_NOTE.SUCCESS, notes: notes });
    },
    () => dispatch({ type: ADD_NOTE.FAILED })
  );
};
