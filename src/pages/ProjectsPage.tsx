import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/components/portfolio/Projects";
import { ProjectModal } from "@/components/ui/project-modal";
import Navbar from "@/components/portfolio/Navbar";
import CustomCursor from "@/components/portfolio/CustomCursor";
import Footer from "@/components/portfolio/Footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const ProjectsPage = () => {
  useScrollToTop();
  useSmoothScroll();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const pageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Get all unique technologies
  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => techs.add(t)));
    return Array.from(techs).sort();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.tech.includes(filter));
  }, [filter]);

  // Animated particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 10,
    }));
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          {/* Mesh gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
          
          <motion.div
            className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[120px]"
            style={{ y: bgY }}
            animate={{ scale: [1, 1.15, 1], x: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-glow-secondary/6 rounded-full blur-[100px]"
            style={{ y: bgY }}
            animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-primary/30"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, 25, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="container px-4 md:px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <Button variant="ghost" className="mb-8 group text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 text-base font-mono text-primary bg-primary/10 rounded-full mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              Portfolio
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              All <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl leading-relaxed">
              A collection of projects I've built, from full-stack applications to APIs and dashboards.
              Click on any project to learn more.
            </p>
          </motion.div>

          {/* Filter Tags */}
          <motion.div
            className="flex flex-wrap gap-3 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              className={`px-5 py-2.5 rounded-xl text-base font-medium transition-all ${
                filter === "all"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground backdrop-blur-sm"
              }`}
              onClick={() => setFilter("all")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </motion.button>
            {allTechs.slice(0, 8).map((tech) => (
              <motion.button
                key={tech}
                className={`px-5 py-2.5 rounded-xl text-base font-medium transition-all ${
                  filter === tech
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground backdrop-blur-sm"
                }`}
                onClick={() => setFilter(tech)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-28 relative">
        {/* Subtle background continuation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-background" />
        </div>
        
        <div className="container px-4 md:px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-8 lg:gap-10"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    layout: { duration: 0.4 }
                  }}
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleProjectClick(project)}
                >
                  {/* Card blur background */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 via-primary/5 to-glow-secondary/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div
                    className="relative rounded-3xl border border-primary/10 dark:border-border/50 bg-white/80 dark:bg-card/80 backdrop-blur-xl h-full cursor-pointer shadow-lg shadow-primary/5 dark:shadow-black/5 overflow-hidden"
                    whileHover={{ y: -10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Project Image */}
                    {project.image && (
                      <div className="relative h-48 md:h-56 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      </div>
                    )}
                    
                    {/* Hover glow overlay */}
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-glow-secondary/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Accent line */}
                    <motion.div
                      className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{
                        scaleX: hoveredIndex === index ? 1 : 0,
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Content */}
                    <div className={`relative z-10 ${project.image ? 'p-6 md:p-8' : 'p-8 md:p-10'}`}>
                      {/* Year & Role badges */}
                      <div className="flex items-center gap-3 mb-5">
                        {project.year && (
                          <span className="inline-block px-4 py-1.5 text-sm font-mono text-primary bg-primary/10 rounded-full">
                            {project.year}
                          </span>
                        )}
                        {project.role && (
                          <span className="inline-block px-4 py-1.5 text-sm text-muted-foreground bg-secondary/50 rounded-full">
                            {project.role}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2.5 mb-8">
                        {project.tech.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-3.5 py-1.5 text-sm font-mono bg-secondary/60 text-foreground/80 rounded-lg border border-border/50 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 5 && (
                          <span className="px-3.5 py-1.5 text-sm font-mono text-muted-foreground">
                            +{project.tech.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-6 h-6" />
                        </motion.a>
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-6 h-6" />
                        </motion.a>
                        <motion.span 
                          className="ml-auto text-base font-medium text-primary"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: hoveredIndex === index ? 1 : 0,
                            x: hoveredIndex === index ? 0 : -10
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          View Details →
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-2xl text-muted-foreground mb-4">
                No projects found with "{filter}" technology.
              </p>
              <Button
                variant="ghost"
                className="text-lg"
                onClick={() => setFilter("all")}
              >
                Show all projects
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
