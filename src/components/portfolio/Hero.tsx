import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useMemo, useState, useRef, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { FlipWords } from "@/components/ui/text-generate-effect";
import { BackgroundBeams } from "@/components/ui/background-effects";

// Memoized social links to prevent recreation
const SOCIAL_LINKS = [
  { href: "https://github.com/chiragkhatri19", icon: FaGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/chiragk19/", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "mailto:chirag.khatri@example.com", icon: HiMail, label: "Email" },
] as const;

const FLIP_WORDS = ["scalable web apps", "clean user experiences", "modern interfaces", "robust backends"] as const;

// Memoized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const Hero = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  // Mouse position for reveal effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for mouse follow - optimized stiffness for performance
  const springConfig = useMemo(() => ({ stiffness: 150, damping: 20 }), []);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Memoized mouse move handler to prevent recreation
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);
  
  const handleMouseEnter = useCallback(() => {}, []);
  const handleMouseLeave = useCallback(() => {}, []);

  // Create the mask template for the water reveal effect - soft blurred edges
  const maskTemplate = useMotionTemplate`radial-gradient(circle 350px at ${springX}px ${springY}px, transparent 0%, transparent 15%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 75%, black 90%, black 100%)`;
  
  // Generate random particles - seeded for consistency, reduced count for performance
  const particles = useMemo(() => {
    const seed = 42;
    const random = (i: number) => ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${random(i) * 100}%`,
      delay: `${random(i + 100) * 12}s`,
      duration: `${12 + random(i + 200) * 8}s`,
      size: `${2 + random(i + 300) * 4}px`,
    }));
  }, []);

  // Bubbles for underwater effect - reduced for performance
  const bubbles = useMemo(() => {
    const seed = 73;
    const random = (i: number) => ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${5 + random(i) * 90}%`,
      delay: `${random(i + 100) * 10}s`,
      duration: `${10 + random(i + 200) * 8}s`,
      size: `${5 + random(i + 300) * 12}px`,
    }));
  }, []);

  return (
    <Spotlight containerClassName="relative min-h-screen" className="min-h-screen flex items-center justify-center">
      <section 
        ref={sectionRef}
        id="hero" 
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background Effects */}
        <BackgroundBeams />
      
      {/* Complex animated background */}
      <div className="hero-bg">
        {/* Mesh gradient - main color layer */}
        <div className="mesh-gradient" />
        
        {/* Floating organic shapes */}
        <div className="floating-shape floating-shape-1" />
        <div className="floating-shape floating-shape-2" />
        <div className="floating-shape floating-shape-3" />
        <div className="floating-shape floating-shape-4" />
        
        {/* Grid pattern */}
        <div className="grid-pattern" />
        
        {/* Floating particles */}
        <div className="particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: particle.left,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                width: particle.size,
                height: particle.size,
              }}
            />
          ))}
        </div>

        {/* Underwater bubbles - behind water layer */}
        <div className="bubbles">
          {bubbles.slice(0, 10).map((bubble) => (
            <div
              key={`bubble-${bubble.id}`}
              className="bubble"
              style={{
                left: bubble.left,
                animationDelay: bubble.delay,
                animationDuration: bubble.duration,
                width: bubble.size,
                height: bubble.size,
              }}
            />
          ))}
        </div>
        
        {/* Noise texture */}
        <div className="noise-overlay" />
      </div>
      
      {/* Water overlay with mouse-following reveal hole - hidden on mobile/tablet */}
      <motion.div 
        className="water-overlay hidden lg:block"
        style={{
          maskImage: maskTemplate,
          WebkitMaskImage: maskTemplate,
        }}
      />
      
      {/* Bubbles layer - in FRONT of water */}
      <div className="bubbles-front">
        {bubbles.map((bubble) => (
          <div
            key={`bubble-front-${bubble.id}`}
            className="bubble"
            style={{
              left: bubble.left,
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
              width: bubble.size,
              height: bubble.size,
            }}
          />
        ))}
      </div>
      
        {/* Text content - underwater by default */}
        <div className="container px-5 sm:px-6 md:px-6 max-w-6xl relative z-10">
          <motion.div
            className="flex flex-col items-center text-center space-y-5 sm:space-y-6 md:space-y-10 py-6 md:py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
          {/* Status badge */}
          <motion.div variants={itemVariants}>
            <motion.span
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-white/80 dark:bg-background/70 backdrop-blur-md text-sm md:text-base text-primary font-medium shadow-lg shadow-primary/10 dark:shadow-primary/5"
              whileHover={{ scale: 1.08, borderColor: "hsl(var(--primary))" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              Available for work
            </motion.span>
          </motion.div>

          {/* Main heading - LARGER and more prominent */}
          <motion.div className="space-y-4 md:space-y-6" variants={itemVariants}>
            <h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[1.1] sm:leading-tight"
            >
              Hey, I'm{" "}
              <span className="text-gradient">Chirag</span>{" "}
              <motion.span
                className="inline-block"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                👋
              </motion.span>
            </h1>
          </motion.div>
          
          {/* Subtitle with FlipWords - LARGER */}
          <motion.div className="max-w-4xl space-y-3 sm:space-y-4 md:space-y-6" variants={itemVariants}>
            <p className="text-xl sm:text-2xl md:text-4xl font-semibold text-foreground leading-relaxed">
              I build <FlipWords words={FLIP_WORDS as unknown as string[]} duration={3000} />
            </p>
            <p className="text-base sm:text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Full Stack Developer focused on performance, simplicity, and real-world products.
            </p>
          </motion.div>
          
          {/* CTA Buttons - Enhanced hover animations */}
          <motion.div
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 pt-2 sm:pt-4 w-full sm:w-auto"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-full sm:w-auto"
            >
              <Button variant="hero" size="lg" asChild className="magnetic-btn group relative overflow-hidden shadow-xl text-base md:text-lg px-6 sm:px-8 md:px-10 h-12 sm:h-14 md:h-16 rounded-xl w-full sm:w-auto">
                <a href="#contact" className="relative z-10">
                  <span className="absolute -inset-1 bg-gradient-to-r from-primary via-glow-secondary to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl blur-sm" />
                  <span className="relative flex items-center gap-2">
                    <HiMail className="w-5 h-5 md:w-6 md:h-6" />
                    Get in Touch
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-full sm:w-auto"
            >
              <Button variant="heroOutline" size="lg" asChild className="magnetic-btn group relative overflow-hidden shadow-xl text-base md:text-lg px-6 sm:px-8 md:px-10 h-12 sm:h-14 md:h-16 rounded-xl border-2 hover:border-primary hover:bg-primary/10 transition-all duration-300 w-full sm:w-auto">
                <a href="#projects" className="relative z-10">
                  <span className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-glow-secondary/20 to-primary/30 bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-xl blur-sm" />
                  <span className="relative">View Projects</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Social Links - Bigger with bold icons */}
          <motion.div
            className="flex items-center gap-3 sm:gap-5 md:gap-8 pt-4 sm:pt-6 md:pt-8"
            variants={itemVariants}
          >
            <div className="h-px w-8 sm:w-12 md:w-20 bg-gradient-to-r from-transparent to-border hidden sm:block" />
            {SOCIAL_LINKS.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="social" size="icon" asChild className="shadow-lg w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-xl sm:rounded-2xl hover:bg-primary/15 hover:border-primary transition-all duration-300">
                  <a href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={social.label}>
                    <social.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
                  </a>
                </Button>
              </motion.div>
            ))}
            <div className="h-px w-8 sm:w-12 md:w-20 bg-gradient-to-l from-transparent to-border hidden sm:block" />
          </motion.div>
          </motion.div>
        </div>
      </section>
    </Spotlight>
  );
});

Hero.displayName = 'Hero';

export default Hero;