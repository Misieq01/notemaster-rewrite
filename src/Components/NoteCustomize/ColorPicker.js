import React, { useMemo } from "react";
import styled from "styled-components";
import * as axios from "../../utils/axiosHandler";

const Container = styled.div`
  width: 250px;
  height: 40px;
  background: rgb(250, 250, 250);
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  top: ${props => props.top + "px"};
  left: ${props => props.left + "px"};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
`;

const Color = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background: ${props => "rgb" + props.color};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`;

const ColorPicker = ({ parent, id, ReRender, ApplyColor, Close, ...props }) => {
  const [top, left] = useMemo(() => {
    const rect = parent.getBoundingClientRect();
    let y;
    let x;

    y = rect.top + rect.height + 10;
    x = rect.left - 100 + rect.width / 2;

    return [y, x];
  }, [parent]);

  const UpdateColor = color => {
    axios.Patch("http://localhost:4000/UpdateNote/" + id, { color }, () => {
      if (ReRender !== undefined) {
        ReRender();
      }
      if (ApplyColor !== undefined) {
        ApplyColor(color);
      }
      Close();
    });
  };

  return (
    <Container top={top} left={left} onClick={event => event.stopPropagation()}>
      <Color
        color="(255,179,186)"
        onClick={() => UpdateColor("rgb(255,179,186)")}
      />
      <Color
        color="(255,223,186)"
        onClick={() => UpdateColor("rgb(255,223,186)")}
      />
      <Color
        color="(255,255,186)"
        onClick={() => UpdateColor("rgb(255,255,186)")}
      />
      <Color
        color="(186,255,201)"
        onClick={() => UpdateColor("rgb(186,255,201)")}
      />
      <Color
        color="(186,225,255)"
        onClick={() => UpdateColor("rgb(186,225,255)")}
      />
    </Container>
  );
};

export default ColorPicker;
