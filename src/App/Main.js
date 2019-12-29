import React,{useState} from 'react'
import styled from 'styled-components'

import {withRouter,Route} from 'react-router-dom'
import GlobalState from '../Components/GlobalState'

import NotesPanel from './Routes/NotesPanel'
import UserPanel from './Routes/UserPanel'
import AddNotePanel from './Routes/AddNotePanel'

const Main = props =>{

const [render,ReRender] = useState(false)

const state = {
  render,
  ReRender: () => ReRender(!render)
}

return (
  <GlobalState.Provider value={state} >
    <Route path="/User/NotesPanel" component={NotesPanel} />
    <Route path="/User/NotesPanel/AddNote" exact component={AddNotePanel} />
    <Route path="/User/NotesPanel/EditNote/:id" exact component={AddNotePanel} />
    <Route path="/User/Account" exact component={UserPanel} />
  </GlobalState.Provider>
);
}

export default withRouter(Main)