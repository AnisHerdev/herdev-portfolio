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
      title: "AI Medical Chatbot (ASHA Support)",
      tag: "Internship",
      description: "Built a RAG-based chatbot using Python and TensorFlow for 1.2M ASHA workers, minimized hallucination in LLM outputs.",
      link: "https://github.com/AnisHerdev/health_care_SLM",
      ariaLabel: "View ASHA Worker Chatbot details"
    },
    {
      title: "Poethra Weekly Leaderboard",
      tag: "Personal",
      description: "Modular Firebase/React leaderboard with a deterministic ranking engine and optimized state management.",
      link: "https://poethra-leaderboard.web.app/",
      ariaLabel: "View Poethra Weekly Leaderboard on GitHub"
    },
    {
      title: "AI Hand Gesture Rock-Paper-Scissors",
      tag: "Deep Learning",
      description: "RL-based game with 97.6% CV gesture recognition accuracy; automated CI/CD via GitHub Actions.",
      link: "https://github.com/AnisHerdev/StonePaperScissors",
      ariaLabel: "View Gesture Detection Project on GitHub"
    },
    {
      title: "PPF Projection Calculator",
      tag: "Fintech",
      description: "Real-time financial visualization with Recharts and type-safe compounding interest logic in TypeScript.",
      link: "https://herdev-projects.web.app/",
      ariaLabel: "View PPF Projection Calculator on GitHub"
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
