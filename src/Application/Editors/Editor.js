import React, { useEffect, useState, useRef } from "react";
import { withRouter, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNoteById } from "../Store/Selectors/notesSelectors";
import {
  ChangeNoteFieldValue,
  CopyNote,
  DeleteNote,
  PostUpdatedNote
} from "../Store/Actions/notesActions";

import Body from "./BodyType";
import ColorPicker from "../Components/Pickers/Colors";
import LabelsPicker from "../Components/Pickers/Labels";
import Labels from "../Components/Labels";
import Icon from "../Components/Icon"

import DeleteIcon from "../../Assets/Icons/NoteOptions/delete.svg";
import CopyIcon from "../../Assets/Icons/NoteOptions/copy.svg";
import ColorIcon from "../../Assets/Icons/NoteOptions/color.svg";
import LabelIcon from "../../Assets/Icons/NoteOptions/label.svg";

const Editor = props => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector(state => getNoteById(state, id));
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayLabelsPicker, setDisplayLabelsPicker] = useState(false);
  const [titleShadow, setTitleShadow] = useState("none");
  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, [dispatch]);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const BackToNotePanel = () => {
    props.history.push("/User/NotesPanel");
  };

  const GetInputData = (event, fieldName) => {
    dispatch(ChangeNoteFieldValue(data._id, fieldName, event.target.value));
  };

  const FinishHandler = () => {
    dispatch(PostUpdatedNote(data._id));
    BackToNotePanel();
  };
  const DeleteNoteHandler = () => {
    dispatch(DeleteNote(data._id));
    BackToNotePanel();
  };

  const CopyNoteHandler = () => {
    dispatch(CopyNote(data._id));
    BackToNotePanel();
  };

  const ShowColorPicker = () => {
    setDisplayColorPicker(true);
  };
  const HideColorPicker = () => {
    setDisplayColorPicker(false);
  };
  const ShowLabelsPicker = () => {
    setDisplayLabelsPicker(true);
  };
  const HideLabelsPicker = () => {
    setDisplayLabelsPicker(false);
  };

  const TitleShadowHandler = top => {
    if (top === 0) {
      setTitleShadow("none");
    } else if (top !== 0) {
      setTitleShadow("0 2px 4px rgba(0, 0, 0, 0.2)");
    }
  };

  const colorIconRef = useRef();
  const labelsIconRef = useRef();

  const ColorPickerPopout = () =>
    displayColorPicker ? (
      <ColorPicker
        parent={colorIconRef.current}
        id={data._id}
        close={HideColorPicker}
        componentType="editor"
        portalState={displayColorPicker}
      />
    ) : null;

  const LabelsPickerPopout = () => displayLabelsPicker ? (
      <LabelsPicker
        parent={labelsIconRef.current}
        id={data._id}
        close={HideLabelsPicker}
        componentType="editor"
        portalState={displayLabelsPicker}
      />
    ) : null;

  return (
    <>
      {data !== undefined ? (
        <div className="editor__container" style={{ background: data.color }}>
          <input
            className="editor__title"
            placeholder="Title"
            onChange={event => GetInputData(event, "title")}
            value={data.title}
            style={{ boxShadow: titleShadow }}
          />
          <Body
            type={data.type}
            GetInputData={GetInputData}
            content={data.content}
            background={data.color}
            TitleShadowHandler={TitleShadowHandler}
          />
          <Labels
            labels={data.labels}
            size='medium'
          />
          <div className="editor__option-wrapper">
            <Icon
              icon={LabelIcon}
              title="Edit labels"
              ref={labelsIconRef}
              onClick={ShowLabelsPicker}
            />
            <LabelsPickerPopout />
            <Icon
              icon={ColorIcon}
              title="Change color"
              ref={colorIconRef}
              onClick={ShowColorPicker}
            />
            <ColorPickerPopout />

            <Icon
              icon={CopyIcon}
              title="Copy note"
              onClick={CopyNoteHandler}
            />
            <Icon
              icon={DeleteIcon}
              title="Delete note"
              onClick={DeleteNoteHandler}
            />
            <button
              className="editor__option-wrapper--finish-button"
              onClick={FinishHandler}
            >
              Finish
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default withRouter(Editor);
