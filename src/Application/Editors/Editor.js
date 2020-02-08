import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { withRouter, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getNoteById } from "../Store/Selectors/notesSelectors";
import {
  ChangeNoteFieldValue,
  CopyNote,
  DeleteNote,
  PostUpdatedNote
} from "../Store/Actions/notesActions";

// import Background from "../../Components/Background";
import Body from "./BodyType";
import Portal from "../Components/ReactPortal";
import ColorPicker from "../Components/Pickers/Colors";
import LabelsPicker from "../Components/Pickers/Labels";

import DeleteIcon from "../../Assets/Icons/NoteOptions/delete.svg";
import CopyIcon from "../../Assets/Icons/NoteOptions/copy.svg";
import ColorIcon from "../../Assets/Icons/NoteOptions/color.svg";
import LabelIcon from "../../Assets/Icons/NoteOptions/label.svg";

const Container = styled.div`
  width: 600px;
  min-height: 60px;
  position: fixed;
  z-index: 150;
  top: 100px;
  right: 0;
  left: 0;
  margin: auto;
  background: ${props => props.background};
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.2s ease-in-out;
`;

const Title = styled.input`
  width: 92%;
  font-size: 24px;
  opacity: 0.75;
  line-height: 30px;
  font-weight: bold;
  padding: 4% 4% 2% 4%;
  text-decoration: none;
  background: none;
  position: relative;
  border-radius: 8px 8px 0px 0px;
  box-shadow: ${props => props.boxShadow || "none"};
  transition: all 0.2s ease-in-out;
  z-index: 100;
  :focus {
    opacity: 1;
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
  height: 17px;
  width: 17px;
  opacity: 0.6;
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
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  background: rgba(0, 0, 0, 0);
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.75);
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const Label = styled.div`
  font-size: 15px;
  padding: 3px;
  margin: 2px;
  border-radius: 5px;
  display: inline-block;
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  cursor: default;
`;
const LabelsWrapper = styled.div`
  height: 20px;
  width: 100%;
`;

const Editor = props => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector(state => getNoteById(state, id));
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayLabelsPicker, setDisplayLabelsPicker] = useState(false);
  const [titleShadow, setTitleShadow] = useState("none");
  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, [dispatch]);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  const BackToNotePanel = () => {
    props.history.push("/User/NotesPanel");
  };

  const GetInputData = (event, fieldName) => {
    dispatch(ChangeNoteFieldValue(data._id, fieldName, event.target.value));
  };

  const FinishHandler = () => {
    dispatch(PostUpdatedNote(data._id));
    BackToNotePanel();
  };
  const DeleteNoteHandler = () => {
    dispatch(DeleteNote(data._id));
    BackToNotePanel();
  };

  const CopyNoteHandler = () => {
    dispatch(CopyNote(data._id));
    BackToNotePanel();
  };

  const ShowColorPicker = () => {
    setDisplayColorPicker(true);
  };
  const HideColorPicker = () => {
    setDisplayColorPicker(false);
  };
  const ShowLabelsPicker = () => {
    setDisplayLabelsPicker(true);
  };
  const HideLabelsPicker = () => {
    setDisplayLabelsPicker(false);
  };

  const TitleShadowHandler = top => {
    if (top === 0) {
      setTitleShadow("none");
    } else if (top !== 0) {
      setTitleShadow("0 2px 4px rgba(0, 0, 0, 0.2)");
    }
  };

  const colorIconRef = useRef();
  const labelsIconRef = useRef();

  const ColorPickerPopout = () => {
    return displayColorPicker ? (
      <Portal setState={HideColorPicker} eventType="move">
        <ColorPicker
          parent={colorIconRef.current}
          id={data._id}
          Close={HideColorPicker}
          componentType="editor"
        />
      </Portal>
    ) : null;
  };
  const LabelsPickerPopout = () => {
    return displayLabelsPicker ? (
      <Portal setState={HideLabelsPicker} eventType="move">
        <LabelsPicker
          parent={labelsIconRef.current}
          id={data._id}
          Close={HideLabelsPicker}
          componentType="editor"
        />
      </Portal>
    ) : null;
  };

  const Labels = () => {
    return <LabelsWrapper>
      {data.labels.map(e => <Label>{e.name}</Label>)}
    </LabelsWrapper>
  }

  return (
    <>
      {data !== undefined ? (
          <Container background={data.color}>
            <Title
              placeholder="Title"
              onChange={event => GetInputData(event, "title")}
              value={data.title}
              boxShadow={titleShadow}
            />
            <Body
              type={data.type}
              GetInputData={GetInputData}
              content={data.content}
              background={data.color}
              TitleShadowHandler={TitleShadowHandler}
            />
            <Labels/>
            <OptionsWrapper>
              <OptionButton
                src={LabelIcon}
                title="Edit labels"
                ref={labelsIconRef}
                onClick={ShowLabelsPicker}
              />
              <LabelsPickerPopout/>
              <OptionButton
                src={ColorIcon}
                title="Change color"
                ref={colorIconRef}
                onClick={ShowColorPicker}
              />
              <ColorPickerPopout />

              <OptionButton
                src={CopyIcon}
                title="Copy note"
                onClick={CopyNoteHandler}
              />
              <OptionButton
                src={DeleteIcon}
                title="Delete note"
                onClick={DeleteNoteHandler}
              />
              <FinishButton onClick={FinishHandler}>Finish</FinishButton>
            </OptionsWrapper>
          </Container>
      ) : null}
    </>
  );
};

export default withRouter(Editor);
