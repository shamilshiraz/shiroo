import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import './App.css';
import WaveEffectDemo from './Components/Wave';
import About from './Components/About';
import Example from './Components/Horizontail';
import Section from './Components/Section';
import Services from './Components/Services';
import InfiniteTextScroll from './Components/Contact';
import CircleReveal from './Components/Circle';
import Navbar from './Components/Nav';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
            <nav className="absolute top-0 left-0 right-0 z-100 w-full text-\">
<Navbar/>
      </nav>
      <CircleReveal/>
      <About />
      <Section />
      <Example />
      <Services />
      <InfiniteTextScroll />
    </div>
  );
}

export default App;
