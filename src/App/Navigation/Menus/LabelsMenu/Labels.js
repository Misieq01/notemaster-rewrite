import React, { useMemo, useState } from "react";
import styled from "styled-components";
import {motion} from 'framer-motion'

import { useSelector, useDispatch } from "react-redux";
import { AddLabel } from "../../../Store/Actions/labelsActions";
import { GetAllLabels } from "../../../Store/Selectors/labelsSelectors";

import SearchIcon from "../../../../Icons/Labels/search.svg";
import AddIcon from "../../../../Icons/Labels/plus.svg";

import Label from "./Label";

const Absolute = styled(motion.div)`
  position: absolute;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
  margin: auto;
`;

const Container = styled(motion.div)`
  height: auto;
  width: 200px;
  padding: 0 10px;
  background: rgb(250, 250, 250);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
`;

const LabelsWrapper = styled.div`
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
    cursor: default;
  }
  ::-webkit-scrollbar-track {
    background: #eeeeee;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
`;

const InputWrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  font-size: 16px;
  padding: 10px 0;
`;

const Icon = styled.img`
  height: ${props => props.size || "15px"};
  width: ${props => props.size || "15px"};
  opacity: 0.6;
  cursor: ${props => props.cursor || "default"};
`;

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

  return <Absolute top={top} left={left} variants={absoluteVariants} initial='initial' animate='open' exit='close'>
          <Container onClick={() => setEditSlot("")} variants={containerVariants}>
           <motion.div variants={contentVariants}>
              <InputWrapper>
                <Input
                  placeholder="Type label"
                  value={inputValue}
                  onChange={event => setInputValue(event.target.value)}
                />
                {inputValue ? (
                  <Icon
                    src={AddIcon}
                    cursor="pointer"
                    size="18px"
                    onClick={AddLabelHandler}
                  />
                ) : (
                  <Icon src={SearchIcon} />
                )}
              </InputWrapper>
              <LabelsWrapper>
                <DisplayedLabels />
              </LabelsWrapper>
           </motion.div>
          </Container>
        </Absolute>
};

export default Labels;
