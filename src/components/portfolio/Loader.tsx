import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SEQUENCE = [
  { text: "> ssh guest@chiragships.site", delay: 400 },
  { text: "requesting access...", delay: 200, isSystem: true },
  { text: "access granted. [OK]", delay: 300, isSystem: true },
  { text: "> ./init_workspace.sh", delay: 500 },
  { text: "fetching modules... [OK]", delay: 200, isSystem: true },
  { text: "compiling interface... [OK]", delay: 200, isSystem: true },
  { text: "system status: ONLINE", delay: 400, isSystem: true, highlight: true }
];

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeLines, setActiveLines] = useState<number>(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const runSequence = () => {
      if (currentIndex < SEQUENCE.length) {
        setActiveLines(currentIndex + 1);
        timeoutId = setTimeout(runSequence, SEQUENCE[currentIndex].delay);
        currentIndex++;
      } else {
        // Complete sequence, hold for a moment then trigger unmount
        timeoutId = setTimeout(() => {
          onComplete();
        }, 400); 
      }
    };

    // Initial small delay before starting
    timeoutId = setTimeout(runSequence, 200);

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.4, ease: "easeOut" } 
      }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center p-6 sm:p-12 selection:bg-[#ea580c] selection:text-white"
    >
      <div className="w-full max-w-[500px] font-space-mono text-xs sm:text-sm md:text-base text-left">
        {SEQUENCE.slice(0, activeLines).map((line, idx) => (
          <div 
            key={idx} 
            className={`mb-2 md:mb-3 leading-relaxed ${
              line.highlight 
                ? "text-[#ea580c]" 
                : line.isSystem 
                  ? "text-zinc-500" 
                  : "text-zinc-200"
            }`}
          >
            {line.text}
          </div>
        ))}
        {/* Blinking Terminal Cursor */}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-2.5 h-4 sm:h-5 bg-white align-middle"
        />
      </div>
    </motion.div>
  );
};
