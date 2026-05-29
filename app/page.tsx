import Link from "next/link";

const highlights = [
  { title: "Feed vivant", description: "Palette dynamique extraite des covers anime en temps réel." },
  { title: "Salons immersifs", description: "Texte + voix avec une ambiance visuelle premium." },
  { title: "Studio créatif", description: "Dessine, annote et publie tes planches manga." },
];

export default function LandingPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-base px-4 pb-24 pt-10 md:px-10 md:pb-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 10%, rgba(124,58,237,0.30), transparent 60%), radial-gradient(70% 70% at 80% 20%, rgba(232,0,45,0.24), transparent 70%), radial-gradient(50% 50% at 50% 90%, rgba(245,166,35,0.20), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="space-y-5">
          <p className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/5 px-4 font-ui text-xs uppercase tracking-[0.08em] text-text-secondary">
            Apple x Manga Experience
          </p>
          <h1 className="max-w-4xl font-display text-6xl leading-[0.9] tracking-[-0.03em] text-text-primary md:text-8xl">
            L&apos;univers manga social,
            <span className="block text-blood">immersif et premium.</span>
          </h1>
          <p className="max-w-2xl font-body text-lg leading-[1.7] text-text-secondary">
            Une super-app pensée mobile-first pour publier, théoriser, regarder, apprendre et créer autour de tes mangas
            favoris.
          </p>
        </header>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/register"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-blood px-6 py-3 font-ui text-sm uppercase tracking-[0.02em] text-white outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
          >
            Commencer
          </Link>
          <Link
            href="/login"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 font-ui text-sm uppercase tracking-[0.02em] text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
          >
            Se connecter
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-card border border-white/10 bg-surface p-card-pad shadow-manga transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 hover:shadow-manga-hover"
            >
              <h2 className="mb-2 font-ui text-sm uppercase tracking-[0.08em] text-gold">{item.title}</h2>
              <p className="font-body text-sm leading-[1.7] text-text-secondary">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
