import React, { useState } from "react";
import styled,{keyframes} from "styled-components";
import {fadeIn} from 'react-animations'

import Navigation from "../Navigation/Navigation";
import NoteBoard from "../NoteBoard/NoteBoard";

const fadeInAnimation = keyframes`${fadeIn}`;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: rgb(250, 250, 250);
  text-align:center;
  animation: 1s ${fadeInAnimation};
`;

const NotesPanel = () => {
  const [searchValue, setSearchValue] = useState("");
  const GetSearchValue = event => {
    setSearchValue(event.target.value);
  };
  return (
    <Container>
            <Navigation GetSearchValue={GetSearchValue} />
            <NoteBoard searchValue={searchValue}/>
    </Container>
  );
};

export default NotesPanel;
