import React from "react";
import { ReactComponent as SquareIcon } from "../../Assets/Icons/square-uncheck.svg";
import { ReactComponent as SquareCheckIcon } from "../../Assets/Icons/square-check.svg";
import { ReactComponent as AddIcon } from "../../Assets/Icons/plus.svg";

const ListEditor = ({ background, getInputData, content, titleShadowHandler }) => {

  const addField = (array, type, parentId) => {
    const [parentLastElement] = array.slice(-1);
    const newData = [...content];
    if (type === "parent") {
      newData.push({ text: "", id: parentLastElement.id + 1, fields: [] });
    } else if (type === "child") {
      const contentToPush =
        array.length > 0
          ? {
              text: "",
              id: parentLastElement.id + 1,
              parentId: parentId,
            }
          : {
              text: "",
              id: 0,
              parentId: parentId,
            };
      newData[newData.findIndex((e) => e.id === parentId)].fields.push(contentToPush);
    }
    getInputData(newData);
  };

  const updateField = (data, type, value) => {
    const newData = [...content];
    if (type === "parent") {
      const index = content.findIndex((e) => e.id === data.id);
      newData[index].text = value;
      getInputData(newData);
    } else if (type === "child") {
      const parentIndex = content.findIndex((e) => e.id === data.parentId);
      const index = content[parentIndex].fields.findIndex((e) => e.id === data.id);
      newData[parentIndex].fields[index].text = value;
      getInputData(newData);
    }
  };

  const deleteField = (data, type, event) => {
    const newData = [...content];
    const parentIndex = type === "child" ? content.findIndex((e) => e.id === data.parentId) : null;
    if (event.keyCode === 8 && data.text === "") {
      console.log(data)
      if (type === "parent" && content.length > 1) {
        const index = content.findIndex((e) => e.id === data.id);
        newData.splice(index, 1);
        getInputData(newData);
      } else if (type === "child") {
        const index = content[parentIndex].fields.findIndex((e) => e.id === data.id);
        newData[parentIndex].fields.splice(index, 1);
        getInputData(newData);
      }
    }
  };

  return (
    <div className="list-editor__container" style={{ background: background }} onScroll={event => titleShadowHandler(event.target.scrollTop)}>
      {content.map((e) => (
        <React.Fragment key={e.id}>
          <div className="list-editor__field">
            <SquareIcon className="list-editor__field--icon" />
            <input
              value={e.text}
              placeholder="field"
              // onClick={() => addField(content, e, "parent")}
              onChange={(event) => updateField(e, "parent", event.target.value)}
              onKeyDown={(event) => deleteField(e, "parent", event)}
              className="list-editor__field--input"
            />
          </div>
          <div className="list-editor__child-wrapper">
            {e.fields.map((el, index) => (
              <>
                <div className="list-editor__field--child" key={el.id}>
                  <SquareIcon className="list-editor__field--icon" />
                  <input
                    value={el.text}
                    placeholder="field"
                    onChange={(event) => updateField(el, "child", event.target.value)}
                    onKeyDown={(event) => deleteField(el, "child", event)}
                    className="list-editor__field--input"
                  />
                </div>
              </>
            ))}
            <div className="list-editor__field--child">
              <AddIcon className="list-editor__field--icon" />
              <span
                onClick={() => addField(e.fields, "child", e.id)}
                className="list-editor__field--input--add"
              >Add element</span>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="list-editor__field">
        <AddIcon className="list-editor__field--icon" />
        <span
          onClick={() => addField(content, "parent")}
          className="list-editor__field--input--add"
        >Add element</span>
      </div>
    </div>
  );
};
export default ListEditor;
