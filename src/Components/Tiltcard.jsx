import React, { useState, useRef } from 'react';

const TiltCard = ({ children }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate the mouse position relative to the card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Convert mouse position to rotation angles
    // Reduce the values to make the tilt more subtle
    const rotateX = (mouseY / (rect.height / 2)) * -15;
    const rotateY = (mouseX / (rect.width / 2)) * 15;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000">
      <div
        ref={cardRef}
        className="w-64 h-96 to-blue-500 rounded-xl p-6 transition-transform duration-200 ease-out "
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className="relative h-full w-full"
          style={{ transform: 'translateZ(50px)' }}
        >
          {/* Card content with depth effect */}
          <div className="text-white text-xl font-bold mb-4 shadow-xl">SHAMIL</div>

          

        </div>
      </div>
    </div>
  );
};

export default TiltCard;