import { memo, useEffect } from "react";
import "@/fonts.css";
import { Spotlight } from "@/components/ui/spotlight";

const Hero = memo(() => {
  useEffect(() => {
    // Update the resolution indicator with dynamic dimensions
    const ideasElement = document.getElementById('ideas-span');
    const dimensionsDisplay = document.getElementById('dimensions-display');

    if (ideasElement && dimensionsDisplay) {
      const updateDimensions = () => {
        const rect = ideasElement.getBoundingClientRect();
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);
        dimensionsDisplay.textContent = `${width} × ${height}`;
      };

      // Update every 100ms to track animation
      const interval = setInterval(updateDimensions, 100);
      updateDimensions(); // Initial call

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Formula', sans-serif"
      }}
    >
      {/* Aceternity Spotlight - Diagonal from Upper Left to IDEAS text */}
      <Spotlight
        className="-top-[750px] -left-[80px] md:-top-[730px] md:-left-[60px] pointer-events-none"
        fill="url(#spotlightGradient)"
      />

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <radialGradient id="spotlightGradient" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 1)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
        </defs>
      </svg>

      {/* Grid Pattern from Magic UI with Circular Gradient Fade */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(80, 80, 90, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(80, 80, 90, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(circle at 50% 20%, black 0%, black 25%, transparent 45%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 20%, black 0%, black 25%, transparent 45%)",
        pointerEvents: "none",
        zIndex: 1
      }} />

      {/* Additional gradient overlay for depth */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 50% 20%, rgba(35, 40, 50, 0.2) 0%, rgba(25, 30, 40, 0.15) 35%, transparent 60%)",
        pointerEvents: "none",
        zIndex: 1
      }} />



      {/* Animation Styles for Mobile */}
      <style>{`
        @media (max-width: 768px) {
          #hero h1 {
            alignItems: "center" !important;
          }
        }
      `}</style>

      {/* Block 1: Centered Headline */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        paddingTop: 140,
        textAlign: "center",
        position: "relative",
        zIndex: 2
      }}>
        <h1 style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          fontSize: "90px",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "0.05em",
          color: "#FFFFFF",
          textTransform: "uppercase",
          margin: 0,
          fontFamily: "'Formula Condensed', sans-serif",
          position: "relative",
          zIndex: 10
        }}>
          <span style={{ display: "block", marginBottom: "4px" }}>TURNING</span>

          <span style={{ display: "block" }}>
            <span
              id="ideas-span"
              className="inline-block relative overflow-visible"
              style={{
                padding: "16px 12px 0 12px",
                border: "1.5px solid rgba(255, 255, 255, 0.4)",
                borderRadius: "2px",
                animation: "ideasExpand 6s ease-in-out infinite, ideasFlicker 6s step-end infinite",
                whiteSpace: "nowrap",
                transform: "translateY(0)"
              }}>
              {/* Corner L-marks - Technical Design Look */}
              <div className="absolute top-[-2px] left-[-2px] w-3 h-3 border-t-[3px] border-l-[3px] border-white" />
              <div className="absolute top-[-2px] right-[-2px] w-3 h-3 border-t-[3px] border-r-[3px] border-white" />
              <div className="absolute bottom-[-2px] left-[-2px] w-3 h-3 border-b-[3px] border-l-[3px] border-white" />
              <div className="absolute bottom-[-2px] right-[-2px] w-3 h-3 border-b-[3px] border-r-[3px] border-white" />
              
              IDEAS

              {/* Dimension text - Technical Label */}
              <div className="absolute -top-[11px] left-1/2 -translate-x-1/2 flex items-center justify-center">
                <span 
                  id="dimensions-display"
                  className="bg-white text-black text-[9px] font-mono font-bold px-1.5 py-0.5 whitespace-nowrap leading-none tracking-normal"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  642 × 124
                </span>
              </div>
            </span>
            {" "}INTO
          </span>
          <span style={{
            display: "block",
            marginTop: "16px",
            animation: "realityFill 10s ease-in-out infinite"
          }}>REALITY</span>
        </h1>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes resolutionPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes realityFill {
          0% {
            color: transparent;
            -webkit-text-stroke: 2px #FFFFFF;
            opacity: 0.5;
          }
          15% {
            color: #FFFFFF;
            -webkit-text-stroke: 0px;
            opacity: 1;
          }
          85% {
            color: #FFFFFF;
            -webkit-text-stroke: 0px;
            opacity: 1;
          }
          100% {
            color: transparent;
            -webkit-text-stroke: 2px #FFFFFF;
            opacity: 0.5;
          }
        }
      `}</style>

      {/* Animation Styles */}
      <style>{`
        @keyframes ideasExpand {
          0% { letter-spacing: -0.02em; padding: 16px 12px 0 12px; }
          15% { letter-spacing: -0.02em; padding: 16px 12px 0 12px; }
          25% { letter-spacing: 0.15em; padding: 16px 24px 0 24px; }
          30% { letter-spacing: 0.15em; padding: 16px 24px 0 24px; }
          45% { letter-spacing: -0.02em; padding: 16px 12px 0 12px; }
          100% { letter-spacing: -0.02em; padding: 16px 12px 0 12px; }
        }
        @keyframes ideasFlicker {
          0%, 100% { opacity: 1; }
          26% { opacity: 0.8; }
          27% { opacity: 1; }
          28% { opacity: 0.6; }
          29% { opacity: 1; }
        }
      `}</style>

      {/* Block 3: Two-Column Bio Section */}
      <div className="bio-zone grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 px-6 md:px-[60px] pb-20 max-w-[1200px] mx-auto items-start relative z-10 transition-all duration-700">
        {/* Left: Bold Statement */}
        <div className="lg:mt-[130px] text-left">
          <p className="bio-statement text-4xl sm:text-5xl md:text-8xl font-black leading-[1.05] md:leading-[0.95] tracking-[0.02em] uppercase text-white font-formula-condensed" style={{ textShadow: "0 0 40px rgba(234,88,12,0.15), 0 0 80px rgba(234,88,12,0.08), 0 4px 12px rgba(0,0,0,0.5)" }}>
            HI! I'M <span className="text-[#ea580c]">CHIRAG</span>,
            <br />
            I LOVE MAKING THINGS
            <br />
            THAT SOLVES A REAL <span className="text-[#ea580c]">PROBLEM</span>
          </p>
        </div>

        {/* Right: Body Copy */}
        <div className="max-w-[480px] lg:mt-[120px] text-left">
          <p className="text-[15px] md:text-[16px] leading-[1.8] text-white/70 mb-8 font-mono tracking-tight" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" }}>
            i'm a cs student who loves building things that actually get used. i spend most of my time shipping full-stack apps, experimenting with AI workflows to move faster, and figuring out how to make stuff that doesn't suck. still learning, still breaking things — but that's kinda the point.
          </p>

          <div className="mt-10 group">
            <a 
              href="/chirag_khatri_resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex flex-col gap-1 no-underline"
            >
              <div className="bg-white px-8 py-4 rounded-[4px] flex items-center gap-3 transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-black font-formula-condensed text-xl font-black tracking-wider uppercase">
                  DOWNLOAD CV
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>


      <style>{`
        @keyframes resolutionPulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
        }

        @media (max-width: 768px) {
          #hero header {
            top: 12px !important;
            padding: 8px 16px !important;
            gap: 24px !important;
          }
          
          #hero nav {
            gap: 16px !important;
          }
          
          #hero nav a {
            font-size: 13px !important;
          }
          
          #hero h1 {
            font-size: clamp(48px, 14vw, 72px) !important;
          }
          
          #hero .bio-zone {
            grid-template-columns: 1fr !important;
            padding: 32px 24px 60px !important;
            gap: 32px !important;
          }
          
          #hero .bio-statement {
            font-size: clamp(24px, 7vw, 36px) !important;
          }
        }
      `}</style>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;