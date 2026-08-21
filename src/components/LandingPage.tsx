import { useState, type ReactNode } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  Mail,
  Search,
  Share2,
  ShieldCheck,
  Sprout,
  UploadCloud,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SiteNav } from "@/components/SiteNav"
import { capabilities, faqs, metrics, pipeline } from "@/data/landing-content"
import { datasets, subscriptionRequests } from "@/data/console-content"

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function LandingPage({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav onOpenWorkspace={onOpenWorkspace} />
      <Hero onOpenWorkspace={onOpenWorkspace} />
      <TrustStrip />
      <StatsBand />
      <UseCases />
      <HowItWorks />
      <Capabilities />
      <Faq />
      <CtaBand onOpenWorkspace={onOpenWorkspace} />
      <Footer />
    </div>
  )
}

// ---------- Shared: browser-chrome frame for screenshots ----------

function BrowserFrame({
  url,
  children,
  sidebar,
}: {
  url: string
  children: ReactNode
  sidebar?: { label: string; items: string[]; activeIndex: number }
}) {
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card shadow-2xl shadow-black/[0.12]">
      <div className="flex h-10 items-center gap-1.5 border-b border-border bg-muted/60 px-4">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 rounded-sm bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="flex">
        {sidebar ? (
          <div className="hidden w-44 shrink-0 border-r border-border bg-foreground p-3 sm:block">
            <div className="mb-4 px-1 text-xs font-semibold tracking-wide text-background/50 uppercase">
              {sidebar.label}
            </div>
            <nav className="flex flex-col gap-0.5 text-sm text-background/60">
              {sidebar.items.map((item, i) => (
                <div
                  key={item}
                  className={
                    "rounded-sm px-2.5 py-2 " +
                    (i === sidebar.activeIndex ? "bg-background/10 text-background" : "")
                  }
                >
                  {item}
                </div>
              ))}
            </nav>
          </div>
        ) : null}
        <div className="min-w-0 flex-1 p-5">{children}</div>
      </div>
    </div>
  )
}

// ---------- Hero ----------

