import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Calendar, Users, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  link: string;
  github: string;
  image?: string;
  features?: string[];
  year?: string;
  role?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  originRect?: DOMRect | null;
}

export const ProjectModal = ({ project, isOpen, onClose, originRect }: ProjectModalProps) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 dark:bg-background/80 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content - iOS style card expansion */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-card border border-primary/10 dark:border-border/50 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
              initial={{
                scale: 0.8,
                opacity: 0,
                y: 50,
                borderRadius: 24,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                borderRadius: 24,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
                y: 30,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Header with image or gradient */}
              <div className="relative h-56 md:h-72 overflow-hidden">
                {/* Project cover image or fallback gradient */}
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-glow-secondary/20" />
                    {/* Animated background pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%),
                                          radial-gradient(circle at 80% 50%, hsl(var(--glow-secondary)) 0%, transparent 50%)`,
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.4, 0.3],
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </>
                )}
                
                {/* Project title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-card via-card/80 to-transparent">
                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {project.title}
                  </motion.h2>
                </div>

                {/* Close button */}
                <motion.button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-16rem)] p-6 md:p-8">
                {/* Meta info */}
                <motion.div
                  className="flex flex-wrap gap-4 mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  {project.year && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </div>
                  )}
                  {project.role && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {project.role}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 className="w-4 h-4" />
                    {project.tech.length} Technologies
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.longDescription || project.description}
                </motion.p>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <motion.div
                    className="mb-8"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={feature}
                          className="flex items-start gap-3 text-muted-foreground"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Tech Stack */}
                <motion.div
                  className="mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2 text-sm font-mono bg-primary/10 text-primary rounded-xl border border-primary/20"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.35 + index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="hero" size="lg" asChild className="rounded-xl px-8">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-5 h-5 mr-2" />
                        View Live Demo
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="heroOutline" size="lg" asChild className="rounded-xl px-8">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5 mr-2" />
                        View Source Code
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
