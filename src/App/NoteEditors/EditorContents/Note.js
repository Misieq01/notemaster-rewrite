import React from "react";
import styled from "styled-components";

import TextArea from "../../../Components/ExpandingTextArea";

const Text = styled(TextArea)`
  z-index: 100;
  top: 0;
  opacity: 0.75;
  transition: all 0.2s ease-in-out;
  :focus{
    opacity: 1;
  }
`;

const NoteEditor = ({ background, GetInputData, content,TitleShadowHandler, ...props }) => {
  return (
    <Text
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
