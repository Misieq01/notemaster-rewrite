import React, { useMemo } from "react";
import styled from "styled-components";

const TextContainer = styled.p`
    width:90%;
    padding: 3px;
    margin:0;
    text-align: left;
    display:inline-block;
    font-size: 15px;
    line-height: 20px;
`;

const Note = ({ content, ...props }) => {
  const text = content;

  const MAX_TEXT_LENGTH = 430;

  const WordTruncate = (t, len = MAX_TEXT_LENGTH) => {
    if (t.length > len)
      t =
        t.slice(0, len).substring(0, Math.min(t.length, t.lastIndexOf(" "))) +
        "...";
    return t;
  };

  const Text = useMemo(() => {
    return WordTruncate(text);
  }, [text]);

  return <TextContainer>{Text}</TextContainer>;
};

export default Note;
