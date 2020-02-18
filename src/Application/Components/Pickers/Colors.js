import React, { useMemo } from "react";
import { ChangeNoteColor } from "../../Store/Actions/notesStuffActions";
import { useDispatch } from "react-redux";

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
    <div
      className="colorPicker__container"
      style={{ top: top, left: left }}
      onClick={event => event.stopPropagation()}
    >
      <div
        className="colorPicker__color"
        style={{ background: "rgb(255,179,186)" }}
        onClick={() => UpdateColor("rgb(255,179,186)")}
      />
      <div
        className="colorPicker__color"
        style={{ background: "rgb(255,223,186)" }}
        onClick={() => UpdateColor("rgb(255,223,186)")}
      />
      <div
        className="colorPicker__color"
        style={{ background: "rgb(255,255,186)" }}
        onClick={() => UpdateColor("rgb(255,255,186)")}
      />
      <div
        className="colorPicker__color"
        style={{ background: "rgb(186,255,201)" }}
        onClick={() => UpdateColor("rgb(186,255,201)")}
      />
      <div
        className="colorPicker__color"
        style={{ background: "rgb(186,225,255)" }}
        onClick={() => UpdateColor("rgb(186,225,255)")}
      />
    </div>
  );
};

export default ColorPicker;
