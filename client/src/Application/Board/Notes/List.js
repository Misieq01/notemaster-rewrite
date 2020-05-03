import React,{useMemo} from "react";
import {textTruncateWord} from '../../../utils/textTruncate'

import { ReactComponent as SquareIcon } from "../../../Assets/Icons/square-uncheck.svg";
import { ReactComponent as SquareCheckedIcon } from "../../../Assets/Icons/square-check.svg";

const List = ({ content }) => {

  const truncatedContent = useMemo(()=>{
    return content.map(e=>{
      return {...e,text: textTruncateWord(e.text,35),fields: e.fields.map(el=>{
        return {...el,text: textTruncateWord(el.text,25)}
      })}
    })
  },[content])

  console.log(truncatedContent)
  return (
    <div className="list__container">
      {truncatedContent.map((e) => (
        <React.Fragment key={e.id}>
          <div className="list__field">
            <SquareIcon className="list__field--icon" />
            <span className="list__field--text">{e.text}</span>
          </div>
          <div className="list__child-wrapper">
            {e.fields.map((el,index) => (
              <div className="list__field--child" key={index}>
                <SquareIcon className="list__field--icon" />
                <span className="list__field--text">{el.text}</span>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default List;
