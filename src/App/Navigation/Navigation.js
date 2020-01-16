import React from "react";
import styled from "styled-components";
import * as axios from '../../utils/axiosHandler';
import {withRouter} from 'react-router-dom'
import {RemoveToken} from '../../utils/tokenHandler'

import SearchBar from './SeachBar'
import Button from './Button'

import AddMenu from './Menus/AddNotes'
import Labels from './Menus/LabelsMenu/Labels'

import AddNoteIcon from '../../Icons/Navigation/add-note.svg'
import LogoutIcon from '../../Icons/Navigation/logout.svg'
import LabelsIcon from '../../Icons/Navigation/labels.svg'
import MenuIcon from '../../Icons/Navigation/three-lines.svg'

const Container = styled.div`
  width: 100vw;
  height: 120px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
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

const Logout = () =>{
  axios.Post("http://localhost:4000/Logout",'',()=>{
    RemoveToken()
    props.history.push("/Login")
  });
}

  return (
    <Container>
      <Wrapper width='10%'><Button svg={MenuIcon}/></Wrapper>
      <Wrapper width='60%'>
        <SearchBar GetSearchValue={GetSearchValue} />
      </Wrapper>
      
      <Wrapper>
        <Button svg={AddNoteIcon} buttonTitle='Add note' menu={true} MenuContent={AddMenu} />
        <Button svg={LabelsIcon} buttonTitle='Labels' menu={true} MenuContent={Labels} />
        <Button svg={LogoutIcon}  buttonTitle='Logout' onClick={Logout}/>
      </Wrapper>
    </Container>
  );
};

export default withRouter(Navigation);
