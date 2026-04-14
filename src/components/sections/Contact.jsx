import { useState } from 'react';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/chetanpachauli', icon: '💼' },
  { label: 'GitHub', href: 'https://github.com/chetanpachauli', icon: '🐙' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) return;
    window.open(
      `mailto:chetanpachauli@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(
        form.name
      )}&body=${encodeURIComponent(form.message + '\n\nFrom: ' + form.name + ' <' + form.email + '>')}`
    );
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[var(--bg)] px-6 py-24 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 65%)' }}
      />
      <div className="mx-auto relative max-w-3xl">
        <p className="section-label reveal">06. CONNECT</p>
        <h2 className="section-title reveal mb-4">
          Let's <span className="text-cyan">Work Together</span>
        </h2>
        <p className="reveal mb-12 max-w-2xl text-[var(--muted)]">
          Open to full-time roles, freelance projects, and exciting collaborations. Let's build something great.
        </p>

        <div className="reveal mb-10 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface2)] p-6 shadow-[0_0_40px_rgba(56,189,248,0.05)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-display text-xl font-[800] text-[var(--text)]">Availability</div>
              <div className="mt-1 text-sm text-[var(--muted)]">Ready for new projects and roles.</div>
            </div>
            <div className="badge flex items-center gap-2 rounded-full bg-[rgba(56,189,248,0.08)] px-4 py-2 text-sm text-[var(--cyan)]">
              <span className="avail-dot inline-block h-2.5 w-2.5 rounded-full bg-[var(--green)]" /> Available for work
            </div>
          </div>
        </div>

        <form
          className="reveal grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
          onSubmit={(event) => {
            event.preventDefault();
            handleSend();
          }}
        >
          <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface2)] p-6">
            <div className="mb-6 rounded-[1.25rem] bg-[var(--surface)] p-4">
              <label className="mb-2 block text-xs font-mono uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                className="form-input w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>
            <div className="mb-6 rounded-[1.25rem] bg-[var(--surface)] p-4">
              <label className="mb-2 block text-xs font-mono uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                className="form-input w-full"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="rounded-[1.25rem] bg-[var(--surface)] p-4">
              <label className="mb-2 block text-xs font-mono uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                className="form-input h-40 w-full resize-none"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or opportunity..."
                required
              />
            </div>
          </div>

          <div className="space-y-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface2)] p-6">
            <div>
              <div className="font-display text-lg font-[800] text-[var(--text)]">Reach Out</div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                Prefer email? I’ll respond quickly. For collaboration, let’s connect on GitHub and LinkedIn.
              </p>
            </div>
            <div className="space-y-3">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-[1rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] transition hover:border-cyan hover:text-cyan"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
            <button className="btn-primary w-full justify-center py-3 text-sm" type="submit">
              {sent ? '✓ Opening Mail Client...' : '✉️ Send Message →'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
