import React, { useState, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNote } from "../../../Hooks/useNote";
import { textTruncateChar } from "../../../utils/textTruncate";
import { highlightSearchedText } from "../../../utils/highlightText";

import List from "./List";
import Note from "./Note";
import { Labels, CornerIcon, LabelsPicker, ColorPicker } from "../../Components/index";

import { ReactComponent as RemoveIcon } from "../../../Assets/Icons/Navigation/bin.svg";
import { ReactComponent as ArchiveIcon } from "../../../Assets/Icons/Navigation/archive.svg";
import { ReactComponent as CopyIcon } from "../../../Assets/Icons/NoteOptions/copy.svg";
import { ReactComponent as ColorIcon } from "../../../Assets/Icons/NoteOptions/color.svg";
import { ReactComponent as LabelIcon } from "../../../Assets/Icons/NoteOptions/label.svg";
import { ReactComponent as DeleteIcon } from "../../../Assets/Icons/NoteOptions/remove-permanent.svg";
import { ReactComponent as RestoreIcon } from "../../../Assets/Icons/Navigation/home.svg";
import PinnedIcon from "../../../Assets/Icons/NoteOptions/pinned.svg";
import NotPinnedIcon from "../../../Assets/Icons/NoteOptions/not-pinned.svg";

const Card = ({ _id }) => {
  const [displayIcons, setdisplayIcons] = useState(false);
  const [data, dataAction] = useNote(_id);
  const location = useLocation().pathname;
  const notesPanelType = useParams().type;
  const truncatedLabels = [...data.labels].slice(0, 4).map((e) => textTruncateChar(e.name, 12));
  const searchValue = useSelector((state) => state.others.searchValue);

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

  const Title = () => {
    const title = highlightSearchedText(data.title, searchValue);
    return <h2 className="card__title">{title}</h2>;
  };

  const Content = () => {
    return data.type === "note" ? (
      <Note content={data.content} search={searchValue} />
    ) : (
      <List content={data.content} />
    );
  };

  const Icons = () => {
    if (notesPanelType === "Bin") {
      return (
        <>
          <RestoreIcon className="icon" title="Restore note" onClick={() => dataAction.changePlace("Notes")} />
          <DeleteIcon className="icon" title="Delete note permanently" onClick={() => dataAction.deleteNote()} />
        </>
      );
    } else {
      return (
        <>
          <CornerIcon
            icon={data.important ? PinnedIcon : NotPinnedIcon}
            corner="topLeft"
            yPos={14}
            xPos={4}
            size={18}
            onClick={() => {
              if (data.place === "Archive" && !data.important) {
                dataAction.changePlace("Notes");
              }
              dataAction.changeImportance(!data.important);
            }}
          />

          <LabelIcon
            className="icon"
            title="Labels"
            ref={labelsIconRef}
            onClick={() => dataAction.displayPicker("labels")}
          />
          <ColorIcon className="icon" title="Change color" onClick={() => dataAction.displayPicker("colors")} />
          <CopyIcon className="icon" title="Copy" onClick={() => dataAction.copyNote()} />
          <RemoveIcon className="icon" title="Delete" onClick={() => dataAction.changePlace("Bin")} />
          <ArchiveIcon
            className="icon"
            title={notesPanelType === "Archive" ? "Move to notes" : "Move to archive"}
            onClick={() => {
              if (notesPanelType !== "Archive" && data.important) {
                dataAction.changeImportance(false);
              }
              dataAction.changePlace(notesPanelType === "Archive" ? "Notes" : "Archive");
            }}
          />
          <LabelsPickerPopout />
          <ColorPickerPopout />
        </>
      );
    }
  };

  return (
    <Link className="card__link" to={location + "/Edit/" + data._id}>
      <div
        className="card__container"
        style={{ background: data.color }}
        ref={cardRef}
        onMouseOver={() => setdisplayIcons(true)}
        onMouseLeave={() => setdisplayIcons(false)}
      >
        <Title />
        <Content />
        <Labels labels={truncatedLabels} size="small" />
        <div
          className="card__icons-wrapper"
          style={{ opacity: displayIcons ? 0.75 : 0 }}
          onClick={(event) => event.preventDefault()}
        >
          <Icons />
        </div>
      </div>
    </Link>
  );
};

export default Card;
