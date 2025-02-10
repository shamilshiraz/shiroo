import React from 'react'
/* eslint-disable no-unused-vars */
import {projects} from './data'

// eslint-disable-next-line react/prop-types
function Projects({setActiveProject}) {
  return (
<>
<div className='relative mix-blend-difference z-10 text-white h-auto w-full'>  <ul className='border-b ' onMouseLeave={()=>{setActiveProject(null)}} >
    {
     projects.map((project,i)=>{
      return (
        <li key={project.title} onMouseOver={()=>{setActiveProject(i)}} className='text-4xl p-5 border-t'>
          <p>{project.title}</p>
        </li>
      )
     })
    }
  </ul>
</div>
</>
  )
}

export default Projects
