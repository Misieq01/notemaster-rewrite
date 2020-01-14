import { FETCH_LABELS, ADD_LABEL, UPDATE_LABEL,DELETE_LABEL,CHANGE_NOTE_FIELD_VALUE } from "../Types";
import {
  GetAllLabels,
  GetLabelIndex,
  GetLabelById
} from "../Selectors/labelsSelectors";
import {getAllNotes} from '../Selectors/notesSelectors' 
import * as axios from "../../../utils/axiosHandlerRedux";

export const FetchLabels = () => dispatch => {
  axios.Get(
    "http://localhost:4000/Labels",
    res => dispatch({ type: FETCH_LABELS.SUCCESS, payload: res.data }),
    () => dispatch({ type: FETCH_LABELS.FAILED })
  );
};

export const AddLabel = name => (dispatch, getState) => {
  const state = getState();
  const labels = [...GetAllLabels(state)];
  axios.Post(
    "http://localhost:4000/NewLabel",
    {name},
    res => {
      labels.push(res.data);
      dispatch({ type: ADD_LABEL.SUCCESS, payload: labels });
    },
    () => dispatch({ type: ADD_LABEL.FAILED })
  );
};
export const UpdateLabel = (id, name) => (dispatch, getState) => {
  const state = getState();
  const labels = [...GetAllLabels(state)];
  const index = GetLabelIndex(state, id);
  const label = {...GetLabelById(state,id),name:name};
  const notesWithUpdatedLabel = [...getAllNotes(state)]
  notesWithUpdatedLabel.map(note => {
    const index = note.labels.map(label => label._id).indexOf(id)
    if(index !== -1){
    const newNote = {...note}
    newNote.labels[index].name = name;
    return newNote;
    }else {
      return note
    }
  });
  axios.Patch(
    "http://localhost:4000/ChangeLabel/" + id,
    label,
    () => {
      labels[index] = label;
      dispatch({ type: UPDATE_LABEL.SUCCESS, payload: labels });
      dispatch({type:CHANGE_NOTE_FIELD_VALUE,payload: notesWithUpdatedLabel})
    },
    () => dispatch({ type: UPDATE_LABEL.FAILED })
  );
};

export const DeleteLabel = id => (dispatch, getState) => {
  const state = getState();
  const labels = [...GetAllLabels(state)];
  const index = GetLabelIndex(state,id)
    const notesWithDeletedLabel = [...getAllNotes(state)];
    notesWithDeletedLabel.map(note => {
      const index = note.labels.map(label => label._id).indexOf(id);
      console.log(index)
      if (index !== -1) {
        const newNote = { ...note };
        newNote.labels.splice(index,1)
        return newNote;
      } else {
        return note;
      }
    });
  axios.Delete(
    "http://localhost:4000/DeleteLabel/" + id,
    () => {
      labels.splice(index,1)
      dispatch({ type: DELETE_LABEL.SUCCESS, payload: labels });
      dispatch({type:CHANGE_NOTE_FIELD_VALUE,payload: notesWithDeletedLabel})
    },
    () => dispatch({ type: DELETE_LABEL.FAILED })
  );
};