import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Portal from "../../Components/ReactPortal";

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
  menu = false,
  MenuContent,
  onClick,
  ...props
}) => {
  // Manage display of menu component
  const [portalActive, setPortalActive] = useState(false);
  // Manage animation of menu component
  // false = UnMountAnimation
  // true = MountAnimation
  const [animation, setAnimation] = useState(false);

  const MountAnimation = () => {
    setAnimation(true);
  };
  const UnMountAnimation = () => {
    setAnimation(false);
  };

  const Mount = () => {
    setPortalActive(true);
  };

  const UnMount = () => {
    setPortalActive(false);
  };

  // Reference to buttom DOM element
  const ButtonRef = useRef();

  const PortalElement = () => {
    return portalActive ? (
      <Portal setState={UnMountAnimation}>
        <MenuContent
          parent={ButtonRef.current}
          whichAnimation={animation}
          UnMountAnimation={UnMountAnimation}
          UnMount={UnMount}
        />
      </Portal>
    ) : null;
  };

  const ClickHandler = () => {
    if (menu) {
      Mount();
      MountAnimation();
    } else {
      onClick();
    }
  };

  return (
    <>
      <ButtonContainer
        ref={ButtonRef}
        title={buttonTitle}
        onClick={ClickHandler}
      >
        <Icon src={svg} />
      </ButtonContainer>
      <PortalElement/>
    </>
  );
};

export default Button;
