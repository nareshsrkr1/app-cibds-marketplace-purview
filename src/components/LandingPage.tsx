import { useState } from "react"
import {
  ArrowRight,
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
import { datasets } from "@/data/console-content"

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function LandingPage({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav onOpenWorkspace={onOpenWorkspace} />
      <Hero onOpenWorkspace={onOpenWorkspace} />
      <HowItWorks />
      <Capabilities />
      <Faq />
      <CtaBand onOpenWorkspace={onOpenWorkspace} />
      <Footer />
    </div>
  )
}

// ---------- Hero ----------

const ARC_PATH = "M40,200 Q300,30 560,200"
const ARC_NODES = [
  { x: 40, y: 200 },
  { x: 170, y: 136 },
  { x: 300, y: 115 },
  { x: 430, y: 136 },
  { x: 560, y: 200 },
]

function JourneyArc() {
  return (
    <svg viewBox="0 85 600 145" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="arc-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity={1} />
        </linearGradient>
        <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d={ARC_PATH} fill="none" stroke="var(--border)" strokeWidth={10} strokeLinecap="round" />
      <path
        d={ARC_PATH}
        fill="none"
        stroke="url(#arc-line)"
        strokeWidth={2.5}
        strokeLinecap="round"
        filter="url(#arc-glow)"
      />

      {ARC_NODES.map((pt, i) => {
        const s = pipeline[i]
        const isEndpoint = i === 0 || i === 4
        return (
          <g key={s.n}>
            <circle cx={pt.x} cy={pt.y} r={16} fill="var(--primary)" opacity={0.12} />
            <circle cx={pt.x} cy={pt.y} r={7} fill="var(--primary)" filter="url(#arc-glow)" />
            <text
              x={pt.x}
              y={isEndpoint ? pt.y - 22 : pt.y + 34}
              textAnchor="middle"
              className="fill-foreground text-[17px] font-semibold"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {s.title}
            </text>
            {isEndpoint ? (
              <text
                x={pt.x}
                y={pt.y - 40}
                textAnchor="middle"
                className="fill-muted-foreground text-[12px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {i === 0 ? "starts here" : "ends here"}
              </text>
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}

function Hero({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          background:
            "radial-gradient(45% 40% at 20% 10%, var(--primary), transparent 70%), radial-gradient(40% 35% at 85% 8%, var(--primary), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-4 text-center sm:px-8 sm:pt-24">
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
          Wells Fargo · Corporate &amp; Investment Banking
        </div>
        <h1 className="mx-auto max-w-3xl text-5xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Every dataset has a journey.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          The single governed marketplace for the firm's data — from the desk
          that creates it to the team that relies on it.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            onClick={onOpenWorkspace}
            className="h-13 rounded-full px-8 text-base"
          >
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

        <div className="mx-auto mt-10 max-w-3xl">
          <JourneyArc />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pb-16 sm:px-8">
        <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:grid-cols-5 sm:p-6">
          {metrics.map((m) => (
            <div key={m.key} className="text-center">
              <div className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {m.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- How it works ----------

const pipelineIcons: LucideIcon[] = [Sprout, UploadCloud, ShieldCheck, Share2, Download]

function ProductPreview() {
  const rows = datasets.slice(0, 4)
  return (
    <div className="overflow-hidden rounded-md border border-border bg-card shadow-2xl shadow-black/[0.08]">
      <div className="flex h-10 items-center gap-1.5 border-b border-border bg-muted/60 px-4">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="ml-3 rounded-sm bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground">
          workspace.datamarketplace.internal
        </span>
      </div>
      <div className="flex">
        <div className="hidden w-44 shrink-0 border-r border-border bg-foreground p-3 sm:block">
          <div className="mb-4 px-1 text-xs font-semibold tracking-wide text-background/50 uppercase">
            Catalogue
          </div>
          <nav className="flex flex-col gap-0.5 text-sm text-background/60">
            <div className="rounded-sm bg-background/10 px-2.5 py-2 text-background">
              Physical datasets
            </div>
            <div className="rounded-sm px-2.5 py-2">Bind columns</div>
            <div className="rounded-sm px-2.5 py-2">Workflow</div>
          </nav>
        </div>

        <div className="min-w-0 flex-1 p-5">
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
        </div>
      </div>
    </div>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From one team to another — safely, and traceably.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            This is the actual workspace, not a mockup of one. A producer lists a
            dataset; it's checked and classified; a consumer finds it, requests it,
            and gets a governed feed — every step recorded.
          </p>
          <div className="mt-8 flex flex-col gap-4">
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

        <ProductPreview />
      </div>
    </section>
  )
}

// ---------- Capabilities ----------

function Capabilities() {
  return (
    <section id="capabilities" className="border-y border-border bg-card/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mb-10 max-w-xl">
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
                    <Badge className="h-5 gap-1 px-1.5 text-xs font-normal">
                      {c.highlightTag}
                    </Badge>
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
    <section id="faq" className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            Frequently asked
          </p>
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
              <AccordionTrigger className="text-left text-lg font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

// ---------- CTA + Footer ----------

function CtaBand({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
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

function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-8 text-lg sm:justify-start sm:px-8">
        <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-primary-foreground">
          C
        </span>
        <span className="font-semibold text-foreground">Data Marketplace</span>
        <span className="text-muted-foreground">· CIB Data Services · Internal use only</span>
      </div>
      <div className="border-t border-border px-6 py-4 text-center text-sm text-muted-foreground/70 sm:px-8">
        © 2026 Wells Fargo
      </div>
    </footer>
  )
}
