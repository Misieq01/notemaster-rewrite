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
import Portal from "../../Components/ReactPortal";
import ColorPicker from "../../Components/Pickers/Colors";
import LabelsPicker from "../../Components/Pickers/Labels";
import CornerIconPlacer from "../../Components/CornerIcon";

import DeleteIcon from "../../../Assets/Icons/NoteOptions/delete.svg";
import CopyIcon from "../../../Assets/Icons/NoteOptions/copy.svg";
import ColorIcon from "../../../Assets/Icons/NoteOptions/color.svg";
import LabelIcon from "../../../Assets/Icons/NoteOptions/label.svg";
import ImportantFalseIcon from "../../../Assets/Icons/NoteOptions/important-false.svg";
import ImportantTrueIcon from "../../../Assets/Icons/NoteOptions/important-true.svg";
// import CheckedIcon from "../../../Assets/Icons/NoteOptions/checked.svg";
// import UnCheckedIcon from "../../../Assets/Icons/NoteOptions/unchecked.svg";

const Card = ({ _id, ...props }) => {
  const dispatch = useDispatch();
  const data = useSelector(state => getNoteById(state, _id));
  const [displayIcons, setdisplayIcons] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayLabelsPicker, setDisplayLabelsPicker] = useState(false);
  const MAX_LABELS_LENGTH = 4;
  const MAX_LABELS_TEXT_LENGTH = 12;
  const TruncateText = (t, len) => {
    if (t.length > len) t = t.slice(0, len) + "...";
    return t;
  };

  const TruncatedLabels = () => {
    const labels = [...data.labels]
      .slice(0, MAX_LABELS_LENGTH)
      .map(e => (
        <div className='card__label' key={e.name}>
          {TruncateText(e.name, MAX_LABELS_TEXT_LENGTH)}
        </div>
      ));

    return labels.length > 0 ? (
      labels
    ) : (
      <div className="card__labelsPlaceholder" />
    );
  };

  const Content = () => {
    return data.type === "note" ? (
      <Note content={data.content} />
    ) : (
      <List content={data.content} color={data.color} />
    );
  };

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

  const ColorPickerPopout = () => {
    return displayColorPicker ? (
      <Portal setState={() => setDisplayColorPicker(false)} eventType="move">
        <ColorPicker
          parent={cardRef.current}
          id={data._id}
          Close={() => setDisplayColorPicker(false)}
          componentType="card"
        />
      </Portal>
    ) : null;
  };

  const LabelsPickerPopout = () => {
    return displayLabelsPicker ? (
      <Portal setState={() => setDisplayLabelsPicker(false)} eventType="move">
        <LabelsPicker
          parent={labelsIconRef.current}
          id={data._id}
          labels={data.labels}
          Close={() => setDisplayLabelsPicker(false)}
          componentType="card"
        />
      </Portal>
    ) : null;
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
        {/* <CornerIconPlacer
          icon={UnCheckedIcon}
          corner="topRight"
          xPos={-6}
          size={24}
          opacity={displayIcons ? "1" : "0"}
        /> */}
        <h2 className="card__title">{data.title}</h2>
        <Content />
        <TruncatedLabels />
        <div className="card__iconsWrapper">
          <img
            className="card__icon"
            alt="icon"
            src={LabelIcon}
            title="Labels"
            style={{ opacity: displayIcons ? 0.65 : 0 }}
            ref={labelsIconRef}
            onClick={LabelsPickerHandler}
          />
          <LabelsPickerPopout />
          <img
            className="card__icon"
            alt="icon"
            src={ColorIcon}
            title="Change Color"
            style={{ opacity: displayIcons ? 0.65 : 0 }}
            onClick={event => ColorPickerHandler(event)}
          />
          <ColorPickerPopout />
          <img
            className="card__icon"
            alt="icon"
            src={CopyIcon}
            title="Copy"
            onClick={event => CopyNoteHandler(event)}
            style={{ opacity: displayIcons ? 0.65 : 0 }}
          />
          <img
            className="card__icon"
            alt="icon"
            src={DeleteIcon}
            title="Delete"
            onClick={event => DeleteNoteHandler(event)}
            style={{ opacity: displayIcons ? 0.65 : 0 }}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
