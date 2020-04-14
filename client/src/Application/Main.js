import React,{useEffect} from "react";

import { Switch } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {fetchAllNotes} from './Store/Actions/notesActions'
import {FetchLabels} from './Store/Actions/labelsActions'

import NotesPanel from "./Panels/Notes";
import UserPanel from "./Panels/Account";
import NoteEditor from "./Editors/Editor";
import LoadingScreen from './Components/LoadingScreen'
import CustomRoute from '../Components/CustomRoute'

const Main = props => {

  const dispatch = useDispatch()
  const notesLoading = useSelector(state => state.notes.loading)
  // const labelsLoading = useSelector(state => state.labels.loading)
  const isLoading = notesLoading 
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
        {isLoading ? null : <CustomRoute path="/User/NotesPanel/:type" redirectPath="/Login" isPrivate={true} exact component={NotesPanel} />}
        <CustomRoute path="/User/NotesPanel/:type/Edit/:id" redirectPath="/Login" isPrivate={true} exact component={NotesPanel} />
      </Switch>
      <CustomRoute path="/User/NotesPanel/:type/Edit/:id" redirectPath="/Login" isPrivate={true} exact component={NoteEditor} />
      <CustomRoute path="/User/Account" redirectPath="/Login" isPrivate={true} exact component={UserPanel} />
    </>
  );
};

export default Main;
