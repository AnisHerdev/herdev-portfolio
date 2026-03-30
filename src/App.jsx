import React from 'react';
import BgBlobs from './components/BgBlobs';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  const projectsData = [
    {
      title: "ASHA Worker Chatbot",
      tag: "Internship",
      description: "An AI-powered assistant designed to support frontline healthcare workers with real-time data entry and medical guidance.",
      link: "#",
      ariaLabel: "View ASHA Worker Chatbot Demo"
    },
    {
      title: "Fintech Dashboard",
      tag: "Personal",
      description: "A high-performance visualization tool for tracking decentralized finance (DeFi) assets across multiple networks.",
      link: "#",
      ariaLabel: "View Fintech Dashboard Demo"
    }
  ];

  return (
    <>
      <BgBlobs />
      <Navbar />
      <MobileNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects projects={projectsData} />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
