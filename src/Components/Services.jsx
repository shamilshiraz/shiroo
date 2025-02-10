import { motion } from "framer-motion";
import { ArrowBigDown, ArrowUpRight, MoveHorizontal } from "lucide-react";
import React from "react";

function Services() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  };

  const services = ["Web development", "Web design", "Web animations"];

  return (
    <div className="h-[100vh] flex flex-col justify-center px-10">
      {/* Heading */}
      <div className="w-full flex justify-end">
        <motion.p
          className="text-4xl sm:text-8xl flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <ArrowUpRight className="w-[1.2em] h-[1.2em]" strokeWidth={0.5} />
          Services
        </motion.p>
      </div>

      {/* Services List */}
      <div className="mt-10">
        {services.map((service, index) => (
          <div key={service}>
            {/* Service Text */}
            <motion.p
              className="text-3xl sm:text-6xl font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: index * 0.3, // Staggered appearance of text
              }}
            >
              {service}
            </motion.p>

            {/* Animated Line (Only delayed for every second item) */}
            <svg
              viewBox="0 0 1000 4"
              className="w-full overflow-visible py-5"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0"
                y1="2"
                x2="1000"
                y2="2"
                stroke="currentColor"
                strokeWidth="2"
                variants={pathVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  delay: index % 2 === 1 ? index * 0.3 + 2 : index * 0.3, // 2-sec delay for every second item
                }}
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
