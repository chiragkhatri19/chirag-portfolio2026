import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInWhenVisible } from "@/components/ui/motion-effects";
import { memo, useMemo } from "react";

// Static data moved outside component
const SOCIAL_LINKS = [
  { href: "https://github.com/chiragkhatri19", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/chiragk19/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:chirag@example.com", icon: Mail, label: "Email" },
] as const;

const Footer = memo(() => {
  // Memoize year calculation to prevent recreation
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <FadeInWhenVisible>
      <footer className="py-8 sm:py-10 md:py-12 border-t border-primary/10 dark:border-border bg-secondary/20 dark:bg-card/50">
        <div className="container px-5 sm:px-6 md:px-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            {/* Left side */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="font-semibold text-sm sm:text-base mb-1">
                <span className="text-gradient">Chirag</span> Khatri
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1">
                🇮🇳 Based in India
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4 order-first md:order-none">
              {SOCIAL_LINKS.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-2.5 sm:p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>

            {/* Right side */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-xs sm:text-sm text-muted-foreground">
                © {currentYear} Chirag Khatri. All rights reserved.
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground/60 mt-1 flex items-center justify-center gap-1">
                Built with{" "}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Heart className="w-3 h-3 text-primary" />
                </motion.span>
                {" "}using React & Tailwind
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </FadeInWhenVisible>
  );
});

Footer.displayName = 'Footer';

export default Footer;