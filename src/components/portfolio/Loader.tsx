import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast simulated progress to reach 100% in ~2-2.5s
    const duration = 2200; // 2.2 seconds
    const interval = 20; // 20ms steps for smooth animation
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 300); // Hold at 100% shortly before fading out
          return 100;
        }
        // Add tiny bit of noise/variation to the progress for realism
        const variation = (Math.random() * 0.5) * increment;
        return Math.min(100, prev + increment + variation);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -40, // Slide up slightly upon exit
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Grid Pattern Background - matching Hero aesthetic */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(80, 80, 90, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(80, 80, 90, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Center content */}
      <div className="relative z-10 w-full max-w-[420px] px-8 flex flex-col gap-6">
        
        {/* Top Info */}
        <div className="flex justify-between items-end">
          <div className="font-space-mono text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.25em] flex flex-col gap-1">
            <span className="text-white/80">[ SYSTEM INITIALIZATION ]</span>
            <span className="text-zinc-600 tracking-[0.3em]">CHIRAG_KHATRI</span>
          </div>
          <div className="font-formula-condensed text-5xl sm:text-6xl text-white tracking-wider flex items-baseline leading-none">
            {Math.min(100, Math.floor(progress)).toString().padStart(3, "0")}
            <span className="text-[#ea580c] text-xl sm:text-2xl ml-1 tracking-normal">%</span>
          </div>
        </div>

        {/* Outer Progress Bar Container */}
        <div className="h-[2px] w-full bg-white/[0.05] relative overflow-hidden flex items-center">
          {/* Inner Animated Bar */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-[#ea580c] shadow-[0_0_15px_rgba(234,88,12,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.02 }}
          />
        </div>

        {/* Status Messages */}
        <div className="flex justify-between font-space-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">
          <span className="text-[#ea580c]">
            {progress < 25 
              ? "BOOTING KERNEL..." 
              : progress < 60 
                ? "LOADING ASSETS..." 
                : progress < 90 
                  ? "COMPILING REALITY..." 
                  : "READY."}
          </span>
          <span className="text-zinc-600 border border-zinc-800 px-1.5 py-[1px] rounded-[2px] bg-black/20">
            {progress < 100 ? "PROCESSING" : "LAUNCH"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
