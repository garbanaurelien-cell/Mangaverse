import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-base px-4 py-10">
      <div className="w-full max-w-md rounded-card border border-white/10 bg-surface p-6 shadow-manga">
        <h1 className="mb-2 font-display text-5xl tracking-[-0.03em] text-text-primary">Connexion</h1>
        <p className="mb-6 font-body text-sm leading-[1.7] text-text-secondary">
          Reprends ta session et retrouve ton univers manga personnalisé.
        </p>

        <form className="space-y-4">
          <label className="block space-y-2">
            <span className="font-ui text-xs uppercase tracking-[0.08em] text-text-secondary">Email</span>
            <input
              type="email"
              className="min-h-11 w-full rounded-xl border border-white/15 bg-elevated px-3 py-2 font-body text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:opacity-90"
              placeholder="manga@super.app"
            />
          </label>

          <label className="block space-y-2">
            <span className="font-ui text-xs uppercase tracking-[0.08em] text-text-secondary">Mot de passe</span>
            <input
              type="password"
              className="min-h-11 w-full rounded-xl border border-white/15 bg-elevated px-3 py-2 font-body text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:opacity-90"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            className="inline-flex min-h-11 w-full min-w-11 items-center justify-center rounded-full bg-blood px-5 py-3 font-ui text-sm uppercase tracking-[0.02em] text-white outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-5 text-center font-body text-sm text-text-secondary">
          Nouveau ?{" "}
          <Link
            href="/register"
            className="inline-flex min-h-11 min-w-11 items-center rounded-full px-3 font-ui uppercase tracking-[0.02em] text-gold outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </section>
  );
}
