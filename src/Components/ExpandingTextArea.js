import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WrittingArea = styled.textarea`
  width: 92%;
  min-height: ${props => props.lineHeight};
  resize: none;
  border: none;
  text-decoration: none;
  outline: none;
  font-size: 18px;
  background: ${props => props.background || "rgb(250,250,250)"};
  line-height: ${props => props.lineHeight};
  ::-webkit-scrollbar {
    width: 10px;
    cursor: default;
  }
  ::-webkit-scrollbar-track {
    background: #eeeeee;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
  }
`;

const ResizableTextArea = props => {
  const [data, setData] = useState({
    minRows: props.minRows,
    maxRows: props.maxRows,
    value: props.value
  });
  const [rows, setRows] = useState(props.minRows);

  useEffect(() => {
    console.log("Somsiad");
    let rows = 0;
    const charsCount = props.value.length;
    if (charsCount === 0) {
      rows = props.minRows;
    } else {
      for (let i = 0; i < charsCount; i += 65) {
        rows++;
      }
    }

    setRows(rows > props.maxRows ? props.maxRows : rows);
  }, [props.value, props.maxRows,props.minRows]);

  const HandleChange = event => {
    props.onChange(event, props.fieldName);
    const lineHeight = props.lineHeight;
    const minRows = data.minRows;
    const maxRows = data.maxRows;

    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~(event.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setData({
      ...data,
      value: event.target.value
    });
    setRows(currentRows < maxRows ? currentRows : maxRows);
  };

  return (
    <WrittingArea
      className={props.className}
      value={data.value}
      rows={rows}
      placeholder={props.placeholder}
      onChange={event => HandleChange(event)}
      onClick={props.onClick}
      onKeyUp={props.onKeyUp}
      onKeyDown={props.onKeyDown}
      background={props.background}
      lineHeight={props.lineHeight + "px"}
      onScroll={event => props.onScroll(event.target.scrollTop)}
      spellCheck={false}
    />
  );
};

export default ResizableTextArea;
