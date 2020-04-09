import React from "react";

import Background from "../../Components/Background";
import Editor from "../Editors/Editor";
import {withRouter,useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {postUpdatedNote} from '../Store/Actions/notesActions'

const AddNotePanel = props => {

  const dispatch = useDispatch()
  const {id} = useParams()

  const ClosePanel = () =>{
    dispatch(postUpdatedNote(id))
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
