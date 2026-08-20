import { useState } from "react"
import { LandingPage } from "@/components/LandingPage"
import { ConsolePage } from "@/components/ConsolePage"

function App() {
  const [page, setPage] = useState<"landing" | "console">("landing")

  if (page === "console") {
    return <ConsolePage onBack={() => setPage("landing")} />
  }

  return <LandingPage onOpenWorkspace={() => setPage("console")} />
}

export default App
