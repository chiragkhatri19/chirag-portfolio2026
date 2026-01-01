import { Helmet } from "react-helmet-async";
import { lazy, Suspense, memo } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import CustomCursor from "@/components/portfolio/CustomCursor";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { motion, AnimatePresence } from "framer-motion";

// Lazy load below-the-fold sections for faster initial paint
const About = lazy(() => import("@/components/portfolio/About"));
const Skills = lazy(() => import("@/components/portfolio/Skills"));
const Projects = lazy(() => import("@/components/portfolio/Projects"));
const Experience = lazy(() => import("@/components/portfolio/Experience"));
const Contact = lazy(() => import("@/components/portfolio/Contact"));
const Footer = lazy(() => import("@/components/portfolio/Footer"));

// Minimal loading fallback that doesn't cause layout shift
const SectionFallback = memo(() => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
));

SectionFallback.displayName = 'SectionFallback';

const Index = memo(() => {
  // Initialize smooth scrolling
  useSmoothScroll();

  return (
    <>
      <Helmet>
        <title>Chirag Khatri | Full Stack Developer</title>
        <meta
          name="description"
          content="Chirag Khatri is a Full Stack Developer from India, specializing in building scalable web applications and clean user experiences with React, Node.js, and modern technologies."
        />
        <meta
          name="keywords"
          content="Full Stack Developer, Web Developer, React Developer, Node.js, JavaScript, TypeScript, Portfolio"
        />
        <meta name="author" content="Chirag Khatri" />
        <meta property="og:title" content="Chirag Khatri | Full Stack Developer" />
        <meta
          property="og:description"
          content="Full Stack Developer focused on performance, simplicity, and real-world products."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Chirag Khatri | Full Stack Developer" />
        <meta
          name="twitter:description"
          content="Full Stack Developer focused on performance, simplicity, and real-world products."
        />
        <link rel="canonical" href="https://chirag.dev" />
      </Helmet>

      <CustomCursor />

      <AnimatePresence mode="wait">
        <motion.div
          className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
});

Index.displayName = 'Index';

export default Index;