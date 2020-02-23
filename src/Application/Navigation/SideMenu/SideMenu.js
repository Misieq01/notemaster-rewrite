import React from 'react'
import {motion,AnimatePresence} from 'framer-motion'
import {useSelector} from 'react-redux'

const transition = {
  transition: { duration: 0.3, ease: "easeInOut" }
};

const Variants = {
  initial: { left: -300 },
  exit: { left: -300, ...transition },
  open: { left: 0, ...transition }
};


const SideMenu = () =>{
      const sideMenuDisplay = useSelector(state => state.others.sideMenu);

    return (
      <AnimatePresence>
        {sideMenuDisplay && (
          <motion.div className='side-menu__container'
            key="container"
            exit='exit'
            variants={Variants}
          >
            SideMenu
          </motion.div>
        )}
      </AnimatePresence>
    );
}

export default SideMenu