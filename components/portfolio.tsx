"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPython,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import React from "react";

const technologies = [
  { name: "JavaScript", icon: SiJavascript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Python", icon: SiPython },
  { name: "PHP", icon: SiPhp },
  { name: "SQL", icon: FaDatabase },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MySQL", icon: SiMysql },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [currentTech, setCurrentTech] = useState(0);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const sectionRefs: { [key: string]: React.RefObject<HTMLElement> } = {
    home: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    contact: useRef(null),
  };

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    }); 

    return () => observer.disconnect();
  }, [observerCallback]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % technologies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const TypedText = ({
    text,
    speed = 160,
  }: {
    text: string;
    speed?: number;
  }) => {
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
      let i = 0;
      let timeoutId: ReturnType<typeof setTimeout>;

      const typingAnimation = () => {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;

        if (i < text.length) {
          timeoutId = setTimeout(typingAnimation, speed);
        }
      };

      typingAnimation();

      // Cleanup timeout on component unmount or when dependencies change
      return () => clearTimeout(timeoutId);
    }, [text, speed]);

    return <span>{displayText}</span>;
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      />

      <header className="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md transition-colors duration-300">
        <nav className="container mx-auto px-6 py-3">
          <ul className="flex justify-center space-x-4">
            {Object.keys(sectionRefs).map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setActiveSection(item);
                    sectionRefs[item].current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className={`capitalize transition-colors duration-300 ${
                    activeSection === item
                      ? "text-blue-400 font-bold"
                      : "text-gray-300 hover:text-blue-400"
                  }`}
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="relative z-10">
        {Object.entries(sectionRefs).map(([id, ref]) => (
          <motion.section
            key={id}
            ref={ref}
            id={id}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`min-h-screen flex flex-col justify-center py-20 ${
              id === "home"
                ? "bg-gradient-to-b from-gray-900 to-blue-900"
                : id === "about"
                ? "bg-gradient-to-b from-blue-900 to-gray-900"
                : id === "projects"
                ? "bg-gradient-to-b from-gray-900 to-blue-900"
                : id === "skills"
                ? "bg-gradient-to-b from-blue-900 to-gray-900"
                : id === "experience"
                ? "bg-gradient-to-b from-gray-900 to-blue-900"
                : "bg-gradient-to-b from-blue-900 to-gray-900"
            }`}
          >
            <div className="container mx-auto px-6">
              {id === "home" && (
                <div className="text-center">
                  <Image
                    src="/profile.png?height=200&width=200"
                    alt="Profile picture"
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-8 border-4 border-blue-500 shadow-lg shadow-blue-500/50"
                  />
                  <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    <TypedText text="Mauricio Donado" />
                  </h1>
                  <p className="text-xl mb-8 text-gray-300">
                    Full Stack Developer
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      sectionRefs.contact.current?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-bold hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/50"
                  >
                    Get in touch
                  </motion.button>
                </div>
              )}

              {id === "about" && (
                <>
                  <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    About Me
                  </h2>
                  <p className="text-lg mb-6 text-gray-300 leading-relaxed">
                    I&#39;m a passionate full-stack developer with over 1 year
                    of experience in creating robust and scalable web
                    applications. My expertise spans across various technologies
                    and frameworks, allowing me to tackle complex problems and
                    deliver high-quality solutions.
                  </p>
                  <p className="text-lg mb-6 text-gray-300 leading-relaxed">
                    When I&#39;m not coding, you can find me exploring new
                    technologies, contributing to open-source projects, or
                    sharing my knowledge through tech blogs and community
                    meetups.
                  </p>
                </>
              )}

              {id === "projects" && (
                <>
                  <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    Projects
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                      {
                        id: 1,
                        title: "Primer Proyecto",
                        description:
                          "E-commerce store built with Html and  CSS. Features include product filtering, sorting, and cart management.",
                        link: "https://frontednstorebydevmauro.netlify.app/",
                      },
                      {
                        id: 2,
                        title: "Segundo Proyecto",
                        description:
                          "The easiest way to access statistical results in the analysis of solar activity. All in an interface made for everyone.",
                        link: "https://lumaweb.vercel.app/es",
                      },
                    ].map((project) => (
                      <motion.div
                        key={project.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-6">
                          {project.description}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md shadow-blue-500/50"
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project
                          </a>
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {id === "skills" && (
                <>
                  <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    Skills
                  </h2>
                  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-8 rounded-lg shadow-lg mb-12">
                    <h3 className="text-2xl font-semibold mb-6 text-blue-400">
                      Tech Stack Carousel
                    </h3>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={technologies[currentTech].name}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center items-center h-32"
                      >
                        {React.createElement(technologies[currentTech].icon, {
                          className: "w-16 h-16 mr-4 text-blue-400",
                        })}
                        <span className="text-2xl text-gray-300">
                          {technologies[currentTech].name}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {technologies.map((tech) => (
                      <motion.div
                        key={tech.name}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300"
                      >
                        <tech.icon className="w-12 h-12 mx-auto mb-2 text-blue-400" />
                        <p className="text-gray-300">{tech.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {id === "experience" && (
                <>
                  <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    Experience
                  </h2>
                  <div className="space-y-8">
                    {[
                      {
                        title: "Junior Developer",
                        company: "JKM Logisticas Integrales S.A.S",
                        period: "2021 - 2023",
                      },
                    ].map((job, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <h3 className="text-2xl font-semibold text-blue-400">
                          {job.title}
                        </h3>
                        <p className="text-gray-300 mt-2">{job.company}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {job.period}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {id === "contact" && (
                <>
                  <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    Contact Me
                  </h2>
                  <form className="max-w-md mx-auto space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full p-3 bg-gray-800 bg-opacity-50 backdrop-blur-lg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-3 bg-gray-800 bg-opacity-50 backdrop-blur-lg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full p-3 bg-gray-800 bg-opacity-50 backdrop-blur-lg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                        placeholder="Hello, I'd like to talk about..."
                      ></textarea>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full font-bold hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/50"
                    >
                      Send Message
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  );
}
