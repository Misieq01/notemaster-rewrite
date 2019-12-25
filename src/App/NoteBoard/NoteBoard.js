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
  margin: 0 auto;
  text-align: center;
  position: relative;
`;

const NoteBoard = ({ searchValue, ...props }) => {
  const [notes, setNotes] = useState([]);
  const [reRender, setReRender] = useState(false);

  const MasonryOptions = {
    columnWidth: 264,
    transitionDuration: 0,
    fitWidth: true,
    gutter: 20
  };

  const ReRenderBoard = () => {
    setReRender(!reRender);
  };

  useEffect(() => {
    axios.Get("http://localhost:4000/GetAllNotes",res=>setNotes(res.data));
  }, [reRender]);

  const displayNotes = notes.map((e, i) => {
    searchValue = searchValue.toLowerCase();
    if(e.title.toLowerCase().includes(searchValue) || e.content.toLowerCase().includes(searchValue)){
      return <Card
        data={e}
        key={e._id}
        ReRenderBoard={ReRenderBoard}
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
