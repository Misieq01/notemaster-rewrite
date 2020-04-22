import React, { useMemo } from "react";
import { useHistory,useLocation } from "react-router-dom";
import mongoose from "mongoose";
import { useDispatch } from "react-redux";
import { AddNote } from "../../Store/Actions/notesActions";
import {motion} from 'framer-motion'


const containerVariants = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  close: {
    opacity: 0,
    transition: { duration: 0.1, ease: "easeOut" },
  },
};


const AddNotes = ({
  parent,
  Close,
}) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const location = useLocation().pathname

  const [top, left] = useMemo(() => {
    const rect = parent.getBoundingClientRect();
    let y;
    let x;

    y = rect.top + rect.height + 10 + window.scrollY;
    x = rect.left - 100 + rect.width / 2;

    return [y, x];
  }, [parent]);

  const AddNoteHandler = type => {
    const id = mongoose.Types.ObjectId().toHexString();
    dispatch(AddNote(id, type)).then(() => {
      Close();
      history.push(location + '/Edit/' + id);
    });
  };
  return <motion.div className='addNotes__container' style={{top: top,left:left}} variants={containerVariants} initial='initial' animate='open' exit='close'>
          <div>
            <div className='addNotes__container--element' onClick={() => AddNoteHandler("note")}>Note</div>
            <div className='addNotes__container--element' onClick={() => AddNoteHandler("list")}>
              List
            </div>
          </div>
        </motion.div>
};

export default AddNotes;
