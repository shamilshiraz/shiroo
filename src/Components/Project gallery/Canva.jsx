/* eslint-disable no-unused-vars */
import { Canvas } from '@react-three/fiber'
import React from 'react'
import Model from './Model'


// eslint-disable-next-line react/prop-types
export default function Canva({activeProject}) {
  return (
    <div className='fixed top-0 h-screen w-full'>
    <Canvas>
        <Model activeProject={activeProject}/>
    </Canvas>
    </div>
    
  )
}

