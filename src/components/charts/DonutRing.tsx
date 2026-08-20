export function DonutRing({ realised, gap }: { realised: number; gap: number }) {
  const total = realised + gap
  const pct = total === 0 ? 0 : Math.round((realised / total) * 100)
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - pct / 100)

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 120 120" className="w-full max-w-[140px] -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--muted)" strokeWidth="14" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-xl font-semibold text-foreground">{pct}%</span>
    </div>
  )
}
