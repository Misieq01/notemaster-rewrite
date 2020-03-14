import React, { useState, useRef } from "react";
import Portal from "../../Components/ReactPortal";
import { AnimatePresence } from "framer-motion";

const Button = ({ svg, buttonTitle, MenuContent, ...props }) => {
  // Manage display of menu component
  const [portalActive, setPortalActive] = useState(false);

  // This state allow closing menu when clicking on button
  // We just needed extra state to manage display which would not be connected to portal
  const [helpingState,setHelp] = useState(false)

  const UnMount = () => {
      setPortalActive(false);
  };

  const ClickHandler = () =>{
    if(!helpingState){
      setPortalActive(true)
      setHelp(true)
    }else if(helpingState){
      setPortalActive(false)
      setHelp(false);

    }
  }

  // Reference to buttom DOM element
  const ButtonRef = useRef();
  return (
    <>
      <button className="navigation__wrapper--button" ref={ButtonRef} title={buttonTitle} onClick={ClickHandler}>
        <img alt="icon" className="navigation__wrapper--icon" src={svg} />
      </button>
      <AnimatePresence>
        {portalActive && (
          <Portal setState={UnMount}>
            <MenuContent parent={ButtonRef.current} Close={UnMount} />
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Button;
