import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  width: 70%;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background: linear-gradient(to left, #ff5f6d, #ffc371);
  color: rgb(250, 250, 250);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.02);
  }
`;

const ButtonComponent = ({text,onClick,...props}) =>{
return <Button onClick={onClick}>{text}</Button>
}
export default ButtonComponent