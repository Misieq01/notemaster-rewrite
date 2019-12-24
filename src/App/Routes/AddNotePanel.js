import React from "react";
import styled from "styled-components";

import Background from "../../Components/Background";
import Editor from "../NoteAddPanel/Editor";
import NotesPanel from "./NotesPanel";
import {withRouter} from 'react-router-dom'

import Portal from "../../Components/ReactPortal";

const AddNotePanel = props => {

  const ClosePanel = () =>{
    props.history.push("/User/NotesPanel");
  }

  return (
    <>
      <Portal>
        <NotesPanel />
      </Portal>
      <Background onClick={ClosePanel}/>
      <Editor />
    </>
  );
};

export default withRouter(AddNotePanel);
