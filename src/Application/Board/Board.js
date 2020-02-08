import React from "react";
import styled from "styled-components";
import Masonry from "react-masonry-component";
import SideMenu from "../Navigation/SideMenu/SideMenu";
import { useSelector } from "react-redux";
import {
  getAllNotes
} from "../Store/Selectors/notesSelectors";
import {motion} from 'framer-motion'
import Card from "./Notes/Card";

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled(motion.div)`
  width: calc(100vw - 300px);
  height: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content:space-around;
  align-items:center;
`;

const MasonryDisplay = styled(Masonry)`
  margin: 60px 0;
  width: 580px;
  @media (min-width: 860px) {
    width: 792px;
  }
  @media (min-width: 1140px) {
    width: 792px;
  }
  @media (min-width: 1400px) {
    width: 1056px;
  }
  @media (min-width: 1700px) {
    width: 1400px;
  }
`;

const SeperatingLine = styled.div`
  width: inherit;
  height: auto;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const LineText = styled.span`
  margin-left: 20px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.35);
`;

const Test = styled(motion.div)`
  width: 10px;
  height: 100px;
`

const MasonryOptions = {
  columnWidth: 264,
  transitionDuration: 0,
  gutter: 20
};

const transition = {
  transition: { duration: 0.3, ease: "easeInOut" }
};

const ContainerVariants = {
  initial: { width: 0 },
  close: { width: 0, ...transition },
  open: { width: 300, ...transition }
};

const NoteBoard = React.memo(({ searchValue, ...props }) => {
  const allNotes = useSelector(state => getAllNotes(state));
  const importantNotes = allNotes.filter(e=> e.important === true)
  const nonImportantNotes = allNotes.filter(e => e.important === false);
  const sideMenuDisplay = useSelector(state => state.others.sideMenu);



  const RenderNotes = notes => {
    return notes.map(e => {
      return <Card key={e._id} _id={e._id} />;
    });
  };


  const RenderedNotes = ({ notesArr, text,key, ...props }) => {
    const notes = RenderNotes(notesArr);
    return notes.length > 0 ? (
        <Container
        >
          {importantNotes.length !== 0 ? (
            <SeperatingLine>
              <LineText>{text}</LineText>
            </SeperatingLine>
          ) : null}
          <MasonryDisplay options={MasonryOptions}>{notes}</MasonryDisplay>
        </Container>
    ) : null;
  };

  return (
    <Wrapper initial='initial' animate={sideMenuDisplay ? 'open' : 'close'}>
      <SideMenu />
      <Test variants={ContainerVariants}/>
      <div>
          <RenderedNotes notesArr={importantNotes} text="Star-Notes"/>
          <RenderedNotes notesArr={nonImportantNotes} text="Regular-Notes"/>
      </div>
    </Wrapper>
  );
});

export default NoteBoard;
