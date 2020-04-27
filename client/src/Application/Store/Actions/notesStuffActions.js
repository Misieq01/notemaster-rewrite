import { DELETE_LABEL_FROM_NOTE, ADD_LABEL_TO_NOTE } from "../Types";
import * as axios from "../../../utils/axiosHandler";

export const AddLabelToNote = (noteId, labelId) => dispatch => {
  axios.Patch(
    "/NoteAddLabel/" + noteId,
    { labelId },
    (response) => {
      dispatch({ type: ADD_LABEL_TO_NOTE.SUCCESS, note: response.data });
    },
    () => dispatch({ type: ADD_LABEL_TO_NOTE.FAILED })
  );
};
export const DeleteLabelFromNote = (noteId, labelId) => dispatch => {
  axios.Patch(
    "/NoteDeleteLabel/" + noteId,
    { labelId: labelId },
    response => {
      dispatch({ type: DELETE_LABEL_FROM_NOTE.SUCCESS, note: response.data });
    },
    () => dispatch({ type: DELETE_LABEL_FROM_NOTE.FAILED })
  );
};
