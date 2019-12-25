import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import * as axios from "../../utils/axiosHandler";

import NoteEditor from "./NoteEditor";
import ListEditor from "./ListEditor";
import Portal from "../../Components/ReactPortal";
import ColorPicker from "../../Components/NoteCustomize/ColorPicker";

import DeleteIcon from "../../Icons/NoteOptions/delete.svg";
import CopyIcon from "../../Icons/NoteOptions/copy.svg";
import ColorIcon from "../../Icons/NoteOptions/color.svg";
import LabelIcon from "../../Icons/NoteOptions/label.svg";

const Container = styled.div`
  width: 600px;
  min-height: 60px;
  position: fixed;
  z-index: 1000;
  top: 100px;
  right: 0;
  left: 0;
  margin: auto;
  background: ${props => props.background};
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const Title = styled.input`
  width: 92%;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.75);
  line-height: 30px;
  padding: 4% 4% 2% 4%;
  text-decoration: none;
  background: none;
  position: relative;
  border-radius: 8px 8px 0px 0px;
  box-shadow: ${props => props.boxShadow || "none"};
  transition: all 0.2s ease-in-out;
  :focus {
    color: rgba(0, 0, 0, 1);
  }
`;

const OptionsWrapper = styled.div`
  height: 75px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

const OptionButton = styled.img`
  height: 20px;
  width: 20px;
  opacity: 0.7;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

const FinishButton = styled.button`
  height: 40%;
  width: 37%;
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  font-size: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  :hover {
    transform: scale(1.05);
  }
`;

const Editor = props => {
  const isNew = props.location.state.isNew;
  const PassedData = isNew
    ? {
        title: "",
        content: "",
        color: "rgb(255,223,186)",
        type: props.location.state.type
      }
    : props.location.state.data;

  const [data, setData] = useState(PassedData);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [titleShadow, setTitleShadow] = useState("none");

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const WhichEditor = type => {
    switch (type) {
      case "note":
        return (
          <NoteEditor
            GetInputData={GetInputData}
            content={data.content}
            background={data.color}
            TitleShadowHandler={TitleShadowHandler}
          />
        );
      case "list":
        return <ListEditor />;
      default:
        return null;
    }
  };

  const GetInputData = (event, fieldName) => {
    setData({ ...data, [fieldName]: event.target.value });
  };

  const BackToNotePanel = () =>{
    props.history.push("/User/NotesPanel");
  }

  const FinishHandler = () => {
    if (isNew) {
      axios.Post("http://localhost:4000/NewNote", data,BackToNotePanel);
    } else if (!isNew) {
      axios.Patch("http://localhost:4000/UpdateNote/" + data._id,data,BackToNotePanel);
    }
  };

  const DeleteNote = () => {
    axios.Delete("http://localhost:4000/DeleteNote/" + data._id,BackToNotePanel);
  };

  const CopyNote = () => {
    delete data._id;
    axios.Post("http://localhost:4000/NewNote",data,BackToNotePanel);
  };

  const ShowColorPicker = () => {
    setDisplayColorPicker(true);
  };
  const HideColorPicker = () => {
    setDisplayColorPicker(false);
  };
  const ChangeColor = color => {
    setData({ ...data, color: color });
  };

  const TitleShadowHandler = top => {
    if (top === 0) {
      setTitleShadow("none");
    } else if (top !== 0) {
      setTitleShadow("0 2px 3px rgba(0, 0, 0, 0.4)");
    }
  };

  const colorIconRef = useRef();
  const titleRef = useRef();

  const colorPicker = displayColorPicker ? (
    <Portal setState={HideColorPicker}>
      <ColorPicker
        parent={colorIconRef.current}
        Close={HideColorPicker}
        id={data.id}
        ApplyColor={ChangeColor}
      />
    </Portal>
  ) : null;

  const Editor = WhichEditor(props.location.state.type);

  return (
    <Container background={data.color}>
      <Title
        placeholder="Title"
        onChange={event => GetInputData(event, "title")}
        value={data.title}
        boxShadow={titleShadow}
        ref={titleRef}
      />
      {Editor}
      <OptionsWrapper>
        <OptionButton src={LabelIcon} title="Edit labels" />
        <OptionButton
          src={ColorIcon}
          title="Change color"
          ref={colorIconRef}
          onClick={ShowColorPicker}
        />
        {colorPicker}
        <FinishButton onClick={FinishHandler}>Finish</FinishButton>
        <OptionButton src={CopyIcon} title="Copy note" onClick={CopyNote} />
        <OptionButton
          src={DeleteIcon}
          title="Delete note"
          onClick={DeleteNote}
        />
      </OptionsWrapper>
    </Container>
  );
};

export default withRouter(Editor);
