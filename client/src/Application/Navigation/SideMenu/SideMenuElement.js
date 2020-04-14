import React from "react";
import { useParams, useHistory } from "react-router-dom";

const SideMenuElement = ({ Icon, text }) => {
  const notesPanelType = useParams().type;
  const history = useHistory();
  const isActive = notesPanelType === text;

  return (
    <div
      className={isActive ? "side-menu-element__container--active" : "side-menu-element__container"}
      onClick={!isActive ? () => history.replace(text) : null}
    >
      <div className="side-menu-element__icon-wrapper">
        <Icon className="side-menu-element__icon" />
      </div>
      <span className="side-menu-element__text">{text}</span>
    </div>
  );
};

export default SideMenuElement;
