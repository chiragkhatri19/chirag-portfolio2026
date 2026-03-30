import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SEQUENCE = [
  { text: "ssh visitor@chiragships.site", isCommand: true, delay: 400 },
  { text: "authenticating... OK", isSystem: true, delay: 300 },
  { text: "initializing interface...", isSystem: true, delay: 300 },
  { text: "CHIRAG_KHATRI // ONLINE", highlight: true, delay: 500 }
];

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeLines, setActiveLines] = useState<{text: string, highlight?: boolean, isCommand?: boolean, isSystem?: boolean}[]>([]);

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
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 sm:p-12 overflow-hidden selection:bg-[#ea580c] selection:text-white"
    >
      <div className="relative z-10 w-full max-w-[480px] font-space-mono text-[11px] sm:text-[13px] md:text-sm text-left">
        {activeLines.map((line, idx) => (
          <div 
            key={idx} 
            className={`mb-2 md:mb-3 leading-relaxed flex gap-2 ${
              line.highlight 
                ? "text-[#ea580c] drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]" 
                : line.isCommand 
                  ? "text-zinc-200" 
                  : "text-zinc-500"
            }`}
          >
            {line.isCommand && <span className="text-zinc-500">{">"}</span>}
            <span>{line.text}</span>
          </div>
        ))}
        {/* Blinking Terminal Cursor */}
        <div className="flex gap-2 text-zinc-300 mt-2">
           {activeLines.length >= 1 && activeLines.length < SEQUENCE.length && (
              <span className="text-zinc-500">{">"}</span>
           )}
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className={`inline-block w-2.5 h-4 sm:h-5 bg-white align-middle ${activeLines.length < 1 ? 'mt-1' : ''}`}
          />
        </div>
      </div>
    </motion.div>
  );
};
