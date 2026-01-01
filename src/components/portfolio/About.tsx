import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInWhenVisible, StaggerChildren, StaggerItem } from "@/components/ui/motion-effects";
import { SpotlightCard } from "@/components/ui/spotlight";
import { useRef, useMemo, memo } from "react";

// Static data moved outside component to prevent recreation
const STATS = [
  { number: "3+", label: "Years Experience" },
  { number: "20+", label: "Projects Built" },
  { number: "10+", label: "Happy Clients" },
] as const;

// Seeded random for deterministic floating shapes
const seededRandom = (seed: number, i: number) => 
  ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;

const About = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  
  // Subtle floating shapes for depth - deterministic
  const floatingShapes = useMemo(() => {
    const seed = 55;
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      left: `${15 + i * 22}%`,
      top: `${25 + seededRandom(seed, i) * 50}%`,
      size: 150 + seededRandom(seed, i + 10) * 200,
      delay: i * 2,
      duration: 18 + seededRandom(seed, i + 20) * 10,
    }));
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-32 relative overflow-hidden"
    >
      {/* Clean subtle background */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle floating gradient orbs */}
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute rounded-full opacity-20"
            style={{
              left: shape.left,
              top: shape.top,
              width: shape.size,
              height: shape.size,
              background: `radial-gradient(circle, hsl(var(--primary) / 0.1), transparent 70%)`,
              y: bgY,
            }}
            animate={{
              x: [0, 15, -10, 0],
              y: [0, -20, 10, 0],
              scale: [1, 1.05, 0.98, 1],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Subtle gradient accents */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-glow-secondary/5 rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_30%,transparent_100%)]" />
      </div>

      <div className="container px-5 sm:px-6 md:px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInWhenVisible>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-mono text-primary bg-primary/10 rounded-full mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-primary" />
              About Me
            </span>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.1}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 md:mb-10 leading-tight">
              Building{" "}
              <span className="text-gradient">Digital Experiences</span>
            </h3>
          </FadeInWhenVisible>
          
          <StaggerChildren className="space-y-5 sm:space-y-6 md:space-y-8 text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed" staggerDelay={0.15}>
            <StaggerItem>
              <p>
                I'm a full stack developer who enjoys building clean, performant, and scalable web applications. 
                I focus on writing readable code, designing intuitive interfaces, and solving real-world problems with technology.
              </p>
            </StaggerItem>
            
            <StaggerItem>
              <p>
                I like working across the stack — from crafting responsive frontends to building robust backend systems.
                My goal is to create products that are not only functional but also delightful to use.
              </p>
            </StaggerItem>
          </StaggerChildren>
          
          {/* Stats */}
          <FadeInWhenVisible delay={0.4}>
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-12 md:mt-16 pt-10 sm:pt-12 md:pt-16 border-t border-border/50">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gradient"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2 group-hover:text-foreground transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;