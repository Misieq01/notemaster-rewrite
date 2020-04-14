import React, { useMemo } from "react";
import { useHistory,useLocation } from "react-router-dom";
import mongoose from "mongoose";
import { useDispatch } from "react-redux";
import { AddNote } from "../../Store/Actions/notesActions";
import {motion} from 'framer-motion'

const transition = {
  transition: {
    duration: 0.35,
    ease: "easeOut"
  }
};

const containerVariants = {
  initial: {
    height: 50,
    width: 50,
    borderRadius: 25,
    x: 75,
    y: -60
  },
  open: {
    height: "auto",
    width: 200,
    borderRadius: 5,
    x: 0,
    y: 0,
    ...transition
  },
  close: {
    height: 50,
    width: 50,
    borderRadius: 25,
    x: 75,
    y: -60,
    ...transition
  }
};

const elementVariants = {
  initial: {
    opacity: 0
  },
  open: {
    opacity:1, transition: {duration: 0.3,delay: 0.4}
  },
  close: {
    opacity:0, transition: {duration: 0.1}
  }
}

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
          <motion.div variants={elementVariants}>
            <div className='addNotes__container--element' onClick={() => AddNoteHandler("note")}>Note</div>
            <div className='addNotes__container--element' onClick={() => AddNoteHandler("list")}>
              List
            </div>
          </motion.div>
        </motion.div>
};

export default AddNotes;
