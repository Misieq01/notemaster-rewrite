import React from 'react'

export const highlightSearchedText = (text, search) => {
  const parts = text.split(new RegExp(`(${search})`, "gi"));
  return parts.map((part, i) => (
    <span key={i} style={part.toLowerCase() === search.toLowerCase() ? { background: "rgba(255,255,255,0.8)" } : {}}>
      {part}
    </span>
  ));
};