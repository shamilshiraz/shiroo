import React from 'react';
import { motion } from "framer-motion";
import { Linkedin, Mail, Github } from 'lucide-react';

const ContactSection = () => {
  const textArray = [
    "UI/UX DESIGN", 
    "WEB DEVELOPMENT", 
    "SEO", 
    "BRANDING"
  ];

  const duplicatedArray = [...textArray, ...textArray];

  return (
    <div className="bg-white text-black">
      <div className="overflow-hidden whitespace-nowrap">
        <motion.div 
          className="inline-flex py-5"
          animate={{
            x: ["-50%", "0%"],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear"
              }
            }
          }}
        >
          {duplicatedArray.map((text, index) => (
            <React.Fragment key={index}>
              <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl mx-8 font-bold">
                {text}
              </span>
              <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl mx-8 font-bold ">
                *
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="h-[80vh] bg-orange-600 text-white flex flex-col justify-center px-4 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8">
            Let's Connect
          </h2>
          
          <div>
            <p className="text-xl sm:text-2xl mb-6 max-w-2xl">
              I'm always excited to discuss new projects, creative ideas, or potential collaborations. Whether you're looking to bring a concept to life or just want to say hello, feel free to reach out.
            </p>
            
            <div className="flex space-x-6 items-center">
              <a 
                href="https://www.linkedin.com/in/shamil-mm/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <Linkedin size={40} />
              </a>
              <a 
                href="mailto:shamilmm.dev@gmail.com"
                className="hover:text-green-500 transition-colors"
              >
                <Mail size={40} />
              </a>
              <a 
                href="https://github.com/shamil-mm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition-colors"
              >
                <Github size={40} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;