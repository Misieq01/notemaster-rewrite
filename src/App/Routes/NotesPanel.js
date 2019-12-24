import React,{useState} from "react";
import styled from "styled-components";

import Navigation from '../Navigation/Navigation'
import NoteBoard from '../NoteBoard/NoteBoard'

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: rgb(250,250,250);
`;

const NotesPanel = () => {
    const [searchValue, setSearchValue] = useState("");

      const GetSearchValue = event => {
        setSearchValue(event.target.value);
      };
  return <Container>
      <Navigation GetSearchValue={GetSearchValue}/>
      <NoteBoard searchValue={searchValue}/>
  </Container>;
};

export default NotesPanel;
