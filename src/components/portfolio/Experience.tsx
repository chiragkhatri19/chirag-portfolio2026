import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInWhenVisible, StaggerChildren, StaggerItem } from "@/components/ui/motion-effects";
import { useRef, useMemo, memo } from "react";

// Static data moved outside component
const EXPERIENCES = [
  {
    role: "Full Stack Developer",
    company: "Open Source / Freelance",
    period: "2023 - 2025",
    description: "Building and deploying full-stack web applications for clients worldwide. Contributing to open source projects and collaborating with global developer communities.",
    highlights: [
      "Developed and deployed 15+ production-ready web applications",
      "Built scalable APIs with Node.js, Express, and PostgreSQL",
      "Contributed to popular open source projects on GitHub",
      "Implemented CI/CD pipelines and cloud deployments on AWS & Vercel",
    ],
  },
  {
    role: "Marketing Intern",
    company: "Monster Energy",
    period: "2022 (3 months)",
    description: "Assisted the marketing team with digital campaigns, event coordination, and brand promotion strategies for one of the world's leading energy drink brands.",
    highlights: [
      "Supported digital marketing campaigns across social media platforms",
      "Coordinated promotional events and brand activations",
      "Analyzed campaign performance metrics and prepared reports",
      "Collaborated with cross-functional teams on marketing initiatives",
    ],
  },
  {
    role: "Web Developer & Video Editor",
    company: "Freelance",
    period: "2021 - 2022",
    description: "Started my professional journey offering web development and video editing services to small businesses and content creators.",
    highlights: [
      "Created responsive websites for local businesses and startups",
      "Produced and edited promotional videos and social media content",
      "Managed client relationships and project deliveries",
      "Learned modern web technologies including React and Tailwind CSS",
    ],
  },
] as const;

// Seeded random for deterministic values
const seededRandom = (seed: number, i: number) => 
  ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;

const Experience = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Animated light beams - deterministic
  const lightBeams = useMemo(() => {
    const seed = 99;
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: `${20 + i * 20}%`,
      delay: i * 2,
      duration: 10 + seededRandom(seed, i) * 5,
    }));
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-32 relative bg-secondary/30 dark:bg-card/50 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle gradient orbs */}
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl"
          style={{ y: bgY }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-glow-secondary/8 to-transparent blur-3xl"
          style={{ y: bgY }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Horizontal light beams */}
        {lightBeams.map((beam) => (
          <motion.div
            key={beam.id}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{ top: beam.top }}
            animate={{ opacity: [0, 0.5, 0], x: ["-100%", "100%"] }}
            transition={{
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      <div className="container px-5 sm:px-6 md:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInWhenVisible>
            <h2 className="text-base md:text-lg font-mono text-primary mb-6 tracking-wider uppercase">
              Experience
            </h2>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.1}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-10 sm:mb-12 md:mb-14 leading-tight">
              My{" "}
              <span className="text-gradient">Journey</span>
            </h3>
          </FadeInWhenVisible>
          
          {/* Timeline */}
          <div className="relative">
            <StaggerChildren className="space-y-8 sm:space-y-10 md:space-y-12" staggerDelay={0.2}>
              {EXPERIENCES.map((exp, index) => (
                <StaggerItem key={exp.role + exp.company}>
                  <motion.div
                    className="relative pl-6 sm:pl-8 md:pl-10 border-l-2 border-border/50 hover:border-primary/50 transition-colors duration-300"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Timeline pointer */}
                    <div className="absolute left-0 top-1 -translate-x-[calc(50%+1px)]">
                      <motion.div
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-background border-2 sm:border-[3px] border-primary shadow-lg shadow-primary/20"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.2, type: "spring", stiffness: 200 }}
                      />
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex flex-col gap-1 sm:gap-2 md:flex-row md:items-center md:justify-between">
                        <motion.h4
                          className="font-semibold text-lg sm:text-xl md:text-2xl"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          {exp.role}{" "}
                          <span className="text-muted-foreground font-normal">
                            @ {exp.company}
                          </span>
                        </motion.h4>
                        <motion.span
                          className="text-sm sm:text-base font-mono text-primary"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {exp.period}
                        </motion.span>
                      </div>
                      
                      <motion.p
                        className="text-base sm:text-lg md:text-xl text-muted-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {exp.description}
                      </motion.p>
                      
                      <ul className="space-y-2 sm:space-y-3">
                        {(exp.highlights as unknown as string[]).map((highlight, hIndex) => (
                          <motion.li
                            key={highlight}
                            className="text-sm sm:text-base md:text-lg text-muted-foreground flex items-start gap-2 sm:gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1 + hIndex * 0.05 }}
                          >
                            <motion.span
                              className="text-primary mt-0.5 sm:mt-1 text-base sm:text-lg"
                              whileHover={{ scale: 1.2, x: 2 }}
                            >
                              ▹
                            </motion.span>
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;