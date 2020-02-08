import React, { useMemo, useState } from "react";
import styled from "styled-components";

import {useSelector,useDispatch} from 'react-redux'
import {GetAllLabels} from '../../Store/Selectors/labelsSelectors'
import {getNoteById} from '../../Store/Selectors/notesSelectors'
import {AddLabelToNote,DeleteLabelFromNote} from '../../Store/Actions/notesStuffActions'

import CheckedBodIcon from "../../../Assets/Icons/Labels/square-check.svg";
import UnCheckedBodIcon from "../../../Assets/Icons/Labels/square-uncheck.svg";
import SearchIcon from "../../../Assets/Icons/Labels/search.svg";

const Absolute = styled.div`
  position: absolute;
  margin: auto;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
  z-index: 200;
`;

const Container = styled.div`
  height: auto;
  width: 150px;
  padding: 0 10px;
  background: rgb(250, 250, 250);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 2px 4px rgba(0, 0, 0, 0.24);
  border-radius: 8px;

`;

const LabelsBox = styled.div`
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

const LabelWrapper = styled.div`
  height: 30px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 5px;
  z-index: 100;
`;

const Label = styled.p`
  width: 80%;
  font-size: 14px;
  padding: 10px 0;
`;

const InputWrapper = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  font-size: 14px;
  padding: 10px 0;
`;

const Icon = styled.img`
  height: ${props => props.size || "15px"};
  width: ${props => props.size || "15px"};
  opacity: 0.6;
  cursor: ${props => props.cursor || "default"};
`;

const LabelsPicker = ({ parent, id,componentType, ...props }) => {
  const dispatch = useDispatch()
  const labels = useSelector(state=>GetAllLabels(state))
  const noteLabels = useSelector(state=>getNoteById(state,id).labels)
 
  const [searchValue, setSearchValue] = useState('')

  const AddLabelToNoteHandler = label => {
    dispatch(AddLabelToNote(id,label))
  };

  const DeleteLabelFromNoteHandler = label => {
    dispatch(DeleteLabelFromNote(id,label._id))
  };

  const displayedLabels = labels.map((e, i) => {
    const isAdded = noteLabels.map(el=>el.name).includes(e.name);
    if(e.name.toLowerCase().includes(searchValue.toLowerCase())){
          return (
            <LabelWrapper key={e._id}>
              <Label>{e.name}</Label>
              {isAdded ? (
                <Icon
                  src={CheckedBodIcon}
                  cursor="pointer"
                  onClick={() => DeleteLabelFromNoteHandler(e)}
                />
              ) : (
                <Icon
                  src={UnCheckedBodIcon}
                  cursor="pointer"
                  onClick={() => AddLabelToNoteHandler(e)}
                />
              )}
            </LabelWrapper>
          );
    }else{
      return null
    }

  });

    const [top, left] = useMemo(() => {
     
      const rect = parent.getBoundingClientRect();
      let y;
      let x;
      let containerHeight = 30;
      displayedLabels.filter(e=> e !== null).forEach(() => {
        containerHeight += 35;
      });
      if(componentType === 'card'){
      y = rect.top + rect.height + window.scrollY - containerHeight;
      x = rect.left + (rect.width - 40) / 2;

      return [y, x];
      }else if (componentType === 'editor'){
              y = rect.top + rect.height + window.scrollY - containerHeight;
              x = rect.left + (rect.width - 40) / 2;

              return [y, x];
      }

    }, [parent, displayedLabels,componentType]);
   
  return (
    <Absolute top={top} left={left}>
      <Container
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <InputWrapper>
          <Input placeholder="Search label" value={searchValue} onChange={event=>setSearchValue(event.target.value)} />
          <Icon src={SearchIcon} />
        </InputWrapper>
        <LabelsBox>{displayedLabels}</LabelsBox>
      </Container>
    </Absolute>
  );
};

export default LabelsPicker;
