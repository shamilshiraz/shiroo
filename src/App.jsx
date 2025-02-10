import React from 'react'
import './App.css'
import WaveEffectDemo from './Components/Wave'
import TiltCard from './Components/Tiltcard'
import About from './Components/About';
import Works from './Components/Project gallery/Works';
import Menu from './Components/Menu';
import Example from './Components/Horizontail';
import Section from './Components/Section';
import Services from './Components/Services';
import Contact from './Components/Contact';
import InfiniteTextScroll from './Components/Contact';


function App() {
  return (
    <div>
      <WaveEffectDemo/>
      <About/>
      <Section/>
      <Example/>
      <Services/>
      <InfiniteTextScroll/>
      {/* <Contact/> */}
    </div>
  )
}

export default App
