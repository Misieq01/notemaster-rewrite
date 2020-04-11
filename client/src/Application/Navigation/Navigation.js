import React from "react";
import * as axios from "../../utils/axiosHandler";
import { withRouter } from "react-router-dom";
import { removeToken } from "../../utils/tokenHandler";
import { useDispatch } from "react-redux";
import { ChangeDisplaySideMenu } from "../Store/Actions/othersActions";

import SearchBar from "./SeachBar";
import ClickButton from "./Buttons/ClickButton";
import MenuButton from "./Buttons/MenuButton";

import AddMenu from "./Menus/AddNotes";
import Labels from "./Menus/LabelsMenu/Labels";

import AddNoteIcon from "../../Assets/Icons/Navigation/add-note.svg";
import LogoutIcon from "../../Assets/Icons/Navigation/logout.svg";
import LabelsIcon from "../../Assets/Icons/Navigation/labels.svg";
import MenuIcon from "../../Assets/Icons/Navigation/three-lines.svg";

const Navigation = ({ GetSearchValue, ...props }) => {
  const dispatch = useDispatch();
  const Logout = () => {
    axios.Post("/Logout", "", () => {
      removeToken();
      props.history.push("/Login");
    });
  };

  return (
    <div className="navigation__container">
      <div className="navigation__wrapper" style={{ width: "7vw" }}>
        <ClickButton
          svg={MenuIcon}
          buttonTitle="Open menu"
          onClick={() => dispatch(ChangeDisplaySideMenu())}
        />
      </div>
      <div className="navigation__wrapper" style={{ width: "50vw" }}>
        <SearchBar GetSearchValue={GetSearchValue} />
      </div>

      <div className="navigation__wrapper" style={{ width: "36vw" }}>
        <MenuButton
          svg={AddNoteIcon}
          buttonTitle="Add note"
          MenuContent={AddMenu}
        />
        <MenuButton
          svg={LabelsIcon}
          buttonTitle="Labels"
          MenuContent={Labels}
        />
      </div>
      <div className="navigation__wrapper" style={{ width: "7vw" }}>
        <ClickButton svg={LogoutIcon} buttonTitle="Logout" onClick={Logout} />
      </div>
    </div>
  );
};

export default withRouter(Navigation);
