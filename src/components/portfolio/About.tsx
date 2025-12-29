import { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 relative"
    >
      <div className="container px-4 md:px-6">
        <div className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            About Me
          </h2>
          
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            Building{" "}
            <span className="text-gradient">Digital Experiences</span>
          </h3>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              I'm a full stack developer who enjoys building clean, performant, and scalable web applications. 
              I focus on writing readable code, designing intuitive interfaces, and solving real-world problems with technology.
            </p>
            
            <p className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              I like working across the stack — from crafting responsive frontends to building robust backend systems.
              My goal is to create products that are not only functional but also delightful to use.
            </p>
          </div>
          
          {/* Stats or highlights */}
          <div className={`grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-gradient">3+</div>
              <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-gradient">20+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects Built</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-bold text-gradient">10+</div>
              <div className="text-sm text-muted-foreground mt-1">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;