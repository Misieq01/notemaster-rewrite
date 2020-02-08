import React, { useState } from "react";
import styled from "styled-components";

import {useDispatch} from 'react-redux'
import {UpdateLabel,DeleteLabel} from '../../../Store/Actions/labelsActions'

import DeleteIcon from "../../../../Assets/Icons/Labels/delete.svg";
import AcceptIcon from "../../../../Assets/Icons/Labels/accept.svg";

const Container = styled.div`
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
  font-size: 16px;
  padding: 10px 0;
`;

const LabelInput = styled.input`
  width: 80%;
  font-size: 16px;
  padding: 10px 0;
  color: rgba(0, 0, 0, 0.75);
`;

const Icon = styled.img`
  height: 15px;
  width: 15px;
  opacity: 0.6;
  cursor: pointer;
`;

const Labels = ({
  name,
  id,
  editSlot,
  SetEditSlot,
  ...props
}) => {
  const dispatch = useDispatch()
  const [editValue, setEditValue] = useState(name);
  const StartEditing = () => {
    SetEditSlot(name);
  };

  const Remove = () => {
    dispatch(DeleteLabel(id))
  };

  const FinishEditing = () => {
    dispatch(UpdateLabel(id,editValue))
    SetEditSlot('')
  };

  const PreventPropagation = event => {
    event.stopPropagation();
  };

  return (
    <Container onClick={event => PreventPropagation(event)}>
      {editSlot === name ? (
        <>
          <LabelInput
            value={editValue}
            onChange={event => setEditValue(event.target.value)}
            autoFocus
          />
          <Icon src={AcceptIcon} onClick={FinishEditing} />
        </>
      ) : (
        <>
          <Label onClick={StartEditing}>{editValue}</Label>
          <Icon src={DeleteIcon} onClick={Remove} />
        </>
      )}
    </Container>
  );
};

export default Labels;
