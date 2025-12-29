import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-primary/15 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-glow-secondary/10 rounded-full blur-[100px]" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
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
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Full Stack Developer focused on performance, simplicity, and real-world products.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <Button variant="hero" size="lg" asChild>
              <a href="#contact">
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#projects">
                View Projects
              </a>
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-3 pt-4 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
            <div className="h-px w-8 bg-border" />
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
            <div className="h-px w-8 bg-border" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
        <span className="text-xs text-muted-foreground font-mono">scroll</span>
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-scroll-indicator" />
      </div>
    </section>
  );
};

export default Hero;