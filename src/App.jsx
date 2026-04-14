import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

function useScrollReveal() {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove('light');
    } else {
      root.classList.add('light');
    }
    try {
      window.localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [dark]);

  useEffect(() => {
    const stored = window.localStorage.getItem('portfolio-theme');
    if (stored === 'light') setDark(false);
    if (stored === 'dark') setDark(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(Math.max(percent, 0), 100));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useScrollReveal();

  const progressStyle = useMemo(() => ({ width: `${progress}%` }), [progress]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div id="scroll-progress" className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-cyan to-purple shadow-[0_0_8px_rgba(56,189,248,0.35)]" style={progressStyle} />
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero dark={dark} />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
