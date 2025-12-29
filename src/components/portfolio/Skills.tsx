import { useEffect, useRef, useState } from "react";
import { Code2, Server, Database, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express.js", "REST APIs", "Supabase", "Firebase"],
  },
  {
    title: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: ["Git & GitHub", "Linux", "Docker", "Vercel", "Netlify"],
  },
];

const tags = ["Performance-focused", "Clean Architecture", "Problem Solver"];

const Skills = () => {
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
      id="skills"
      className="py-24 md:py-32 relative bg-card/50"
    >
      <div className="container px-4 md:px-6">
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
            Skills & Tools
          </h2>
          
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Technologies I{" "}
            <span className="text-gradient">Work With</span>
          </h3>
          
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl">
            I use the latest tools and technologies to build functional and scalable products.
          </p>
          
          {/* Skill Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className={`p-6 rounded-xl border border-border bg-card card-hover transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-lg">{category.title}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-secondary/80 text-secondary-foreground rounded-md border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Tags */}
          <div className={`flex flex-wrap justify-center gap-4 mt-12 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-full bg-primary/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;