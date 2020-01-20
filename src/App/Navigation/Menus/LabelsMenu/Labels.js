import React, { useMemo, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

import { useSelector, useDispatch } from "react-redux";
import { AddLabel } from "../../../Store/Actions/labelsActions";
import { GetAllLabels } from "../../../Store/Selectors/labelsSelectors";

import SearchIcon from "../../../../Icons/Labels/search.svg";
import AddIcon from "../../../../Icons/Labels/plus.svg";

import Label from "./Label";

const Absolute = styled.div`
  position: absolute;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
  margin: auto;
`;

const Container = styled.div`
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

const Labels = ({
  parent,
  whichAnimation,
  UnMountAnimation,
  UnMount,
  ...props
}) => {
  const dispatch = useDispatch();
  const labels = useSelector(state => GetAllLabels(state));
  const [inputValue, setInputValue] = useState("");
  const [editSlot, setEditSlot] = useState("");
  const [animate, setAnimation] = useState(false)
  const componentRef = useRef();
  const child1Ref = useRef();
  const child2Ref = useRef();
  
  useEffect(() => {
    if (animate) {
      if (whichAnimation) {
        gsap.from(componentRef.current, 0.3, { height: '50px',width: '50px',x: 85,y:-60,borderRadius: '25px'}).then(()=>{
          componentRef.current.style.height = 'auto'
          componentRef.current.style.transition ="all 0.2s ease-in-out";
        });
        gsap.from(child1Ref.current, 0.5, { opacity: 0, delay: 0.2 });
        gsap.from(child2Ref.current, 0.5, { opacity: 0, delay: 0.2 });
      } else if (!whichAnimation) {
        gsap.to(child1Ref.current, 0.1, { opacity: 0 });
        gsap.to(child2Ref.current, 0.1, { opacity: 0 });
        gsap
          .to(componentRef.current, 0.3, { height: '50px',width: '50px',x:85,y:-60,borderRadius: '25px',zIndex:0,padding:0})
          .then((UnMount));
      }
    } else if(!animate){setAnimation(true)};
  }, [whichAnimation, UnMount, animate]);

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

  const DisplayedLabels = () =>{
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
    })};

  return (
    <>
      {animate? (
        <Absolute top={top} left={left}>
          <Container onClick={() => setEditSlot("")} ref={componentRef}>
            <InputWrapper ref={child1Ref}>
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
            <LabelsWrapper ref={child2Ref}>
              <DisplayedLabels />
            </LabelsWrapper>
          </Container>
        </Absolute>
      ) : null}
    </>
  );
};

export default Labels;
