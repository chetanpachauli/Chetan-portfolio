import { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../../data/portfolioData';

const TAB_LABELS = {
  frontend: '⚛️ Frontend',
  backend: '⚡ Backend',
  data: '📊 Data',
  tools: '🔧 Tools',
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [animated, setAnimated] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated[activeTab]) {
          setAnimated((prev) => ({ ...prev, [activeTab]: true }));
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [activeTab, animated]);

  return (
    <section id="skills" ref={sectionRef} className="bg-[var(--surface)] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="section-label reveal">02. TECHNICAL ARSENAL</p>
        <h2 className="section-title reveal mb-3">
          Skills &amp; <span className="text-cyan">Technologies</span>
        </h2>
        <p className="reveal mb-10 max-w-2xl text-[var(--muted)]">
          From pixel-perfect frontends to robust APIs and powerful data dashboards.
        </p>

        <div className="reveal mb-8 flex flex-wrap gap-3">
          {Object.entries(TAB_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setAnimated((prev) => ({ ...prev, [key]: false }));
                window.setTimeout(() => setAnimated((prev) => ({ ...prev, [key]: true })), 50);
              }}
              className={`filter-btn ${activeTab === key ? 'active' : ''}`}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="skills-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {SKILLS[activeTab].map((skill, index) => (
            <div
              key={`${skill.name}-${activeTab}`}
              className="reveal rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface2)] p-5"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-body text-[0.88rem] font-semibold text-[var(--text)]">
                    {skill.name}
                  </span>
                </div>
                <span className="font-mono text-[0.7rem] text-cyan">{skill.level}%</span>
              </div>

              <div className="h-1 rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className="skill-fill h-full rounded-full bg-gradient-to-r from-cyan to-purple"
                  style={{ width: animated[activeTab] ? `${skill.level}%` : '0%', transitionDelay: `${0.2 + index * 0.1}s` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
