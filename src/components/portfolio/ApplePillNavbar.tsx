import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Stack", href: "#stack" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const ApplePillNavbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active tab based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      for (const sectionId of sections.reverse()) {
        const section = document.getElementById(sectionId);
        if (section && window.scrollY >= section.offsetTop - 100) {
          const item = navItems.find(i => i.href === `#${sectionId}`);
          if (item) {
            setActiveTab(item.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[95vw]">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex items-center gap-0.5 md:gap-1 p-1 md:p-1.5 rounded-full border backdrop-blur-2xl transition-all duration-700 ease-out",
          scrolled 
            ? "bg-black/60 border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_1px_rgba(255,255,255,0.08)]" 
            : "bg-black/30 border-white/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
        )}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.name;
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative px-2.5 md:px-4 py-1.5 md:py-2 text-[10px] md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] transition-colors duration-300 rounded-full font-space-mono whitespace-nowrap",
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/15"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default ApplePillNavbar;
