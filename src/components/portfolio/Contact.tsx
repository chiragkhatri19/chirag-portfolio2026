import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInWhenVisible } from "@/components/ui/motion-effects";
import { SpotlightCard } from "@/components/ui/spotlight";
import { useState, useRef, useMemo, useCallback, memo } from "react";

// Static data moved outside component
const SOCIAL_LINKS = [
  { href: "https://github.com/chiragkhatri19", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/chiragk19/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:chirag@example.com", icon: Mail, label: "Email" },
] as const;

// Seeded random for deterministic particles
const seededRandom = (seed: number, i: number) => 
  ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;

const Contact = memo(() => {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Memoized handlers to prevent recreation
  const handleFocus = useCallback((field: string) => () => setFocusedInput(field), []);
  const handleBlur = useCallback(() => setFocusedInput(null), []);

  // Floating particles - deterministic
  const particles = useMemo(() => {
    const seed = 77;
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${seededRandom(seed, i) * 100}%`,
      delay: seededRandom(seed, i + 100) * 10,
      duration: 15 + seededRandom(seed, i + 200) * 15,
      size: 2 + seededRandom(seed, i + 300) * 4,
    }));
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-32 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        
        {/* Central glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-r from-primary/10 via-glow-secondary/5 to-primary/10 blur-3xl"
          style={{ y: bgY }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Rising particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute bottom-0 w-1 h-1 rounded-full bg-primary/40"
              style={{
                left: particle.left,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                y: ["-10vh", "-110vh"],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container px-5 sm:px-6 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInWhenVisible>
            <h2 className="text-base md:text-lg font-mono text-primary mb-6 tracking-wider uppercase">
              Contact
            </h2>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.1}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              Let's{" "}
              <span className="text-gradient">Work Together</span>
            </h3>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Have a project in mind or just want to chat? Feel free to reach out. 
              I'm always open to discussing new opportunities.
            </p>
          </FadeInWhenVisible>
          
          {/* Contact form card */}
          <FadeInWhenVisible delay={0.3}>
            <motion.div
              className="relative p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-primary/10 dark:border-border bg-white/70 dark:bg-card mb-10 sm:mb-12 md:mb-14 shadow-lg shadow-primary/5 dark:shadow-none"
              whileHover={{ boxShadow: "0 0 60px -15px hsl(var(--primary) / 0.2)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0"
                whileHover={{ opacity: 1 }}
                style={{
                  background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)",
                }}
              />
              
              <form className="space-y-5 sm:space-y-6 md:space-y-8 text-left relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="name" className="text-sm sm:text-base font-medium text-foreground">
                      Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl bg-secondary/30 dark:bg-secondary/50 border border-primary/10 dark:border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      onFocus={handleFocus("name")}
                      onBlur={handleBlur}
                      whileFocus={{ scale: 1.01 }}
                    />
                    {focusedInput === "name" && (
                      <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="email" className="text-sm sm:text-base font-medium text-foreground">
                      Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl bg-secondary/30 dark:bg-secondary/50 border border-primary/10 dark:border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                      onFocus={handleFocus("email")}
                      onBlur={handleBlur}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="message" className="text-sm sm:text-base font-medium text-foreground">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    rows={5}
                    placeholder="Your message here..."
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg rounded-lg sm:rounded-xl bg-secondary/30 dark:bg-secondary/50 border border-primary/10 dark:border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                    onFocus={handleFocus("message")}
                    onBlur={handleBlur}
                    whileFocus={{ scale: 1.005 }}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="hero" size="lg" className="w-full text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 h-auto relative overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-glow-secondary to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity" />
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </FadeInWhenVisible>
          
          {/* Alternative contact */}
          <FadeInWhenVisible delay={0.5}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8">Or reach out directly</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" size="lg" asChild className="gap-2 sm:gap-3 text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 h-auto w-full sm:w-auto">
                    <a
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      {social.label}
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;