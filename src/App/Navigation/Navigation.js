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

const Container = styled.div`
  width: 80vw;
  margin: 0 10vw;
  height: 120px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items:center;
`
const ButtonsWrapper = styled.div`
  width: 20%;
  height: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
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
      <ButtonsWrapper>
        <Button svg={AddNoteIcon} buttonTitle='Add note' menu={true} MenuContent={AddMenu} />
        <Button svg={LabelsIcon} buttonTitle='Labels' menu={true} MenuContent={Labels} />
      </ButtonsWrapper>
      <SearchBar GetSearchValue={GetSearchValue} />
      <ButtonsWrapper>
        <Button />
        <Button svg={LogoutIcon}  buttonTitle='Logout' onClick={Logout}/>
      </ButtonsWrapper>
    </Container>
  );
};

export default withRouter(Navigation);
