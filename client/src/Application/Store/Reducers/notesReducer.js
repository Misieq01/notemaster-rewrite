import {
  FETCH_NOTES,
  CHANGE_NOTE_FIELD_VALUE,
  COPY_NOTE,
  DELETE_NOTE,
  DELETE_NOTES,
  POST_UPDATED_NOTE,
  ADD_NOTE,
  REFETCH_NOTES,
  ADD_LABEL_TO_NOTE,
  DELETE_LABEL_FROM_NOTE,
} from "../Types";

const initialState = {
  notes: [],
  error: "",
  loading: true,
};

const notes = (state = initialState, action) => {
  const notes = [...state.notes];
  switch (action.type) {
    case FETCH_NOTES.SUCCESS:
      return { ...state, notes: action.payload, loading: false };
    case FETCH_NOTES.FAILED:
      return { ...state, error: "We couldnt get your notes" };
    case REFETCH_NOTES:
      return { ...state, notes: action.notes };
    case CHANGE_NOTE_FIELD_VALUE:
      //I want here to update ONLY one specific note (object) inside notes (array) without returning new array to prevent rerender in Board component
      // Which cause performance lost
      // more notes = more performance lost
      if (action.field === "content") {
        state.notes.forEach((e) => {
          if (e._id === action.id) {
            e[action.field] = action.value;
          }
        });
        return state;
      } else {
        return {
          ...state,
          notes: state.notes.map((e) => (e._id === action.id ? { ...e, [action.field]: action.value } : e)),
        };
      }
    case COPY_NOTE.SUCCESS:
      notes.push(action.note);
      return { ...state, notes: notes };
    case COPY_NOTE.FAILED:
      return { ...state, error: "Failed to copy note" };
    case DELETE_NOTE.SUCCESS:
      return { ...state, notes: action.notes };
    case DELETE_NOTE.FAILED:
      return { ...state, error: "Failed to delete note" };
    case DELETE_NOTES.SUCCESS:
      return { ...state, notes: action.notes };
    case DELETE_NOTES.FAILED:
      return { ...state, error: "Failed to delete note" };
    case POST_UPDATED_NOTE.SUCCESS:
      return state;
    case POST_UPDATED_NOTE.FAILED:
      return {
        ...state,
        error: "We have problem with saving your note on server",
      };
    case ADD_NOTE.SUCCESS:
      notes.push(action.note);
      return { ...state, notes: notes };
    case ADD_NOTE.FAILED:
      return {
        ...state,
        error: "Something went wrong with adding your note ",
      };
    case ADD_LABEL_TO_NOTE.SUCCESS:
      notes[notes.findIndex((e) => e._id === action.note._id)] = action.note;
      return { ...state, notes: notes };
    case ADD_LABEL_TO_NOTE.FAILED:
      return { ...state, error: "We couldnt add label to your note" };
    case DELETE_LABEL_FROM_NOTE.SUCCESS:
      notes[notes.findIndex((e) => e._id === action.note._id)] = action.note;
      return { ...state, notes: notes };
    case DELETE_LABEL_FROM_NOTE.FAILED:
      return { ...state, error: "We couldnt delete label from your note" };
    default:
      return state;
  }
};

export default notes;
