import React, { useState, useMemo, useRef } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { GetToken } from "../../../utils/tokenHandler";
import * as axios from "../../../utils/axiosHandler";

import List from "./List";
import Note from "./Note";
import Portal from "../../../Components/ReactPortal";
import ColorPicker from "../../../Components/NoteCustomize/ColorPicker";
import LabelsPicker from "../../../Components/NoteCustomize/LabelsPicker";

import DeleteIcon from "../../../Icons/NoteOptions/delete.svg";
import CopyIcon from "../../../Icons/NoteOptions/copy.svg";
import ColorIcon from "../../../Icons/NoteOptions/color.svg";
import LabelIcon from "../../../Icons/NoteOptions/label.svg";

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
const Title = styled.h2`
    width:90%;
    height: 10%
    padding: 10px;
    margin:0;
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
  margin: 5px 3px
  border-radius: 5px;
  display: inline-block;
  background:none;
  border: 1px solid rgba(0,0,0,0.5);
`;

const Card = ({
  data,
  ReRender,
  ...props
}) => {
  const [displayIcons, setdisplayIcons] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayLabelsPicker, setDisplayLabelsPicker] = useState(false);

  console.log('chuj')

  const MAX_LABELS_LENGTH = 4;
  const MAX_LABELS_TEXT_LENGTH = 12;

  const TruncateText = (t, len) => {
    if (t.length > len) t = t.slice(0, len) + "...";
    return t;
  };

  const truncatedLabels = useMemo(() => {
    return [...data.labels]
      .slice(0, MAX_LABELS_LENGTH)
      .map(e => (
        <Label key={e.name}>
          {TruncateText(e.name, MAX_LABELS_TEXT_LENGTH)}
        </Label>
      ));
  }, [data.labels]);

  const Content =
    data.type === "note" ? (
      <Note content={data.content} />
    ) : (
      <List content={data.content} color={data.color} />
    );

  const CopyNote = event => {
    event.preventDefault();
    const copiedData = {...data}
    delete copiedData._id
    copiedData.labels.map(e=>{
      return e._id
    })
    console.log(data)
    axios.Post("http://localhost:4000/NewNote", copiedData, ReRender);
  };
  const DeleteNote = event => {
    event.preventDefault();
    axios.Delete("http://localhost:4000/DeleteNote/" + data._id,ReRender);
  };

  const ColorPickerHandler = event => {
    event.preventDefault();
    setDisplayColorPicker(true);
  };

  const LabelsPickerHandler = event => {
    event.preventDefault();
    setDisplayLabelsPicker(true);
  };

  const cardRef = useRef();
  const labelsIconRef = useRef();

  const colorPicker = displayColorPicker ? (
    <Portal setState={() => setDisplayColorPicker(false)}>
      <ColorPicker
        parent={cardRef.current}
        id={data._id}
        ReRender={ReRender}
        Close={() => setDisplayColorPicker(false)}
      />
    </Portal>
  ) : null;

  const labelsPicker = displayLabelsPicker ? (
    <Portal setState={() => setDisplayLabelsPicker(false)}>
      <LabelsPicker
        parent={labelsIconRef.current}
        id={data._id}
        ReRender={ReRender}
        labels={data.labels}
        Close={() => setDisplayLabelsPicker(false)}
      />
    </Portal>
  ) : null;

  return (
    <Link
      to={{
        pathname: "/User/NotesPanel/EditNote/" + data._id,
        state: { type: data.type, isNew: false, data: data }
      }}
    >
      <Container
        color={data.color}
        ref={cardRef}
        onMouseEnter={() => setdisplayIcons(true)}
        onMouseLeave={() => setdisplayIcons(false)}
      >
        <Title>{data.title}</Title>
        {Content}
        {truncatedLabels}
        <IconsWrapper>
          <Icon
            src={LabelIcon}
            title="Labels"
            opacity={displayIcons ? "0.65" : "0"}
            ref={labelsIconRef}
            onClick={LabelsPickerHandler}
          />
          {labelsPicker}
          <Icon
            src={ColorIcon}
            title="Change Color"
            opacity={displayIcons ? "0.65" : "0"}
            onClick={event => ColorPickerHandler(event)}
          />
          {colorPicker}
          <Icon
            src={CopyIcon}
            title="Copy"
            onClick={event => CopyNote(event)}
            opacity={displayIcons ? "0.65" : "0"}
          />
          <Icon
            src={DeleteIcon}
            title="Delete"
            onClick={event => DeleteNote(event)}
            opacity={displayIcons ? "0.65" : "0"}
          />
        </IconsWrapper>
      </Container>
    </Link>
  );
};

export default withRouter(Card);
