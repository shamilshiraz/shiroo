import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MagneticButton = ({ children }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const { current } = ref;
    if (current) {
      const { left, top, width, height } = current.getBoundingClientRect();
      const x = (e.clientX - (left + width / 2)) * 0.35;
      const y = (e.clientY - (top + height / 2)) * 0.35;
      
      current.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
    }
  };

  const handleMouseLeave = () => {
    const { current } = ref;
    if (current) {
      current.style.transform = 'translate(0px, 0px) scale(1)';
    }
  };

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 ease-out"
    >
      {children}
    </motion.div>
  );
};

const BurgerButton = ({ isOpen, setIsOpen }) => {
  return (
    <button 
      onClick={() => setIsOpen(!isOpen)}
      className="fixed right-5 top-5 w-20 h-20 rounded-full  bg-opacity-10 flex items-center justify-center z-50 md:hidden"
    >
      <div className="w-10 h-6 relative flex flex-col justify-center items-center">
        <span className={`w-8 h-[4px] bg-white absolute transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
        <span className={`w-8 h-[4px] bg-white absolute transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
      </div>
    </button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['About', 'Projects', 'Services', 'Contact'];

  return (
    <>
      <nav className="top-0 left-0 w-full z-40 fixed">
        <div className=" px-4 sm:px-6 ">
          <div className="flex items-center justify-between h-32">
            {/* Japanese Logo */}
            <div className="text-5xl text-white">
              白
            </div>
            
            {/* Desktop Navigation */}
<div className="hidden md:flex space-x-4 mix-blend-difference">
  {navItems.map((item) => (
    <MagneticButton key={item}>
      <a 
        href={`#${item.toLowerCase()}`} 
        className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
      >
        {item}
      </a>
    </MagneticButton>
  ))}
</div>

          </div>
        </div>

        {/* Burger Button */}
        <BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Mobile Slide-in Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-full bg-black  z-40 md:hidden shadow-lg"
            >
              <div className="px-2 pt-24 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className=" hover:bg-gray-100 block px-3 py-5 rounded-md text-5xl font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;