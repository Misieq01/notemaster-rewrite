import React from "react";
import {motion} from 'framer-motion'

const LoadingScreen = () => {

  const transition = {
    yoyo: Infinity,
    duration: 2,
    ease: "easeInOut"
  }

  const variants = {
    initial: {
      height: "20px",
      width: "20px",
      borderRadius: "10px"
    },
    animation: {
      height: "200px",
      width: "200px",
      borderRadius: "50px",
      rotate: 180
    }
  };

  return (
    <div className='loadingScreen__container'>
      <motion.div className='loadingScreen__box' variants={variants} initial='initial' animate='animation' transition={transition} ></motion.div>
    </div>
  );
};

export default LoadingScreen;
