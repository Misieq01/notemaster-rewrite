import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-component";
import SideMenu from "../SideMenu/SideMenu";
import { useSelector } from "react-redux";
import {
  getAllNotes,
  getImportantNotes,
  getNonImportantNotes
} from "../Store/Selectors/notesSelectors";

import Card from "./Notes/Card";

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
`;
const Container = styled.div`
  width: calc(100vw - 300px);
  height: auto;
`;

const MasonryDisplay = styled(Masonry)`
  margin: 60px 0;
  text-align: center;
  position: relative;
  display: inline-block;
`;

const SeperatingLine = styled.div`
  width: calc(100vw - 300px);
  height: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const LineText = styled.span`
  margin-left: 20px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.35);
`;

const MasonryOptions = {
  columnWidth: 264,
  transitionDuration: 0,
  fitWidth: true,
  gutter: 20
};

const NoteBoard = React.memo(({ searchValue, ...props }) => {
  const allNotes = useSelector(state => getAllNotes(state));
  const importantNotes = allNotes.filter(e=> e.important === true)
  const nonImportantNotes = allNotes.filter(e => e.important === false);
  const sideMenuDisplay = useSelector(state => state.others.sideMenu);
  console.log('dd')

  const RenderNotes = notes => {
    return notes.map(e => {
      return <Card key={e._id} _id={e._id} />;
    });
  };


  const RenderedNotes = ({ notesArr, text, ...props }) => {
    const notes = RenderNotes(notesArr);
    return notes.length > 0 ? (
      <>
{importantNotes.length !== 0 ? <SeperatingLine>
          <LineText>{text}</LineText>
        </SeperatingLine>: null}
        <Container>
          <MasonryDisplay options={MasonryOptions}>{notes}</MasonryDisplay>
        </Container>
      </>
    ) : null;
  };

  return (
    <Wrapper>
      {sideMenuDisplay ? <SideMenu /> : false}
      <div>
        <RenderedNotes notesArr={importantNotes} text="Star-Notes" />
        <RenderedNotes notesArr={nonImportantNotes} text="Regular-Notes" />
      </div>
    </Wrapper>
  );
});

export default NoteBoard;
