import React from "react";

import TextArea from "../Components/ExpandingTextArea";

const NoteEditor = ({ background, getInputData, content,titleShadowHandler, ...props }) => {
  return (
    <TextArea
      onChange={getInputData}
      fieldName={"content"}
      placeholder="Place for your thoughts"
      lineHeight={30}
      minRows={1}
      maxRows={20}
      value={content}
      background={background}
      onScroll={titleShadowHandler}
    />
  );
};

export default NoteEditor;
