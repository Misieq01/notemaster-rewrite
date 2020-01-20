import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import {TweenMax,Power3} from 'gsap'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: rgb(250, 250, 250);
`;
const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: ${props => props.background};
  position: absolute;
  top: 0;
  left: 0;
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  margin: auto;
`;
 
const LoadingScreen = () => {

    // Creating array of refs
    const circles = useRef([...Array(5)].map(()=> React.createRef()))
    useEffect(()=>{
        //Creating array of clean dom objects refs (So i won't need to write 'current' every time)
        const objects = circles.current.map(e=>e.current)
        TweenMax.to(objects[0],0.8,{y:-70,yoyo: true,repeat:-1,ease:Power3.easeIn})
        TweenMax.to(objects[1],0.8,{y:70,yoyo: true,repeat:-1,ease:Power3.easeIn})
        TweenMax.to(objects[2],0.8,{y:-70,yoyo: true,repeat:-1,ease:Power3.easeIn})
        TweenMax.to(objects[3],0.8,{y:70,yoyo: true,repeat:-1,ease:Power3.easeIn})
        TweenMax.to(objects[4],0.8,{y:-70,yoyo: true,repeat:-1,ease:Power3.easeIn})
    },[])

    return (
      <Container>
            <Circle background="rgb(255,179,186)" ref={circles.current[0]} right='200px' bottom='-70px'/>
            <Circle background="rgb(255,223,186)" ref={circles.current[1]} right='100px' bottom='70px'/>
            <Circle background="rgb(255,255,186)" ref={circles.current[2]} right='0px' bottom='-70px'/>
            <Circle background="rgb(186,255,201)" ref={circles.current[3]} right='-100px' bottom='70px'/>
            <Circle background="rgb(186,225,255)" ref={circles.current[4]} right='-200px' bottom='-70px'/>
      </Container>
    );
}

export default LoadingScreen