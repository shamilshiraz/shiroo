import React, { useRef } from 'react';
import { useScroll, useTransform, motion, useMotionValue, useSpring } from 'framer-motion';

export default function Section() {
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    // Scroll-based rotation (fast on scroll)
    const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 720]); // faster rotation on scroll

    // Continuous normal rotation (slow when not scrolling)
    const rotateValue = useMotionValue(0);
    const continuousRotate = useSpring(rotateValue, { damping: 10, stiffness: 50 });

    React.useEffect(() => {
        const interval = setInterval(() => {
            rotateValue.set(rotateValue.get() + 1); // Slow continuous rotation
        }, 50); // Adjust speed if needed
        return () => clearInterval(interval);
    }, []);

    // Combine both rotations
    const combinedRotate = useTransform([scrollRotate, continuousRotate], ([scroll, normal]) => scroll + normal);

    // Scroll-based Y transform for background
    const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

    return (
        <div
            id="mission"
            ref={container}
            className="relative flex items-center justify-center h-screen overflow-hidden"
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            {/* Centered div with 80% width and height on top of the image */}
            <div className="absolute flex items-center justify-center w-[80vw] h-[70vh] z-10">
                <div className="h-full w-full p-6 rounded-md grid place-content-center text-center">
                    {/* Rotating Image */}
                    <motion.img
                        className="h-[10vw] m-20"
                        src="./move.png"
                        alt="Rotating Bolt"
                        style={{ rotate: combinedRotate }}
                    />
                </div>
            </div>

            {/* Moving Background */}
            <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
                <motion.div style={{ y }} className="relative w-full h-full">
                    <img
                        src={'./gray.png'}
                        alt="background"
                        style={{
                            objectFit: "cover",
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            inset: 0,
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}
