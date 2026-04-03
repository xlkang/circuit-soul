export interface GitHubStats {
  publicRepos: number;
  stars: number;
  followers: number;
  following: number;
  username: string;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    // Fetch user profile and repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      console.error(`GitHub API error: ${userRes.status}`);
      return null;
    }

    const userData = await userRes.json();
    let reposData: Array<{ stargazers_count: number }> = [];
    if (reposRes.ok) {
      reposData = await reposRes.json();
    }

    // Count total stars across all repos
    const totalStars = reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

    return {
      publicRepos: userData.public_repos || 0,
      stars: totalStars,
      followers: userData.followers || 0,
      following: userData.following || 0,
      username,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    return null;
  }
}
