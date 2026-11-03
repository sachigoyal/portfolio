"use client"

import { useEffect, useState } from "react"
import { Gitmap, ContributionDay } from "@/components/ui/gitmap"
import { addDays } from "date-fns"
import { cn } from "@/lib/utils"

const API_URL = "https://github-contributions-api.jogruber.de/v4/sachigoyal"

// Fetched in the browser on purpose. The home page is prerendered and served
// from Cloudflare's static assets cache, which is read-only, so server-side
// revalidation never runs and a server fetch would freeze the graph at the
// last deploy. The API sends CORS headers and caches on its side.
export function GithubContributions() {
  const [contributions, setContributions] = useState<ContributionDay[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: { contributions: ContributionDay[] }) => setContributions(data.contributions))
      .catch((error) => {
        if (error.name !== "AbortError") setFailed(true)
      })
    return () => controller.abort()
  }, [])

  if (failed) return null
  if (!contributions) return <GitmapSkeleton className="mt-7 mb-12" />

  const today = new Date()

  return (
    <div data-gitmap-theme="ocean" className="mt-7 mb-12 overflow-x-auto sm:overflow-x-clip">
      <Gitmap
        contributions={contributions}
        from={addDays(today, -365)}
        to={today}
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

export function GitmapSkeleton({ className }: { className?: string }) {
  const weeks = 53
  const cellSize = 10
  const cellGap = 2

  return (
    <div className={cn("relative", className)} style={{ paddingLeft: 28, paddingTop: 15 }}>
      <div className="absolute -top-1 left-[28px] flex gap-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-3 w-5 rounded bg-muted/50 animate-pulse" />
        ))}
      </div>

      <div className="absolute left-0 top-[15px] space-y-[19px] pt-[7px]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-2.5 w-4 rounded bg-muted/50 animate-pulse" />
        ))}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(7, ${cellSize}px)`,
          gridTemplateColumns: `repeat(${weeks}, ${cellSize}px)`,
          gap: cellGap,
        }}
      >
        {Array.from({ length: weeks * 7 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[2px] bg-muted animate-pulse"
            style={{
              width: cellSize,
              height: cellSize,
              opacity: 0.2 + ((i * 7 + 13) % 17) / 17 * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  )
}