import React from 'react';
import { motion } from "framer-motion";
import { Linkedin, Mail, Github, Code, Palette, Search, FileText } from 'lucide-react';

const ContactSection = () => {
  const textArray = [
    "CONNECT", 
    "CREATE", 
    "COLLABORATE", 
  ];

  const duplicatedArray = [...textArray, ...textArray];

  const techStack = [
    { category: "Frontend", skills: ["React.js", "HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS"] },
    { category: "Backend", skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
    { category: "Animation", skills: ["Framer Motion", "GSAP", "CSS Animations"] },
    { category: "Tools", skills: ["Git", "Webpack", "npm/yarn", "Postman"] }
  ];

  const services = [
    {
      icon: <Code className="w-12 h-12 mb-4" />,
      title: "Full Stack Development",
      description: "End-to-end web solutions using the MERN stack, enhanced with modern animation libraries for exceptional user experiences."
    },
    {
      icon: <Search className="w-12 h-12 mb-4" />,
      title: "SEO Optimization",
      description: "Implementing best practices for search engine visibility, including technical SEO, content optimization, and performance enhancement."
    },
    {
      icon: <Palette className="w-12 h-12 mb-4" />,
      title: "Graphic Design",
      description: "Creative visual solutions including UI design, branding materials, and digital assets that align with your brand identity."
    }
  ];

  return (
    <div id='contact' className="bg-white text-black">
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
              <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl mx-8 font-bold">
                *
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Tech Stack Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Tech Stack & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-4 text-orange-600">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.skills.map((skill, idx) => (
                    <li key={idx} className="text-gray-700">{skill}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white py-16 px-4 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className='flex justify-center'>{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
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
                href="https://www.linkedin.com/in/shamilshiraz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <Linkedin size={40} />
              </a>
              <a 
                href="mailto:shamilshiraz0@gmail.com"
                className="hover:text-green-500 transition-colors"
              >
                <Mail size={40} />
              </a>
              <a 
                href="https://github.com/shamilshiraz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition-colors"
              >
                <Github size={40} />
              </a>
              <a 
                href="/DEV2.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-yellow-500 transition-colors"
                aria-label="Download CV"
              >
                <FileText size={40} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;