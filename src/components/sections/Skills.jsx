import { useMemo, useState } from 'react';
import { SKILLS } from '../../data/portfolioData';

const TAB_LABELS = {
  all: '🧩 All',
  frontend: '⚛️ Frontend',
  backend: '⚡ Backend',
  data: '📊 Data',
  tools: '🔧 Tools',
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');

  const filteredSkills = useMemo(() => {
    const requestedKey = activeTab?.toString().trim().toLowerCase() || 'frontend';

    if (requestedKey === 'all') {
      return Object.values(SKILLS).flat();
    }

    if (SKILLS[requestedKey]) {
      return SKILLS[requestedKey];
    }

    const fallbackKey = Object.keys(SKILLS).find((key) => key.toLowerCase() === requestedKey);
    return fallbackKey ? SKILLS[fallbackKey] : Object.values(SKILLS).flat();
  }, [activeTab]);

  return (
    <section id="skills" className="bg-[var(--surface)] px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="section-label">02. TECHNICAL ARSENAL</p>
        <h2 className="section-title reveal mb-3">
          Skills &amp; <span className="text-cyan">Technologies</span>
        </h2>
        <p className="reveal mb-10 max-w-2xl text-[var(--muted)]">
          From pixel-perfect frontends to robust APIs and powerful data dashboards.
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          {Object.entries(TAB_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`filter-btn ${activeTab === key ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="skills-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface2)] p-5"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                transitionDelay: `${index * 0.04}s`,
              }}
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
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}