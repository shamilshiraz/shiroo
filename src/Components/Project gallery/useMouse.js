// eslint-disable-next-line no-unused-vars
import { useMotionValue } from "framer-motion";
// eslint-disable-next-line no-unused-vars
import React,{ useEffect } from "react";

 

 function useMouse() {

  const mouse={
    x:useMotionValue(0),
    y:useMotionValue(0)
  }


  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX)
    mouse.y.set(clientY)
  }


    useEffect(()=>{
        window.addEventListener("mousemove",mouseMove)
        return ()=> window.removeEventListener("mousemove",mouseMove)
        
    },[])

   return  mouse
 }
 
 export default useMouse