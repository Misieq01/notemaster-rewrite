import React from "react";
import styled from "styled-components";

import IdleIcon from "../Icons/circle-cross-white.svg";

const Icon = styled.img`
  position: absolute;
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  margin: 0 auto;
  border-radius: 12px;
  width: 24px;
  height: 24px;
  background: ${props => props.background || "none"};
  cursor: pointer;
  z-index: 200;
  transition: all 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

const CornerCross = ({icon, background, corner, xPos,yPos, onClick, ...props }) => {
  const setPosition = corner => {

    const x = xPos + 'px'
    const y = yPos + 'px'

    switch (corner) {
      case "topLeft":
        return [y, null, null, x];
      case "topRight":
        return [y, x, null, null];
      case "bottomRight":
        return [null, x, y, null];
      case "bottomLeft":
        return [null, null, y, x];
      default:
        return [null, null, null, null];
    }
  };
  const [top, right, bottom, left] = setPosition(corner);

  console.log(top, right, bottom, left);

  return (
    <Icon
      src={icon}
      background={background}
      onClick={onClick}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
    />
  );
};

export default CornerCross;
