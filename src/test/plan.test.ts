import { describe, expect, it } from "vitest";
import { planForDate, type CampaignEvent } from "@/lib/plan";

const ev = (zone: string, kind: CampaignEvent["kind"], priority = "A"): CampaignEvent => ({
  date: "2026-12-20", title: "x", venue: "x", zone, lat: 0, lng: 0, kind, priority, time: "", note: "",
});

describe("day plan", () => {
  it("starts on 20 December 2026 inclusive", () => {
    expect(planForDate("2026-12-19", [])).toBeNull();
    expect(planForDate("2026-12-20", [])?.date).toBe("2026-12-20");
  });
  it("ends on 16 January 2027 inclusive", () => {
    expect(planForDate("2027-01-16", [])?.date).toBe("2027-01-16");
    expect(planForDate("2027-01-17", [])).toBeNull();
  });
  it("picks the zone with the strongest listings as the main activation", () => {
    const p = planForDate("2026-12-20", [ev("umhlanga", "parkrun"), ev("central", "beach")]);
    expect(p?.primary.id).toBe("umhlanga");
  });
  it("weather backup is at least 20km away from the main spot", () => {
    const p = planForDate("2026-12-20", [ev("umhlanga", "parkrun"), ev("north", "market")]);
    expect(p?.backupDistanceKm).toBeGreaterThanOrEqual(20);
  });
});
