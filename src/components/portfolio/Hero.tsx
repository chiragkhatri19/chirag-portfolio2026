import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown, ArrowRight } from "lucide-react";
import { useParallax } from "@/hooks/use-parallax";
import { useMemo } from "react";

const Hero = () => {
  const parallaxRef = useParallax(0.3);

  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 10}s`,
      size: `${2 + Math.random() * 2}px`,
    }));
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Complex animated background */}
      <div className="hero-bg">
        {/* Mesh gradient - main color layer */}
        <div className="mesh-gradient" />
        
        {/* Floating organic shapes */}
        <div className="floating-shape floating-shape-1" />
        <div className="floating-shape floating-shape-2" />
        <div className="floating-shape floating-shape-3" />
        
        {/* Grid pattern */}
        <div className="grid-pattern" />
        
        {/* Glowing lines */}
        <div className="glow-line glow-line-1" />
        <div className="glow-line glow-line-2" />
        
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
        
        {/* Noise texture */}
        <div className="noise-overlay" />
      </div>
      
      <div ref={parallaxRef} className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 page-transition">
          {/* Status badge */}
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "0s" }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm text-sm text-primary font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for work
            </span>
          </div>

          {/* Main heading */}
          <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Hey, I'm{" "}
              <span className="text-gradient">Chirag</span>{" "}
              <span className="inline-block animate-float">👋</span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="max-w-2xl space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90">
              I build scalable web apps &{" "}
              <span className="text-gradient">clean user experiences.</span>
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Full Stack Developer focused on performance, simplicity, and real-world products.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Button variant="hero" size="lg" asChild className="magnetic-btn group">
              <a href="#contact">
                <Mail className="w-5 h-5" />
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild className="magnetic-btn">
              <a href="#projects">
                View Projects
              </a>
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4 pt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
            <Button variant="social" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="social" size="icon" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="social" size="icon" asChild>
              <a href="mailto:chirag@example.com" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
        <span className="text-xs text-muted-foreground font-mono tracking-widest uppercase">scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
};

export default Hero;