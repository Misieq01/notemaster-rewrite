import React, { useMemo } from "react";
import Portal from '../ReactPortal'

const ColorPicker = ({ parent, id, componentType,close,action}) => {
  
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

  const Color = ({color}) => (
    <div
      className="color-picker__color"
      style={{ background: color }}
      onClick={() => action.changeColor(color)}
    />
  );


  return (
    <Portal setState={close} eventType="move">
      <div
        className="color-picker__container"
        style={{ top: top, left: left }}
        onClick={event => event.stopPropagation()}
      >
        <Color color="rgb(255,179,186)" />
        <Color color="rgb(255,223,186)" />
        <Color color="rgb(255,255,186)" />
        <Color color="rgb(186,255,201)" />
        <Color color="rgb(186,225,255)" />
      </div>
    </Portal>
  );
};

export default ColorPicker;
