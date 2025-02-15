import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { MoveDiagonal } from "lucide-react";

export const Example = () => {
  return (
    <div id="projects" className="">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <p className="text-4xl sm:text-8xl pt-5 flex items-center">
        WORKS <MoveDiagonal className="w-[1.2em] h-[1.2em]" strokeWidth={0.5} />
      </p>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <a
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 cursor-pointer"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-end">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </a>
  );
};

export default Example;

const cards = [
  {
    url: "/fleets.png",
    title: "Fleets fix",
    id: 1,
    link: "https://fleetsfix.com",
  },
  {
    url: "/underblue.png",
    title: "Underblu",
    id: 2,
    link: "https://underblu.vercel.app/",
  },
  {
    url: "/wizads.png",
    title: "Wizads",
    id: 3,
    link: "https://wizads-dma.vercel.app/",
  },
  {
    url: "/duvea.png",
    title: "Duvea",
    id: 4,
    link: "https://duvea.vercel.app/",
  },
  {
    url: "/sunny.png",
    title: "Sunny canopy",
    id: 5,
    link: "https://sunnycanopy.in/",
  },
  {
    url: "/thameem.png",
    title: "Thameem portfolio",
    id: 6,
    link: "https://thameemfolio.vercel.app/",
  },
  {
    url: "/vemr.png",
    title: "Vision emarat",
    id: 7,
    link: "https://vision-emarat-2023.netlify.app/",
  },
];
