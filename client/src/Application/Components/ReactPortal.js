import { useEffect } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children, setState, eventType, DOMrender, DOMevent, ...props }) => {
  const event = DOMevent || document.getElementById("root");
  const portal = DOMrender || document.getElementById("portal");
  useEffect(() => {
    if(eventType === 'move'){
      event.addEventListener("mousemove", setState);
    }else{
        event.addEventListener("click", setState);
    }
  }, [setState, event,eventType]);

  useEffect(() => {
    return () => {
      if(eventType ==='move'){
        event.removeEventListener("mousemove", setState);
      }else{
        event.removeEventListener("click", setState);
      }
      
    };
  }, [setState, event,eventType]);

  return ReactDOM.createPortal(children, portal);
};

export default Portal;
