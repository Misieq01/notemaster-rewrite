import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoteById } from "../Application/Store/Selectors/notesSelectors";
import {
  copyNote,
  deleteNote,
  changeImportance,
  postUpdatedNote,
  changeNoteFieldValue
} from "../Application/Store/Actions/notesActions";

const UseNoteProto = {
  copyNote() {
    this._dispatch(copyNote(this._id));
  },
  deleteNote() {
    this._dispatch(deleteNote(this._id));
  },
  displayPicker(name) {
    this._setDisplay(true, name);
  },
  closePicker(name) {
    this._setDisplay(false, name);
  },
  changeImportance(value) {
    this._dispatch(changeImportance(this._id, value));
  },
  updateField(field,value){
    console.log(this)
      this._dispatch(changeNoteFieldValue(this._id,field,value))
  },
  postUpdate(){
      this._dispatch(postUpdatedNote(this._id))
  }
};

export const useNote = _id => {
  const dispatch = useDispatch();
  const data = useSelector(state => getNoteById(state, _id));
  const searchValue = useSelector(state => state.others.searchValue)
  const [pickersDisplay, setDisplay] = useState({ colors: false, labels: false });

  const _setDisplay = (value, field) => setDisplay({ ...pickersDisplay, [field]: value });
  const ref = useRef(null);

  if (ref.current === null) {
    ref.current = [
      { ...data, pickers: { ...pickersDisplay } },
      {
        __proto__: UseNoteProto,
        _setDisplay,
        _dispatch: dispatch,
        _id,
        _searchValue: searchValue
      }
    ];
  } else {
    ref.current[0] = { ...data, pickers: { ...pickersDisplay } };
  }

  return ref.current;
};
