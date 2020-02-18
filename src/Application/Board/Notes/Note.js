import React, { useMemo } from "react";

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

  return <p className="noteTextContainer">{Text}</p>;
};

export default Note;
