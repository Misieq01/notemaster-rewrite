import {
  FETCH_LABELS,
  ADD_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
  REFETCH_NOTES
} from "../Types";

import * as axios from "../../../utils/axiosHandler";

export const FetchLabels = () => dispatch => {
  axios.Get(
    "/Labels",
    res => setTimeout(()=>dispatch({ type: FETCH_LABELS.SUCCESS, labels: res.data })),
    () => dispatch({ type: FETCH_LABELS.FAILED })
  );
};

export const AddLabel = name => dispatch => {
  axios.Post(
    "/NewLabel",
    { name },
    res => {
      dispatch({ type: ADD_LABEL.SUCCESS, label: res.data });
    },
    () => dispatch({ type: ADD_LABEL.FAILED })
  );
};
export const UpdateLabel = (id, name) => (dispatch, getState) => {
  return axios.Patch(
    "/ChangeLabel/" + id,
    {name},
    response => {
      dispatch({ type: UPDATE_LABEL.SUCCESS, label: response.data.label });
      dispatch({ type: REFETCH_NOTES, notes: response.data.notes });
    },
    () => dispatch({ type: UPDATE_LABEL.FAILED })
  );
};

export const DeleteLabel = id => (dispatch, getState) => {
  axios.Delete(
    "/DeleteLabel/" + id,
    response => {
      dispatch({ type: DELETE_LABEL.SUCCESS, labels: response.data.labels });
      dispatch({
        type: REFETCH_NOTES,
        notes: response.data.notes
      });
    },
    () => dispatch({ type: DELETE_LABEL.FAILED })
  );
};
