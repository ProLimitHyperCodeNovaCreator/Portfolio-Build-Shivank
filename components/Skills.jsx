import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import PixelCard from "./PixelCard/PixelCard";

// Logo mapping for skills (corrected folder name)
const skillLogos = {
  "C++": "/shivank_icons/c++.svg",
  "Python": "/shivank_icons/python.svg",
  "Bash": "/shivank_icons/bash.svg",
  "ROS": "/shivank_icons/Robot Operating System (ROS).svg",
  "Gazebo": "/shivank_icons/Gazebo.svg",
  "QGroundControl": "/shivank_icons/qgc.png",
  "MAVLink": "/shivank_icons/mavlink.png",
  "Qt Creator": "/shivank_icons/Qt_logo_2016.svg.png",
  "PX4 Autopilot": "/shivank_icons/px4.png",
  "RTAB-Map": "/shivank_icons/RTAB-Map.png",
  "SLAM": "/shivank_icons/slam.png",
  "Microsoft Azure": "/shivank_icons/Microsoft_Azure.svg",
  "Postman": "/shivank_icons/postman.svg",
  "I2C": "/shivank_icons/i2c.png",
  "u-center": "/shivank_icons/U-blox_logo.svg",
 "Docker": "/shivank_icons/docker.svg",
  "Git": "/shivank_icons/git.svg",
  "UART": "/shivank_icons/uart.png",
  "CAN Bus": "/shivank_icons/can.png",
  "Micro XRCE-DDS": "/shivank_icons/micro-xrce.png",
  "Visual-Inertial Odometry": "/shivank_icons/vio.png",
  "Matlab": "/shivank_icons/matlab.svg"
};

const skillsData = [
  {
    title: "Programming Languages",
    items: ["C++", "Python", "Bash"],
  },
  {
    title: "Software & Simulation",
    items: [
      "ROS",
      "Gazebo",
      "QGroundControl",
      "MAVLink",
      "Qt Creator",
      "Matlab"
    ],
  },
  {
    title: "Autonomy & Control",
    items: [
      "PX4 Autopilot",
      "RTAB-Map",
      "Visual-Inertial Odometry",
      "SLAM",
    ],
  },
  {
    title: "DevOps and Tools",
    items: [
      "Microsoft Azure",
      "Docker",
      "Git",
      "Postman",
    ],
  },
  {
    title: "Communication Protocols",
    items: ["UART", "I2C", "CAN Bus", "u-center","Micro XRCE-DDS"],
  },
];


const Skills = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  // Scroll-based transforms
  const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Container animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Card animations
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  // Skill item animations
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    }),
  };

  // Hover animations for cards
  const cardHoverVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20 bg-black w-full text-white overflow-hidden"
    >
      {/* Animated Title */}
      <motion.div
        ref={titleRef}
        style={{ y: titleY, opacity: titleOpacity }}
        className="text-center mb-8 sm:mb-12 lg:mb-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider relative"
        >
          SKILLS
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-red-500 w-20 sm:w-24 md:w-32"
          />
        </motion.h2>
      </motion.div>


      {/* Skills Flex Layout */}
      <div className="flex flex-col gap-8 w-full items-center">
        {/* First row: 3 cards, centered */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full">
          {skillsData.slice(0, 3).map((skill, cardIndex) => (
            <motion.div
              key={skill.title}
              variants={cardVariants}
              whileHover="hover"
              className="w-full max-w-lg"
            >
              <motion.div
                variants={cardHoverVariants}
                className="w-full h-full"
              >
                <PixelCard
                  variant="pink"
                  className="w-full min-h-[320px] sm:h-[440px] p-4 sm:p-6 relative overflow-hidden"
                >
                  {/* Background gradient animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    transition={{ delay: cardIndex * 0.2, duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg"
                  />
                  <div className="relative z-10 flex flex-col justify-between  items-center h-full text-white text-center">
                    {/* Card Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: cardIndex * 0.15 + 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-lg sm:text-xl lg:text-2xl font-semibold  w-full border-b border-white pb-2 mb-3"
                    >
                      {skill.title}
                    </motion.h3>
                    {/* Skills List */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ staggerChildren: 0.03, delayChildren: cardIndex * 0.15 + 0.4 }}
                      className="flex-1 flex items-center  w-full"
                    >
                      <motion.div
                        className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed w-full space-y-3"
                      >
                        {skill.items.map((item, index) => (
                          <motion.div
                            key={index}
                            custom={index}
                            variants={itemVariants}
                            whileHover={{ 
                              color: "#ffffff",
                              scale: 1.05,
                              transition: { duration: 0.2 }
                            }}
                            className="flex items-center gap-3 mx-1 my-1 px-2 py-2 transition-colors duration-200 hover:bg-white/5 rounded-lg"
                          >
                            {/* Logo on the left */}
                            {skillLogos[item] ? (
                              <img
                                src={skillLogos[item]}
                                alt={item + ' logo'}
                                className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                                style={{ background: 'white', borderRadius: '0.25rem' }}
                                onError={e => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex-shrink-0 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {item.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            {/* Text */}
                            <span className="flex-1 text-left">{item}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </PixelCard>
              </motion.div>
            </motion.div>
          ))}
        </div>
        {/* Second row: 2 cards, centered */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full">
          {skillsData.slice(3, 5).map((skill, cardIndex) => (
            <motion.div
              key={skill.title}
              variants={cardVariants}
              whileHover="hover"
              className="w-full max-w-lg"
            >
              <motion.div
                variants={cardHoverVariants}
                className="w-full h-full"
              >
                <PixelCard
                  variant="pink"
                  className="w-full min-h-[320px] sm:h-[440px] p-4 sm:p-6 relative overflow-hidden"
                >
                  {/* Background gradient animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    transition={{ delay: (cardIndex+3) * 0.2, duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg"
                  />
                  <div className="relative z-10 flex flex-col justify-between  items-center h-full text-white text-center">
                    {/* Card Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (cardIndex+3) * 0.15 + 0.2, duration: 0.6 }}
                      viewport={{ once: true }}
                      className="text-lg sm:text-xl lg:text-2xl font-semibold  w-full border-b border-white pb-2 mb-3"
                    >
                      {skill.title}
                    </motion.h3>
                    {/* Skills List */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ staggerChildren: 0.03, delayChildren: (cardIndex+3) * 0.15 + 0.4 }}
                      className="flex-1 flex items-center  w-full"
                    >
                      <motion.div
                        className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed w-full space-y-3"
                      >
                        {skill.items.map((item, index) => (
                          <motion.div
                            key={index}
                            custom={index}
                            variants={itemVariants}
                            whileHover={{ 
                              color: "#ffffff",
                              scale: 1.05,
                              transition: { duration: 0.2 }
                            }}
                            className="flex items-center gap-3 mx-1 my-1 px-2 py-2 transition-colors duration-200 hover:bg-white/5 rounded-lg"
                          >
                            {/* Logo on the left */}
                            {skillLogos[item] ? (
                              <img
                                src={skillLogos[item]}
                                alt={item + ' logo'}
                                className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                                style={{ background: 'white', borderRadius: '0.25rem' }}
                                onError={e => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex-shrink-0 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {item.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            {/* Text */}
                            <span className="flex-1 text-left">{item}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </PixelCard>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Skills;