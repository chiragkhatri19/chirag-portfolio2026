import { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import ApplePillNavbar from "./components/portfolio/ApplePillNavbar";
import Hero from "./components/portfolio/Hero";
import Skills from "./components/portfolio/Skills";
import Projects from "./components/portfolio/Projects";
import Experience from "./components/portfolio/Experience";
import SocialSections from "./components/portfolio/SocialSections";
import Contact from "./components/portfolio/Contact";
import Footer from "./components/portfolio/Footer";
import { ThemeProvider } from "./hooks/use-theme";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "./components/portfolio/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider>
        <AnimatePresence>
          {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        {/* Render portfolio continuously so assets load in background */}
        <div key="portfolio" className={loading ? "h-screen overflow-hidden" : ""}>
          <ApplePillNavbar />
          <main style={{
            background: "var(--background-gradient)",
            backgroundColor: "var(--bg)",
            position: "relative",
            minHeight: "100vh",
            overflow: "hidden"
          }}>
            {/* Fine Noise Overlay */}
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 999,
              opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }} />

            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <SocialSections />
            <Contact />
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
