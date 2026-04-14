export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] px-6 py-8 lg:px-8">
      <div className="mx-auto flex flex-col items-center justify-between gap-4 text-center text-sm text-[var(--muted)] md:flex-row md:text-left md:text-base max-w-7xl">
        <p>Designed &amp; built by <span className="text-cyan">Chetan Pachauli</span> · 2025 · Ghaziabad, UP</p>
        <button
          type="button"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-ghost"
        >
          Back to Top
        </button>
      </div>
    </footer>
  );
}
