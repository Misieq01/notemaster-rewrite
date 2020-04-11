import {
  FETCH_LABELS,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
  CHANGE_NOTE_FIELD_VALUE
} from "../Types";
import {
  GetAllLabels,
  GetLabelIndex,
  GetLabelById
} from "../Selectors/labelsSelectors";
import { getAllNotes } from "../Selectors/notesSelectors";
import * as axios from "../../../utils/axiosHandler";

export const FetchLabels = () => dispatch => {
  axios.Get(
    "/Labels",
    res => setTimeout(()=>dispatch({ type: FETCH_LABELS.SUCCESS, labels: res.data })),
    () => dispatch({ type: FETCH_LABELS.FAILED })
  );
};

export const AddLabel = name => (dispatch, getState) => {
  const state = getState();
  const labels = [...GetAllLabels(state)];
  axios.Post(
    "/NewLabel",
    { name },
    res => {
      labels.push(res.data);
      dispatch({ type: ADD_LABEL.SUCCESS, labels: labels });
    },
    () => dispatch({ type: ADD_LABEL.FAILED })
  );
};
export const UpdateLabel = (id, name) => (dispatch, getState) => {
  const state = getState();
  const labels = [...GetAllLabels(state)];
  const index = GetLabelIndex(state, id);
  const label = { ...GetLabelById(state, id), name: name };
  const notes = getAllNotes(state);
  axios.Patch(
    "/ChangeLabel/" + id,
    label,
    () => {
      labels[index] = label;
      const notesWithUpdatedLabel = notes.map(note => {
        const index = note.labels.map(label => label._id).indexOf(id);
        if (index !== -1) {
          const newNote = {...note}
          newNote.labels[index].name = name
          return newNote;
        } else {
          return note;
        }
      });
      dispatch({ type: UPDATE_LABEL.SUCCESS, labels: labels });
      dispatch({ type: CHANGE_NOTE_FIELD_VALUE, notes: notesWithUpdatedLabel });
    },
    () => dispatch({ type: UPDATE_LABEL.FAILED })
  );
};

export const DeleteLabel = id => (dispatch, getState) => {
  const state = getState();
  const labels = [...GetAllLabels(state)];
  const index = GetLabelIndex(state, id);
  const notes = getAllNotes(state);
  axios.Delete(
    "/DeleteLabel/" + id,
    () => {
      labels.splice(index, 1);
        const notesWithDeletedLabel = notes.map((note, id) => {
          note.labels.map(label => label._id).indexOf(id);
          if (index !== -1) {
            const newNote = { ...note };
            newNote.labels.splice(index, 1);
            return newNote;
          } else {
            return note;
          }
        });
      dispatch({ type: DELETE_LABEL.SUCCESS, labels: labels });
      dispatch({
        type: CHANGE_NOTE_FIELD_VALUE,
        notes: notesWithDeletedLabel
      });
    },
    () => dispatch({ type: DELETE_LABEL.FAILED })
  );
};
