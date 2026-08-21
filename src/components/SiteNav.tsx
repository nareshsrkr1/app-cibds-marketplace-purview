import { ArrowRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-sm bg-primary text-base font-semibold text-primary-foreground">
        C
      </span>
      <span className="text-lg font-semibold text-foreground">CIB Data Marketplace</span>
    </div>
  )
}

const links = [
  { href: "how-it-works", label: "How it works" },
  { href: "capabilities", label: "Capabilities" },
  { href: "faq", label: "FAQ" },
]

export function SiteNav({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <header className="sticky top-4 z-40 px-4">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between rounded-full border border-border bg-card/95 px-3 pl-6 shadow-md shadow-black/[0.04] backdrop-blur-md">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={`#${l.href}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(l.href)
              }}
              className="text-lg text-foreground/70 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button onClick={onOpenWorkspace} className="h-11 rounded-full px-6 text-base">
            Open workspace
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full md:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-5 px-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={`#${l.href}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(l.href)
                  }}
                  className="text-lg font-medium text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <Button onClick={onOpenWorkspace} className="rounded-full">
                Open workspace
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
