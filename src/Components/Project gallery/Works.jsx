import React, { useState } from 'react'
import Canva from './Canva'
import Projects from './Projects'


function Works() {
    const[activeProject,setActiveProject]=useState(null) 

  return (
    <div className='bg-black h-[100vh] flex flex-col justify-around'
    style={{fontFamily:'agr'}}>
     <Canva activeProject={activeProject}/>
     <div className="main h-[vh] text-white">
     <center>    <h1 className='text-4xl sm:text-6xl pt-4'>Featured Projects</h1></center>
     </div>
     <Projects setActiveProject={setActiveProject}/>  
    </div>
  )
}

export default Works
