const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

export async function fetchTopAnime() {
  const response = await fetch(`${JIKAN_BASE_URL}/top/anime`, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error("Failed to fetch top anime from Jikan.");
  }

  return response.json();
}
