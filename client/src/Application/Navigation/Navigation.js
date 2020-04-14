import React from "react";
import * as axios from "../../utils/axiosHandler";
import { withRouter,useParams } from "react-router-dom";
import { removeToken } from "../../utils/tokenHandler";
import { useDispatch } from "react-redux";
import { ChangeDisplaySideMenu } from "../Store/Actions/othersActions";

import SearchBar from "./SeachBar";
import ClickButton from "./Buttons/ClickButton";
import MenuButton from "./Buttons/MenuButton";

import AddMenu from "./Menus/AddNotes";
import Labels from "./Menus/LabelsMenu/Labels";

import {ReactComponent as LabelsIcon} from "../../Assets/Icons/Navigation/labels.svg";
import {ReactComponent as AddNoteIcon} from "../../Assets/Icons/Navigation/add-note.svg";
import {ReactComponent as MenuIcon} from "../../Assets/Icons/Navigation/three-lines.svg";
import {ReactComponent as SettingsIcon} from "../../Assets/Icons/Navigation/settings.svg";
import {ReactComponent as AccountIcon} from "../../Assets/Icons/Navigation/account.svg";
import {ReactComponent as LogoutIcon} from "../../Assets/Icons/Navigation/logout.svg";

const Navigation = ({ GetSearchValue, ...props }) => {
  const dispatch = useDispatch();
  const notesPanelType = useParams().type
  const Logout = () => {
    axios.Post("/Logout", "", () => {
      removeToken();
      props.history.push("/Login");
    });
  };

  return (
    <div className="navigation__container">
      <div className="navigation__wrapper-menu-button">
        <ClickButton Icon={MenuIcon} buttonTitle="Open menu" onClick={() => dispatch(ChangeDisplaySideMenu())} />
      </div>
      <div className="navigation__wrapper-center">
        <span className="navigation__notes-panel-type">{notesPanelType}</span>
        <SearchBar GetSearchValue={GetSearchValue} />
      </div>
      <div className="navigation__wrapper-right-buttons">
        <MenuButton Icon={AddNoteIcon} buttonTitle="Add note" MenuContent={AddMenu} />
        <MenuButton Icon={LabelsIcon} buttonTitle="Labels" MenuContent={Labels} />
        <ClickButton Icon={SettingsIcon} buttonTitle="Settings" />
        <ClickButton Icon={AccountIcon} buttonTitle="Account" />
        <ClickButton Icon={LogoutIcon} buttonTitle="Logout" onClick={Logout} />
      </div>
    </div>
  );
};

export default withRouter(Navigation);
