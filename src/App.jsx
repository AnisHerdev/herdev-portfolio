import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BgBlobs from './components/BgBlobs';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';

// Lazy load pages for optimization
const HomePage     = lazy(() => import('./pages/HomePage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const TerminalPage = lazy(() => import('./pages/TerminalPage'));

// Clean loader for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="glass p-8 animate-pulse text-white/50">Loading...</div>
  </div>
);

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => { element.scrollIntoView({ behavior: 'smooth' }); }, 100);
      }
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, pathname]);

  return null;
};

// Conditionally renders site chrome based on route
const SiteChrome = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const isTerminal = location.pathname === '/terminal';
  if (isTerminal) return null;
  return (
    <>
      <BgBlobs />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <MobileNav theme={theme} toggleTheme={toggleTheme} />
    </>
  );
};

const SiteFooter = () => {
  const location = useLocation();
  if (location.pathname === '/terminal') return null;
  return <Footer />;
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <ScrollToHash />
      <SiteChrome theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"         element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/terminal" element={<TerminalPage />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </Router>
  );
};

export default App;
