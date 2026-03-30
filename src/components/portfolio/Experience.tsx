import { motion } from "framer-motion";
import { memo } from "react";
import { Highlighter } from "@/components/ui/highlighter";

const EXPERIENCES = [
  {
    role: "Full Stack Developer",
    company: "Open Source / Freelance",
    period: "2024 - PRESENT",
    description: "Architecting autonomous agents and high-performance web applications by integrating modern frontend frameworks with robust AI pipelines.",
    highlights: [
      "Engineered GLOS.io, an open-source UI-context-aware localization tool driven by Next.js, Playwright, and Vision LLMs.",
      "Developed FitLama, an AI fitness coach utilizing schema-driven LLM pipelines to generate personalized, real-time workout plans.",
      <>Scaled ResuMATE, an ATS-compliant resume builder, to capture <Highlighter action="circle" color="#ea580c" padding={4}>10k+ potential users</Highlighter></>,
      "Designed and deployed an intelligent job matching engine (Worksea) with Clerk, Supabase, and React, recognized at college-level qualifiers.",
    ],
  },
  {
    role: "Marketing Intern",
    company: "Monster Energy",
    period: "2023 - 2024",
    description: "Spearheaded on-ground brand activations and grassroots digital community growth through data-driven marketing and audience engagement.",
    highlights: [
      "Led digital marketing campaigns and brand ambassador programs across targeted university networks.",
      <>Coordinated 10+ high-impact promotional events, drawing <Highlighter action="underline" color="#ea580c" strokeWidth={2}>5k+ total attendees</Highlighter></>,
      "Analyzed local market engagement metrics to optimize campaign reach and continuously improve conversion rates.",
      "Orchestrated creative content strategies to aggressively expand market penetration within key Gen-Z demographics.",
    ],
  },
  {
    role: "Web Dev & Video Editor",
    company: "Freelance",
    period: "2022 - 2023",
    description: "Delivered conversion-focused digital assets and responsive web interfaces, blending technical execution with compelling visual storytelling.",
    highlights: [
      <>Engineered 20+ responsive landing pages optimized for <Highlighter action="underline" color="#ea580c" strokeWidth={2}>high conversion</Highlighter> and accessibility.</>,
      "Produced and edited 50+ long-form and short-form video assets, driving strong organic reach for digital creators.",
      "Bridged the gap between design and development by utilizing both the Adobe Creative Suite and modern JavaScript frameworks.",
      "Consulted with early-stage startups to rapidly prototype, iterate, and refine core UI/UX flows.",
    ],
  },
];

const seededRandom = (seed: number, i: number) =>
  ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;

const Experience = memo(() => {
  return (
    <section
      id="experience"
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
        <div className="flex flex-col mb-16 items-start">
          <h2 className="text-5xl font-bold text-white font-formula-condensed tracking-wider uppercase">
            <Highlighter action="underline" color="#ea580c" strokeWidth={5} padding={8}>
              EXPERIENCE
            </Highlighter>
          </h2>
        </div>

        <div className="relative">
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
                <div className="absolute left-[-4.5px] md:left-[19.5px] top-4 w-2.5 h-2.5 rounded-full border border-white/20 bg-black z-10 group-hover:border-primary transition-colors">
                  <div className="absolute inset-[-4px] rounded-full border border-primary/20 scale-0 group-hover:scale-100 transition-transform" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 bg-[#050505] p-8 md:p-12 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-500 relative">
                  <div className="space-y-4">
                    <span className="font-space-mono text-[12px] text-primary uppercase font-bold tracking-widest block">
                      {exp.period}
                    </span>
                    <span className="font-space-mono text-[10px] text-zinc-500 block uppercase">
                      [{String(idx + 1).padStart(2, '0')}]
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
                      {exp.highlights.map((highlight, hIdx) => (
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