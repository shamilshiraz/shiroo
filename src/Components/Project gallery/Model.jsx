/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef } from 'react'
import useMouse from './useMouse'
import { motion } from 'framer-motion-3d'
import {  animate, useMotionValue, useTransform } from 'framer-motion'
import { useFrame, useThree } from '@react-three/fiber'
import useDimension from './useDimension'
import { fragment, vertex } from './shader'
import { useAspect, useTexture } from '@react-three/drei'
import { projects } from './data'





// eslint-disable-next-line react/prop-types
function Model({activeProject}) {
  
  const mesh=useRef()
  const mouse=useMouse()
  const {viewport}=useThree()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const texture=projects.map(project => useTexture(project.src))
  const dimension=useDimension()
  // const opacity=useMotionValue(0)
  const scale=useAspect(
    texture[0].image.width,
    texture[0].image.height,
    0.225
  )
  const lerp = (x, y, a) => x * (1 - a) + y * a

  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
}   

const uniforms= useRef ({
  uTexture:{value:texture[0]},
  uDelta:{value:{x:0,y:0}},
  uOpacity:{value: 0.5}
})

useEffect(()=>{
  if(activeProject != null){
    mesh.current.material.uniforms.uTexture.value = texture[activeProject]
    animate(uniforms.current.uOpacity.value, 1, 
      {duration: 0.2,
       onUpdate: latest => mesh.current.material.uniforms.uOpacity.value = latest
      })
} else{
  animate(uniforms.current.uOpacity.value,0,{
    duration:0.2,
    onUpdate: latest=> mesh.current.material.uniforms.uOpacity.value =latest
  })
}
},[activeProject])


useFrame(()=>{
  const { x, y } = mouse
  const smoothX=smoothMouse.x.get()
  const smoothY=smoothMouse.y.get()
  smoothMouse.x.set(lerp(smoothMouse.x.get(),x.get(),0.05))
  smoothMouse.y.set(lerp(smoothMouse.y.get(),y.get(),0.05))
  mesh.current.material.uniforms.uDelta.value={
    x: x.get()-smoothX,
    y: -1 *(y.get()-smoothY)
  }

})


  const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2])
  const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.height / 2])

  return (
    <motion.mesh scale={scale} ref={mesh} position-x={x} position-y={y}>
        <planeGeometry args={[1,1,15,15]}/>
        {/* <meshBasicMaterial wireframe={true}  color={'green'}/> */}
        <shaderMaterial
          // wireframe={false}
          fragmentShader={fragment}
          vertexShader={vertex}
          uniforms={uniforms.current}
          transparent={true}
        />
    </motion.mesh >
  )
}

export default Model