import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const StaggeringBlurText = ({ text = "Hello, I'm Shamil, I'm a front-end developer with a full stack expertise, I build visually stunning and Interactive websites" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: 0.3,
    once: true
  });
  
  // Split text into lines and words
  const lines = [
    "Hello, I'm Shamil,",
    "I'm a front-end developer",
    "with a full stack expertise,",
    "I build visually stunning",
    "and Interactive websites"
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };
  
  const lineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };
  
  const wordVariants = {
    hidden: { 
      opacity: 0,
      filter: "blur(20px)",
      y: 20
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center justify-center max-w-4xl px-6"
      >
        {lines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            variants={lineVariants}
            className="overflow- flex flex-wrap justify-center mb-4"
          >
            {line.split(" ").map((word, wordIndex) => (
              <motion.span
                key={`${lineIndex}-${wordIndex}`}
                variants={wordVariants}
                className="text-4xl md:text-6xl font-bold text-white mx-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StaggeringBlurText;