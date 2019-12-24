import React, { useState,useMemo, useRef } from "react";
import styled from "styled-components";
import { withRouter, Redirect } from "react-router-dom";
import { GetToken } from "../../../utils/tokenHandler";
import axios from "axios";

import List from "./List";
import Note from "./Note";
import Portal from "../../../Components/ReactPortal";
import ColorPicker from "../../../Components/NoteCustomize/ColorPicker";
import LabelsPicker from '../../../Components/NoteCustomize/LabelsPicker';

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
  labels,
  type,
  title,
  color,
  id,
  content,
  ReRenderBoard,
  ...props
}) => {


  const [redirect, setRedirect] = useState(false);
  const [displayIcons, setdisplayIcons] = useState(false);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayLabelsPicker,setDisplayLabelsPicker] = useState(false)

  const data = {
    id,
    title,
    content,
    type,
    color,
    labels
  };

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
          <Label key={e.name}>{TruncateText(e.name, MAX_LABELS_TEXT_LENGTH)}</Label>
        ));
    }, [data.labels]);

  const Content =
    type === "note" ? (
      <Note content={content} />
    ) : (
      <List content={content} color={color} />
    );

  const CopyNote = event => {
    event.stopPropagation();
    const CopiedData = { ...data };
    const token = GetToken();
    delete CopiedData.id;
    axios
      .post("http://localhost:4000/NewNote", CopiedData, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        ReRenderBoard();
      });
  };
  const DeleteNote = event => {
    event.stopPropagation();
    const token = GetToken();
    axios
      .delete("http://localhost:4000/DeleteNote/" + id, {
        headers: { Authorization: "Bearer " + token }
      })
      .then(response => {
        ReRenderBoard();
      });
  };

  const EditHandler = () => {
    setRedirect(true);
  };

  const ColorPickerHandler = event =>{
    event.stopPropagation()
    setDisplayColorPicker(true)
  }

  const LabelsPickerHandler = event =>{
    event.stopPropagation()
    setDisplayLabelsPicker(true)
  }

  const colorIconRef = useRef();
  const labelsIconRef = useRef();

  const colorPicker = displayColorPicker ? (
    <Portal setState={() => setDisplayColorPicker(false)}>
      <ColorPicker
        parent={colorIconRef.current}
        id={id}
        ReRender={ReRenderBoard}
        Close={()=>setDisplayColorPicker(false)}
      />
    </Portal>
  ) : null;

  const labelsPicker = displayLabelsPicker ? (
    <Portal setState={() => setDisplayLabelsPicker(false)}>
      <LabelsPicker
        parent={labelsIconRef.current}
        id={id}
        ReRender={ReRenderBoard}
        labels={labels}
        Close={()=>setDisplayLabelsPicker(false)}
      />
    </Portal>
  ) : null;

  return redirect ? (
    <Redirect
      to={{
        pathname: "/User/EditNote/" + id,
        state: { type: type, isNew: false, data: data }
      }}
    />
  ) : (
    <Container
      color={color}
      onClick={EditHandler}
      onMouseEnter={() => setdisplayIcons(true)}
      onMouseLeave={() => setdisplayIcons(false)}
    >
      <Title>{title}</Title>
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
          ref={colorIconRef}
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
  );
};

export default withRouter(Card);
