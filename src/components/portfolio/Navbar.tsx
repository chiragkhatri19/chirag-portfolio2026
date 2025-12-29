import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((link) => {
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/60 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity group"
          >
            <span className="text-gradient group-hover:opacity-90 transition-opacity">Chirag</span>
            <span className="text-foreground">.dev</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.slice(1, -1).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === link.name
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-primary transition-all duration-300 ${
                    activeSection === link.name ? "w-4" : "w-0 group-hover:w-4"
                  }`}
                />
              </a>
            ))}
            <ThemeToggle />
            <Button variant="hero" size="sm" asChild className="ml-2">
              <a href="#contact">Contact</a>
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
                <X className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-4 border-t border-border/50">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isMobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                } ${
                  activeSection === link.name
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;