import React from "react";

import Background from "../../Components/Background";
import Editor from "../NoteEditors/Creator";
import {withRouter} from 'react-router-dom'

const AddNotePanel = props => {

  const ClosePanel = () =>{
    props.history.push("/User/NotesPanel");
  }

  return (
        <>
          <Background onClick={ClosePanel} />
          <Editor/>
        </>
  );
};

export default withRouter(AddNotePanel);
