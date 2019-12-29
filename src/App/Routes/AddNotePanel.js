import React from "react";

import GlobalState from '../../Components/GlobalState'
import Background from "../../Components/Background";
import Editor from "../NoteAddPanel/Editor";
import {withRouter} from 'react-router-dom'

const AddNotePanel = props => {

  const ClosePanel = () =>{
    props.history.push("/User/NotesPanel");
  }

  return (
    <GlobalState.Consumer>
      {value => (
        <>
          <Background onClick={ClosePanel} />
          <Editor state={value}/>
        </>
      )}
    </GlobalState.Consumer>
  );
};

export default withRouter(AddNotePanel);
