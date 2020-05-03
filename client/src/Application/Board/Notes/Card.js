import React, { useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNote } from "../../../Hooks/useNote";
import { textTruncateChar } from "../../../utils/textTruncate";
import { highlightSearchedText } from "../../../utils/highlightText";
import List from "./List";
import Note from "./Note";
import { Labels, CornerIcon, LabelsPicker, ColorPicker } from "../../Components/index";

import { ReactComponent as RemoveIcon } from "../../../Assets/Icons/bin.svg";
import { ReactComponent as ArchiveIcon } from "../../../Assets/Icons/archive.svg";
import { ReactComponent as CopyIcon } from "../../../Assets/Icons/copy.svg";
import { ReactComponent as ColorIcon } from "../../../Assets/Icons/color.svg";
import { ReactComponent as LabelIcon } from "../../../Assets/Icons/label.svg";
import { ReactComponent as DeleteIcon } from "../../../Assets/Icons/remove-permanent.svg";
import { ReactComponent as RestoreIcon } from "../../../Assets/Icons/home.svg";
import PinnedIcon from "../../../Assets/Icons/pinned.svg";
import NotPinnedIcon from "../../../Assets/Icons/not-pinned.svg";

const Card = React.memo(({_id}) => {
  const [data, action] = useNote(_id);
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
        close={() => action.closePicker("color")}
        action={action}
        componentType="card"
      />
    ) : null;

  const LabelsPickerPopout = () =>
    data.pickers.labels ? (
      <LabelsPicker
        parent={labelsIconRef.current}
        id={data._id}
        labels={data.labels}
        close={() => action.closePicker("labels")}
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
          <RestoreIcon className="icon" title="Restore note" onClick={() => action.changePlace("Notes")} />
          <DeleteIcon className="icon" title="Delete note permanently" onClick={() => action.deleteNote()} />
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
                action.changePlace("Notes");
              }
              action.changeImportance(!data.important);
            }}
          />

          <LabelIcon
            className="icon"
            title="Labels"
            ref={labelsIconRef}
            onClick={() => action.displayPicker("labels")}
          />
          <ColorIcon className="icon" title="Change color" onClick={() => action.displayPicker("colors")} />
          <CopyIcon className="icon" title="Copy" onClick={() => action.copyNote()} />
          <RemoveIcon className="icon" title="Delete" onClick={() => action.changePlace("Bin")} />
          <ArchiveIcon
            className="icon"
            title={notesPanelType === "Archive" ? "Move to notes" : "Move to archive"}
            onClick={() => {
              if (notesPanelType !== "Archive" && data.important) {
                action.changeImportance(false);
              }
              action.changePlace(notesPanelType === "Archive" ? "Notes" : "Archive");
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
        >
          <Title />
          <Content/>
          <Labels labels={truncatedLabels} size="small" />
          <div
            className="card__icons-wrapper"
            onClick={(event) => event.preventDefault()}
          >
            <Icons />
          </div>
        </div>
      </Link>
  );
});

export default Card;
