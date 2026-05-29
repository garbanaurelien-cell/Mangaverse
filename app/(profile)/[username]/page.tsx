"use client";

import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

type ProfilePageProps = {
  params: {
    username: string;
  };
};

const tabs = ["Publications", "Animes favoris", "Théories", "Dessins", "Vidéos", "Historique"];
const followers: string[] = [
  "SatoruPanel",
  "NanaFrame",
  "TokyoInk",
  "MangaPulse",
  "LunaOtaku",
  "KitsuneThread",
];
const following: string[] = ["OPArchive", "BleachScope", "JJKNotes", "VinlandFiles", "HxHResearch"];
const publications: string[] = [
  "Thread: analyse du chapitre 1110",
  "Review épisode 8 - animation et rythme",
  "Comparatif manga vs anime arc Shibuya",
  "Post visuel: top 10 couvertures 2026",
];
const theories: string[] = [
  "Théorie: l'héritage secret du clan D.",
  "Théorie: parallèle narratif Gojo / Geto",
  "Théorie: foreshadowing du chapitre 1067",
];
const history: string[] = [
  "Like sur Post #322",
  "Commentaire sur théorie Vegapunk",
  "Participation salon voice 'Seinen Club'",
  "Ajout de One Piece à la liste favoris",
];

type AnimeItem = {
  id: string;
  title: string;
  status: string;
  score: string;
  progress: string;
  notes: string;
  coverUrl: string;
  related: string[];
};

const animeLibrary = [
  {
    id: "op",
    title: "One Piece",
    status: "En cours",
    score: "9.8",
    progress: "1110 chapitres suivis",
    notes: "Focus sur le worldbuilding et les setups long terme.",
    coverUrl: "https://placehold.co/400x600/111118/E8002D?text=ONE+PIECE",
    related: [
      "Publication: Thread chapitre 1110",
      "Théorie: vrai rôle de Vegapunk",
      "Historique: 18 commentaires sur l'arc Egghead",
    ],
  },
  {
    id: "jjk",
    title: "Jujutsu Kaisen",
    status: "Terminé",
    score: "9.2",
    progress: "263 chapitres analysés",
    notes: "Analyse de composition et chorégraphie des combats.",
    coverUrl: "https://placehold.co/400x600/111118/F5A623?text=JJK",
    related: [
      "Publication: Review chapitre 263",
      "Théorie: destin de Yuji",
      "Historique: 11 posts sauvegardés",
    ],
  },
  {
    id: "vinland",
    title: "Vinland Saga",
    status: "En cours",
    score: "9.5",
    progress: "205 chapitres archivés",
    notes: "Suivi thématique sur la violence et la rédemption.",
    coverUrl: "https://placehold.co/400x600/111118/7C3AED?text=VINLAND",
    related: [
      "Publication: Analyse arc Baltic Sea",
      "Théorie: trajectoire finale de Thorfinn",
      "Historique: 7 débats communautaires",
    ],
  },
  {
    id: "bleach",
    title: "Bleach",
    status: "Terminé",
    score: "8.9",
    progress: "698 chapitres archivés",
    notes: "Analyse de chara-design et dynamiques de combat.",
    coverUrl: "https://placehold.co/400x600/111118/F0F0F5?text=BLEACH",
    related: ["Publication: Arc TYBW review", "Historique: 4 débats ouverts"],
  },
  {
    id: "hxh",
    title: "Hunter x Hunter",
    status: "En pause",
    score: "9.6",
    progress: "400 chapitres suivis",
    notes: "Focus stratégique sur les arcs Chimera Ant et Succession War.",
    coverUrl: "https://placehold.co/400x600/111118/8888A0?text=HXH",
    related: ["Théorie: Nen post-mortem", "Publication: Arc Yorknew breakdown"],
  },
  {
    id: "naruto",
    title: "Naruto",
    status: "Terminé",
    score: "8.5",
    progress: "700 chapitres lus",
    notes: "Suivi de la progression des personnages secondaires.",
    coverUrl: "https://placehold.co/400x600/111118/FF6B00?text=NARUTO",
    related: ["Publication: Akatsuki impact", "Historique: 9 commentaires"],
  },
  {
    id: "aot",
    title: "Attack on Titan",
    status: "Terminé",
    score: "9.4",
    progress: "139 chapitres étudiés",
    notes: "Analyse politique et structure en miroir des arcs.",
    coverUrl: "https://placehold.co/400x600/111118/BB342F?text=AOT",
    related: ["Théorie: boucle temporelle", "Publication: Final arc pacing"],
  },
  {
    id: "demon",
    title: "Demon Slayer",
    status: "Terminé",
    score: "8.2",
    progress: "205 chapitres",
    notes: "Accent mis sur la direction artistique des affrontements.",
    coverUrl: "https://placehold.co/400x600/111118/2A9D8F?text=KNY",
    related: ["Publication: Infinity Castle", "Historique: 3 likes enregistrés"],
  },
  {
    id: "chainsaw",
    title: "Chainsaw Man",
    status: "En cours",
    score: "9.1",
    progress: "170 chapitres suivis",
    notes: "Travail sur le rythme et les ruptures narratives.",
    coverUrl: "https://placehold.co/400x600/111118/E63946?text=CSM",
    related: ["Théorie: Death Devil", "Publication: Part 2 review"],
  },
  {
    id: "opm",
    title: "One Punch Man",
    status: "En cours",
    score: "8.7",
    progress: "240 chapitres",
    notes: "Suivi de l'évolution visuelle des redraws.",
    coverUrl: "https://placehold.co/400x600/111118/FFE066?text=OPM",
    related: ["Publication: Monster Arc", "Historique: 5 sauvegardes"],
  },
] as AnimeItem[];

