import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
  width: 50px;
  height: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24), 0 1px 2px rgba(0, 0, 0, 0.32);
  }
`;

const Icon = styled.img`
  width: 60%;
  height: 60%;
  opacity: 0.7;
`;

const Button = ({
  svg,
  buttonTitle,
  onClick,
  ...props
}) => {

  return (
    <>
      <ButtonContainer
        title={buttonTitle}
        onClick={onClick}
      >
        <Icon src={svg} />
      </ButtonContainer>
    </>
  );
};

export default Button;
