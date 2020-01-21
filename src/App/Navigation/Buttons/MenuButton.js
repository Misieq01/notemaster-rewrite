import React, { useState, useRef } from "react";
import styled from "styled-components";
import Portal from "../../../Components/ReactPortal";
import { TweenMax } from "gsap";

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

const Button = ({ svg, buttonTitle, MenuContent, ...props }) => {
  // Manage display of menu component
  const [portalActive, setPortalActive] = useState(false);
  // Manage animation of menu component
  // false = UnMountAnimation
  // true = MountAnimation
  const [animation, setAnimation] = useState(false);

  const MountAnimation = (component, content,x,callback) => {
    TweenMax.from(component, 0.3, {
      height: "50px",
      width: "50px",
      x: x,
      y: -60,
      borderRadius: "25px"
    }).then(callback);
    TweenMax.from(content, 0.5, { opacity: 0, delay: 0.2 });
  };
  const UnMountAnimation = (component, content,x) => {
    TweenMax.to(content, 0.1, { opacity: 0 });
    TweenMax.to(component, 0.3, {
      height: "50px",
      width: "50px",
      x: x,
      y: -60,
      borderRadius: "25px",
      zIndex: 0,
      padding:0
    }).then(UnMount);
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
      <Portal setState={() => setAnimation(false)}>
        <MenuContent
          parent={ButtonRef.current}
          whichAnimation={animation}
          UnMountAnimation={UnMountAnimation}
          MountAnimation={MountAnimation}
          UnMount={() => setAnimation(false)}
          Close={UnMount}
        />
      </Portal>
    ) : null;
  };

  const ClickHandler = () => {
    if (!portalActive) {
      setAnimation(true)
      Mount();
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
      <PortalElement />
    </>
  );
};

export default Button;
