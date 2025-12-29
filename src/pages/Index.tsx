import { Helmet } from "react-helmet-async";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
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

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;