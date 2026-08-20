export type Kpi = { id: string; value: string; label: string; warn?: boolean }

export type ConsoleAction = {
  id: string
  label: string
  variant: "primary" | "secondary"
  enabled: boolean
}

export const hero = {
  eyebrow: "Producer Console",
  subtitle: "Everything you produce — governed, bound, and accounted for. In one view.",
}

export const kpis: Kpi[] = [
  { id: "datasets", value: "6", label: "My datasets" },
  { id: "contracts", value: "2", label: "Producer contracts held" },
  { id: "pendingGov", value: "3", label: "Pending governance", warn: true },
  { id: "subreq", value: "2", label: "Subscription requests", warn: true },
  { id: "gaps", value: "1", label: "Coverage gaps" },
]

export const actions: ConsoleAction[] = [
  { id: "register", label: "Register a physical dataset", variant: "primary", enabled: false },
  { id: "bulkpde", label: "Bulk upload PDEs", variant: "secondary", enabled: true },
  { id: "bind", label: "Bind columns", variant: "secondary", enabled: true },
  { id: "workflow", label: "Track workflow", variant: "secondary", enabled: false },
]

export type GaugeChart = {
  kind: "gauge"
  id: string
  title: string
  subtitle: string
  value: number
  target: number
  footer: string
}

export type DonutChart = {
  kind: "donut"
  id: string
  title: string
  subtitle: string
  realised: number
  gap: number
  footer: string
}

export type HBarsChart = {
  kind: "hbars"
  id: string
  title: string
  subtitle: string
  rows: [string, number][]
  footer?: string
}

export type ConsoleChart = GaugeChart | DonutChart | HBarsChart

export const charts: ConsoleChart[] = [
  {
    kind: "gauge",
    id: "publish_sla",
    title: "Publish SLA adherence",
    subtitle: "My datasets registered within the publication SLA",
    value: 85,
    target: 90,
    footer: "11 on time · 2 late",
  },
  {
    kind: "donut",
    id: "bind_progress",
    title: "Binding progress",
    subtitle: "My columns bound to business elements",
    realised: 41,
    gap: 8,
    footer: "8 columns still to bind",
  },
  {
    kind: "hbars",
    id: "sub_turnaround",
    title: "Subscription turnaround",
    subtitle: "How fast I approve subscription requests",
    rows: [
      ["0-1d", 6],
      ["2-3d", 3],
      ["4-5d", 2],
      ["5d+", 1],
    ],
    footer: "Faster approval improves consumer trust",
  },
  {
    kind: "hbars",
    id: "by_sa",
    title: "My elements by subject area",
    subtitle: "Where my governed data concentrates",
    rows: [
      ["Trade Economics", 18],
      ["Trade Lifecycle", 14],
      ["Positions", 11],
      ["P&L", 8],
      ["Reference", 6],
    ],
  },
]

export type Classification = "Internal" | "Confidential"

export type DatasetRow = {
  id: string
  name: string
  owner: string
  sor: string
  classification: Classification
  bound: number
  updated: string
}

export const datasets: DatasetRow[] = [
  { id: "DS-CIB-40118", name: "Endur OTC Commodity Trades", owner: "Commodities Desk", sor: "Endur", classification: "Internal", bound: 78, updated: "2d ago" },
  { id: "DS-CIB-40119", name: "1CAT Investments Trades", owner: "Investments Ops", sor: "Catalyst", classification: "Internal", bound: 78, updated: "3d ago" },
  { id: "DS-CIB-40120", name: "Endur Composer Child Trades", owner: "Commodities Desk", sor: "Endur", classification: "Confidential", bound: 62, updated: "1w ago" },
  { id: "DS-CIB-40121", name: "Endur P&L and Greeks", owner: "Market Risk", sor: "Endur", classification: "Internal", bound: 91, updated: "5h ago" },
  { id: "DS-CIB-40122", name: "Catalyst Position Snapshot", owner: "Investments Ops", sor: "Catalyst", classification: "Internal", bound: 88, updated: "1d ago" },
  { id: "DS-CIB-40123", name: "OTC Counterparty Exposure", owner: "Credit Risk", sor: "Endur", classification: "Confidential", bound: 54, updated: "4d ago" },
]

export type SubscriptionRequest = {
  id: string
  requester: string
  wants: string
  datasetId: string
  age: string
}

export const subscriptionRequests: SubscriptionRequest[] = [
  { id: "SUB-REQ-5501", requester: "Market Risk · Risk Analytics", wants: "Endur P&L and Greeks", datasetId: "DS-CIB-40121", age: "1d" },
  { id: "SUB-REQ-5502", requester: "Regulatory Reporting", wants: "Endur OTC Commodity Trades", datasetId: "DS-CIB-40118", age: "3d" },
]
