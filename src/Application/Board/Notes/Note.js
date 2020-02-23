import React, { useMemo } from "react";
import {textTruncateWord} from '../../../utils/textTruncate'

const Note = ({ content, ...props }) => {

  const Text = useMemo(() => {
    return textTruncateWord(content,430);
  }, [content]);
console.log(content,Text)
  return <p className="note-text-container">{Text}</p>;
};

export default Note;
