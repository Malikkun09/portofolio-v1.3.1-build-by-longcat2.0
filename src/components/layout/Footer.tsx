export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink py-10">
      <div className="frame flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-xl uppercase tracking-display">Malik Fajar</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
            Software × AI × Creative development
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
          Cimahi, Indonesia · © 2026
        </p>
      </div>
    </footer>
  );
}
