export function HBars({ rows }: { rows: [string, number][] }) {
  const max = Math.max(...rows.map(([, v]) => v))

  return (
    <div className="flex flex-col gap-2">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center gap-2">
          <span className="w-28 shrink-0 text-xs text-muted-foreground">{label}</span>
          <div className="h-2 flex-1 rounded-sm bg-muted">
            <div
              className="h-2 rounded-sm bg-primary"
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
          <span className="w-6 shrink-0 text-right text-xs font-medium text-foreground">
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}
