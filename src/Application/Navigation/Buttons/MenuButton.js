import React, { useState, useRef } from "react";
import Portal from "../../Components/ReactPortal";
import {AnimatePresence} from 'framer-motion'


const Button = ({ svg, buttonTitle, MenuContent, ...props }) => {
  // Manage display of menu component
  const [portalActive, setPortalActive] = useState(false);

  const Mount = () => {
    setPortalActive(true);
  };

  const UnMount = () => {
    setPortalActive(false);
  };

  // Reference to buttom DOM element
  const ButtonRef = useRef();

  const ClickHandler = () => {
    if (!portalActive) {
      Mount();
    }
  };

  return (
    <>
      <button className='navigation__button'
        ref={ButtonRef}
        title={buttonTitle}
        onClick={ClickHandler}
      >
        <img alt='icon' src={svg} />
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
