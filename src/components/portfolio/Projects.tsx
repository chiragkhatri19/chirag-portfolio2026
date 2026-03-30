import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";


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
  metrics: string[];
};

export const projects: Project[] = [
  {
    id: "glos-io",
    title: "GLOS.io",
    description: "A UI-context-aware localization tool that eliminates 'blind' AI translations by mapping strings directly to their visual UI components.",
    longDescription: "GLOS (Give your i18n pipeline eyes) is a developer tool designed to fix the lack of visual context in automated translation workflows. It uses a headless browser (Playwright) to capture screenshots of every route in an application and employs a Vision LLM to extract visual context for every string. By generating a context-mapped registry, it ensures that AI translations understand whether a word like 'Cancel' is an action button or a status label, significantly increasing translation accuracy and tone consistency.",
    tech: ["TypeScript", "Next.js", "Playwright", "Vision LLM", "Turbo", "Lingo.dev"],
    link: "https://glos.io",
    github: "https://github.com/chiragkhatri19/GLOS",
    image: "/project-section/glos.io.png",
    year: "2026",
    role: "Lead Developer & Creator",
    features: [
      "Automated route capture with Playwright",
      "AI-powered UI hierarchy analysis",
      "Context-mapped registry generation",
      "Translation quality reporting CLI",
      "Visual dashboard for string management",
      "Monorepo architecture with Turborepo",
    ],
    metrics: [
      "Built During a Weekend Hackathon",
      "Solves Context-less AI Translations",
      "Published CLI to NPM Registry"
    ],
  },
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
    metrics: [
      "Built to Solve Personal Gym Needs",
      "Validated by 160+ Early Testers",
      "Scaled to 300+ Organic Users"
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
    metrics: [
      "Built for Smart India Hackathon",
      "Selected at College Qualifiers",
      "Engineered AI Matching Logic"
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
    metrics: [
      "Generates ATS-Compliant Resumes",
      "Optimized for Standard Parsers",
      "Generated 250+ Resumes to Date"
    ],
  },
];

const ProjectContent = memo(({ project }: { project: Project }) => {
  return (
    <div className="space-y-5 sm:space-y-6 md:space-y-8">
      <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
        {project.longDescription}
      </p>

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

const Projects = memo(() => {
  return (
    <section
      id="projects"
      className="py-32 relative bg-transparent overflow-hidden"
    >
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(80, 80, 90, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(80, 80, 90, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-[60px] relative z-10">
        <div className="flex flex-col mb-16">
          <h2 className="text-5xl font-bold text-white font-formula-condensed tracking-wider uppercase">
            PROJECTS
          </h2>
          <div className="h-1 w-12 bg-[#ea580c] mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:-translate-y-1"
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative aspect-[16/10] overflow-hidden cursor-pointer">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
              </a>

              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-space-mono text-[10px] text-zinc-500 uppercase tracking-[0.15em]">
                    {project.year} {project.role}
                  </span>
                  <div className="flex gap-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-zinc-600 hover:text-white transition-colors duration-300"
                    >
                      <Github size={16} />
                    </a>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-zinc-600 hover:text-[#ea580c] transition-colors duration-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white font-formula-condensed uppercase tracking-wider group-hover:text-[#ea580c] transition-colors duration-400">
                  {project.title}
                </h3>

                <p className="text-zinc-400 font-outfit text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <ul className="flex flex-col gap-1.5 pt-2 pb-2">
                  {project.metrics?.map((metric, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] font-space-mono text-zinc-300 uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-[#ea580c] flex-shrink-0 opacity-80" />
                      {metric}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] text-[10px] font-space-mono text-zinc-500 uppercase tracking-wider rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
