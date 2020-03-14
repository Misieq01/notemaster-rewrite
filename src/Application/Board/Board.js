import React from "react";
import Masonry from "react-masonry-component";
import SideMenu from "../Navigation/SideMenu/SideMenu";
import { useSelector } from "react-redux";
import { getAllNotes } from "../Store/Selectors/notesSelectors";
import { motion } from "framer-motion";
import Card from "./Notes/Card";

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

const NoteBoard = React.memo((props) => {
  const allNotes = useSelector(state => getAllNotes(state));
  const searchValue = useSelector(state => state.others.searchValue)
  const importantNotes = allNotes.filter(e => e.important === true);
  const nonImportantNotes = allNotes.filter(e => e.important === false);
  const sideMenuDisplay = useSelector(state => state.others.sideMenu);
  const filteredNotes = allNotes.filter(e => e.title.toLowerCase().includes(searchValue.toLowerCase()));

  const RenderNotes = notes => {
    return notes.map(e => {
      return <Card key={e._id} _id={e._id} />;
    });
  };

  const RenderedNotes = ({ notesArr, text, key,isSearched = false, ...props }) => {
    const notes = RenderNotes(notesArr);
    return notes.length > 0 ? (
      <div className="board__container">
        {importantNotes.length !== 0 && !isSearched? (
          <div className="board__container--separatingLine">
            <span className="board__container--lineText">{text}</span>
          </div>
        ) : null}
        <Masonry className="board__container--masonry" options={MasonryOptions}>
          {notes}
        </Masonry>
      </div>
    ) : null;
  };

  return (
    <motion.div className="board__wrapper" initial="initial" animate={sideMenuDisplay ? "open" : "close"}>
      <SideMenu />
      <motion.div className="board__side-menu-place-holder" variants={ContainerVariants} />
      {!searchValue ? (
        <div>
          <RenderedNotes notesArr={importantNotes} text="Star-Notes" />
          <RenderedNotes notesArr={nonImportantNotes} text="Regular-Notes" />
        </div>
      ) : (
        <RenderedNotes notesArr={filteredNotes} text="Regular-Notes" isSearched/>
      )}
    </motion.div>
  );
});

export default NoteBoard;
