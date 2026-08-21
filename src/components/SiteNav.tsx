import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-lg font-semibold text-primary-foreground">
        C
      </span>
      <span className="text-lg font-semibold text-foreground">CIB Data Marketplace</span>
    </div>
  )
}

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#faq", label: "FAQ" },
]

export function SiteNav({ onOpenWorkspace }: { onOpenWorkspace: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-lg text-foreground/80 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button onClick={onOpenWorkspace} className="h-10 px-5 text-lg">
            Open workspace
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="mt-8 flex flex-col gap-4 px-4">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-sm font-medium text-foreground">
                  {l.label}
                </a>
              ))}
              <Button onClick={onOpenWorkspace}>Open workspace</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
