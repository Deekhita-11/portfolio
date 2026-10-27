// ─── LeetCode API Integration ───────────────────────────────────
export const LEETCODE_USERNAME = "Deekhita";

const CACHE_KEY = "portfolio_leetcode_live_v5";
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

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
 * Fetches real live LeetCode stats for Deekhita:
 * Profile: https://leetcode.com/u/Deekhita/
 */
export async function fetchLeetCodeData(username = LEETCODE_USERNAME) {
  const cached = getCache();
  if (cached && cached.username === username) return cached;

  const fallback = {
    username,
    totalSolved: 71,
    easySolved: 42,
    mediumSolved: 29,
    hardSolved: 0,
    ranking: "2,206,401",
    totalSubmissions: 131,
    totalQuestions: 4095,
    streak: 3,
    activitySparkline: [2, 3, 1, 4, 2, 5, 3, 6, 8, 5, 7, 9, 6, 8],
    recentSubmissions: [
      { title: "Rotting Oranges", statusDisplay: "Accepted", lang: "cpp" },
      { title: "Longest Palindromic Substring", statusDisplay: "Accepted", lang: "cpp" },
      { title: "Longest Substring Without Repeating Characters", statusDisplay: "Accepted", lang: "cpp" },
      { title: "Same Tree", statusDisplay: "Accepted", lang: "cpp" },
      { title: "Add Two Numbers", statusDisplay: "Accepted", lang: "cpp" },
    ],
    loaded: true,
  };

  try {
    // 1. Fetch live comprehensive profile from Alfa LeetCode API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const profileRes = await fetch(
      `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (profileRes.ok) {
      const profile = await profileRes.json();

      const totalSolved = profile.totalSolved ?? fallback.totalSolved;
      const easySolved = profile.easySolved ?? fallback.easySolved;
      const mediumSolved = profile.mediumSolved ?? fallback.mediumSolved;
      const hardSolved = profile.hardSolved ?? fallback.hardSolved;
      const ranking = profile.ranking
        ? profile.ranking.toLocaleString()
        : fallback.ranking;

      const totalSubmissions =
        profile.totalSubmissions?.[0]?.submissions ??
        profile.matchedUserStats?.totalSubmissionNum?.[0]?.submissions ??
        fallback.totalSubmissions;

      const recentSubmissions =
        Array.isArray(profile.recentSubmissions) && profile.recentSubmissions.length > 0
          ? profile.recentSubmissions
          : fallback.recentSubmissions;

      const result = {
        username,
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        ranking,
        totalSubmissions,
        totalQuestions: profile.totalQuestions ?? 4095,
        streak: 3,
        activitySparkline: [2, 3, 1, 4, 2, 5, 3, 6, 8, 5, 7, 9, 6, 8],
        recentSubmissions,
        loaded: true,
      };

      setCache(result);
      return result;
    }

    // 2. Fallback to /solved endpoint if userProfile didn't respond with 200
    const solvedRes = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
    if (solvedRes.ok) {
      const solved = await solvedRes.json();
      const result = {
        ...fallback,
        totalSolved: solved.solvedProblem ?? fallback.totalSolved,
        easySolved: solved.easySolved ?? fallback.easySolved,
        mediumSolved: solved.mediumSolved ?? fallback.mediumSolved,
        hardSolved: solved.hardSolved ?? fallback.hardSolved,
        loaded: true,
      };
      setCache(result);
      return result;
    }

    return fallback;
  } catch (err) {
    console.warn("[Portfolio] LeetCode live fetch fallback used:", err);
    return fallback;
  }
}

