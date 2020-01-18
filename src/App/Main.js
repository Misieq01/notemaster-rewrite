import React,{useEffect} from "react";

import { Route,Switch } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {fetchAllNotes} from './Store/Actions/notesActions'
import {FetchLabels} from './Store/Actions/labelsActions'

import NotesPanel from "./Routes/NotesPanel";
import UserPanel from "./Routes/UserPanel";
import NoteEditor from "./NoteEditors/Editor";
import LoadingScreen from '../Components/LoadingScreen'

const Main = props => {

  const dispatch = useDispatch()
  const notesLoading = useSelector(state => state.notes.loading)
  const labelsLoading = useSelector(state => state.labels.loading)
  const isLoading = notesLoading || labelsLoading ? true : false
  console.log(notesLoading)
  useEffect(()=>{
    dispatch(fetchAllNotes())
    dispatch(FetchLabels())
  },[dispatch])

  const Loading = () => {
    return isLoading ? <LoadingScreen/> : null
  }

  return (
    <>
      <Loading/>
      <Switch>
        {isLoading ? null : <Route path="/User/NotesPanel" exact component={NotesPanel} />}
        <Route path="/User/NotesPanel/Edit/:id" exact component={NotesPanel} />
      </Switch>
      <Route path="/User/NotesPanel/Edit/:id" exact component={NoteEditor} />
      <Route path="/User/Account" exact component={UserPanel} />
    </>
  );
};

export default Main;
