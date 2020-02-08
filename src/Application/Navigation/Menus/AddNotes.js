import React, { useMemo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import mongoose from "mongoose";
import { useDispatch } from "react-redux";
import { AddNote } from "../../Store/Actions/notesActions";
import {motion} from 'framer-motion'

const Container = styled(motion.div)`
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

const transition = {
  transition: {
    duration: 0.35,
    ease: "easeOut"
  }
};

const containerVariants = {
  initial: {
    height: 50,
    width: 50,
    borderRadius: 25,
    x: 75,
    y: -60
  },
  open: {
    height: "auto",
    width: 200,
    borderRadius: 5,
    x: 0,
    y: 0,
    ...transition
  },
  close: {
    height: 50,
    width: 50,
    borderRadius: 25,
    x: 75,
    y: -60,
    ...transition
  }
};

const elementVariants = {
  initial: {
    opacity: 0
  },
  open: {
    opacity:1, transition: {duration: 0.3,delay: 0.4}
  },
  close: {
    opacity:0, transition: {duration: 0.1}
  }
}

const AddNotes = ({
  parent,
  Close,
}) => {
  const dispatch = useDispatch();
  const history = useHistory()

  const [top, left] = useMemo(() => {
    const rect = parent.getBoundingClientRect();
    let y;
    let x;

    y = rect.top + rect.height + 10 + window.scrollY;
    x = rect.left - 100 + rect.width / 2;

    return [y, x];
  }, [parent]);

  const AddNoteHandler = type => {
    const id = mongoose.Types.ObjectId().toHexString();
    dispatch(AddNote(id, type)).then(() => {
      Close();
      history.push("/User/NotesPanel/Edit/" + id);
    });
  };
  return <Container top={top} left={left} variants={containerVariants} initial='initial' animate='open' exit='close'>
          <motion.div variants={elementVariants}>
            <Element onClick={() => AddNoteHandler("note")}>Note</Element>
            <Element onClick={() => AddNoteHandler("list")}>
              List
            </Element>
          </motion.div>
        </Container>
};

export default AddNotes;
