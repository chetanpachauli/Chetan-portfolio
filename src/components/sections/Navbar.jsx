import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['About', 'Skills', 'Projects', 'Education', 'Resume', 'Contact'];

export default function Navbar({ dark, setDark, resumeUrl = '/resume.pdf', githubUrl = 'https://github.com/chetanpachauli' }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSection = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-2xl shadow-cyan/10' : 'glass'}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button
            onClick={() => goToSection('about')}
            className="font-display text-lg font-[800] tracking-tight text-[var(--text)] transition-colors hover:text-cyan"
          >
            CP<span className="text-cyan">.</span>dev
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link} onClick={() => goToSection(link)} className="nav-link">
                {link}
              </button>
            ))}
            <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              {dark ? '☀️' : '🌙'}
            </button>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-3 text-sm">
              GitHub ↗
            </a>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              {dark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="hamburger text-2xl text-[var(--text)]"
              aria-label="Toggle mobile menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu open"
            style={{ background: dark ? 'rgba(8,12,20,0.98)' : 'rgba(240,244,248,0.98)' }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => goToSection(link)}
                  className="font-display text-2xl font-[800] text-[var(--text)] transition-colors hover:text-cyan"
                >
                  {link}
                </button>
              ))}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 text-base"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
