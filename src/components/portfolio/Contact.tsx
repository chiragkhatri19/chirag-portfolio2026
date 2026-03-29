import { Github, Linkedin, Mail, Send, Twitter, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, memo } from "react";

const SOCIAL_LINKS = [
  { href: "https://github.com/chiragkhatri19", icon: Github, label: "GitHub", handle: "@chiragkhatri19" },
  { href: "https://x.com/chiragx19", icon: Twitter, label: "X (Twitter)", handle: "@chiragx19" },
  { href: "https://www.linkedin.com/in/chiragk19/", icon: Linkedin, label: "LinkedIn", handle: "/in/chiragk19" },
  { href: "mailto:chiragkhatri19@gmail.com", icon: Mail, label: "Email", handle: "chiragkhatri19@gmail.com" },
] as const;

const Contact = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative bg-transparent overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-[60px] relative z-10">
        {/* Big bold CTA headline */}
        <div className="mb-20">
          <span className="font-space-mono text-[10px] text-zinc-500 uppercase tracking-[0.4em] mb-4 block">
            Let's Connect
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white font-formula-condensed tracking-tighter uppercase leading-[0.95]">
            GOT AN IDEA?
            <br />
            <span className="text-[#ea580c]">LET'S TALK.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Clean minimal form */}
          <div>
            <form className="space-y-10">
              <div className="space-y-1">
                <label className="font-space-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] block">
                  Your Name
                </label>
                <input 
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/10 hover:border-white/20 focus:border-[#ea580c] py-4 text-white font-outfit text-lg focus:outline-none transition-colors duration-300 placeholder:text-zinc-700"
                  placeholder="chirag khatri"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] block">
                  Email
                </label>
                <input 
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/10 hover:border-white/20 focus:border-[#ea580c] py-4 text-white font-outfit text-lg focus:outline-none transition-colors duration-300 placeholder:text-zinc-700"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="font-space-mono text-[10px] text-zinc-600 uppercase tracking-[0.3em] block">
                  Message
                </label>
                <textarea
                  rows={3}
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/10 hover:border-white/20 focus:border-[#ea580c] py-4 text-white font-outfit text-lg focus:outline-none transition-colors duration-300 resize-none placeholder:text-zinc-700"
                  placeholder="tell me about your project..."
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 bg-[#ea580c] hover:bg-[#dc4a04] text-white px-8 py-4 rounded-full font-space-mono text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300"
              >
                <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                Send Message
              </motion.button>
            </form>
          </div>

          {/* Right: Social links + availability */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <p className="text-zinc-400 font-outfit text-lg leading-relaxed">
                prefer a direct message? hit me up on any of these — i usually respond within a day.
              </p>

              <div className="space-y-3">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 border-b border-white/5 hover:border-white/15 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <social.icon size={18} className="text-zinc-500 group-hover:text-[#ea580c] transition-colors" />
                      <div>
                        <span className="text-white font-outfit text-sm block group-hover:text-[#ea580c] transition-colors">{social.label}</span>
                        <span className="font-space-mono text-[10px] text-zinc-600 tracking-wider">{social.handle}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-[#ea580c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="mt-12 flex items-center gap-3 py-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </div>
              <span className="font-space-mono text-[11px] text-zinc-400 tracking-wider">
                Available for freelance & full-time roles
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;