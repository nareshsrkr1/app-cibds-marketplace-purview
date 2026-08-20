import {
  ArrowLeft,
  LayoutGrid,
  Database,
  Link2,
  Workflow as WorkflowIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartCard } from "@/components/charts/ChartCard"
import { GaugeArc } from "@/components/charts/GaugeArc"
import { DonutRing } from "@/components/charts/DonutRing"
import { HBars } from "@/components/charts/HBars"
import {
  actions,
  charts,
  datasets,
  hero,
  kpis,
  subscriptionRequests,
} from "@/data/console-content"

const navItems = [
  { icon: LayoutGrid, label: "Console", active: true },
  { icon: Database, label: "Physical datasets" },
  { icon: Link2, label: "Bind columns" },
  { icon: WorkflowIcon, label: "Workflow" },
]

export function ConsolePage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar onBack={onBack} />
      <main className="flex-1 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <ConsoleHeader />
          <KpiRow />
          <ActionRow />
          <ChartGrid />
          <PanelColumns />
        </div>
      </main>
    </div>
  )
}

function Sidebar({ onBack }: { onBack: () => void }) {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-muted/30 lg:block">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <span className="flex size-6 items-center justify-center rounded-sm bg-primary text-xs font-semibold text-primary-foreground">
          C
        </span>
        <span className="text-sm font-semibold text-foreground">Producer Console</span>
      </div>
      <nav className="flex flex-col gap-0.5 p-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={
              "flex items-center gap-2.5 rounded-sm px-3 py-2 text-left text-sm transition-colors " +
              (item.active
                ? "bg-accent font-medium text-accent-foreground"
                : "text-foreground/80 hover:bg-accent/60")
            }
          >
            <item.icon className="size-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="border-t border-border p-2">
        <button
          type="button"
          onClick={onBack}
          className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-left text-sm text-muted-foreground hover:bg-accent/60"
        >
          <ArrowLeft className="size-4" />
          Back to landing
        </button>
      </div>
    </aside>
  )
}

function ConsoleHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          {hero.eyebrow}
        </p>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">{hero.subtitle}</p>
      </div>
      <Button variant="outline" size="sm" className="lg:hidden" onClick={() => {}}>
        <LayoutGrid className="size-4" />
        Menu
      </Button>
    </div>
  )
}

function KpiRow() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {kpis.map((k) => (
        <div
          key={k.id}
          className={
            "rounded-md border p-4 " +
            (k.warn ? "border-status-warn/40 bg-accent" : "border-border bg-card")
          }
        >
          <p className="text-xl font-semibold text-foreground">{k.value}</p>
          <p className="text-xs text-muted-foreground">{k.label}</p>
        </div>
      ))}
    </div>
  )
}

function ActionRow() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {actions.map((a) => (
        <Button
          key={a.id}
          variant={a.variant === "primary" ? "default" : "outline"}
          disabled={!a.enabled}
          title={a.enabled ? a.label : "Available in a future release"}
          size="sm"
        >
          {a.label}
        </Button>
      ))}
    </div>
  )
}

function ChartGrid() {
  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold text-foreground">My production health</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {charts.map((c) => (
          <ChartCard key={c.id} title={c.title} subtitle={c.subtitle} footer={"footer" in c ? c.footer : undefined}>
            {c.kind === "gauge" ? <GaugeArc value={c.value} target={c.target} /> : null}
            {c.kind === "donut" ? <DonutRing realised={c.realised} gap={c.gap} /> : null}
            {c.kind === "hbars" ? <HBars rows={c.rows} /> : null}
          </ChartCard>
        ))}
      </div>
    </div>
  )
}

function PanelColumns() {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <DatasetsPanel />
      <SubscriptionPanel />
    </div>
  )
}

function classificationVariant(c: string) {
  return c === "Confidential" ? "destructive" : "secondary"
}

function DatasetsPanel() {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="text-sm font-semibold text-foreground">Published datasets</h3>
        <Button variant="link" size="sm" className="h-auto p-0">
          All
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="px-4 py-2 font-medium">Dataset</th>
              <th className="px-4 py-2 font-medium">SOR</th>
              <th className="px-4 py-2 font-medium">Class.</th>
              <th className="px-4 py-2 font-medium">Bound</th>
              <th className="px-4 py-2 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((d) => (
              <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                <td className="px-4 py-2.5">
                  <p className="font-medium text-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.owner}</p>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{d.sor}</td>
                <td className="px-4 py-2.5">
                  <Badge variant={classificationVariant(d.classification)}>
                    {d.classification}
                  </Badge>
                </td>
                <td className="px-4 py-2.5 text-foreground">{d.bound}%</td>
                <td className="px-4 py-2.5 text-muted-foreground">{d.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SubscriptionPanel() {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="border-b border-border p-4">
        <h3 className="text-sm font-semibold text-foreground">
          Subscription requests · awaiting your approval
        </h3>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {subscriptionRequests.map((r) => (
          <div key={r.id} className="p-4">
            <p className="text-sm font-medium text-foreground">{r.requester}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              wants <span className="font-medium text-foreground">{r.wants}</span> ·{" "}
              <span className="font-mono">{r.datasetId}</span>
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{r.age} ago</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Decline
                </Button>
                <Button size="sm">Approve</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
