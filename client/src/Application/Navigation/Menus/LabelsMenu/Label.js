import React, { useState } from "react";

import {useDispatch} from 'react-redux'
import {UpdateLabel,DeleteLabel} from '../../../Store/Actions/labelsActions'

import DeleteIcon from "../../../../Assets/Icons/delete.svg";
import AcceptIcon from "../../../../Assets/Icons/accept.svg";

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
    dispatch(UpdateLabel(id,editValue)).then(()=>{
      SetEditSlot('')
    })
  };

  const PreventPropagation = event => {
    event.stopPropagation();
  };

  return (
    <div
      className="menu-label__container"
      onClick={event => PreventPropagation(event)}
    >
      {editSlot === name ? (
        <>
          <input
            className="menu-label__input"
            value={editValue}
            onChange={event => setEditValue(event.target.value)}
            autoFocus
          />
          <img
            className="menu-label__icon"
            alt="icon"
            src={AcceptIcon}
            onClick={FinishEditing}
          />
        </>
      ) : (
        <>
          <p className="menu-label__label" onClick={StartEditing}>
            {editValue}
          </p>
          <img
            className="menu-label__icon"
            alt="icon"
            src={DeleteIcon}
            onClick={Remove}
          />
        </>
      )}
    </div>
  );
};

export default Labels;
