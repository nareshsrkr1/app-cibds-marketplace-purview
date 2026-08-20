export function GaugeArc({ value, target }: { value: number; target: number }) {
  const radius = 54
  const circumference = Math.PI * radius
  const valueOffset = circumference * (1 - value / 100)
  const targetAngle = 180 * (target / 100)

  const targetRad = ((180 - targetAngle) * Math.PI) / 180
  const cx = 64
  const cy = 64
  const tx = cx + radius * Math.cos(targetRad)
  const ty = cy - radius * Math.sin(targetRad)

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 128 74" className="w-full max-w-[180px]">
        <path
          d={`M 10 64 A ${radius} ${radius} 0 0 1 118 64`}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d={`M 10 64 A ${radius} ${radius} 0 0 1 118 64`}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={valueOffset}
        />
        <line x1={tx} y1={ty} x2={tx + (cx - tx) * 0.18} y2={ty + (cy - ty) * 0.18} stroke="var(--foreground)" strokeWidth="2" />
      </svg>
      <div className="-mt-6 flex items-baseline gap-1">
        <span className="text-3xl font-semibold text-foreground">{value}%</span>
      </div>
    </div>
  )
}
