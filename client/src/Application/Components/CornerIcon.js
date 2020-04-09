import React from "react";

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

  const style = {
  position: 'absolute',
  top: top,
  right: right,
  bottom: bottom,
  left: left,
  margin: '0 auto',
  borderRadius: '12px',
  width: size + 'px',
  height: size + 'px',
  background: background || "none",
  opacity: opacity,
  cursor: 'pointer',
  zIndex: 50,
  transition: 'all 0.3s ease-in-out',
  hover: {
    transform: 'scale(1.1)',
  }
  }

  return (
    <img
      style={style}
      alt='cornerIcon'
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
