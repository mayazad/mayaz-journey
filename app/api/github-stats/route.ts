import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const username = 'mayazad'
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'mayaz-portfolio',
    }
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, { headers, next: { revalidate: 3600 } }),
    ])

    const user = await userRes.json()
    const repos = await reposRes.json()

    if (!Array.isArray(repos)) {
      throw new Error('Failed to fetch repos')
    }

    // Compute stats
    const totalStars = repos.reduce((acc: number, r: { stargazers_count: number }) => acc + (r.stargazers_count || 0), 0)
    const totalForks = repos.reduce((acc: number, r: { forks_count: number }) => acc + (r.forks_count || 0), 0)

    // Language frequency
    const langs: Record<string, number> = {}
    for (const r of repos) {
      if (r.language) langs[r.language] = (langs[r.language] || 0) + 1
    }
    const topLanguages = Object.entries(langs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Top repos by stars, then by recency
    const pinnedRepos = repos
      .filter((r: { fork: boolean }) => !r.fork)
      .sort((a: { stargazers_count: number; pushed_at: string }, b: { stargazers_count: number; pushed_at: string }) => 
        b.stargazers_count - a.stargazers_count || new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      )
      .slice(0, 4)
      .map((r: { name: string; description: string; language: string; stargazers_count: number; forks_count: number; html_url: string; pushed_at: string }) => ({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        url: r.html_url,
        pushedAt: r.pushed_at,
      }))

    return NextResponse.json({
      username,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      totalForks,
      topLanguages,
      pinnedRepos,
    })
  } catch (err) {
    console.error('GitHub stats error:', err)
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 })
  }
}
