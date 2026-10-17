import type { Kind } from "@/lib/plan";

export const KIND_LABEL: Record<Kind, string> = {
  event: "Dated event",
  parkrun: "parkrun",
  market: "Market",
  beach: "Beach window",
};

export const PRIORITY_LABEL: Record<string, string> = {
  A: "A · First contact",
  B: "B · Check before planning",
  C: "C · High sponsor risk",
  P: "P · Proposed activation",
};
