import { useState } from "react"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
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

export function LandingPage({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav onOpenWorkspace={onOpenWorkspace} />

      <Hero onOpenWorkspace={onOpenWorkspace} />
      <ProofStrip />
      <Capabilities />
      <HowItWorks />
      <Faq />
      <CtaBand onOpenWorkspace={onOpenWorkspace} />
      <Footer />
    </div>
  )
}

function Hero({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-sm bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground">
            Wells Fargo · Corporate &amp; Investment Banking
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Every dataset has a journey.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            The single governed marketplace for the firm's data — from the desk
            that creates it to the team that relies on it. Checked, classified,
            and traceable from source to consumer.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button size="lg" className="h-12 px-7 text-base" onClick={onOpenWorkspace}>
              Open workspace
              <ArrowRight className="size-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-7 text-base"
              disabled
              title="Out of scope for this delivery"
            >
              Browse the catalogue
            </Button>
          </div>
        </div>
        <JourneyDiagram />
      </div>
    </section>
  )
}

const journeySteps = [
  { label: "Produce", detail: "A team has data", accent: true },
  { label: "Publish", detail: "Listed in the marketplace" },
  { label: "Govern", detail: "Checked & classified" },
  { label: "Share", detail: "Requested & approved" },
  { label: "Consume", detail: "Delivered as a live feed", accent: true },
]

function JourneyDiagram() {
  return (
    <div className="rounded-md border border-border bg-card p-8">
      <p className="mb-6 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        How data moves
      </p>
      <div className="flex flex-col gap-0">
        {journeySteps.map((step, i) => (
          <div key={step.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span
                className={
                  "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold " +
                  (step.accent
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground")
                }
              >
                {i + 1}
              </span>
              {i < journeySteps.length - 1 ? (
                <span className="my-1 h-9 w-px bg-border" />
              ) : null}
            </div>
            <div className="pb-5">
              <p className="text-base font-semibold text-foreground">{step.label}</p>
              <p className="text-sm text-muted-foreground">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProofStrip() {
  return (
    <section className="border-b border-border bg-muted/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 sm:px-8 md:grid-cols-5">
        {metrics.map((m) => (
          <div key={m.key} className="text-center md:text-left">
            <p className="text-3xl font-semibold text-foreground sm:text-4xl">{m.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
          Platform capabilities
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Six reasons data moves with confidence.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          The Data Marketplace is not a filing system. It is the infrastructure that
          turns raw data into a firm asset — discoverable, trusted, and ready to use.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div
              key={c.n}
              className={
                "rounded-md border p-6 " +
                (c.highlight
                  ? "border-primary/30 bg-accent"
                  : "border-border bg-card")
              }
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">{c.n}</span>
                {c.highlight ? (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <Sparkles className="size-3" />
                    {c.highlightTag}
                  </Badge>
                ) : null}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{c.title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{c.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm bg-secondary px-2.5 py-1 text-sm text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          From one team to another — safely, and traceably.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Every dataset follows the same simple path — with meaning and traceability
          captured at every step, so the marketplace can explain any dataset in plain
          language while people stay in control of every decision.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pipeline.map((step) => (
            <div key={step.n} className="rounded-md border border-border bg-card p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
                {step.n}
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState<string | undefined>(undefined)
  return (
    <section id="faq" className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-24">
        <p className="text-center text-sm font-semibold tracking-wide text-primary uppercase">
          Frequently asked
        </p>
        <h2 className="mt-3 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Questions, answered.
        </h2>
        <Accordion
          type="single"
          collapsible
          value={open}
          onValueChange={setOpen}
          className="mt-10"
        >
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function CtaBand({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
            Your data has value. Let the firm use it.
          </h2>
          <p className="mt-3 flex items-center gap-2 text-lg text-primary-foreground/85">
            <CheckCircle2 className="size-5" />
            Governed, contextualised, and discoverable from the moment you register.
          </p>
        </div>
        <Button
          size="lg"
          variant="secondary"
          onClick={onOpenWorkspace}
          className="h-12 shrink-0 px-7 text-base"
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
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-10 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-sm font-semibold text-primary-foreground">
            C
          </span>
          <span className="text-base text-foreground">Data Marketplace</span>
          <span className="text-base text-muted-foreground">
            · CIB Data Services · Internal use only
          </span>
        </div>
        <p className="text-base text-muted-foreground">© 2026 Wells Fargo</p>
      </div>
    </footer>
  )
}
