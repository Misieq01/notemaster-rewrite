import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import { AddLabel } from "../../../Store/Actions/labelsActions";
import { GetAllLabels } from "../../../Store/Selectors/labelsSelectors";

import SearchIcon from "../../../../Assets/Icons/search.svg";
import AddIcon from "../../../../Assets/Icons/plus.svg";

import Label from "./Label";

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

const Labels = ({ parent, Close }) => {
  const dispatch = useDispatch();
  const labels = useSelector((state) => GetAllLabels(state));
  const [inputValue, setInputValue] = useState("");
  const [editSlot, setEditSlot] = useState("");
  const [placeholder,setPlaceholder] = useState('Type label')

  const [top, left] = useMemo(() => {
    const rect = parent.getBoundingClientRect();
    let y;
    let x;

    y = rect.top + rect.height + 10 + window.scrollY;
    x = rect.left - 100 + 15;

    return [y, x];
  }, [parent]);

  const AddLabelHandler = () => {
    if(labels.find(e=>e.name.toLowerCase() === inputValue.toLowerCase())){
      setPlaceholder('Label already exist')
      setTimeout(()=>{
        setPlaceholder('Type label')
      },2000)
    }else{
      dispatch(AddLabel(inputValue));
    }
    setInputValue("");
  };

  const DisplayedLabels = () => {
    return labels.map((e, i) => {
      if (e.name.toLowerCase().includes(inputValue.toLowerCase())) {
        return <Label key={e._id} name={e.name} id={e._id} editSlot={editSlot} SetEditSlot={setEditSlot} />;
      } else {
        return null;
      }
    });
  };

  return (
    <div className="labels-menu__absolute" style={{ top: top, left: left }}>
      <motion.div
        className="labels-menu__container"
        onClick={() => setEditSlot("")}
        variants={containerVariants}
        initial="initial"
        animate="open"
        exit="close"
      >
        <div>
          <div className="labels-menu__input-wrapper">
            <input
              className="labels-menu__input-wrapper--input"
              placeholder={placeholder}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
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
              <img className="labels-menu__input-wrapper--search-icon" alt="searchIcon" src={SearchIcon} />
            )}
          </div>
          <div className="labels-menu__labels-wrapper">
            <DisplayedLabels />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Labels;
