import React from 'react';
import { motion } from 'framer-motion';
import WaveEffectDemo from './Wave';

const CircleReveal = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <motion.div 
        initial={{ clipPath: 'circle(0% at center)' }}
        animate={{ 
          clipPath: 'circle(150% at center)' 
        }}
        transition={{ 
          duration: 2, 
          ease:'easeOut' 
        }}
        className="absolute z-50 w-full h-full origin-center bg-white"
      >
        <div className="w-full h-full">
          <WaveEffectDemo/>
        </div>
      </motion.div>
    </div>
  );
};

export default CircleReveal;