const worstAnime = [
  { id: "worst1", title: "Pacing Collapse", coverUrl: "https://placehold.co/400x600/1A1A24/5A5A6D?text=WORST+1" },
  { id: "worst2", title: "Filler Storm", coverUrl: "https://placehold.co/400x600/1A1A24/6C4A4A?text=WORST+2" },
  { id: "worst3", title: "Flat Ending", coverUrl: "https://placehold.co/400x600/1A1A24/4A6C5F?text=WORST+3" },
  { id: "worst4", title: "Bad Adapt", coverUrl: "https://placehold.co/400x600/1A1A24/6C5C4A?text=WORST+4" },
  { id: "worst5", title: "Weak Cast", coverUrl: "https://placehold.co/400x600/1A1A24/4A5A6C?text=WORST+5" },
  { id: "worst6", title: "No Stakes", coverUrl: "https://placehold.co/400x600/1A1A24/6C4A6A?text=WORST+6" },
  { id: "worst7", title: "Messy Arc", coverUrl: "https://placehold.co/400x600/1A1A24/6A6C4A?text=WORST+7" },
  { id: "worst8", title: "Low Budget", coverUrl: "https://placehold.co/400x600/1A1A24/4A6A6C?text=WORST+8" },
  { id: "worst9", title: "Bad OST", coverUrl: "https://placehold.co/400x600/1A1A24/6C4F4A?text=WORST+9" },
  { id: "worst10", title: "Rushed End", coverUrl: "https://placehold.co/400x600/1A1A24/4F4A6C?text=WORST+10" },
];

type StatsSection = "Abonnés" | "Abonnements" | "Publications";

