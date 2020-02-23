import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  DeleteNote,
  CopyNote,
  ChangeImportance
} from "../../Store/Actions/notesActions";
import { getNoteById } from "../../Store/Selectors/notesSelectors";

import List from "./List";
import Note from "./Note";
import ColorPicker from "../../Components/Pickers/Colors";
import LabelsPicker from "../../Components/Pickers/Labels";
import CornerIconPlacer from "../../Components/CornerIcon";
import Labels from "../../Components/Labels";
import Icon from '../../Components/Icon';

import DeleteIcon from "../../../Assets/Icons/NoteOptions/delete.svg";
import CopyIcon from "../../../Assets/Icons/NoteOptions/copy.svg";
import ColorIcon from "../../../Assets/Icons/NoteOptions/color.svg";
import LabelIcon from "../../../Assets/Icons/NoteOptions/label.svg";
import ImportantFalseIcon from "../../../Assets/Icons/NoteOptions/important-false.svg";
import ImportantTrueIcon from "../../../Assets/Icons/NoteOptions/important-true.svg";

const Card = ({ _id, ...props }) => {
  const dispatch = useDispatch();
  const data = useSelector(state => getNoteById(state, _id));
  const [displayIcons, setdisplayIcons] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayLabelsPicker, setDisplayLabelsPicker] = useState(false);
  const MAX_LABELS_LENGTH = 4;
  const MAX_LABELS_TEXT_LENGTH = 12;
  const truncateText = (t, len) => {
    if (t.length > len) t = t.slice(0, len) + "...";
    return t;
  };

  const truncatedLabels = [...data.labels]
    .slice(0, MAX_LABELS_LENGTH)
    .map(e => truncateText(e.name, MAX_LABELS_TEXT_LENGTH));

  const CopyNoteHandler = event => {
    event.preventDefault();
    dispatch(CopyNote(data._id));
  };
  const DeleteNoteHandler = event => {
    event.preventDefault();
    dispatch(DeleteNote(data._id));
  };

  const ColorPickerHandler = event => {
    event.preventDefault();
    setDisplayColorPicker(true);
  };

  const LabelsPickerHandler = event => {
    event.preventDefault();
    setDisplayLabelsPicker(true);
  };

  const ChangeImportanceHandler = event => {
    event.preventDefault();
    dispatch(ChangeImportance(data._id, !data.important));
  };

  const cardRef = useRef();
  const labelsIconRef = useRef();

  const ColorPickerPopout = () =>
    displayColorPicker ? (
      <ColorPicker
        parent={cardRef.current}
        id={data._id}
        close={() => setDisplayColorPicker(false)}
        componentType="card"
        portalState={displayColorPicker}
      />
    ) : null;

  const LabelsPickerPopout = () =>
    displayLabelsPicker ? (
      <LabelsPicker
        parent={labelsIconRef.current}
        id={data._id}
        labels={data.labels}
        close={() => setDisplayLabelsPicker(false)}
        componentType="card"
        portalState={displayLabelsPicker}
      />
    ) : null;

  const Content = () => {
    return data.type === "note" ? (
      <Note content={data.content} />
    ) : (
      <List content={data.content} color={data.color} />
    );
  };

  return (
    <Link className="card__link" to={"/User/NotesPanel/Edit/" + data._id}>
      <div
        className="card__container"
        style={{ background: data.color }}
        ref={cardRef}
        onMouseOver={() => setdisplayIcons(true)}
        onMouseLeave={() => setdisplayIcons(false)}
      >
        <CornerIconPlacer
          icon={data.important ? ImportantTrueIcon : ImportantFalseIcon}
          corner="topLeft"
          yPos={14}
          xPos={4}
          size={18}
          opacity={displayIcons ? "0.45" : "0"}
          onClick={event => ChangeImportanceHandler(event)}
        />
        <h2 className="card__title">{data.title}</h2>
        <Content />
        <Labels labels={truncatedLabels} size="small" />
        <div
          className="card__icons-wrapper"
          style={{ opacity: displayIcons ? 0.75 : 0 }}
        >
          <Icon
            icon={LabelIcon}
            title="Labels"
            ref={labelsIconRef}
            onClick={LabelsPickerHandler}
          />
          <LabelsPickerPopout />
          <Icon
            icon={ColorIcon}
            title="Change color"
            onClick={event => ColorPickerHandler(event)}
          />
          <Icon
            icon={CopyIcon}
            title="Copy"
            onClick={event => CopyNoteHandler(event)}
          />
          <Icon
            icon={DeleteIcon}
            title="Delete"
            onClick={event => DeleteNoteHandler(event)}
          />
          <ColorPickerPopout />
        </div>
      </div>
    </Link>
  );
};

export default Card;
