import React, { useMemo } from "react";
import {textTruncateWord} from '../../../utils/textTruncate'
import {highlightSearchedText} from '../../../utils/highlightText'

const Note = ({ content,search, ...props }) => {

  const text = useMemo(() => {
    return textTruncateWord(content,430);
  }, [content]);

  const highlightedText = highlightSearchedText(text,search)

  return <p className="note-text-container">{highlightedText}</p>;
};

export default Note;
