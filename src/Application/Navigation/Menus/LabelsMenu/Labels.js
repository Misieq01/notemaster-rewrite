import React, { useMemo, useState } from "react";
import {motion} from 'framer-motion'

import { useSelector, useDispatch } from "react-redux";
import { AddLabel } from "../../../Store/Actions/labelsActions";
import { GetAllLabels } from "../../../Store/Selectors/labelsSelectors";

import SearchIcon from "../../../../Assets/Icons/Labels/search.svg";
import AddIcon from "../../../../Assets/Icons/Labels/plus.svg";

import Label from "./Label";

const transition = {
  transition: {
    duration: 0.35,
    ease: "easeOut"
  }
};
const absoluteVariants = {
  initial: {
    x: 75,
    y: -60
  },
  open: {
    x: 0,
    y: 0,
    ...transition
  },
  close: {
    x: 85,
    y: -60,
    ...transition
  }
};
const containerVariants = {
  initial: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  open: {
    height: "auto",
    width: 200,
    borderRadius: 5,
    ...transition
  },
  close: {
    height: 50,
    width: 30,
    borderRadius: 25,
    ...transition
  }
};

const contentVariants = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1,
    transition: { duration: 0.3, delay: 0.4 }
  },
  close: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
};

const Labels = ({
  parent,
  Close,
}) => {
  const dispatch = useDispatch();
  const labels = useSelector(state => GetAllLabels(state));
  const [inputValue, setInputValue] = useState("");
  const [editSlot, setEditSlot] = useState("");

  const [top, left] = useMemo(() => {
    const rect = parent.getBoundingClientRect();
    let y;
    let x;

    y = rect.top + rect.height + 10 + window.scrollY;
    x = rect.left - 100 + 15;

    return [y, x];
  }, [parent]);

  const AddLabelHandler = () => {
    dispatch(AddLabel(inputValue));
    setInputValue("");
  };

  const DisplayedLabels = () => {
    return labels.map((e, i) => {
      if (e.name.toLowerCase().includes(inputValue.toLowerCase())) {
        return (
          <Label
            key={e._id}
            name={e.name}
            id={e._id}
            editSlot={editSlot}
            SetEditSlot={setEditSlot}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <motion.div
      className="labels-menu__absolute"
      style={{ top: top, left: left }}
      variants={absoluteVariants}
      initial="initial"
      animate="open"
      exit="close"
    >
      <motion.div
        className="labels-menu__container"
        onClick={() => setEditSlot("")}
        variants={containerVariants}
      >
        <motion.div variants={contentVariants}>
          <div className="labels-menu__input-wrapper">
            <input
              className="labels-menu__input-wrapper--input"
              placeholder="Type label"
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
            />
            {inputValue ? (
              <img
                className="labels-menu__input-wrapper--add-icon"
                alt="addIcon"
                src={AddIcon}
                cursor="pointer"
                size="18px"
                onClick={AddLabelHandler}
              />
            ) : (
              <img
                className="labels-menu__input-wrapper--search-icon"
                alt="searchIcon"
                src={SearchIcon}
              />
            )}
          </div>
          <div className="labels-menu__labels-wrapper">
            <DisplayedLabels />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Labels;
