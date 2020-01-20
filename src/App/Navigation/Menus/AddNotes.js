import React, { useMemo, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import mongoose from "mongoose";
import { useDispatch } from "react-redux";
import { AddNote } from "../../Store/Actions/notesActions";
import { gsap } from "gsap";

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

const AddNotes = ({
  parent,
  whichAnimation,
  UnMountAnimation,
  UnMount,
  ...props
}) => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const child1Ref = useRef();
  const child2Ref = useRef();

  const [animate, setAnimation] = useState(false);

  useEffect(() => {
    if (animate) {
      if (whichAnimation) {
        gsap.from(componentRef.current, 0.3, { height: '50px',width: '50px',x: 75,y:-60,borderRadius: '25px'});
        gsap.from(child1Ref.current, 0.5, { opacity: 0, delay: 0.2 });
        gsap.from(child2Ref.current, 0.5, { opacity: 0, delay: 0.2 });
      } else if (!whichAnimation) {
        gsap.to(child1Ref.current, 0.1, { opacity: 0 });
        gsap.to(child2Ref.current, 0.1, { opacity: 0 });
        gsap
          .to(componentRef.current, 0.3, { height: '50px',width: '50px',x: 75,y:-60,borderRadius: '25px',zIndex:0})
          .then(UnMount);
      }
    } else if(!animate){setAnimation(true)};
  }, [whichAnimation, UnMount, animate]);

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
      UnMount();
      props.history.push("/User/NotesPanel/Edit/" + id);
    });
  };
  return (
    <>
      {animate ? (
        <Container top={top} left={left} ref={componentRef}>
          <Element onClick={() => AddNoteHandler("note")} ref={child1Ref}>
            Note
          </Element>
          <Element onClick={() => AddNoteHandler("list")} ref={child2Ref}>
            List
          </Element>
        </Container>
      ) : null}
      }
    </>
  );
};

export default withRouter(AddNotes);
