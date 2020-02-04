import React from 'react'
import styled from 'styled-components'
import {motion,AnimatePresence} from 'framer-motion'
import {useSelector} from 'react-redux'


const Container = styled(motion.div)`
    height: calc(100vh - 40px);
    width: 300px;
    background:red;
    align-self: flex-start;
    position:fixed;
`
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
          <Container
            key="container"
            exit='exit'
            variants={Variants}
          >
            SideMenu
          </Container>
        )}
      </AnimatePresence>
    );
}

export default SideMenu