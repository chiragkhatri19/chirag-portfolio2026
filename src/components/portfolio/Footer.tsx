import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side */}
          <div className="text-center md:text-left">
            <div className="font-semibold mb-1">
              <span className="text-gradient">Chirag</span> Khatri
            </div>
            <div className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
              🇮🇳 Based in India
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:chirag@example.com"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Right side */}
          <div className="text-center md:text-right">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Chirag Khatri. All rights reserved.
            </div>
            <div className="text-xs text-muted-foreground/60 mt-1 flex items-center justify-center md:justify-end gap-1">
              Built with <Heart className="w-3 h-3 text-primary" /> using React & Tailwind
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;