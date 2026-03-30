import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const getTimestamp = () => {
  const d = new Date();
  return `[${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0')}]`;
};

const SEQUENCE = [
  { text: "ssh guest@chiragships.site", isCommand: true, delay: 400 },
  { text: "requesting public key authentication...", delay: 200, isSystem: true },
  { text: "access granted. session established.", delay: 300, isSystem: true },
  { text: "mounting portfolio_workspace_v2", delay: 200, isSystem: true },
  { text: "fetching modules... [==========] 100%", delay: 300, isSystem: true },
  { text: "compiling interface components... OK", delay: 300, isSystem: true },
  { text: "establishing secure connection port 443...", delay: 200, isSystem: true },
  { text: "CHIRAG_KHATRI // SYSTEM ONLINE", delay: 400, isSystem: true, highlight: true }
];

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [activeLines, setActiveLines] = useState<{text: string, highlight: boolean, isCommand: boolean}[]>([]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const runSequence = () => {
      if (currentIndex < SEQUENCE.length) {
        const item = SEQUENCE[currentIndex];
        const lineText = item.isCommand 
          ? `> ${item.text}`
          : `${getTimestamp()} ${item.text}`;
          
        setActiveLines(prev => [...prev, { text: lineText, highlight: item.highlight || false, isCommand: item.isCommand || false }]);
        timeoutId = setTimeout(runSequence, item.delay);
        currentIndex++;
      } else {
        // Complete sequence, hold for a moment then trigger unmount
        timeoutId = setTimeout(() => {
          onComplete();
        }, 500); 
      }
    };

    // Initial small delay before starting
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
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center p-6 sm:p-12 selection:bg-[#ea580c] selection:text-white"
    >
      <div className="w-full max-w-[650px] font-space-mono text-[11px] sm:text-[13px] md:text-sm text-left">
        {activeLines.map((line, idx) => (
          <div 
            key={idx} 
            className={`mb-2 md:mb-3 leading-relaxed ${
              line.highlight 
                ? "text-[#ea580c] drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]" 
                : line.isCommand 
                  ? "text-zinc-200" 
                  : "text-zinc-500"
            }`}
          >
            {line.text}
          </div>
        ))}
        {/* Blinking Terminal Cursor */}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-2.5 h-4 sm:h-5 bg-white align-middle mt-1"
        />
      </div>
    </motion.div>
  );
};
