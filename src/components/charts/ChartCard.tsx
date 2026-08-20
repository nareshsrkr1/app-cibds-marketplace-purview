import type { ReactNode } from "react"

export function ChartCard({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string
  subtitle: string
  footer?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-border bg-card p-4">
      <div>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <div className="flex-1">{children}</div>
      {footer ? <p className="text-xs text-muted-foreground">{footer}</p> : null}
    </div>
  )
}
