import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNote } from "../../../Hooks/useNote";
import { textTruncateChar } from "../../../utils/textTruncate";

import List from "./List";
import Note from "./Note";
import { Icon, Labels, CornerIcon, LabelsPicker, ColorPicker } from "../../Components/index";

import { noteIcons } from "../../../Assets/Icons/index";

const Card = ({ _id }) => {
  const [displayIcons, setdisplayIcons] = useState(false);
  const [data, dataAction] = useNote(_id);

  const truncatedLabels = [...data.labels].slice(0, 4).map(e => textTruncateChar(e.name, 12));

  const cardRef = useRef();
  const labelsIconRef = useRef();

  const ColorPickerPopout = () =>
    data.pickers.colors ? (
      <ColorPicker
        parent={cardRef.current}
        id={data._id}
        close={() => dataAction.closePicker("color")}
        componentType="card"
      />
    ) : null;

  const LabelsPickerPopout = () =>
    data.pickers.labels ? (
      <LabelsPicker
        parent={labelsIconRef.current}
        id={data._id}
        labels={data.labels}
        close={() => dataAction.closePicker("labels")}
        componentType="card"
      />
    ) : null;

  const Content = () => {
    return data.type === "note" ? <Note content={data.content} /> : <List content={data.content} color={data.color} />;
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
        <h2 className="card__title">{data.title}</h2>
        <Content />
        <Labels labels={truncatedLabels} size="small" />
        <div
          className="card__icons-wrapper"
          style={{ opacity: displayIcons ? 0.75 : 0 }}
          onClick={event => event.preventDefault()}
        >
          <CornerIcon
            icon={data.important ? noteIcons.ImportantTrueIcon : noteIcons.ImportantFalseIcon}
            corner="topLeft"
            yPos={14}
            xPos={4}
            size={18}
            opacity={displayIcons ? "0.45" : "0"}
            onClick={() => dataAction.changeImportance(!data.important)}
          />
          <Icon
            icon={noteIcons.LabelIcon}
            title="Labels"
            ref={labelsIconRef}
            onClick={() => dataAction.displayPicker("labels")}
          />
          <LabelsPickerPopout />
          <Icon icon={noteIcons.ColorIcon} title="Change color" onClick={() => dataAction.displayPicker("colors")} />
          <Icon icon={noteIcons.CopyIcon} title="Copy" onClick={dataAction.copyNote} />
          <Icon icon={noteIcons.DeleteIcon} title="Delete" onClick={dataAction.deleteNote} />
          <ColorPickerPopout />
        </div>
      </div>
    </Link>
  );
};

export default Card;
