import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeInWhenVisible } from "@/components/ui/motion-effects";
import { useRef, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  link: string;
  github: string;
  image?: string;
  year: string;
  role: string;
  features: string[];
};

export const projects: Project[] = [
  {
    id: "fit-llama-ai",
    title: "Fit Llama AI",
    description: "An intelligent AI-powered fitness coach that creates personalized workout plans, tracks progress, and provides real-time guidance for achieving fitness goals.",
    longDescription: "Fit Llama AI is a cutting-edge fitness application that leverages artificial intelligence to deliver personalized coaching experiences. The app analyzes user fitness levels, goals, and preferences to generate customized workout routines and nutrition advice. With real-time progress tracking and adaptive recommendations, users receive a truly personalized fitness journey powered by modern AI technology.",
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    link: "https://fit-llama-ai.vercel.app/",
    github: "https://github.com/chiragkhatri19/Fit-LlamaAI",
    image: "/project-section/fitllamaaicover.png",
    year: "2024",
    role: "Full Stack Developer",
    features: [
      "AI-powered personalized workout generation",
      "Real-time progress tracking and analytics",
      "Custom meal plans and nutrition guidance",
      "Voice-guided workout sessions",
      "Goal setting and achievement milestones",
      "Social features for workout challenges",
    ],
  },
  {
    id: "worksea",
    title: "Worksea",
    description: "An AI-powered job matching platform that connects candidates with their ideal opportunities using intelligent matching algorithms and seamless authentication.",
    longDescription: "Worksea is a comprehensive AI job matching platform designed to revolutionize how candidates find their perfect job opportunities. The platform features separate client and server architectures, leveraging artificial intelligence to analyze candidate profiles, skills, and preferences to match them with the most suitable job listings. With Clerk authentication for secure user management and Supabase for robust data handling, Worksea delivers a seamless experience for both job seekers and employers.",
    tech: ["React", "Clerk", "Supabase", "PostgreSQL"],
    link: "https://worksea.vercel.app/",
    github: "https://github.com/chiragkhatri19/Worksea",
    image: "/project-section/workseacover.png",
    year: "2024",
    role: "Full Stack Developer",
    features: [
      "AI-powered job matching algorithm",
      "Secure authentication with Clerk",
      "Separate client and server architecture",
      "Real-time job recommendations",
      "Advanced candidate profile analysis",
      "Employer dashboard for job postings",
    ],
  },

  {
    id: "resumate",
    title: "ResuMATE",
    description: "An AI-powered resume builder that helps users create professional resumes with smart suggestions and customizable templates.",
    longDescription: "ResuMATE is an innovative AI-powered resume builder that simplifies the process of creating professional resumes. The platform leverages artificial intelligence to provide smart suggestions for content, optimize formatting, and offer customizable templates that match industry standards. Users can easily build, edit, and download polished resumes that stand out to employers and pass through Applicant Tracking Systems (ATS).",
    tech: ["React", "TypeScript", "AI Integration", "PDF Generation"],
    link: "https://resumate-ai-beta.vercel.app/",
    github: "https://github.com/chiragkhatri19/resumate-ai",
    image: "/project-section/resumatecover.png",
    year: "2025",
    role: "Full Stack Developer",
    features: [
      "AI-powered content suggestions",
      "ATS-optimized resume templates",
      "Real-time resume preview",
      "PDF generation and download",
      "Customizable design options",
      "Keyword optimization recommendations",
    ],
  },
  {
    id: "vyse",
    title: "Vyse",
    description: "A React Native social media app for AI-generated content, connecting users through creative and personalized content experiences.",
    longDescription: "Vyse is an innovative social media platform built with React Native that focuses on AI-generated content. The app allows users to create, share, and discover personalized content powered by artificial intelligence. With advanced recommendation algorithms, users receive tailored content feeds that match their interests and preferences. The platform includes features like AI content creation tools, social sharing, real-time notifications, and personalized user profiles.",
    tech: ["React Native", "TypeScript", "AI Integration", "Firebase", "Node.js"],
    link: "#",
    github: "#",
    image: "/project-section/vysecover.png",
    year: "2025",
    role: "Full Stack Developer",
    features: [
      "AI-powered content generation",
      "Personalized content feeds",
      "Social sharing and interaction",
      "Real-time notifications",
      "User profile customization",
      "Cross-platform mobile experience",
    ],
  },
];

// Memoized project content component
const ProjectContent = memo(({ project }: { project: Project }) => {
  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8">
      {/* Description */}
      <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
        {project.longDescription}
      </p>
      
      {/* Tech Stack */}
      <div>
        <h4 className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4">Technologies</h4>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.tech.map((tech) => (
            <motion.span
              key={tech}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-sm text-white/90 rounded-lg sm:rounded-xl border border-white/10"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Features */}
      <div>
        <h4 className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider mb-3 sm:mb-4">Key Features</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {project.features.map((feature, index) => (
            <motion.li 
              key={index} 
              className="flex items-start gap-2 sm:gap-3 text-white/70 text-sm sm:text-base"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      
      {/* Links */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg sm:rounded-xl font-medium shadow-lg shadow-primary/25 text-sm sm:text-base"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink className="w-4 h-4" />
          Live Demo
        </motion.a>
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg sm:rounded-xl font-medium border border-white/20 text-sm sm:text-base"
          whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.98 }}
        >
          <Github className="w-4 h-4" />
          View Code
        </motion.a>
      </div>
    </div>
  );
});

ProjectContent.displayName = 'ProjectContent';

// Seeded random for deterministic values
const seededRandom = (seed: number, i: number) => 
  ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;

const Projects = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Animated floating particles - deterministic
  const projectParticles = useMemo(() => {
    const seed = 66;
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${seededRandom(seed, i) * 100}%`,
      top: `${seededRandom(seed, i + 100) * 100}%`,
      size: 3 + seededRandom(seed, i + 200) * 6,
      delay: seededRandom(seed, i + 300) * 8,
      duration: 10 + seededRandom(seed, i + 400) * 10,
    }));
  }, []);

  // Create cards for the carousel
  const cards = projects.map((project, index) => (
    <Card
      key={project.id}
      card={{
        src: project.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
        title: project.title,
        category: project.role,
        content: <ProjectContent project={project} />,
      }}
      index={index}
    />
  ));

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-32 relative overflow-hidden"
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0 -z-10">
        {/* Large gradient blobs */}
        <motion.div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          style={{ y: bgY }}
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-glow-secondary/5 rounded-full blur-3xl"
          style={{ y: bgY }}
          animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Floating particles */}
        {projectParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/20"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, -10, 0],
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
      </div>

      <div className="container px-5 sm:px-6 md:px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-mono text-primary bg-primary/10 rounded-full mb-6 sm:mb-8">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Projects
            </span>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 sm:mb-8">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Featured{" "}
                <span className="text-gradient">Work</span>
              </h3>
              
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to="/projects">
                  <Button variant="ghost" className="mt-3 sm:mt-4 md:mt-0 group text-base sm:text-lg text-muted-foreground hover:text-foreground">
                    View All Projects
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </FadeInWhenVisible>
          
          {/* Apple Cards Carousel */}
          <Carousel items={cards} />
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
