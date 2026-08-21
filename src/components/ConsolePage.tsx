import { useState } from "react"
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  LayoutGrid,
  Database,
  Link2,
  ShieldCheck,
  Workflow as WorkflowIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
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
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar onBack={onBack} className="hidden lg:flex" />
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Console navigation</SheetTitle>
          <Sidebar onBack={onBack} className="flex" />
        </SheetContent>
      </Sheet>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="max-w-[100rem]">
          <ConsoleHeader onMenuClick={() => setNavOpen(true)} />
          <KpiRow />
          <ActionRow />
          <Tabs defaultValue="overview" className="mt-8 sm:mt-10">
            <TabsList>
              <TabsTrigger value="overview" className="text-base">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-base">
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-7">
              <PanelColumns />
            </TabsContent>
            <TabsContent value="analytics" className="mt-7">
              <ChartGrid />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function Sidebar({ onBack, className = "" }: { onBack: () => void; className?: string }) {
  return (
    <aside
      className={
        "sticky top-0 h-screen w-64 shrink-0 flex-col border-r border-border bg-muted/30 " +
        className
      }
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-primary-foreground">
          C
        </span>
        <span className="text-base font-semibold text-foreground">CIB Marketplace</span>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={
              "relative flex items-center gap-3 rounded-sm px-3.5 py-2.5 text-left text-base transition-colors duration-150 " +
              (item.active
                ? "bg-accent font-medium text-primary"
                : "text-foreground/80 hover:bg-accent/60 hover:text-foreground")
            }
          >
            {item.active ? (
              <span className="absolute top-1.5 bottom-1.5 left-0 w-[3px] rounded-full bg-primary" />
            ) : null}
            <item.icon className="size-5" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mx-3 mt-2 rounded-md border border-border bg-card p-4 transition-colors duration-150 hover:bg-accent/40">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Governance standing
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-status-good/15 text-status-good">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <p className="text-base font-semibold text-foreground">Good standing</p>
            <p className="text-sm text-muted-foreground">No overdue reviews</p>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-sm px-3.5 py-2.5 transition-colors duration-150 hover:bg-accent/40">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            NN
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-foreground">Naresh Nimmala</p>
            <p className="truncate text-sm text-muted-foreground">Producer · Commodities Desk</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="mt-1 flex w-full items-center gap-3 rounded-sm px-3.5 py-2.5 text-left text-base text-muted-foreground transition-colors duration-150 hover:bg-accent/60"
        >
          <ArrowLeft className="size-5" />
          Back to landing
        </button>
      </div>
    </aside>
  )
}

function ConsoleHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="cursor-default transition-colors duration-150 hover:text-primary">
            Workspace
          </span>
          <ChevronRight className="size-3.5" />
          <span>{hero.eyebrow}</span>
        </div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          {hero.eyebrow}
        </h1>
        <p className="mt-1.5 max-w-xl text-base text-muted-foreground">{hero.subtitle}</p>
      </div>
      <Button variant="outline" size="sm" className="lg:hidden" onClick={onMenuClick}>
        <LayoutGrid className="size-4" />
        Menu
      </Button>
    </div>
  )
}

const kpiExplanations: Record<string, string> = {
  datasets: "Physical datasets you own and have published to the marketplace.",
  contracts: "Producer contracts governing how your datasets may be used downstream.",
  pendingGov: "Datasets awaiting classification review by Data Governance.",
  subreq: "Requests from other teams waiting on your approval.",
  gaps: "Datasets with columns not yet bound to a governed business element.",
}

function KpiRow() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {kpis.map((k) => (
        <Tooltip key={k.id}>
          <TooltipTrigger asChild>
            <div
              className={
                "cursor-default rounded-md border p-5 transition-shadow duration-150 hover:shadow-md " +
                (k.warn
                  ? "border-status-warn/40 bg-accent hover:border-status-warn/60"
                  : "border-border bg-card hover:border-primary/30")
              }
            >
              <p className="text-3xl font-semibold text-foreground">{k.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{k.label}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>{kpiExplanations[k.id]}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

function ActionRow() {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {actions.map((a) => (
        <Button
          key={a.id}
          variant={a.variant === "primary" ? "default" : "outline"}
          disabled={!a.enabled}
          title={a.enabled ? a.label : "Available in a future release"}
          className="h-10 text-base"
        >
          {a.label}
        </Button>
      ))}
    </div>
  )
}

function ChartGrid() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground">My production health</h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {charts.map((c) => (
          <ChartCard
            key={c.id}
            title={c.title}
            subtitle={c.subtitle}
            footer={"footer" in c ? c.footer : undefined}
            center={c.kind !== "hbars"}
          >
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
    <div className="grid min-w-0 gap-5 lg:grid-cols-[1.6fr_1fr]">
      <div className="min-w-0">
        <DatasetsPanel />
      </div>
      <div className="min-w-0">
        <SubscriptionPanel />
      </div>
    </div>
  )
}

function classificationVariant(c: string) {
  return c === "Confidential" ? "destructive" : "secondary"
}

const classificationExplanations: Record<string, string> = {
  Internal: "Available to consumers across the firm without additional approval.",
  Confidential: "Restricted — requires governance approval before access is granted.",
}

function DatasetsPanel() {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-5">
        <h3 className="text-lg font-semibold text-foreground">Published datasets</h3>
        <Button variant="link" className="h-auto p-0 text-base">
          All
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-base">
          <thead>
            <tr className="border-b border-border text-sm text-muted-foreground">
              <th className="px-5 py-3 font-medium">Dataset</th>
              <th className="px-5 py-3 font-medium">SOR</th>
              <th className="px-5 py-3 font-medium">Class.</th>
              <th className="px-5 py-3 font-medium">Bound</th>
              <th className="px-5 py-3 font-medium">Updated</th>
              <th className="px-5 py-3 font-medium" aria-hidden="true" />
            </tr>
          </thead>
          <tbody>
            {datasets.map((d) => (
              <tr
                key={d.id}
                className="group border-b border-border transition-colors duration-150 last:border-0 hover:bg-muted/40"
              >
                <td className="px-5 py-3.5">
                  <p className="font-medium text-foreground">{d.name}</p>
                  <p className="text-sm text-muted-foreground">{d.owner}</p>
                </td>
                <td className="px-5 py-3.5 text-muted-foreground">{d.sor}</td>
                <td className="px-5 py-3.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant={classificationVariant(d.classification)}
                        className="cursor-default text-sm"
                      >
                        {d.classification}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>{classificationExplanations[d.classification]}</TooltipContent>
                  </Tooltip>
                </td>
                <td className="px-5 py-3.5 text-foreground">{d.bound}%</td>
                <td className="px-5 py-3.5 text-muted-foreground">{d.updated}</td>
                <td className="px-5 py-3.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={`View ${d.name}`}
                        className="flex size-7 items-center justify-center rounded-sm text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100 hover:bg-accent hover:text-primary"
                      >
                        <ArrowUpRight className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>View dataset</TooltipContent>
                  </Tooltip>
                </td>
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
      <div className="border-b border-border p-5">
        <h3 className="text-lg font-semibold text-foreground">
          Subscription requests · awaiting your approval
        </h3>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {subscriptionRequests.map((r) => (
          <div
            key={r.id}
            className="p-5 transition-colors duration-150 hover:bg-accent/30"
          >
            <p className="text-base font-medium text-foreground">{r.requester}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              wants <span className="font-medium text-foreground">{r.wants}</span> ·{" "}
              <span className="font-mono">{r.datasetId}</span>
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{r.age} ago</span>
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
