import React from 'react'
import styled from 'styled-components'

import {withRouter,Route} from 'react-router-dom'

import NotesPanel from './Routes/NotesPanel'
import UserPanel from './Routes/UserPanel'
import AddNotePanel from './Routes/AddNotePanel'

const Main = props =>{

return (
  <>
    <Route path="/User/NotesPanel" component={NotesPanel} />
    <Route path="/User/AddNote" exact component={AddNotePanel} />
    <Route path="/User/EditNote/:id" exact component={AddNotePanel} />
    <Route path="/User/Account" exact component={UserPanel} />
  </>
);
}

export default withRouter(Main)