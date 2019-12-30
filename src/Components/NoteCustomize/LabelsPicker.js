import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import * as axios from "../../utils/axiosHandler";

import CheckedBodIcon from "../../Icons/Labels/square-check.svg";
import UnCheckedBodIcon from "../../Icons/Labels/square-uncheck.svg";
import SearchIcon from "../../Icons/Labels/search.svg";

const Absolute = styled.div`
  position: absolute;
  margin: auto;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
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

const LabelsPicker = ({ parent, id, labels, ReRender, ...props }) => {
  const [allLabels, setAllLabels] = useState([]);
  const [noteLabels, setNoteLabels] = useState(labels.map(e => e.name));
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios.Get("http://localhost:4000/Labels", res => setAllLabels(res.data));
  }, []);


  const AddLabelToNote = label => {
    axios.Patch(
      "http://localhost:4000/NoteAddLabel/" + id,
      { label : label._id },
      ()=>{
        const newNoteLabels = [...noteLabels]
        newNoteLabels.push(label.name)
        setNoteLabels(newNoteLabels)
        ReRender()
      }
    );
  };

  const DeleteLabelFromNote = label => {
    axios.Patch(
      "http://localhost:4000/NoteDeleteLabel/" + id,
      { label: label._id },
      () => {
        const newNoteLabels = [...noteLabels];
        const index = newNoteLabels.indexOf(label.name)
        newNoteLabels.splice(index,1);
        setNoteLabels(newNoteLabels);
        ReRender();
      }
    );
  };

  const displayedLabels = allLabels.map((e, i) => {
    const isAdded = noteLabels.includes(e.name);
    if(e.name.toLowerCase().includes(searchValue.toLowerCase())){
          return (
            <LabelWrapper key={e._id}>
              <Label>{e.name}</Label>
              {isAdded ? (
                <Icon
                  src={CheckedBodIcon}
                  cursor="pointer"
                  onClick={() => DeleteLabelFromNote(e)}
                />
              ) : (
                <Icon
                  src={UnCheckedBodIcon}
                  cursor="pointer"
                  onClick={() => AddLabelToNote(e)}
                />
              )}
            </LabelWrapper>
          );
    }else{
      return null
    }

  });

    const [top, left] = useMemo(() => {
      console.log(displayedLabels)
      const rect = parent.getBoundingClientRect();
      let y;
      let x;
      let containerHeight = 30;
      displayedLabels.filter(e=> e !== null).forEach(() => {
        containerHeight += 35;
      });

      y = rect.top + rect.height + window.scrollY - containerHeight;
      x = rect.left + (rect.width - 40) / 2;

      return [y, x];
    }, [parent, displayedLabels]);
    console.log(top,left)
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
