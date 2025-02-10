import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import './App.css';
import WaveEffectDemo from './Components/Wave';
import About from './Components/About';
import Example from './Components/Horizontail';
import Section from './Components/Section';
import Services from './Components/Services';
import InfiniteTextScroll from './Components/Contact';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
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
      <WaveEffectDemo />
      <About />
      <Section />
      <Example />
      <Services />
      <InfiniteTextScroll />
    </div>
  );
}

export default App;
