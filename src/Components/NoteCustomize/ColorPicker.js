import React, { useMemo } from "react";
import styled from "styled-components";
import * as axios from "../../utils/axiosHandler";
import { ChangeNoteColor } from "../../App/Store/Actions/notesStuffActions";
import { useDispatch } from "react-redux";

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

const ColorPicker = ({ parent, id, componentType,Close, ...props }) => {
  const dispatch = useDispatch();
  const [top, left] = useMemo(() => {
    const rect = parent.getBoundingClientRect();
    if (componentType === "card") {
      const y = rect.top + rect.height + window.scrollY - 45;
      const x = rect.left + (rect.width - 250) / 2;
      return [y, x];
    } else if (componentType === "editor") {
      const y = rect.top - rect.height / 2;
      const x = rect.left - (250 - rect.width) /2;
      return [y, x];
    }
  }, [parent, componentType]);

  const UpdateColor = color => {
    dispatch(ChangeNoteColor(id, color));
    Close()
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
