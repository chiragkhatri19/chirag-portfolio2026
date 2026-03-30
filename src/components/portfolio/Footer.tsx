import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";
import { memo, useMemo } from "react";

const SOCIAL_LINKS = [
  { href: "https://github.com/chiragkhatri19", label: "GitHub" },
  { href: "https://x.com/chiragx19", label: "X" },
  { href: "https://www.linkedin.com/in/chiragk19/", label: "LinkedIn" },
  { href: "mailto:chiragkhatri19@gmail.com", label: "Email" },
] as const;

const Footer = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="pt-20 pb-12 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
        <div className="w-full h-[1px] bg-white/5 mb-16" />
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black font-outfit">
                <span className="text-[#ea580c]">c</span>
                <span className="text-white/40">.dev</span>
              </span>
            </div>
            <p className="font-outfit text-sm text-zinc-500 max-w-[280px] leading-relaxed">
              building things that solve real problems. based in india, working globally.
            </p>
          </div>

          <div className="flex gap-8 md:gap-10">
            {SOCIAL_LINKS.map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 font-space-mono text-[11px] text-zinc-500 uppercase tracking-widest hover:text-white transition-colors duration-300"
              >
                {social.label}
                <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-space-mono text-[10px] text-zinc-700 uppercase tracking-[0.2em]">
            © {currentYear} Chirag Khatri. All rights reserved.
          </p>
          <p className="font-space-mono text-[10px] text-zinc-800 uppercase tracking-widest">
            React · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;