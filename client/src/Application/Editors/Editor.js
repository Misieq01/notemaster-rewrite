import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useNote } from "../../Hooks/useNote";

import Body from "./BodyType";
import Background from '../../Components/Background'
import { ColorPicker, LabelsPicker, Labels, Icon } from "../Components/index";

import {noteIcons} from '../../Assets/Icons/index'

const Editor = () => {
  const history = useHistory();
  const id = useParams().id;
  const [data, dataAction] = useNote(id);
  const [titleShadow, setTitleShadow] = useState("none");
  const notesPanelType = useParams().type

  const colorIconRef = useRef();
  const labelsIconRef = useRef();

  const backToNotePanel = () => {
    history.push("/User/NotesPanel/" + notesPanelType);
  };

  const finishHandler = () => {
    dataAction.postUpdate();
    backToNotePanel();
  };
  const deleteNoteHandler = () => {
    dataAction.deleteNote();
    backToNotePanel();
  };

  const copyNoteHandler = () => {
    dataAction.copyNote();
    backToNotePanel();
  };

  const updateContentField = event =>{
    dataAction.updateField('content',event.target.value)
  }

  const TitleShadowHandler = top => {
    if (top === 0) {
      setTitleShadow("none");
    } else if (top !== 0 && titleShadow === "none") {
      setTitleShadow("0 2px 4px rgba(0, 0, 0, 0.2)");
    }
  };

  const ColorPickerPopout = () =>
    data.pickers.colors ? (
      <ColorPicker
        parent={colorIconRef.current}
        id={data._id}
        close={() => dataAction.closePicker("colors")}
        componentType="editor"
      />
    ) : null;

  const LabelsPickerPopout = () =>
    data.pickers.labels ? (
      <LabelsPicker
        parent={labelsIconRef.current}
        id={data._id}
        close={() => dataAction.closePicker("labels")}
        componentType="editor"
      />
    ) : null;

  return (
    <>
        <Background onClick={finishHandler}/>
        <div className="editor__container" style={{ background: data.color }}>
          <input
            className="editor__title"
            placeholder="Title"
            onChange={event => dataAction.updateField("title", event.target.value)}
            value={data.title}
            style={{ boxShadow: titleShadow }}
          />
          <Body
            type={data.type}
            GetInputData={updateContentField}
            content={data.content}
            background={data.color}
            TitleShadowHandler={TitleShadowHandler}
          />
          <Labels labels={data.labels} size="medium" />
          <div className="editor__option-wrapper">
            <Icon
              icon={noteIcons.LabelIcon}
              title="Edit labels"
              ref={labelsIconRef}
              onClick={() => dataAction.displayPicker("labels")}
            />
            <LabelsPickerPopout />
            <Icon
              icon={noteIcons.ColorIcon}
              title="Change color"
              ref={colorIconRef}
              onClick={() => dataAction.displayPicker("colors")}
            />
            <ColorPickerPopout />

            <Icon icon={noteIcons.CopyIcon} title="Copy note" onClick={copyNoteHandler} />
            <Icon icon={noteIcons.DeleteIcon} title="Delete note" onClick={deleteNoteHandler} />
            <button className="editor__option-wrapper--finish-button" onClick={finishHandler}>
              Finish
            </button>
          </div>
        </div>
    </>
  );
};

export default Editor;
