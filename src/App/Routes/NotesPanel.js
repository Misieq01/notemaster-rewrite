import React, { useState } from "react";
import styled from "styled-components";

import GlobalState from "../../Components/GlobalState";
import Navigation from "../Navigation/Navigation";
import NoteBoard from "../NoteBoard/NoteBoard";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: rgb(250, 250, 250);
`;

const NotesPanel = () => {
  const [searchValue, setSearchValue] = useState("");
  const GetSearchValue = event => {
    setSearchValue(event.target.value);
  };

  return (
    <Container>
      <GlobalState.Consumer>
        {value => (
          <>
            <Navigation GetSearchValue={GetSearchValue} />
            <NoteBoard searchValue={searchValue} state={value} />
          </>
        )}
      </GlobalState.Consumer>
    </Container>
  );
};

export default NotesPanel;
