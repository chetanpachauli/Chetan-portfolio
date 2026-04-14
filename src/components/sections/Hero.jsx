import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const titles = ['MERN Stack Developer', 'Data Analyst', 'UI/UX Enthusiast', 'Full Stack Builder'];
const techChips = ['React', 'Node.js', 'Power BI', 'MongoDB'];

export default function Hero({ dark, photoSrc = '/assets/profile.svg' }) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let currentTitle = 0;
    let index = 0;
    let isDeleting = false;
    let timeoutId;

    const tick = () => {
      const fullText = titles[currentTitle];
      if (!isDeleting) {
        setTyped(fullText.slice(0, index + 1));
        index += 1;
        if (index === fullText.length) {
          isDeleting = true;
          timeoutId = window.setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(fullText.slice(0, index - 1));
        index -= 1;
        if (index === 0) {
          isDeleting = false;
          currentTitle = (currentTitle + 1) % titles.length;
        }
      }
      timeoutId = window.setTimeout(tick, isDeleting ? 55 : 85);
    };

    timeoutId = window.setTimeout(tick, 600);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleHireClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className="grid-bg relative overflow-hidden px-6 py-24 lg:px-8"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="pointer-events-none absolute top-[15%] left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="fade-up-1 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 mb-8">
            <span className="wave text-xl">👋</span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Hello, World! I'm —
            </span>
          </div>

          <motion.h1
            className="fade-up-2 section-title mb-6 text-[clamp(2.8rem,8vw,5.5rem)] leading-tight"
            style={{ color: dark ? '#fff' : 'var(--text)' }}
          >
            Chetan<br />
            <span className="shimmer-text">Pachauli</span>
          </motion.h1>

          <div className="fade-up-3 mb-6 flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
            <div className="flex items-center justify-center gap-2 text-base text-[var(--muted)] lg:justify-start">
              <span className="text-cyan">$</span>
              <span className="text-[var(--text)]">{typed}</span>
              <span className="text-cyan animate-blink">▌</span>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
              Entry-level Web Developer with hands-on experience in the MERN stack, React.js, JavaScript, and REST APIs — building responsive, data-driven applications with clean and maintainable code.
            </p>
          </div>

          <div className="fade-up-4 hero-btns mb-10 flex flex-wrap justify-center gap-4 lg:justify-start">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Download Resume
            </a>
            <button className="btn-ghost" onClick={handleHireClick} type="button">
              Hire Me →
            </button>
          </div>

          <div className="fade-up-4 flex flex-wrap justify-center gap-6 lg:justify-start">
            {[
              ['4', '+ Projects', 'Built'],
              ['2', ' Certs', 'Earned'],
              ['8.0', ' CGPA', 'Score'],
              ['2025', ' Year', 'Graduating'],
            ].map(([value, label, note]) => (
              <div key={note} className="text-center lg:text-left">
                <div className="stat-num text-4xl font-[800] text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple">
                  {value}
                  <span className="ml-2 text-base font-medium text-[var(--muted)]">{label}</span>
                </div>
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--muted)] mt-2">
                  {note}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="float flex-shrink-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <div className="photo-wrapper mx-auto w-[300px] h-[300px] lg:w-[340px] lg:h-[340px] relative">
            <div className="photo-ring-1" />
            <div className="photo-ring-2" />
            <img src={photoSrc} alt="Chetan Pachauli" className="photo-img" />
            <div className="photo-badge">
              <span className="avail-dot" />
              <span className="font-mono text-[0.68rem] text-[#34d399]">Available for work</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
            {techChips.map((tech) => (
              <span key={tech} className="badge text-[0.7rem]">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
