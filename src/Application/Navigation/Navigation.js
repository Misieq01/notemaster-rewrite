import React from "react";
import styled from "styled-components";
import * as axios from '../../utils/axiosHandler';
import {withRouter} from 'react-router-dom'
import {removeToken} from '../../utils/tokenHandler'
import {useDispatch} from 'react-redux'
import {ChangeDisplaySideMenu} from '../Store/Actions/othersActions'

import SearchBar from './SeachBar'
import ClickButton from './Buttons/ClickButton'
import MenuButton from './Buttons/MenuButton'


import AddMenu from './Menus/AddNotes'
import Labels from './Menus/LabelsMenu/Labels'

import AddNoteIcon from '../../Assets/Icons/Navigation/add-note.svg'
import LogoutIcon from '../../Assets/Icons/Navigation/logout.svg'
import LabelsIcon from '../../Assets/Icons/Navigation/labels.svg'
import MenuIcon from '../../Assets/Icons/Navigation/three-lines.svg'

const Container = styled.div`
  width: 100vw;
  height: 120px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items:center;
`
const Wrapper = styled.div`
  width: ${props => props.width || '40%'};
  height: 80px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`

const Navigation = ({GetSearchValue,...props}) => {
const dispatch = useDispatch()
const Logout = () =>{
  axios.Post("http://localhost:4000/Logout",'',()=>{
    removeToken()
    props.history.push("/Login")
  });
}

  return (
    <Container>
      <Wrapper width='7vw'><ClickButton svg={MenuIcon} buttonTitle='Open menu' onClick={()=>dispatch(ChangeDisplaySideMenu())} /></Wrapper>
      <Wrapper width='50vw'>
        <SearchBar GetSearchValue={GetSearchValue} />
      </Wrapper>
      
      <Wrapper width='36vw'>
        <MenuButton svg={AddNoteIcon} buttonTitle='Add note' MenuContent={AddMenu}/>
        <MenuButton svg={LabelsIcon} buttonTitle='Labels' MenuContent={Labels} />
        
      </Wrapper>
      <Wrapper width='7vw'><ClickButton svg={LogoutIcon}  buttonTitle='Logout' onClick={Logout}/></Wrapper>
    </Container>
  );
};

export default withRouter(Navigation);
