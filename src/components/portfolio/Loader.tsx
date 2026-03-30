import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SEQUENCE = [
  { text: "Arch Linux 6.8.9-arch1-1 (tty1)", delay: 300, isSystem: true, isDim: true },
  { text: "chiragships login: visitor", delay: 400, isSystem: true },
  { text: "password: ••••••••", delay: 300, isSystem: true },
  { text: "last login: right now on tty1", delay: 200, isSystem: true, isDim: true },
  { text: "./start_portfolio.sh", isCommand: true, delay: 500 },
  { text: "CHIRAG_KHATRI // SYSTEM ONLINE", delay: 400, isSystem: true, highlight: true }
];

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeLines, setActiveLines] = useState<{text: string, highlight?: boolean, isCommand?: boolean, isDim?: boolean}[]>([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const runSequence = () => {
      if (currentIndex < SEQUENCE.length) {
        const item = SEQUENCE[currentIndex];
        
        setActiveLines(prev => [...prev, item]);
        timeoutId = setTimeout(runSequence, item.delay);
        currentIndex++;
      } else {
        timeoutId = setTimeout(() => {
          onComplete();
        }, 500); 
      }
    };

    timeoutId = setTimeout(runSequence, 300);

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.6, ease: "easeInOut" } 
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-12 overflow-hidden selection:bg-[#ea580c] selection:text-white"
    >
      {/* Refined Gray Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/60 via-[#0a0a0a] to-black pointer-events-none" />

      {/* Centered Minimal Container */}
      <div className="relative z-10 w-full max-w-[480px] font-space-mono text-[11px] sm:text-[13px] md:text-sm text-left">
        {activeLines.map((line, idx) => (
          <div 
            key={idx} 
            className={`mb-2 md:mb-3 leading-relaxed flex gap-2 ${
              line.highlight 
                ? "text-[#ea580c] drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]" 
                : line.isDim 
                  ? "text-zinc-600" 
                  : "text-zinc-300"
            }`}
          >
            {line.isCommand && <span className="text-[#32cd32] font-bold">[visitor@arch ~]$</span>}
            <span>{line.text}</span>
          </div>
        ))}
        {/* Blinking Terminal Cursor */}
        <div className="flex gap-2 text-zinc-300 mt-2">
           {activeLines.length >= 4 && activeLines.length < SEQUENCE.length && (
              <span className="text-[#32cd32] font-bold">[visitor@arch ~]$</span>
           )}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className={`inline-block w-2.5 h-4 sm:h-5 bg-white align-middle ${activeLines.length < 4 ? 'mt-1' : ''}`}
          />
        </div>
      </div>
    </motion.div>
  );
};
