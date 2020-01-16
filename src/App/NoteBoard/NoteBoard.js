import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-component";

import { useSelector } from "react-redux";
import {getAllNotes} from '../Store/Selectors/notesSelectors'


import Card from "./Notes/Card";

const Container = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`;

const MasonryDisplay = styled(Masonry)`
  text-align: center;
  position: relative;
  display: inline-block;
`;

const NoteBoard = React.memo(({ searchValue, ...props }) => {
  const notes =  useSelector(state => getAllNotes(state));
  console.log('noteboard')

  const MasonryOptions = {
    columnWidth: 264,
    transitionDuration: 0,
    fitWidth: true,
    gutter: 20
  };

  const displayNotes = notes.map((e, i) => {
    searchValue = searchValue.toLowerCase();
    if (
      e.title.toLowerCase().includes(searchValue) ||
      e.content.toLowerCase().includes(searchValue)
    ) {
      return <Card _id={e._id} key={e._id} />;
    } else {
      return null;
    }
  });

  return (
    <Container>
      <MasonryDisplay options={MasonryOptions}>{displayNotes}</MasonryDisplay>
    </Container>
  );
});

export default NoteBoard;
