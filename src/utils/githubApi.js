// ─── GitHub API Integration ─────────────────────────────────────
const GITHUB_USERNAME = "Deekhita-11";

const CACHE_KEY = "portfolio_github_cache_v3";
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

// Fallback repositories based on Deekhita's projects
const DEFAULT_REPOS = [
  {
    name: "Periods-Tracker",
    description: "Menstrual cycle tracking application for recording cycle details, estimating upcoming periods, and viewing history.",
    language: "JavaScript · PHP · MySQL",
    stars: 4,
    forks: 1,
    url: "https://github.com/Deekhita-11/Deekhita-11",
  },
  {
    name: "blood-management-system",
    description: "Centralized system for managing blood donors, inventory, and hospital requests through a structured web interface.",
    language: "React · Vite · Tailwind",
    stars: 6,
    forks: 2,
    url: "https://github.com/Deekhita-11/Deekhita-11",
  },
  {
    name: "Gadget-Genie",
    description: "Gadget discovery and comparison platform that helps users find technology products based on parametric specifications.",
    language: "JavaScript · PHP · MySQL",
    stars: 5,
    forks: 1,
    url: "https://github.com/Deekhita-11/Deekhita-11",
  },
  {
    name: "Line-Follower-Bot",
    description: "Autonomous differential line-following robot with 5-channel IR optical array and motor driver control logic.",
    language: "Arduino · C++",
    stars: 7,
    forks: 2,
    url: "https://github.com/Deekhita-11/Deekhita-11",
  },
];

/**
 * Fetches GitHub profile, repositories, events, and contribution graph data for Deekhita-11.
 */
export async function fetchGitHubData(username = GITHUB_USERNAME) {
  const cached = getCache();
  if (cached && cached.username === username) return cached;

  const fallback = {
    username,
    repos: 14,
    followers: 12,
    contributions: [],
    totalContributions: 284,
    recentEvents: [
      {
        type: "PushEvent",
        repo: "blood-management-system",
        date: new Date().toISOString(),
        commits: 4,
        desc: "pushed to blood-management-system",
      },
      {
        type: "PushEvent",
        repo: "Periods-Tracker",
        date: new Date(Date.now() - 86400000).toISOString(),
        commits: 2,
        desc: "updated prediction algorithm",
      },
    ],
    recentRepos: DEFAULT_REPOS,
    loaded: false,
  };

  try {
    const [profileRes, reposRes, eventsRes, contribRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=10`),
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
    ]);

    const profile =
      profileRes.status === "fulfilled" && profileRes.value.ok
        ? await profileRes.value.json()
        : null;

    const reposData =
      reposRes.status === "fulfilled" && reposRes.value.ok
        ? await reposRes.value.json()
        : null;

    const events =
      eventsRes.status === "fulfilled" && eventsRes.value.ok
        ? await eventsRes.value.json()
        : [];

    const contribData =
      contribRes.status === "fulfilled" && contribRes.value.ok
        ? await contribRes.value.json()
        : null;

    const recentRepos = Array.isArray(reposData) && reposData.length > 0
      ? reposData.slice(0, 4).map((r) => ({
          name: r.name,
          description: r.description || "Software & engineering repository.",
          language: r.language || "JavaScript / C++",
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          url: r.html_url,
        }))
      : DEFAULT_REPOS;

    const recentEvents = Array.isArray(events)
      ? events
          .filter((e) => ["PushEvent", "CreateEvent", "PullRequestEvent"].includes(e.type))
          .slice(0, 5)
          .map((e) => ({
            type: e.type,
            repo: e.repo?.name?.split("/")[1] || e.repo?.name,
            date: e.created_at,
            commits: e.type === "PushEvent" ? e.payload?.commits?.length || 0 : 0,
            desc:
              e.type === "PushEvent"
                ? `pushed ${e.payload?.commits?.length || 0} commit${(e.payload?.commits?.length || 0) !== 1 ? "s" : ""}`
                : `updated repository`,
          }))
      : fallback.recentEvents;

    const contributions = contribData?.contributions
      ? contribData.contributions.slice(-140).map((c) => ({
          date: c.date,
          count: c.count,
          level: c.level,
        }))
      : [];

    const totalKeys = contribData?.total ? Object.values(contribData.total) : [];
    const totalContributions =
      totalKeys.length > 0 ? totalKeys[totalKeys.length - 1] : 284;

    const result = {
      username,
      repos: profile?.public_repos ?? 14,
      followers: profile?.followers ?? 12,
      contributions,
      totalContributions,
      recentEvents: recentEvents.length ? recentEvents : fallback.recentEvents,
      recentRepos,
      loaded: true,
    };

    setCache(result);
    return result;
  } catch (err) {
    console.warn("[Portfolio] GitHub fetch failed:", err);
    return fallback;
  }
}
