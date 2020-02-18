import React, { useState } from "react";
import { motion } from "framer-motion";

import Navigation from "../Navigation/Navigation";
import NoteBoard from "../Board/Board";

const NotesPanel = () => {
  const [searchValue, setSearchValue] = useState("");
  const GetSearchValue = event => {
    setSearchValue(event.target.value);
  };
  return (
    <motion.div
      className="notesPanel__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeIn" }}
    >
      <Navigation GetSearchValue={GetSearchValue} />
      <NoteBoard searchValue={searchValue} />
    </motion.div>
  );
};

export default NotesPanel;
