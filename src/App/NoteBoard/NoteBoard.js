import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-component";
import SideMenu from '../SideMenu/SideMenu'
import { useSelector } from "react-redux";
import {getAllNotes} from '../Store/Selectors/notesSelectors'


import Card from "./Notes/Card";

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  display:flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items:flex-start;
`
const Container = styled.div`
  width: calc(100vw - 300px);
  height: auto;
  
`

const MasonryDisplay = styled(Masonry)`
  margin-top: 40px;
  text-align: center;
  position: relative;
  display: inline-block;
`;

const NoteBoard = React.memo(({ searchValue, ...props }) => {
  const notes =  useSelector(state => getAllNotes(state));
  const sideMenuDisplay = useSelector(state => state.others.sideMenu);
  console.log('noteboard')

  const MasonryOptions = {
    columnWidth: 264,
    transitionDuration: 0,
    fitWidth: true,
    gutter: 20,
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
<Wrapper>
      {sideMenuDisplay ? <SideMenu/> : false}
        <Container><MasonryDisplay options={MasonryOptions}>{displayNotes}</MasonryDisplay></Container>
</Wrapper>
  );
});

export default NoteBoard;
