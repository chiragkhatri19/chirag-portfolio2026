import { motion } from "framer-motion";
import { Github, Twitter, Star, ArrowUpRight } from "lucide-react";
import TweetCard from "@/components/ui/tweet-card";
import { cn } from "@/lib/utils";

const GitHubSection = () => {
  return (
    <section id="github" className="py-24 px-6 relative max-w-[1100px] mx-auto overflow-hidden">
      <div className="flex items-center gap-6 mb-16">
        <h2 className="text-5xl md:text-6xl font-black tracking-wider font-formula-condensed text-white uppercase">GitHub</h2>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl overflow-hidden group transition-all duration-700 hover:border-white/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="flex items-start justify-between mb-10">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold font-space-mono text-zinc-500 uppercase tracking-[0.3em] mb-1">Latest Project</div>
                  <h3 className="text-3xl md:text-4xl font-bold font-formula-condensed text-white tracking-wider">chiragkhatri19 / <span className="text-primary italic">GLOS</span></h3>
                </div>
              </div>
              <a href="https://github.com/chiragkhatri19/GLOS" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                <ArrowUpRight size={18} />
              </a>
            </div>

            <p className="text-lg md:text-xl text-zinc-400 font-outfit leading-relaxed max-w-2xl mb-12">
              Architecting <span className="text-white">GLOS</span> a UI-context-aware localization engine. My open-source footprint encompasses 39 public repositories focusing on full-stack architecture and AI research.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-1">
                <div className="text-[10px] font-bold font-space-mono text-zinc-600 uppercase tracking-[0.2em]">Repositories</div>
                <div className="text-4xl font-formula-condensed text-white tracking-wider">39</div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold font-space-mono text-zinc-600 uppercase tracking-[0.2em]">Stars</div>
                <div className="text-4xl font-formula-condensed text-white flex items-center gap-2 tracking-wider">
                  <Star className="w-6 h-6 text-primary fill-primary/20" /> 03
                </div>
              </div>
              <div className="space-y-1 col-span-2 lg:col-span-1 border-t lg:border-t-0 border-white/5 pt-6 lg:pt-0">
                <div className="text-[10px] font-bold font-space-mono text-zinc-600 uppercase tracking-[0.2em]">Global Status</div>
                 <div className="text-xl font-formula-condensed text-primary uppercase tracking-wider">So far so good</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-8 lg:p-12 bg-white/[0.01] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="text-[10px] font-bold font-space-mono text-zinc-500 uppercase tracking-[0.3em]">Code Activity</div>
              <div className="grid grid-cols-6 gap-2.5">
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "aspect-square rounded-[3px] border border-white/5 transition-all duration-300",
                      i % 5 === 0 ? "bg-primary/60" : 
                      i % 3 === 0 ? "bg-primary/20" : 
                      "bg-white/5"
                    )} 
                  />
                ))}
              </div>
              <p className="text-[9px] font-space-mono text-zinc-600 leading-tight uppercase tracking-widest">
                Visualizing contribution entropy across various systems.
              </p>
            </div>

            <motion.a 
              href="https://github.com/chiragkhatri19" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white text-black text-[11px] font-bold font-space-mono uppercase tracking-[0.2em] transition-all hover:bg-zinc-200"
            >
              EXPLORE REPO <Github size={12} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const XSection = () => {
  return (
    <section id="x" className="py-24 px-6 relative max-w-[1100px] mx-auto overflow-hidden">
      <div className="flex items-center gap-6 mb-16">
        <h2 className="text-5xl md:text-6xl font-black tracking-wider font-formula-condensed text-white uppercase">X Feed</h2>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 lg:p-12 rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl flex flex-col justify-between group hover:border-primary/20 transition-all duration-500"
        >
          <div>
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center font-formula-condensed text-3xl text-white tracking-wider">
                  CK
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-formula-condensed text-white tracking-wider uppercase">Chirag Khatri</h3>
                  <div className="text-sm font-bold font-space-mono text-primary tracking-widest uppercase mb-1">@chiragx19</div>
                </div>
              </div>
              <Twitter className="w-6 h-6 text-primary fill-primary/10" />
            </div>

            <div className="space-y-6">
              <div className="text-[10px] font-bold font-space-mono text-primary uppercase tracking-[0.3em]">Profile Bio</div>
              <h4 className="text-3xl font-bold font-formula-condensed text-white leading-[1.1] uppercase tracking-wider">Full Stack Dev // Buidler // Open Source // AI Scientist</h4>
              <p className="text-zinc-400 font-outfit text-lg leading-relaxed font-medium">
                Active buidler at <span className="text-white">@blockguildbpit</span>. Obsessed with high-end interfaces and functional AI architecture.
              </p>
            </div>
          </div>

          <div className="flex gap-10 mt-10 border-t border-white/5 pt-8">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-formula-condensed text-white tracking-wider">1,513</div>
              <div className="text-[9px] font-bold font-space-mono text-zinc-600 uppercase tracking-[0.3em]">Followers</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-formula-condensed text-white tracking-wider">784</div>
              <div className="text-[9px] font-bold font-space-mono text-zinc-600 uppercase tracking-[0.3em]">Following</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-6 px-4">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="text-[10px] font-bold font-space-mono text-zinc-500 uppercase tracking-[0.3em]">Most Recent Log</div>
          </div>
          
          <TweetCard id="1643690335988781058" className="w-full bg-white/[0.02] border-white/5 shadow-2xl" />

          <motion.a 
            href="https://x.com/chiragx19" 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 flex items-center justify-center gap-3 w-full py-4 rounded-xl border border-white/10 text-white text-[11px] font-bold font-space-mono uppercase tracking-[0.1em] transition-all hover:bg-white hover:text-black"
          >
            DISCOURSE ON X <Twitter size={12} className="fill-current" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export const SocialSections = () => {
  return (
    <>
      <GitHubSection />
      <XSection />
    </>
  );
};

export default SocialSections;
