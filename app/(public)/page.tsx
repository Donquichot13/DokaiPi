export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[hsl(222,47%,4%)] text-white">
      <div className="space-y-4 text-center">
        <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-[#0075FF] to-[#582CFF] px-4 py-1.5 text-xs font-medium uppercase tracking-widest">
          En construction
        </div>
        <h1 className="text-5xl font-bold tracking-tight">
          Dokai
          <span className="bg-gradient-to-r from-[#0075FF] to-[#582CFF] bg-clip-text text-transparent">
            Pi
          </span>
        </h1>
        <p className="max-w-md text-lg text-[#A0AEC0]">
          Agence web & solutions digitales sur mesure.
          <br />
          Bientôt disponible.
        </p>
        <div className="pt-4 text-xs text-[#718096]">Phase 1 — Foundation ✓</div>
      </div>
    </main>
  )
}
