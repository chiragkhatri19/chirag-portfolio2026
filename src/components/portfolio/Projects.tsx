import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Full Stack Web Application",
    description: "A comprehensive web application with user authentication, real-time data sync, and responsive design. Built for scalability and performance.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    link: "#",
    github: "#",
  },
  {
    title: "Authentication System",
    description: "Secure authentication system with JWT tokens, OAuth integration, and role-based access control. Implements best security practices.",
    tech: ["Next.js", "Supabase", "TypeScript"],
    link: "#",
    github: "#",
  },
  {
    title: "API-based Project",
    description: "RESTful API service with comprehensive documentation, rate limiting, and caching. Designed for high throughput and reliability.",
    tech: ["Express.js", "Redis", "MongoDB", "Docker"],
    link: "#",
    github: "#",
  },
  {
    title: "SaaS-style Dashboard",
    description: "Modern analytics dashboard with interactive charts, real-time updates, and customizable widgets. Clean and intuitive interface.",
    tech: ["React", "TypeScript", "Recharts", "Firebase"],
    link: "#",
    github: "#",
  },
];

const Projects = () => {
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
      id="projects"
      className="py-24 md:py-32 relative"
    >
      <div className="container px-4 md:px-6">
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Projects
          </h2>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Featured{" "}
              <span className="text-gradient">Work</span>
            </h3>
            
            <Button variant="ghost" className="mt-4 md:mt-0 group">
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group relative p-6 rounded-xl border border-border bg-card card-hover transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <h4 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono bg-secondary/80 text-muted-foreground rounded border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" asChild className="h-8 px-3">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1.5" />
                        Code
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="h-8 px-3">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1.5" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;