import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as axios from "../../utils/axiosHandler";
import { withRouter } from "react-router-dom";
import Masonry from 'react-masonry-component'

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

const NoteBoard = ({ searchValue,state, ...props }) => {
  const [notes, setNotes] = useState([]);

  const MasonryOptions = {
    columnWidth: 264,
    transitionDuration: 0,
    fitWidth: true,
    gutter: 20
  };

  useEffect(() => {
    axios.Get("http://localhost:4000/GetAllNotes", res => setNotes(res.data));
  }, [state.render]);

  const displayNotes = notes.map((e, i) => {
    searchValue = searchValue.toLowerCase();
    if(e.title.toLowerCase().includes(searchValue) || e.content.toLowerCase().includes(searchValue)){
      return <Card
        data={e}
        key={e._id}
        ReRender={state.ReRender}
      />
    }else{
      return null
    }
  });

  return (
    <Container>
      <MasonryDisplay options={MasonryOptions}>{displayNotes}</MasonryDisplay>
    </Container>
  );
};

export default withRouter(NoteBoard);
