import { Code2, Server, Database, Wrench, Palette } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInWhenVisible, StaggerChildren, StaggerItem } from "@/components/ui/motion-effects";
import { SpotlightCard } from "@/components/ui/spotlight";
import { useRef, useMemo, memo } from "react";

// Static data moved outside component
const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Supabase", "Firebase", "Prisma", "JWT Auth"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase DB"],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: ["Git & GitHub", "Linux", "Docker", "Vercel", "Netlify", "AWS", "CI/CD", "Nginx"],
  },
  {
    title: "Design & UI/UX",
    icon: Palette,
    skills: ["Figma", "Adobe Photoshop", "Adobe Illustrator", "UI/UX Design", "Responsive Design", "Prototyping"],
  },
] as const;

const TAGS = ["Performance-focused", "Clean Architecture", "Problem Solver", "Agile Methodology"] as const;

// Seeded random for deterministic values
const seededRandom = (seed: number, i: number) => 
  ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;

const Skills = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // Floating particles - deterministic
  const floatingOrbs = useMemo(() => {
    const seed = 88;
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: `${15 + seededRandom(seed, i) * 70}%`,
      top: `${10 + seededRandom(seed, i + 10) * 80}%`,
      size: 60 + seededRandom(seed, i + 20) * 100,
      delay: seededRandom(seed, i + 30) * 5,
      duration: 15 + seededRandom(seed, i + 40) * 10,
    }));
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-32 relative bg-secondary/30 dark:bg-card/50 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {floatingOrbs.map((orb) => (
          <motion.div
            key={orb.id}
            className="absolute rounded-full bg-gradient-to-br from-primary/10 to-glow-secondary/5 blur-3xl"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.size,
              height: orb.size,
              y: bgY,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground)/0.06)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black_40%,transparent_100%)]" />
      </div>
      <div className="container px-5 sm:px-6 md:px-6">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible>
            <h2 className="text-base md:text-lg font-mono text-primary mb-6 tracking-wider uppercase">
              Skills & Tools
            </h2>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.1}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Technologies I{" "}
              <span className="text-gradient">Work With</span>
            </h3>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.2}>
            <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 md:mb-16 max-w-3xl">
              I use the latest tools and technologies to build functional and scalable products.
            </p>
          </FadeInWhenVisible>
          
          {/* Skill Cards Grid */}
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8" staggerDelay={0.1}>
            {SKILL_CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              return (
                <StaggerItem key={category.title}>
                  <SpotlightCard className="h-full p-5 sm:p-6 md:p-8">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <motion.div
                          className="p-2 sm:p-3 rounded-xl bg-primary/10 text-primary"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        </motion.div>
                        <h4 className="font-semibold text-lg sm:text-xl md:text-2xl">{category.title}</h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {(category.skills as unknown as string[]).map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base bg-secondary/80 text-secondary-foreground rounded-lg border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-200"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + index * 0.1 + skillIndex * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
          
          {/* Tags */}
          <FadeInWhenVisible delay={0.5}>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 mt-10 sm:mt-12 md:mt-16">
              {TAGS.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg font-medium text-primary border border-primary/30 rounded-full bg-primary/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;