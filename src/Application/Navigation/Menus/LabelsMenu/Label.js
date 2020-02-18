import React, { useState } from "react";

import {useDispatch} from 'react-redux'
import {UpdateLabel,DeleteLabel} from '../../../Store/Actions/labelsActions'

import DeleteIcon from "../../../../Assets/Icons/Labels/delete.svg";
import AcceptIcon from "../../../../Assets/Icons/Labels/accept.svg";

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
    <div
      className="menuLabel__container"
      onClick={event => PreventPropagation(event)}
    >
      {editSlot === name ? (
        <>
          <input
            className="menuLabel__input"
            value={editValue}
            onChange={event => setEditValue(event.target.value)}
            autoFocus
          />
          <img
            className="menuLabel__icon"
            alt="icon"
            src={AcceptIcon}
            onClick={FinishEditing}
          />
        </>
      ) : (
        <>
          <p className="menuLabel__label" onClick={StartEditing}>
            {editValue}
          </p>
          <img
            className="menuLabel__icon"
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
