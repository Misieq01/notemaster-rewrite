import React from "react";
import { motion } from "framer-motion";

import Navigation from "../Navigation/Navigation";
import NoteBoard from "../Board/Board";

const NotesPanel = () => {
  return (
    <motion.div
      className="notes-panel__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeIn" }}
    >
      <Navigation/>
      <NoteBoard/>
    </motion.div>
  );
};

export default NotesPanel;
