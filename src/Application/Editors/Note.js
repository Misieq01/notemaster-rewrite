import React from "react";

import TextArea from "../Components/ExpandingTextArea";

const NoteEditor = ({ background, GetInputData, content,TitleShadowHandler, ...props }) => {
  return (
    <TextArea
      onChange={GetInputData}
      fieldName={"content"}
      placeholder="Place for your thoughts"
      lineHeight={30}
      minRows={1}
      maxRows={20}
      value={content}
      background={background}
      onScroll={TitleShadowHandler}
    />
  );
};

export default NoteEditor;
