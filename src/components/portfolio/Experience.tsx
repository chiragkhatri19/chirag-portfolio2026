import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2022 - Present",
    description: "Building responsive web applications for clients. Working with modern technologies including React, Node.js, and cloud services.",
    highlights: [
      "Built 20+ responsive web applications",
      "Implemented secure authentication systems",
      "Optimized performance for high-traffic applications",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Contract Projects",
    period: "2021 - 2022",
    description: "Focused on creating clean user interfaces and improving user experience across multiple projects.",
    highlights: [
      "Developed responsive UI components",
      "Integrated RESTful APIs",
      "Collaborated with design teams",
    ],
  },
  {
    role: "Web Developer",
    company: "Self-Employed",
    period: "2020 - 2021",
    description: "Started my journey building websites and learning modern web development practices.",
    highlights: [
      "Learned HTML, CSS, JavaScript fundamentals",
      "Built first full-stack applications",
      "Explored various frameworks and libraries",
    ],
  },
];

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 md:py-32 relative bg-card/50"
    >
      <div className="container px-4 md:px-6">
        <div className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Experience
          </h2>
          
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 leading-tight">
            My{" "}
            <span className="text-gradient">Journey</span>
          </h3>
          
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-border" />
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={exp.role + exp.company}
                  className={`relative pl-8 md:pl-12 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-4 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background" />
                  
                  <div className="space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                      <h4 className="font-semibold text-lg">
                        {exp.role}{" "}
                        <span className="text-muted-foreground font-normal">
                          @ {exp.company}
                        </span>
                      </h4>
                      <span className="text-sm font-mono text-primary">
                        {exp.period}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground">
                      {exp.description}
                    </p>
                    
                    <ul className="space-y-1.5">
                      {exp.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1.5">▹</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;