import { memo } from "react";
import {
  SiTypescript, SiJavascript, SiPython, SiReact, SiNextdotjs,
  SiNodedotjs, SiTailwindcss, SiGit,
  SiDocker, SiPostgresql, SiMongodb,
  SiSupabase, SiFirebase, SiVercel,
  SiOpenjdk, SiExpress, SiGraphql, SiPrisma, SiFramer,
  SiRedux, SiFigma, SiGithub,
  SiVite, SiTurborepo,
  SiFastapi, SiFastify, SiBun, SiHono, SiClerk, SiRadixui, SiShadcnui,
  SiPosthog, SiAppwrite, SiLinux, SiDavinciresolve, SiArchlinux,
  SiRust, SiGo
} from "react-icons/si";
import { type IconType } from "react-icons";
import { motion } from "framer-motion";

const AdobePr = ({ size = 52, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style}>
    <rect width="48" height="48" rx="8" fill="#00005B"/>
    <text x="24" y="31" textAnchor="middle" fill="#9999FF" fontSize="18" fontWeight="800" fontFamily="sans-serif">Pr</text>
  </svg>
);

const AdobeAe = ({ size = 52, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style}>
    <rect width="48" height="48" rx="8" fill="#00005B"/>
    <text x="24" y="31" textAnchor="middle" fill="#9999FF" fontSize="18" fontWeight="800" fontFamily="sans-serif">Ae</text>
  </svg>
);

const AdobePs = ({ size = 52, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={style}>
    <rect width="48" height="48" rx="8" fill="#001E36"/>
    <text x="24" y="31" textAnchor="middle" fill="#31A8FF" fontSize="18" fontWeight="800" fontFamily="sans-serif">Ps</text>
  </svg>
);

type TechItem = {
  icon: IconType | React.FC<{ size?: number; style?: React.CSSProperties }>;
  name: string;
  color: string;
};

const TECH_STACK: TechItem[] = [
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiRust, name: "Rust", color: "#F74C00" },
  { icon: SiGo, name: "Go", color: "#00ADD8" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiOpenjdk, name: "Java", color: "#ED8B00" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: SiExpress, name: "Express", color: "#FFFFFF" },
  { icon: SiFastapi, name: "FastAPI", color: "#05998B" },
  { icon: SiFastify, name: "Fastify", color: "#FFFFFF" },
  { icon: SiHono, name: "Hono", color: "#FF5F00" },
  { icon: SiBun, name: "Bun", color: "#FBF0DF" },
  { icon: SiRedux, name: "Redux", color: "#764ABC" },
  { icon: SiShadcnui, name: "Shadcn/ui", color: "#FFFFFF" },
  { icon: SiRadixui, name: "Radix UI", color: "#FFFFFF" },
  { icon: SiFramer, name: "Framer", color: "#0055FF" },
  { icon: SiClerk, name: "Clerk", color: "#6C47FF" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiPrisma, name: "Prisma", color: "#2D3748" },
  { icon: SiSupabase, name: "Supabase", color: "#3ECF8E" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
  { icon: SiAppwrite, name: "Appwrite", color: "#FD366E" },
  { icon: SiGraphql, name: "GraphQL", color: "#E10098" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
  { icon: AdobePr, name: "Premiere Pro", color: "#9999FF" },
  { icon: AdobeAe, name: "After Effects", color: "#9999FF" },
  { icon: AdobePs, name: "Photoshop", color: "#31A8FF" },
  { icon: SiDavinciresolve, name: "DaVinci", color: "#E34427" },
  { icon: SiGit, name: "Git", color: "#F05032" },
  { icon: SiGithub, name: "GitHub", color: "#FFFFFF" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiVercel, name: "Vercel", color: "#FFFFFF" },
  { icon: SiArchlinux, name: "Arch Linux", color: "#1793D1" },
  { icon: SiVite, name: "Vite", color: "#646CFF" },
  { icon: SiTurborepo, name: "Turborepo", color: "#EF4444" },
  { icon: SiPosthog, name: "PostHog", color: "#FBBF24" },
  { icon: SiLinux, name: "Linux", color: "#FCC624" },
];

const Skills = memo(() => {
  return (
    <section id="stack" className="bg-transparent py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
        <div className="flex flex-col mb-16">
          <h2 className="text-5xl font-bold text-white font-formula-condensed tracking-wider uppercase">
            STACK
          </h2>
          <div className="h-1 w-12 bg-[#ea580c] mt-4" />
        </div>

        <div className="grid grid-cols-5 gap-y-6 md:flex md:flex-wrap md:items-center md:justify-start md:gap-x-1 md:gap-y-6">
          {TECH_STACK.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.005, duration: 0.2 }}
                whileHover={{ scale: 1.25 }}
                className="group relative cursor-pointer px-1 md:px-3 flex flex-col items-center"
              >
                <Icon 
                  className="w-[32px] h-[32px] sm:w-[42px] sm:h-[42px] md:w-[52px] md:h-[52px] drop-shadow-[0_0_12px_rgba(0,0,0,0.6)] opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{ color: item.color }} 
                />
                <span className="absolute -bottom-8 text-[9px] font-space-mono text-zinc-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-32 w-full h-[1px] bg-white/[0.03]" />
      </div>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;
