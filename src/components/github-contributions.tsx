import { Gitmap, type ContributionDay } from "@/components/ui/gitmap"
import { addDays } from "date-fns"

const API_URL = "https://github-contributions-api.jogruber.de/v4/sachigoyal?y=last"

export async function GithubContributions() {
  const response = await fetch(API_URL, {
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(10000),
  })
  // Let failed regeneration retain the previous cached page rather than
  // replacing it with a missing graph for the next day.
  if (!response.ok) throw new Error(`GitHub contributions: HTTP ${response.status}`)

  const data: { contributions: ContributionDay[] } = await response.json()
  if (!Array.isArray(data.contributions) || data.contributions.length === 0) {
    throw new Error("GitHub contributions: invalid response")
  }
  const contributions = data.contributions

  const today = new Date()

  return (
    <div data-gitmap-theme="ocean" className="mt-7 mb-12 overflow-x-auto sm:overflow-x-clip">
      <Gitmap
        contributions={contributions}
        from={addDays(today, -365).toISOString().slice(0, 10)}
        to={today.toISOString().slice(0, 10)}
        colors={{
          empty: "var(--gitmap-empty)",
          level1: "var(--gitmap-level-1)",
          level2: "var(--gitmap-level-2)",
          level3: "var(--gitmap-level-3)",
          level4: "var(--gitmap-level-4)",
        }}
        showCounts={true}
        cellGap={2}
      />
    </div>
  )
}
