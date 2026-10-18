import type { Kind } from "@/lib/plan";

export const KIND_LABEL: Record<Kind, string> = {
  event: "Dated event",
  parkrun: "parkrun lead",
  market: "Market",
  beach: "Beach / promenade prospect",
};

export const PRIORITY_LABEL: Record<string, string> = {
  A: "A · First contact",
  B: "B · Check before planning",
  C: "C · High sponsor risk",
  P: "P · Proposed activation",
  "1": "1 · Best fit: community fitness",
  "2": "2 · Best fit: beach / promenade",
  "4": "4 · Selective: market / family venue",
};
