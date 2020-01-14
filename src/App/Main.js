import React,{useEffect} from "react";

import { Route } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {fetchAllNotes} from './Store/Actions/notesActions'
import {FetchLabels} from './Store/Actions/labelsActions'

import NotesPanel from "./Routes/NotesPanel";
import UserPanel from "./Routes/UserPanel";
import NoteEditor from "./NoteEditors/Editor";

const Main = props => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchAllNotes())
    dispatch(FetchLabels())
  },[dispatch])

  return (
    <>
      <Route path="/User/NotesPanel" component={NotesPanel} />
      <Route path="/User/NotesPanel/Edit/:id" exact component={NoteEditor} />
      <Route path="/User/Account" exact component={UserPanel} />
    </>
  );
};

export default Main;
