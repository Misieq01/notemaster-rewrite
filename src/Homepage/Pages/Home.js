import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import Background from '../../Components/Background'
import Image from '../../Images/Home-background.jpg'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('${Image}');
    background-size: cover;
    background-repeat: no-repeat;
`

const Header = styled.div`
    width: 100vw;
    height: 90px;
    display: flex;
    flex-flow: row-nowrap;
    justify-content: space-between;
    align-items: center;
`
const Logo = styled.div`
  width: 20%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: rgb(250,250,250);
  z-index: 100;

`;

const Navigation = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    height: inherit;
`

const NavLink = styled(Link)`
  font-size: 22px;
  color: rgb(250, 250, 250);
  z-index: 100;
  transition: all 0.2s ease-in-out;
  :hover{
    color: rgb(210,210,210);
  }
`;

const LoginLink = styled(NavLink)`
  padding: 10px 30px;
  border-radius: 8px;
  border: 2px solid rgb(250, 250, 250);
  :hover {
    background: rgba(250, 250, 250);
    color: black;
  }
`;

const TextWrapper = styled.div`
  width: 100vw;
  height: calc(100% - 90px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 24px;
  color: rgba(250, 250, 250, 0.9);
  z-index: 100;
  width: 900px;
  text-align: center;
  font-style: italic;
`;

const Author = styled.p`
  font-size: 20px;
  color: rgba(250, 250, 250, 0.9);
  z-index: 100;
  font-style: italic;
  font-weight: 300;
`;

const Home = props =>{
    return (
      <>
        <Background />
        <Container>
          <Header>
            <Logo><NavLink to='/' ><h1>NoteMaster</h1></NavLink></Logo>
            <Navigation>
              <NavLink to='/About' >About</NavLink>
              <NavLink to='/Funct'>Functionalities</NavLink>
              <NavLink to='/Contact'>Contact</NavLink>
              <LoginLink to="/Login">Login</LoginLink>
            </Navigation>
          </Header>
          <TextWrapper>
            <Text>
              „Why take notes? The obvious reason is to remember. Visual
              note-taking translates what we hear into pictures that give
              context, color, and meaning. By adding symbols, visual metaphors,
              likenesses of people, and room layouts, we add several
              dimensions.“
            </Text>
            <Author> - Tom Wujec</Author>
          </TextWrapper>
        </Container>
      </>
    );
}

export default Home