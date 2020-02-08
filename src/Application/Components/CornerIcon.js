import React from "react";
import styled from "styled-components";

const Icon = styled.img`
  position: absolute;
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  margin: 0 auto;
  border-radius: 12px;
  width: ${props => props.size + 'px'};
  height: ${props => props.size + 'px'};
  background: ${props => props.background || "none"};
  opacity: ${props => props.opacity};
  cursor: pointer;
  z-index: 50;
  transition: all 0.3s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

const CornerIcon = ({icon, background, corner, xPos=0,yPos=0,size = 24,opacity = 1, onClick, ...props }) => {
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


  return (
    <Icon
      src={icon}
      background={background}
      onClick={onClick}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      size={size}
      opacity={opacity}
    />
  );
};

export default CornerIcon;
