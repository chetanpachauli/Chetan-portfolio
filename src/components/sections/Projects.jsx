import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../data/portfolioData';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'mern', label: 'MERN Stack' },
  { key: 'data', label: 'Data Analytics' },
  { key: 'frontend', label: 'Frontend' },
];

function ProjectCard({ project, delay }) {
  return (
    <motion.article
      className="project-card group reveal relative overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] transition duration-300 ease-out hover:-translate-y-1"
      style={{ animationDelay: `${delay}s` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <div className="corner-tl" />
      <div className="corner-br" />

      <div className="project-img-wrap relative overflow-hidden">
        <img src={project.image} alt={project.title} className="project-img w-full h-full object-cover" />
        <div className="project-img-overlay absolute inset-0" />
        <div className="project-img-category absolute right-4 top-4">
          <span
            className="badge"
            style={{
              background: `${project.color}18`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display mb-1 text-lg font-[800] text-[var(--text)]">{project.title}</h3>
        <p className="font-mono mb-3 text-sm uppercase tracking-[0.08em] text-[var(--muted)]">{project.subtitle}</p>
        <p className="mb-4 text-sm leading-6 text-[var(--muted)]">{project.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech) => (
            <span key={tech} className="badge">{tech}</span>
          ))}
          {project.tech.length > 4 && <span className="badge">+{project.tech.length - 4}</span>}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center px-4 py-3 text-sm"
            >
              Live ↗
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost flex-1 justify-center px-4 py-3 text-sm"
          >
            🐙 Code
          </a>
        </div>
      </div>

      <div className="tech-overlay absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-cyan">Full Tech Stack</div>
        <div className="flex flex-wrap justify-center gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="badge"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex w-full flex-col gap-2 text-left">
          {project.features.map((feature) => (
            <div key={feature} className="font-mono text-[0.72rem] text-[rgba(226,232,240,0.75)]">
              <span className="mr-2 text-[0.6rem]" style={{ color: project.color }}>◆</span>
              {feature}
            </div>
          ))}
        </div>

        <div className="font-mono text-[0.7rem] text-[var(--muted)]">🚀 Deploy: {project.deploy}</div>

        <div className="flex flex-col gap-3 sm:flex-row sm:w-full">
          {project.live !== '#' && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center px-4 py-3 text-sm"
            >
              Live ↗
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full justify-center px-4 py-3 text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((project) => project.filter === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative overflow-hidden bg-[var(--bg)] px-6 py-24 lg:px-8">
      <div
        className="pointer-events-none absolute -right-14 -bottom-20 h-[500px] w-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.03) 0%, transparent 70%)' }}
      />
      <div className="mx-auto max-w-7xl">
        <p className="section-label reveal">03. PORTFOLIO</p>
        <h2 className="section-title reveal mb-3">
          Featured <span className="text-cyan">Projects</span>
        </h2>
        <p className="reveal mb-8 max-w-2xl text-[var(--muted)]">
          Hover any card to reveal the full tech stack &amp; features. Filter by category below.
        </p>

        <div className="reveal mb-8 flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">⚡ Filter:</span>
          {FILTERS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setFilter(option.key)}
              className={`filter-btn ${filter === option.key ? 'active' : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="projects-grid grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${filter}`} project={project} delay={index * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
