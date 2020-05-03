import {
  FETCH_NOTES,
  CHANGE_NOTE_FIELD_VALUE,
  COPY_NOTE,
  DELETE_NOTE,
  DELETE_NOTES,
  POST_UPDATED_NOTE,
  ADD_NOTE,
} from "../Types";

import { getNoteById } from "../Selectors/notesSelectors";

import * as axios from "../../../utils/axiosHandler";

export const fetchAllNotes = () => (dispatch) => {
  axios.Get(
    "/GetAllNotes",
    (response) => {
      setTimeout(() => dispatch({ type: FETCH_NOTES.SUCCESS, payload: response.data }), 1000);
    },
    () => {
      dispatch({ type: FETCH_NOTES.FAILED });
    }
  );
};

export const changeNoteFieldValue = (id, field, value) => {
  return { type: CHANGE_NOTE_FIELD_VALUE, id: id, field: field, value: value };
};

export const copyNote = (id) => (dispatch) => {
  axios.Post(
    "/CopyNote" + id,
    null,
    (response) => {
      dispatch({ type: COPY_NOTE.SUCCESS, note: response.data });
    },
    () => dispatch({ type: COPY_NOTE.FAILED })
  );
};
export const deleteNote = (id) => (dispatch) => {
  axios.Delete(
    "/DeleteNote/" + id,
    (response) => dispatch({ type: DELETE_NOTE.SUCCESS, notes: response.data }),
    () => dispatch({ type: DELETE_NOTE.FAILED })
  );
};
export const deleteManyNotes = (notes) => (dispatch) => {
  const notesId = notes.map((e) => e._id);
  axios.Delete(
    "/DeleteNotes/" + JSON.stringify(notesId),
    (response) => {
      dispatch({ type: DELETE_NOTES.SUCCESS, notes: response.data });
    },
    () => dispatch({ type: DELETE_NOTES.FAILED })
  );
};

export const postUpdatedNote = (id) => (dispatch, getState) => {
  const state = getState();
  const note = getNoteById(state, id);
  axios.Patch(
    "/UpdateNote/" + id,
    note,
    () => dispatch({ type: POST_UPDATED_NOTE.SUCCESS }),
    () => dispatch({ type: POST_UPDATED_NOTE.FAILED })
  );
};

export const AddNote = (type) => (dispatch) => {
  const note = {
    labels: [],
    color: "rgb(255,255,186)",
    important: false,
    title: "",
    content: type === 'note' ? "" : [{ text: "", id: 0, fields: [{ text: "", id: 0,parentId: 0 }] }],
    type: type,
    place: "Notes",
  };
  let id = undefined;
  return axios
    .Post(
      "/NewNote",
      note,
      (response) => {
        dispatch({ type: ADD_NOTE.SUCCESS, note: response.data });
        id = response.data._id;
      },
      () => dispatch({ type: ADD_NOTE.FAILED })
    )
    .then(() => id);
};
