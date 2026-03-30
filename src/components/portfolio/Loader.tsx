import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const SYSTEMD_LOGS = [
  { text: "Starting systemd-udevd version 255-1-arch...", delay: 40 },
  { status: "OK", text: "Mounted /boot/efi.", delay: 40 },
  { status: "OK", text: "Reached target Local File Systems.", delay: 40 },
  { text: "Starting Network Time Synchronization...", delay: 40 },
  { status: "OK", text: "Started Network Time Synchronization.", delay: 40 },
  { text: "Starting D-Bus System Message Bus...", delay: 30 },
  { status: "OK", text: "Started D-Bus System Message Bus.", delay: 40 },
  { text: "Starting Network Manager...", delay: 60 },
  { status: "OK", text: "Started Network Manager.", delay: 50 },
  { status: "OK", text: "Reached target Network.", delay: 30 },
  { text: "Starting Authorization Manager...", delay: 40 },
  { status: "OK", text: "Started Authorization Manager.", delay: 40 },
  { text: "Starting Login Service...", delay: 50 },
  { status: "OK", text: "Started Login Service.", delay: 50 },
  { text: "Starting chirag_portfolio.service...", delay: 100 },
  { status: "OK", text: "Started chirag_portfolio.service.", delay: 200 },
  { status: "OK", text: "Reached target Graphical Interface.", delay: 100 },
];

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<{status?: string, text: string}[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const runLogs = () => {
      if (currentIndex < SYSTEMD_LOGS.length) {
        const log = SYSTEMD_LOGS[currentIndex];
        setLogs(prev => [...prev, log]);
        
        // Auto-scroll to bottom of logs
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        
        timeoutId = setTimeout(runLogs, log.delay);
        currentIndex++;
      } else {
        // Clear logs and show the TTY1 login prompt
        timeoutId = setTimeout(() => {
          setLogs([]);
          setShowLogin(true);
          
          // Finish after showing login prompt briefly
          setTimeout(() => {
            onComplete();
          }, 1400); // Wait 1.4s allowing the user to read the login prompt
        }, 200); 
      }
    };

    // Initial small delay before starting the systemd logs
    timeoutId = setTimeout(runLogs, 200);

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.5, ease: "easeOut" } 
      }}
      className="fixed inset-0 z-[9999] bg-[#000000] flex items-start justify-start p-4 sm:p-6 overflow-hidden selection:bg-[#ea580c] selection:text-white"
    >
      <div className="w-full font-space-mono text-[12px] sm:text-[14px] md:text-[15px] text-left text-white tracking-tight leading-tight md:leading-snug">
        
        {/* SystemD Logs */}
        {!showLogin && logs.map((log, idx) => (
          <div key={idx} className="flex gap-3 sm:gap-4 mb-0.5">
            {/* SystemD Status Brackets */}
            <div className="shrink-0 w-[60px] sm:w-[70px] font-normal flex justify-between">
              <span>[</span>
              <span className={log.status === "OK" ? "text-[#32cd32] font-bold" : "text-red-500 font-bold"}>
                {log.status === "OK" ? "  OK  " : "      "}
              </span> 
              <span>]</span>
            </div>
            {/* Log Text */}
            <div className="font-normal text-[#d3d3d3]">{log.text}</div>
          </div>
        ))}
        
        <div ref={messagesEndRef} />

        {/* Arch Linux TTY1 Login Prompt Screen */}
        {showLogin && (
          <div className="flex flex-col gap-1 font-normal text-[#d3d3d3]">
            <div className="mb-2 text-white">Arch Linux 6.8.9-arch1-1 (tty1)</div>
            <div className="flex items-center gap-2">
              <span>chiragships login:</span>
              <span className="text-white">guest</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Password:</span>
              <span className="text-white">********</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-[#32cd32] font-bold">guest@chiragships</span>
              <span className="text-white">~ $</span>
              <span className="text-white ml-1">./start_portfolio.sh</span>
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
                className="inline-block w-2.5 h-4 sm:h-5 bg-white align-middle"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
