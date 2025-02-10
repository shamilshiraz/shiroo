import { motion, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

function About() {
  return (
    <div
      className="min-h-screen w-full bg-black text-white flex justify-center items-center"
      style={{ fontFamily: "agr" }}
    >
      <div className="w-[85%] mx-auto">
        <MaskText />
      </div>
    </div>
  );
}

export default About;

function MaskText() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [fontSize, setFontSize] = useState(32);
  const [lines, setLines] = useState([]);
  const isInView = useInView(ref, { once: false, margin: "0% 0% -25% 0%" });

  const text = "Hello, I'm Shamil, I design and build websites, I found my passion in web design recently so here we are, welcome to my portfolio";

  useEffect(() => {
    const calculateOptimalFontSize = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = window.innerHeight * 0.7; // Use 70% of viewport height
      
      // Start with a large font size and decrease until text fits
      let testSize = Math.min(containerWidth / 8, containerHeight / 6)-10;
      setFontSize(testSize);
    };

    const detectLines = () => {
      if (!containerRef.current) return;

      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.fontSize = `${fontSize}px`;
      span.style.fontFamily = 'agr';
      span.style.fontWeight = 'light';
      span.style.whiteSpace = 'nowrap';
      document.body.appendChild(span);

      const containerWidth = containerRef.current.offsetWidth;
      const words = text.split(' ');
      const newLines = [];
      let currentLine = [];

      words.forEach(word => {
        const testLine = [...currentLine, word].join(' ');
        span.textContent = testLine;

        if (span.offsetWidth > containerWidth && currentLine.length > 0) {
          newLines.push(currentLine.join(' '));
          currentLine = [word];
        } else {
          currentLine.push(word);
        }
      });

      if (currentLine.length > 0) {
        newLines.push(currentLine.join(' '));
      }

      document.body.removeChild(span);
      setLines(newLines);
    };

    calculateOptimalFontSize();
    const resizeHandler = () => {
      calculateOptimalFontSize();
    };

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  useEffect(() => {
    if (fontSize > 0) {
      const detectLines = () => {
        if (!containerRef.current) return;

        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.fontSize = `${fontSize}px`;
        span.style.fontFamily = 'agr';
        span.style.fontWeight = 'bold';
        span.style.whiteSpace = 'nowrap';
        document.body.appendChild(span);

        const containerWidth = containerRef.current.offsetWidth;
        const words = text.split(' ');
        const newLines = [];
        let currentLine = [];

        words.forEach(word => {
          const testLine = [...currentLine, word].join(' ');
          span.textContent = testLine;

          if (span.offsetWidth > containerWidth && currentLine.length > 0) {
            newLines.push(currentLine.join(' '));
            currentLine = [word];
          } else {
            currentLine.push(word);
          }
        });

        if (currentLine.length > 0) {
          newLines.push(currentLine.join(' '));
        }

        document.body.removeChild(span);
        setLines(newLines);
      };

      detectLines();
    }
  }, [fontSize, text]);

  const animation = {
    initial: { y: "100%" },
    enter: (i) => ({
      y: "0",
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i },
    }),
    exit: { y: "100%", transition: { duration: 0.5 } },
  };

  return (
    <div className="p-10 ">
    <div 
      ref={containerRef}
      className="w-full py-10"
    >
      <div ref={ref} className="flex flex-col">
        {lines.map((line, i) => (
          <div key={i} className="overflow-hidden my-2">
            <motion.p
              custom={i}
              variants={animation}
              initial="initial"
              animate={isInView ? "enter" : "exit"}
              className="whitespace-nowrap"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: 1.1,
                fontWeight: 'bold'
              }}
            >
              {line}
            </motion.p>
          </div>
        ))}
      </div>
    </div></div>
  );
}