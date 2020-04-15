import React, { useMemo } from "react";
import Masonry from "react-masonry-component";
import SideMenu from "../Navigation/SideMenu/SideMenu";
import { useSelector } from "react-redux";
import { getAllNotes } from "../Store/Selectors/notesSelectors";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Card from "./Notes/Card";

const MasonryOptions = {
  columnWidth: 264,
  transitionDuration: 0,
  gutter: 15,
};

const transition = {
  transition: { duration: 0.3, ease: "easeInOut" },
};

const PlaceHolderVariants = {
  initial: { width: 80 },
  close: { width: 80, ...transition },
  open: { width: 280, ...transition },
};
const ContainerVariants = {
  initial: { width: "calc(100% - 80px)" },
  close: { width: "calc(100% - 80px)", ...transition },
  open: { width: "calc(100% - 280px)", ...transition },
};

const NoteBoard = React.memo((props) => {
  const notesPanelType = useParams().type;
  const allNotes = useSelector((state) => getAllNotes(state));
  const searchValue = useSelector((state) => state.others.searchValue);
  const sideMenuDisplay = useSelector((state) => state.others.sideMenu);
  const importantNotes = allNotes.filter((e) => e.important === true);
  const nonImportantNotes = allNotes.filter((e) => e.important === false);
  const searchedNotes = allNotes.filter((e) => e.title.toLowerCase().includes(searchValue.toLowerCase()));
  const notesFilteredByLabels = allNotes.filter((e) => e.labels.map((el) => el.name).includes(notesPanelType));

  const masonryWidth = useMemo(() => {
    const sideMenuSize = sideMenuDisplay ? 280 : 80;
    const availableSpace = window.innerWidth - sideMenuSize;
    const howManyFit = Math.floor(availableSpace / 264);
    switch (howManyFit) {
      case 1:
        return "264px";
      case 2:
        if (availableSpace % 264 < 15) {
          return "264px";
        } else {
          return "543px";
        }
      case 3:
        if (availableSpace % 264 < 30) {
          return "543px";
        } else {
          return "822px";
        }
      case 4:
        if (availableSpace % 264 < 45) {
          console.log("fired");
          return "822px";
        } else {
          return "1101px";
        }
      case 5:
        if (availableSpace % 264 < 60) {
          return "1101px";
        } else {
          return "1380px";
        }
      case 6:
        if (availableSpace % 264 < 75) {
          return "1380px";
        } else {
          return "1659px";
        }
      default:
        return "100%";
    }
  }, [sideMenuDisplay]);

  const RenderNotes = (notes) => {
    return notes.map((e) => {
      return <Card key={e._id} _id={e._id} />;
    });
  };

  const RenderedNotes = ({ notesArr, text, key, isSearched = false, ...props }) => {
    const notes = RenderNotes(notesArr);
    return notes.length > 0 ? (
      <div className="board__container" style={{ width: masonryWidth }}>
        {importantNotes.length !== 0 && !isSearched ? <span className="board__container--lineText">{text}</span> : null}
        <Masonry className="board__container--masonry" options={MasonryOptions} style={{ width: masonryWidth }}>
          {notes}
        </Masonry>
      </div>
    ) : null;
  };

  return (
    <motion.div className="board__wrapper" initial="initial" animate={sideMenuDisplay ? "open" : "close"}>
      <SideMenu />
      <motion.div className="board__side-menu-place-holder" variants={PlaceHolderVariants} />
      <motion.div variants={ContainerVariants} className="board__notes-wrapper">
        {!searchValue ? (
          <>
            <RenderedNotes notesArr={importantNotes} text="Pinned" />
            <RenderedNotes notesArr={nonImportantNotes} text="Others" />
          </>
        ) : (
          <RenderedNotes notesArr={searchedNotes} text="Regular-Notes" isSearched />
        )}
      </motion.div>
    </motion.div>
  );
});

export default NoteBoard;
