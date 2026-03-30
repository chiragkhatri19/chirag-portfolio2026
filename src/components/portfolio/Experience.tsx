import { motion } from "framer-motion";
import { memo } from "react";

// Static data moved outside component
const EXPERIENCES = [
  {
    role: "Full Stack Developer",
    company: "Open Source / Freelance",
    period: "2024 - PRESENT",
    description: "Architecting high-performance web applications with technical precision and intuitive UX. Focused on building context-aware tools and scalable AI-driven platforms.",
    highlights: [
      "Built GLOS.io — a UI-context-aware localization engine for developers",
      "Developed FitLama — an AI fitness coach using schema-driven LLM pipelines",
      "Created Resumate — an ATS-optimized resume builder with 10k+ potential users",
      "Deployed automated scraping systems using Playwright and Vision AI models",
    ],
  },
  {
    role: "Marketing Intern",
    company: "Monster Energy",
    period: "2023 - 2024",
    description: "Managed brand activations and digital community growth through strategic marketing initiatives and youth engagement programs.",
    highlights: [
      "Led digital marketing campaigns across university networks and social channels",
      "Coordinated 10+ high-impact promotional events with 5k+ total attendance",
      "Analyzed engagement metrics to optimize campaign reach and conversion rates",
      "Developed creative content strategies to enhance brand presence in Gen-Z markets",
    ],
  },
  {
    role: "Web Dev & Video Editor",
    company: "Freelance",
    period: "2022 - 2023",
    description: "Delivered high-quality digital assets and responsive web interfaces for various clients and creative agencies.",
    highlights: [
      "Engineered 20+ responsive landing pages with high conversion performance",
      "Edited 50+ long-form and short-form video assets for digital creators",
      "Mastered Adobe Creative Suite and modern frontend frameworks simultaneously",
      "Consulted on UI/UX improvements for early-stage startup prototypes",
    ],
  },
] as const;

// Seeded random for deterministic values
const seededRandom = (seed: number, i: number) =>
  ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;

const Experience = memo(() => {
  return (
    <section
      id="experience"
      className="py-32 relative bg-transparent overflow-hidden"
    >
      {/* Consistent Grid Pattern Background from Hero */}
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
        {/* Simplified Header - Hero Matching */}
        <div className="flex flex-col mb-16">
          <h2 className="text-5xl font-bold text-white font-formula-condensed tracking-wider uppercase">
            EXPERIENCE
          </h2>
          <div className="h-1 w-12 bg-[#ea580c] mt-4" />
        </div>

        {/* Technical Journey Track */}
        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 md:left-[24px] top-0 bottom-0 w-px bg-white/5 mx-auto" />
          
          <div className="space-y-16">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative pl-8 md:pl-20"
              >
                {/* Visual Marker */}
                <div className="absolute left-[-4.5px] md:left-[19.5px] top-4 w-2.5 h-2.5 rounded-full border border-white/20 bg-black z-10 group-hover:border-primary transition-colors">
                  <div className="absolute inset-[-4px] rounded-full border border-primary/20 scale-0 group-hover:scale-100 transition-transform" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 bg-[#050505] p-8 md:p-12 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-500 relative">
                  <div className="space-y-4">
                    <span className="font-space-mono text-[12px] text-primary uppercase font-bold tracking-widest block">
                      {exp.period}
                    </span>
                    <span className="font-space-mono text-[10px] text-zinc-500 block uppercase">
                      [{String(idx + 1).padStart(2, '0')} // NODE]
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-4xl font-bold text-white font-formula-condensed uppercase tracking-wider group-hover:text-[#ea580c] transition-colors duration-500">
                        {exp.role}
                      </h3>
                      <p className="font-space-mono text-[14px] text-zinc-400 mt-2">
                        {exp.company}
                      </p>
                    </div>

                    <p className="text-zinc-400 font-outfit text-lg leading-relaxed max-w-2xl">
                      {exp.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-4 border-t border-white/5">
                      {(exp.highlights as unknown as string[]).map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-3">
                          <span className="w-1 h-1 bg-zinc-700 rounded-full mt-2 group-hover:bg-primary transition-colors" />
                          <span className="text-[13px] font-outfit text-zinc-500 leading-snug">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

export default Experience;