export default function ProfilePage({ params }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState("Animes favoris");
  const [activeStatsSection, setActiveStatsSection] = useState<StatsSection | null>(null);
  const [statsSearch, setStatsSearch] = useState("");
  const [selectedAnimeId, setSelectedAnimeId] = useState(animeLibrary[0].id);
  const [isFollowing, setIsFollowing] = useState(false);

  const stats = [
    { label: "Publications" as StatsSection, value: formatNumber(482) },
    { label: "Abonnés" as StatsSection, value: formatNumber(12450) },
    { label: "Abonnements" as StatsSection, value: formatNumber(312) },
    { label: "XP", value: formatNumber(90840) },
  ];
  const selectedAnime = animeLibrary.find((anime) => anime.id === selectedAnimeId) ?? animeLibrary[0];

  function getStatsDetails() {
    if (activeStatsSection === "Abonnés") {
      return followers;
    }
    if (activeStatsSection === "Abonnements") {
      return following;
    }
    return publications;
  }

  const filteredStatsDetails = useMemo(() => {
    const entries = getStatsDetails();
    const query = statsSearch.trim().toLowerCase();
    if (!query) {
      return entries;
    }
    return entries.filter((entry) => entry.toLowerCase().includes(query));
  }, [activeStatsSection, statsSearch]);

  function getStatsEntryHref(entry: string) {
    if (activeStatsSection === "Abonnés" || activeStatsSection === "Abonnements") {
      return `/${entry}`;
    }
    return "/feed";
  }

  return (
    <section className="min-h-screen bg-base px-4 pb-10 pt-4 md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <div className="relative overflow-hidden rounded-card border border-white/10 bg-surface shadow-manga">
          <div
            className="h-44 w-full"
            style={{
              background:
                "radial-gradient(100% 120% at 20% 20%, rgba(124,58,237,0.55), transparent 60%), radial-gradient(80% 90% at 80% 10%, rgba(232,0,45,0.45), transparent 60%), linear-gradient(120deg, #111118, #1A1A24)",
            }}
          />
          <div className="-mt-14 px-5 pb-5 md:px-7">
            <div className="mb-3 h-28 w-28 rounded-full border-2 border-blood/70 bg-floating p-1">
              <div className="h-full w-full rounded-full bg-elevated" />
            </div>
            <h1 className="font-display text-5xl tracking-[-0.03em] text-text-primary">@{params.username}</h1>
            <p className="mt-2 max-w-2xl font-body text-sm leading-[1.7] text-text-secondary">
              Fan de seinen, analyses narratives et worldbuilding. Ici je poste des threads, des théories et mes critiques
              manga détaillées.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 rounded-card border border-white/10 bg-elevated p-3">
              {stats
                .filter((stat) => stat.label !== "XP")
                .map((stat) => (
                  <button
                    key={stat.label}
                    type="button"
                    onClick={() => {
                      setActiveStatsSection(stat.label as StatsSection);
                      setStatsSearch("");
                    }}
                    className={`inline-flex min-h-11 min-w-11 flex-col items-center justify-center rounded-xl border font-ui text-[11px] uppercase tracking-[0.08em] outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90 ${
                      "border-white/10 bg-white/5 text-text-primary"
                    }`}
                  >
                    <span className="font-display text-3xl tracking-[-0.03em]">{stat.value}</span>
                    {stat.label}
                  </button>
                ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setIsFollowing((previous) => !previous)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-blood px-5 py-2 font-ui text-xs uppercase tracking-[0.08em] text-white outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
              >
                {isFollowing ? "Abonné" : "Suivre"}
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 font-ui text-xs uppercase tracking-[0.08em] text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
              >
                Message
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="rounded-card border border-white/10 bg-surface p-4 shadow-manga">
              <p className="font-ui text-xs uppercase tracking-[0.08em] text-text-secondary">{stat.label}</p>
              <p className="mt-1 font-display text-4xl tracking-[-0.03em] text-text-primary">{stat.value}</p>
            </article>
          ))}
        </div>

        {activeStatsSection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay px-4 backdrop-blur-nav">
            <div className="w-full max-w-2xl rounded-card border border-white/10 bg-elevated p-4 shadow-manga">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="font-ui text-xs uppercase tracking-[0.08em] text-gold">
                  {activeStatsSection} · recherche
                </p>
                <button
                  type="button"
                  onClick={() => setActiveStatsSection(null)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 font-ui text-xs uppercase tracking-[0.08em] text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
                >
                  Fermer
                </button>
              </div>
              <input
                value={statsSearch}
                onChange={(event) => setStatsSearch(event.target.value)}
                placeholder={`Rechercher dans ${activeStatsSection.toLowerCase()}`}
                className="mb-3 min-h-11 w-full rounded-xl border border-white/15 bg-surface px-3 py-2 font-body text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-elevated active:opacity-90"
              />
              <div className="grid max-h-[360px] gap-2 overflow-y-auto md:grid-cols-2">
                {filteredStatsDetails.map((entry) => (
                  <Link
                    key={entry}
                    href={getStatsEntryHref(entry)}
                    onClick={() => setActiveStatsSection(null)}
                    className="inline-flex min-h-11 min-w-11 items-center rounded-xl border border-white/10 bg-surface px-3 py-2 font-body text-sm leading-[1.7] text-text-secondary outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-elevated active:scale-[0.97] active:opacity-90"
                  >
                    {entry}
                  </Link>
                ))}
                {filteredStatsDetails.length === 0 && (
                  <div className="rounded-xl border border-white/10 bg-surface px-3 py-2">
                    <p className="font-body text-sm leading-[1.7] text-text-secondary">Aucun résultat.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="rounded-card border border-white/10 bg-surface p-4 shadow-manga">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`inline-flex min-h-11 min-w-11 items-center rounded-full border px-4 py-2 font-ui text-xs uppercase tracking-[0.08em] outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90 ${
                  activeTab === tab
                    ? "border-blood/50 bg-blood/20 text-text-primary"
                    : "border-white/15 bg-white/5 text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-white/10 bg-surface p-4 shadow-manga">
          <p className="mb-3 font-ui text-xs uppercase tracking-[0.08em] text-gold">{activeTab}</p>
          {activeTab === "Animes favoris" ? (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {animeLibrary.map((anime) => (
                <button
                  key={anime.id}
                  type="button"
                  onClick={() => setSelectedAnimeId(anime.id)}
                  className={`anime-cover-float relative inline-flex min-h-11 min-w-[140px] flex-col overflow-hidden rounded-xl border outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90 ${
                    selectedAnimeId === anime.id ? "border-blood/60" : "border-white/10"
                  }`}
                >
                  <img src={anime.coverUrl} alt={anime.title} className="anime-cover-pan h-52 w-36 object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-2 text-left font-ui text-[11px] uppercase tracking-[0.08em] text-white">
                    {anime.title}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid gap-2 md:grid-cols-2">
              {(activeTab === "Publications"
                ? publications
                : activeTab === "Théories"
                  ? theories
                  : activeTab === "Historique"
                    ? history
                    : activeTab === "Dessins"
                      ? ["Storyboard duel final", "Concept art couverture", "Panel redraw #17"]
                      : ["AMV épique arc Marineford", "Débrief vidéo chapitre 1110", "Short: top openings"]
              ).map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-elevated px-3 py-2">
                  <p className="font-body text-sm leading-[1.7] text-text-secondary">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-card border border-white/10 bg-surface p-4 shadow-manga">
          <p className="mb-3 font-ui text-xs uppercase tracking-[0.08em] text-gold">Top 10</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {animeLibrary.map((anime, index) => (
              <button
                key={`top-${anime.id}`}
                type="button"
                onClick={() => setSelectedAnimeId(anime.id)}
                className="relative inline-flex min-h-11 min-w-[140px] overflow-hidden rounded-xl border border-white/10 outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
              >
                <img src={anime.coverUrl} alt={anime.title} className="h-52 w-36 object-cover" />
                <span className="absolute left-2 top-2 rounded-full bg-blood px-2 py-1 font-ui text-[10px] uppercase tracking-[0.08em] text-white">
                  #{index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-white/10 bg-surface p-4 shadow-manga">
          <p className="mb-3 font-ui text-xs uppercase tracking-[0.08em] text-gold">Worst 10</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {worstAnime.map((anime, index) => (
              <article key={anime.id} className="relative inline-flex min-w-[140px] overflow-hidden rounded-xl border border-white/10">
                <img src={anime.coverUrl} alt={anime.title} className="h-52 w-36 object-cover opacity-80" />
                <span className="absolute left-2 top-2 rounded-full bg-white/10 px-2 py-1 font-ui text-[10px] uppercase tracking-[0.08em] text-text-primary">
                  #{index + 1}
                </span>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-white/5 bg-surface p-4 shadow-manga">
          <p className="mb-1 font-ui text-xs uppercase tracking-[0.08em] text-gold">Détails anime sélectionné</p>
          <h2 className="font-display text-5xl tracking-[-0.03em] text-text-primary">{selectedAnime.title}</h2>
          <p className="mt-2 font-body text-sm leading-[1.7] text-text-secondary">{selectedAnime.notes}</p>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-elevated p-3">
              <p className="font-ui text-[11px] uppercase tracking-[0.08em] text-text-secondary">Statut</p>
              <p className="font-body text-sm text-text-primary">{selectedAnime.status}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-elevated p-3">
              <p className="font-ui text-[11px] uppercase tracking-[0.08em] text-text-secondary">Note perso</p>
              <p className="font-body text-sm text-text-primary">{selectedAnime.score}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-elevated p-3">
              <p className="font-ui text-[11px] uppercase tracking-[0.08em] text-text-secondary">Progression</p>
              <p className="font-body text-sm text-text-primary">{selectedAnime.progress}</p>
            </div>
          </div>
          <div className="mt-3 grid gap-2">
            {selectedAnime.related.map((entry) => (
              <div key={entry} className="rounded-xl border border-white/10 bg-elevated px-3 py-2">
                <p className="font-body text-sm leading-[1.7] text-text-secondary">{entry}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
