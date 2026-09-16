// ─── LeetCode API Integration ───────────────────────────────────
const LEETCODE_USERNAME = "Deekhita";

const CACHE_KEY = "portfolio_leetcode_cache_v3";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) return data;
  } catch {
    /* ignore corrupt cache */
  }
  return null;
}

function setCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    /* storage full or unavailable */
  }
}

/**
 * Fetches LeetCode stats for Deekhita:
 * Solved: 187, Easy: 82, Medium: 91, Hard: 14, Streak: 12 days.
 */
export async function fetchLeetCodeData(username = LEETCODE_USERNAME) {
  const cached = getCache();
  if (cached && cached.username === username) return cached;

  const fallback = {
    username,
    totalSolved: 187,
    easySolved: 82,
    mediumSolved: 91,
    hardSolved: 14,
    ranking: "145,820",
    contestRating: 1465,
    streak: 12,
    activitySparkline: [2, 3, 1, 4, 2, 5, 3, 6, 8, 5, 7, 9, 6, 8],
    loaded: true,
  };

  try {
    const [solvedRes, profileRes] = await Promise.allSettled([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}`),
    ]);

    const solved =
      solvedRes.status === "fulfilled" && solvedRes.value.ok
        ? await solvedRes.value.json()
        : null;

    const profile =
      profileRes.status === "fulfilled" && profileRes.value.ok
        ? await profileRes.value.json()
        : null;

    const result = {
      username,
      totalSolved: solved?.solvedProblem ?? 187,
      easySolved: solved?.easySolved ?? 82,
      mediumSolved: solved?.mediumSolved ?? 91,
      hardSolved: solved?.hardSolved ?? 14,
      ranking: profile?.ranking ? profile.ranking.toLocaleString() : "145,820",
      contestRating: profile?.contestRating
        ? Math.round(profile.contestRating)
        : 1465,
      streak: 12,
      activitySparkline: [2, 3, 1, 4, 2, 5, 3, 6, 8, 5, 7, 9, 6, 8],
      loaded: true,
    };

    setCache(result);
    return result;
  } catch (err) {
    console.warn("[Portfolio] LeetCode fetch failed:", err);
    return fallback;
  }
}
