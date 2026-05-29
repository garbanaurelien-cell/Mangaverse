"use client";

import { useMemo, useState } from "react";
import { formatNumber } from "@/lib/utils";

type FeedCard = {
  id: string;
  author: string;
  title: string;
  body: string;
  aura: string;
  likes: number;
};

const posts: FeedCard[] = [
  {
    id: "1",
    author: "ErenTheory",
    title: "Thread Theory: Le vrai plan de Vegapunk",
    body: "Analyse croisée des chapitres 1067 à 1109 avec indices visuels et motifs de narration.",
    aura: "radial-gradient(100% 120% at 10% 0%, rgba(232,0,45,0.25), transparent 60%)",
    likes: 1240,
  },
  {
    id: "2",
    author: "MangaLens",
    title: "Top 5 openings underrated",
    body: "Sélection basée sur la mise en scène, la colorimétrie et la progression émotionnelle.",
    aura: "radial-gradient(100% 120% at 90% 10%, rgba(124,58,237,0.3), transparent 60%)",
    likes: 998,
  },
  {
    id: "3",
    author: "PanelMaster",
    title: "Review: Jujutsu Kaisen 263",
    body: "Décryptage panel par panel, rythme, composition et impact sur l'arc final.",
    aura: "radial-gradient(90% 100% at 50% 100%, rgba(245,166,35,0.24), transparent 60%)",
    likes: 1820,
  },
];

const commentsPool = [
  { user: "NamiArc", text: "La théorie est solide, surtout le parallèle avec Egghead." },
  { user: "GojoFrame", text: "Masterclass d'analyse. Tu peux faire une partie 2 ?" },
  { user: "SakuraBytes", text: "J'adore la structure, c'est super clair à lire." },
  { user: "KaidoLore", text: "Le détail sur le pacing m'a convaincu direct." },
  { user: "LuffyGrid", text: "On veut ce format pour les prochains chapitres." },
];

export default function FeedPage() {
  const [likesByPost, setLikesByPost] = useState<Record<string, number>>(
    Object.fromEntries(posts.map((post) => [post.id, post.likes])),
  );
  const [commentsByPost, setCommentsByPost] = useState<Record<string, { user: string; text: string }[]>>({});

  const totalComments = useMemo(
    () => Object.values(commentsByPost).reduce((sum, comments) => sum + comments.length, 0),
    [commentsByPost],
  );

  function generateComment(postId: string) {
    const randomComment = commentsPool[Math.floor(Math.random() * commentsPool.length)];
    setCommentsByPost((previous) => ({
      ...previous,
      [postId]: [...(previous[postId] ?? []), randomComment],
    }));
  }

  function incrementLike(postId: string) {
    setLikesByPost((previous) => ({
      ...previous,
      [postId]: (previous[postId] ?? 0) + 1,
    }));
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-base px-4 pb-10 pt-6 md:px-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-65"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 10%, rgba(124,58,237,0.18), transparent 70%), radial-gradient(60% 55% at 80% 20%, rgba(232,0,45,0.18), transparent 70%), radial-gradient(50% 45% at 50% 90%, rgba(245,166,35,0.16), transparent 70%)",
          transition: "opacity 600ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-3">
        <header className="mb-2">
          <h1 className="font-display text-6xl tracking-[-0.03em] text-text-primary md:text-7xl">Feed</h1>
          <p className="font-body text-sm leading-[1.7] text-text-secondary">
            Chaque post injecte sa propre aura couleur pour un flux vivant et immersif.
          </p>
          <div className="mt-3 inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 font-ui text-xs uppercase tracking-[0.08em] text-gold">
            {formatNumber(totalComments)} commentaires générés en live
          </div>
        </header>

        {posts.map((post) => (
          <article
            key={post.id}
            className="relative overflow-hidden rounded-card border border-white/10 bg-surface p-card-pad shadow-manga transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 hover:shadow-manga-hover"
          >
            <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: post.aura }} />
            <div className="relative">
              <p className="font-ui text-xs uppercase tracking-[0.08em] text-text-secondary">@{post.author}</p>
              <h2 className="mt-1 font-ui text-sm uppercase tracking-[0.08em] text-gold">{post.title}</h2>
              <p className="mt-2 font-body text-sm leading-[1.7] text-text-secondary">{post.body}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => incrementLike(post.id)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 font-ui text-xs uppercase tracking-[0.08em] text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
                >
                  Like {formatNumber(likesByPost[post.id] ?? post.likes)}
                </button>
                <button
                  type="button"
                  onClick={() => generateComment(post.id)}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 font-ui text-xs uppercase tracking-[0.08em] text-text-primary outline-none transition-transform duration-200 ease-manga transition-opacity hover:scale-[1.02] hover:opacity-100 focus-visible:ring-2 focus-visible:ring-blood focus-visible:ring-offset-2 focus-visible:ring-offset-base active:scale-[0.97] active:opacity-90"
                >
                  Générer commentaire
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {(commentsByPost[post.id] ?? []).map((comment, index) => (
                  <div key={`${comment.user}-${index}`} className="rounded-xl border border-white/10 bg-elevated px-3 py-2">
                    <p className="font-ui text-[11px] uppercase tracking-[0.08em] text-gold">@{comment.user}</p>
                    <p className="font-body text-sm leading-[1.7] text-text-secondary">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
