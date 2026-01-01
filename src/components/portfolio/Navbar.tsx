import { useState, useEffect, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, User, Code2, FolderOpen, Briefcase, Mail, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

// Static data moved outside component
const NAV_LINKS = [
  { name: "Home", href: "#", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Projects", href: "#projects", icon: FolderOpen },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
] as const;

// Memoized animated CTA button
const AnimatedCTAButton = memo(({ children, href }: { children: React.ReactNode; href: string }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className="relative inline-flex items-center justify-center gap-2 px-7 py-3 text-base font-semibold rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.92 }}
      animate={isClicked ? { scale: [1, 0.95, 1.08, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.span
          animate={isClicked ? { x: [0, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </span>
      {isClicked && (
        <motion.span
          className="absolute inset-0 rounded-full bg-white/20"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.a>
  );
});

AnimatedCTAButton.displayName = 'AnimatedCTAButton';

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  // Memoized toggle handler
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    // Throttled scroll handler
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 100);

          // Determine active section
          const sections = NAV_LINKS.map((link) => {
            const id = link.href === "#" ? "hero" : link.href.slice(1);
            const element = document.getElementById(id) || document.querySelector(`section:first-of-type`);
            if (element) {
              const rect = element.getBoundingClientRect();
              return { name: link.name, top: rect.top };
            }
            return { name: link.name, top: Infinity };
          });

          const current = sections.find((s) => s.top >= -100 && s.top < 300);
          if (current) setActiveSection(current.name);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Initial Header - visible at top */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="container px-4 sm:px-6 md:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-24">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-gradient group-hover:opacity-90 transition-opacity">Chirag</span>
              <span className="text-foreground">.dev</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              {NAV_LINKS.slice(1, -1).map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-300 relative group ${
                    activeSection === link.name
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: activeSection === link.name ? "1.5rem" : 0 }}
                    whileHover={{ width: "1.5rem" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
              <ThemeToggle />
              <div className="ml-3">
                <AnimatedCTAButton href="#contact">Let's Work Together</AnimatedCTAButton>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-1 sm:gap-2 md:hidden">
              <ThemeToggle />
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                  className="relative z-50 h-10 w-10 sm:h-11 sm:w-11"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Floating Glass Navbar - appears on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex"
            initial={{ y: -100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur-2xl shadow-lg shadow-primary/5 dark:shadow-white/5">
              {/* Logo in floating nav */}
              <motion.a
                href="#"
                className="text-base font-bold tracking-tight hover:opacity-80 transition-opacity mr-4 px-2"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-gradient">C</span>
                <span className="text-foreground">.dev</span>
              </motion.a>

              <div className="h-5 w-px bg-border/30 mr-2" />

              {NAV_LINKS.slice(1, -1).map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 text-[14px] font-medium rounded-full transition-all duration-300 ${
                      activeSection === link.name
                        ? "bg-primary/15 text-primary"
                        : "text-foreground/70 hover:text-foreground hover:bg-white/20 dark:hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="hidden lg:inline">{link.name}</span>
                    <Icon className="w-4 h-4 lg:hidden" />
                  </motion.a>
                );
              })}

              <div className="h-5 w-px bg-border/30 mx-2" />

              <ThemeToggle />
              
              <motion.a
                href="#contact"
                className="relative ml-1 inline-flex items-center justify-center gap-1.5 h-9 px-5 text-sm font-semibold rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
              >
                <span>Let's Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Floating Bottom Nav - appears on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.nav
            className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden"
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-primary/10 dark:border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/5 dark:shadow-white/5">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
                      activeSection === link.name
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-4 sm:gap-6 px-6">
              {NAV_LINKS.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-medium rounded-xl transition-all duration-300 w-full max-w-xs justify-center ${
                      activeSection === link.name
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                    onClick={closeMobileMenu}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    {link.name}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;