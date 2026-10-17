import { describe, expect, it } from "vitest";
import { planForDate, type CampaignEvent } from "@/lib/plan";

const ev = (zone: string, kind: CampaignEvent["kind"], priority = "A"): CampaignEvent => ({
  date: "2026-12-05", title: "x", venue: "x", zone, lat: 0, lng: 0, kind, priority, time: "", note: "",
});

describe("day plan", () => {
  it("returns nothing outside 28 Nov 2026 – 7 Feb 2027", () => {
    expect(planForDate("2026-11-27", [])).toBeNull();
    expect(planForDate("2027-02-08", [])).toBeNull();
  });
  it("picks the zone with the strongest listings as the main activation", () => {
    const p = planForDate("2026-12-05", [ev("umhlanga", "parkrun"), ev("central", "beach")]);
    expect(p?.primary.id).toBe("umhlanga");
  });
  it("weather backup is at least 20km away from the main spot", () => {
    const p = planForDate("2026-12-05", [ev("umhlanga", "parkrun"), ev("north", "market")]);
    expect(p!.backupDistanceKm).toBeGreaterThanOrEqual(20);
  });
});
