import React, { useMemo } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import mongoose from 'mongoose'
import {useDispatch} from 'react-redux'
import {AddNote} from '../../Store/Actions/notesActions'

const Container = styled.div`
  width: 200px;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  z-index: 500;
  position: absolute;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
  text-align: center;
  background: rgb(250, 250, 250);
`;

const Element = styled.div`
  height: auto;
  width: calc(100% - 40px);
  padding: 10px 20px;
  cursor: pointer;
`;

const AddNotes = ({ parent, ...props }) => {
  const dispatch = useDispatch()
  const [top, left] = useMemo(() => {
    const rect = parent.getBoundingClientRect();
    let y;
    let x;

    y = rect.top + rect.height + 10;
    x = rect.left - 100 + rect.width / 2;

    return [y, x];
  }, [parent]);

  const AddNoteHandler = type =>{
    const id = mongoose.Types.ObjectId().toHexString()
    dispatch(AddNote(id,type)).then(()=>{
        props.Close();
        props.history.push("/User/NotesPanel/Edit/" + id);
    })
  }

  return (
    <Container top={top} left={left}>
      <Element onClick={() => AddNoteHandler("note")}>Note</Element>
      <Element onClick={() => AddNoteHandler("list")}>List</Element>
    </Container>
  );
};

export default withRouter(AddNotes);
