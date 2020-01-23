import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {useDispatch,useSelector} from 'react-redux'
import {DeleteNote,CopyNote,ChangeNoteFieldValue,PostUpdatedNote} from '../../Store/Actions/notesActions'
import {getNoteById} from '../../Store/Selectors/notesSelectors'

import List from "./List";
import Note from "./Note";
import Portal from "../../../Components/ReactPortal";
import ColorPicker from "../../../Components/NoteCustomize/ColorPicker";
import LabelsPicker from "../../../Components/NoteCustomize/LabelsPicker";
import CornerIconPlacer from '../../../Components/CornerIcon'

import DeleteIcon from "../../../Icons/NoteOptions/delete.svg";
import CopyIcon from "../../../Icons/NoteOptions/copy.svg";
import ColorIcon from "../../../Icons/NoteOptions/color.svg";
import LabelIcon from "../../../Icons/NoteOptions/label.svg";
import ImportantFalseIcon from "../../../Icons/NoteOptions/important-false.svg";
import ImportantTrueIcon from "../../../Icons/NoteOptions/important-true.svg";
import CheckedIcon from "../../../Icons/NoteOptions/checked.svg";
import UnCheckedIcon from "../../../Icons/NoteOptions/unchecked.svg";


const Container = styled.div`
  width: 240px;
  background: ${props => props.color};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  padding: 12px 12px 6px 12px;
  margin: 10px 0;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.23);
  }
  text-align: center;
`;

const EditLink = styled(Link)`
  transition: all 0.35s ease-in-out;
`

const Title = styled.h2`
    width:90%;
    height: 10%;
    padding: 10px;
    margin:5px 0 0 0;
    font-size: 18px;
    text-transform: uppercase;
    text-align: left;
    opacity: 0.95;
`;

const IconsWrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  transition: all 0.3s ease-in-out;
  opacity: ${props => props.opacity};
  :hover {
    opacity: 1;
  }
`;

const Label = styled.div`
  font-size: 12px;
  padding: 2px;
  margin: 5px 3px;
  border-radius: 5px;
  display: inline-block;
  background:none;
  border: 1px solid rgba(0,0,0,0.5);
`;

const Card = ({
  _id,
  ...props
}) => {
  const dispatch = useDispatch()
  const data = useSelector(state => getNoteById(state,_id))
  const [displayIcons, setdisplayIcons] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayLabelsPicker, setDisplayLabelsPicker] = useState(false);
  const MAX_LABELS_LENGTH = 4;
  const MAX_LABELS_TEXT_LENGTH = 12;
  const TruncateText = (t, len) => {
    if (t.length > len) t = t.slice(0, len) + "...";
    return t;
  };

  const truncateLabels = () => {
    return [...data.labels]
      .slice(0, MAX_LABELS_LENGTH)
      .map(e => (
        <Label key={e.name}>
          {TruncateText(e.name, MAX_LABELS_TEXT_LENGTH)}
        </Label>
      ));
  }

  const Labels = () => truncateLabels()

  const Content = () =>{
    return data.type === "note" ? (
      <Note content={data.content} />
    ) : (
      <List content={data.content} color={data.color} />
    );
  }


  const CopyNoteHandler = event => {
    event.preventDefault();
    dispatch(CopyNote(data._id));
  };
  const DeleteNoteHandler = event => {
    event.preventDefault();
    dispatch(DeleteNote(data._id))
  };

  const ColorPickerHandler = event => {
    event.preventDefault();
    setDisplayColorPicker(true);
  };

  const LabelsPickerHandler = event => {
    event.preventDefault();
    setDisplayLabelsPicker(true);
  };

  const ChangeImportance = event => {
    event.preventDefault()
    dispatch(ChangeNoteFieldValue(data._id,'important',!data.important))
    dispatch(PostUpdatedNote(data._id))
  }

  const cardRef = useRef();
  const labelsIconRef = useRef();

  const ColorPickerPopout = () =>{
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
  }

  const LabelsPickerPopout = () =>{
    return displayLabelsPicker ? (
      <Portal setState={() => setDisplayLabelsPicker(false)} eventType="move">
        <LabelsPicker
          parent={labelsIconRef.current}
          id={data._id}
          labels={data.labels}
          Close={() => setDisplayLabelsPicker(false)}
          componentType='card'
        />
      </Portal>
    ) : null;
  }

  return (
    <EditLink to={"/User/NotesPanel/Edit/" + data._id}>
      <Container
        color={data.color}
        ref={cardRef}
        onMouseEnter={() => setdisplayIcons(true)}
        onMouseLeave={() => setdisplayIcons(false)}
      >
        <CornerIconPlacer
          icon={data.important ? ImportantTrueIcon : ImportantFalseIcon}
          corner="topLeft"
          yPos={14}
          xPos={4}
          size={20}
          opacity={displayIcons ? "0.45" : "0"}
          onClick={event=>ChangeImportance(event)}
        />
        {/* <CornerIconPlacer
          icon={UnCheckedIcon}
          corner="topRight"
          xPos={-6}
          size={24}
          opacity={displayIcons ? "1" : "0"}
        /> */}
        <Title>{data.title}</Title>
        <Content />
        <Labels />
        <IconsWrapper>
          <Icon
            src={LabelIcon}
            title="Labels"
            opacity={displayIcons ? "0.65" : "0"}
            ref={labelsIconRef}
            onClick={LabelsPickerHandler}
          />
          <LabelsPickerPopout />
          <Icon
            src={ColorIcon}
            title="Change Color"
            opacity={displayIcons ? "0.65" : "0"}
            onClick={event => ColorPickerHandler(event)}
          />
          <ColorPickerPopout />
          <Icon
            src={CopyIcon}
            title="Copy"
            onClick={event => CopyNoteHandler(event)}
            opacity={displayIcons ? "0.65" : "0"}
          />
          <Icon
            src={DeleteIcon}
            title="Delete"
            onClick={event => DeleteNoteHandler(event)}
            opacity={displayIcons ? "0.65" : "0"}
          />
        </IconsWrapper>
      </Container>
    </EditLink>
  );
};

export default Card;