function HeroPreview() {
  const rows = datasets.slice(0, 4)
  return (
    <BrowserFrame
      url="workspace.datamarketplace.internal"
      sidebar={{ label: "Catalogue", items: ["Physical datasets", "Bind columns", "Workflow"], activeIndex: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Catalogue</p>
          <p className="text-base font-semibold text-foreground">Physical datasets</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-sm border border-border bg-background px-2.5 py-1.5 text-sm text-muted-foreground">
          <Search className="size-3.5" />
          Search…
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-sm border border-border">
        <div className="grid grid-cols-[1fr_auto_auto_72px] gap-2 border-b border-border bg-muted/60 px-3 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <span>Dataset</span>
          <span>SOR</span>
          <span>Class.</span>
          <span>Bound</span>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.id}
            className={
              "grid grid-cols-[1fr_auto_auto_72px] items-center gap-2 px-3 py-2.5 text-sm " +
              (i < rows.length - 1 ? "border-b border-border" : "")
            }
          >
            <span className="truncate font-medium text-foreground">{r.name}</span>
            <Badge variant="secondary" className="h-5 px-2 text-xs font-normal">
              {r.sor}
            </Badge>
            <Badge variant="outline" className="h-5 px-2 text-xs font-normal">
              {r.classification}
            </Badge>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-8 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${r.bound}%` }} />
              </div>
              <span className="font-mono text-xs text-muted-foreground">{r.bound}%</span>
            </div>
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

function Hero({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          background:
            "radial-gradient(50% 60% at 15% 0%, var(--primary), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl 2xl:max-w-[96rem] gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-12 lg:py-14">
        <div>
          <div className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
            Wells Fargo · Corporate &amp; Investment Banking
          </div>
          <h1 className="text-4xl leading-[1.12] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Every dataset has a <span className="text-primary italic">journey.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
            The single governed marketplace for the firm's data — from the desk
            that creates it to the team that relies on it. Checked, classified,
            and traceable from source to consumer.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={onOpenWorkspace} className="h-13 rounded-full px-8 text-base">
              Open workspace
              <ArrowRight className="size-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToId("how-it-works")}
              className="h-13 rounded-full px-8 text-base"
            >
              See how it works
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-primary" />
            Live across 6 desks · governed by Data Governance · SOC-aligned controls
          </div>
        </div>

        <div>
          <HeroPreview />
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex size-1.5 rounded-full bg-status-good" />
            Live view — Producer console, Physical datasets
          </p>
        </div>
      </div>
    </section>
  )
}

// ---------- Trust strip ----------

const desks = [
  "Commodities Desk",
  "Market Risk",
  "Credit Risk",
  "Corporate Treasury",
  "Investments Ops",
  "Compliance",
]

function TrustStrip() {
  return (
    <section className="border-b border-border bg-card/60">
      <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 py-6 sm:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="shrink-0 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Used daily across the firm
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:justify-end">
            {desks.map((d) => (
              <span key={d} className="text-base font-medium text-foreground/70">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Stats band (dark, full-bleed) ----------

function StatsBand() {
  return (
    <section className="bg-foreground">
      <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 py-10 sm:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
          {metrics.map((m) => (
            <div key={m.key}>
              <div className="text-3xl font-semibold tracking-tight text-background sm:text-4xl">
                {m.value}
              </div>
              <div className="mt-1.5 text-sm text-background/60">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Use cases (3 personas, distinct screenshots) ----------

function ConsumerPreview() {
  return (
    <BrowserFrame url="workspace.datamarketplace.internal/catalogue">
      <div className="flex items-center gap-1.5 rounded-sm border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
        <Search className="size-4" />
        Search "commodity trades"
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {[
          { name: "Endur OTC Commodity Trades", state: "Requested" },
          { name: "Endur Physical Delivery Schedule", state: "Request access" },
          { name: "Market Risk VaR Snapshot", state: "Request access" },
        ].map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between rounded-sm border border-border px-3 py-2.5"
          >
            <span className="truncate text-sm font-medium text-foreground">{row.name}</span>
            {row.state === "Requested" ? (
              <Badge variant="secondary" className="h-6 gap-1 px-2 text-xs font-normal">
                <Clock className="size-3" />
                Requested
              </Badge>
            ) : (
              <Badge className="h-6 px-2 text-xs font-normal">Request access</Badge>
            )}
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

function GovernancePreview() {
  const rows = subscriptionRequests
  return (
    <BrowserFrame url="workspace.datamarketplace.internal/governance">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-foreground">Access requests</p>
        <Badge variant="secondary" className="h-6 px-2 text-xs font-normal">
          {rows.length} pending
        </Badge>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.id} className="rounded-sm border border-border p-3">
            <p className="text-sm font-medium text-foreground">{r.requester}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              wants <span className="font-medium text-foreground">{r.wants}</span> · {r.age} ago
            </p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" variant="outline" className="h-7 text-xs">
                Decline
              </Button>
              <Button size="sm" className="h-7 text-xs">
                Approve
              </Button>
            </div>
          </div>
        ))}
      </div>
    </BrowserFrame>
  )
}

const useCases = [
  {
    key: "producer",
    label: "Producers",
    title: "List what you own in minutes.",
    body: "Register a physical dataset, bind its columns to governed business elements, and it's discoverable the moment classification clears.",
    highlights: [
      "Bind columns to governed business elements",
      "Classification inherited automatically",
      "Track publish SLA on your own console",
    ],
    preview: <HeroPreview />,
  },
  {
    key: "consumer",
    label: "Consumers",
    title: "Find it, request it, get it.",
    body: "Search the catalogue in plain business language, request access to what you need, and track approval without a single email thread.",
    highlights: [
      "Search in plain business language",
      "Request access in a couple of clicks",
      "See approval status without chasing anyone",
    ],
    preview: <ConsumerPreview />,
  },
  {
    key: "governance",
    label: "Data Governance",
    title: "Approve with full context.",
    body: "Every request arrives with lineage, classification, and owner attached — review and decide without chasing anyone down.",
    highlights: [
      "Lineage and classification attached to every request",
      "2-day standard SLA, 5-day for PII/Confidential",
      "Full audit trail of every approval",
    ],
    preview: <GovernancePreview />,
  },
]

function UseCases() {
  const [active, setActive] = useState(0)
  const current = useCases[active]
  return (
    <section className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 py-14 sm:px-8 sm:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Built for every role</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          The same workspace, tailored to how you work.
        </h2>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {useCases.map((u, i) => (
          <button
            key={u.key}
            type="button"
            onClick={() => setActive(i)}
            className={
              "rounded-full border px-5 py-2.5 text-base font-medium transition-colors " +
              (i === active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground")
            }
          >
            {u.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">{current.title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{current.body}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {current.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-base text-foreground">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div key={current.key}>{current.preview}</div>
      </div>
    </section>
  )
}

// ---------- How it works ----------

const pipelineIcons: LucideIcon[] = [Sprout, UploadCloud, ShieldCheck, Share2, Download]

function WorkflowPreview() {
  const currentStage = 2
  return (
    <BrowserFrame url="workspace.datamarketplace.internal/workflow/DS-CIB-40121">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Tracking</p>
          <p className="text-base font-semibold text-foreground">Endur P&amp;L and Greeks</p>
        </div>
        <Badge variant="secondary" className="h-6 px-2 text-xs font-normal">
          In review
        </Badge>
      </div>

      <div className="mt-5 flex flex-col">
        {pipeline.map((s, i) => {
          const Icon = pipelineIcons[i] ?? Sprout
          const done = i < currentStage
          const active = i === currentStage
          return (
            <div key={s.n} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={
                    "flex size-8 shrink-0 items-center justify-center rounded-full " +
                    (done
                      ? "bg-primary text-primary-foreground"
                      : active
                        ? "border-2 border-primary text-primary"
                        : "border border-border text-muted-foreground")
                  }
                >
                  {done ? <CheckCircle2 className="size-4" /> : <Icon className="size-3.5" />}
                </span>
                {i < pipeline.length - 1 ? (
                  <span className={"my-0.5 h-7 w-px " + (done ? "bg-primary" : "bg-border")} />
                ) : null}
              </div>
              <div className={"pb-3.5 " + (active ? "" : done ? "" : "opacity-60")}>
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">
                  {done ? "Complete" : active ? "In progress — " + s.body : s.body}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </BrowserFrame>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-card/60">
      <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 pt-14 pb-8 sm:px-8 sm:pt-20 sm:pb-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              From one team to another — safely, and traceably.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every dataset follows the same simple path — with meaning and
              traceability captured at every step, tracked from the moment it's
              produced to the moment it's consumed.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {pipeline.map((s, i) => {
                const Icon = pipelineIcons[i] ?? Sprout
                return (
                  <div key={s.n} className="flex items-center gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-base font-semibold text-foreground">{s.title}</span>
                      <span className="text-base text-muted-foreground"> — {s.body}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <WorkflowPreview />
        </div>
      </div>
    </section>
  )
}

// ---------- Capabilities ----------

function Capabilities() {
  return (
    <section id="capabilities" className="pt-8 pb-8 sm:pt-10 sm:pb-10">
      <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 sm:px-8">
        <div className="mb-5 max-w-xl">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Platform capabilities
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Six reasons data moves with confidence.
          </h2>
        </div>

        <div className="grid gap-x-12 gap-y-2 sm:grid-cols-2">
          {capabilities.map((c) => (
            <div
              key={c.n}
              className="group relative flex items-start gap-6 border-b border-border py-7 first:border-t sm:[&:nth-child(2)]:border-t"
            >
              <span className="pointer-events-none w-14 shrink-0 text-4xl leading-none font-bold tracking-tighter text-muted-foreground/20 transition-colors group-hover:text-primary/25">
                {c.n}
              </span>
              <div className="min-w-0 pt-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                  {c.highlight ? (
                    <Badge className="h-5 gap-1 px-1.5 text-xs font-normal">{c.highlightTag}</Badge>
                  ) : null}
                </div>
                <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{c.body}</p>
              </div>
              <span className="absolute top-0 left-0 h-6 w-0.5 origin-top scale-y-0 rounded-full bg-primary transition-transform duration-200 group-hover:scale-y-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- FAQ ----------

function Faq() {
  const [open, setOpen] = useState<string | undefined>(undefined)
  return (
    <section id="faq" className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 pt-8 pb-14 sm:px-8 sm:pt-10 sm:pb-20">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">Frequently asked</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Questions, answered.
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            The essentials on ownership, governance, and how classification works.
          </p>
          <div className="mt-6 rounded-md border border-border bg-card p-5">
            <div className="flex size-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
              <Mail className="size-4" />
            </div>
            <p className="mt-3 text-base font-medium text-foreground">Still have questions?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Reach the Data Marketplace governance team.
            </p>
          </div>
        </div>

        <Accordion type="single" collapsible value={open} onValueChange={setOpen}>
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-lg font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

// ---------- CTA ----------

function CtaBand({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-7xl 2xl:max-w-[96rem] flex-col items-start gap-8 px-6 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-primary-foreground sm:text-5xl">
            Your data has value. Let the firm use it.
          </h2>
          <p className="mt-3 text-lg text-primary-foreground/85">
            Governed, contextualised, and discoverable from the moment you register.
          </p>
        </div>
        <Button
          size="lg"
          variant="secondary"
          onClick={onOpenWorkspace}
          className="h-13 shrink-0 rounded-full px-8 text-base"
        >
          Open workspace
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </section>
  )
}

// ---------- Footer (enterprise multi-column) ----------

const footerColumns = [
  {
    heading: "Product",
    links: ["Producer console", "Catalogue", "Bind columns", "Workflow"],
  },
  {
    heading: "Governance",
    links: ["Classification policy", "Approval SLAs", "Audit log", "Access requests"],
  },
  {
    heading: "Resources",
    links: ["Business glossary", "Documentation", "Release notes", "Status"],
  },
  {
    heading: "Contact",
    links: ["Data Governance team", "Report an issue", "Request training"],
  },
]

function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl 2xl:max-w-[96rem] px-6 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-primary-foreground">
                C
              </span>
              <span className="text-lg font-semibold text-background">Data Marketplace</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-background/60">
              CIB Data Services · the single governed marketplace for the firm's data.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-semibold tracking-wide text-background/50 uppercase">
                {col.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l} className="text-sm text-background/70">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-background/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-background/50">© 2026 Wells Fargo · Internal use only</p>
          <p className="text-sm text-background/50">CIB Data Services</p>
        </div>
      </div>
    </footer>
  )
}
