import type { ReactNode } from "react"

export function ChartCard({
  title,
  subtitle,
  footer,
  center,
  children,
}: {
  title: string
  subtitle: string
  footer?: string
  center?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-md border border-border bg-card p-5">
      <div>
        <h4 className="text-base font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className={"flex-1" + (center ? " flex items-center justify-center" : "")}>
        {children}
      </div>
      {footer ? <p className="text-sm text-muted-foreground">{footer}</p> : null}
    </div>
  )
}
