import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { artists, auditions, createDemoReference, dashboardForRole, demoAccounts, venues } from "./demo-data";

describe("CINEBRIDGE demo experience", () => {
  it("provides a separate sign-in account and workspace for each portal", () => {
    const roles = Object.keys(demoAccounts) as (keyof typeof demoAccounts)[];

    expect(roles).toEqual(["FILMMAKER", "ARTIST", "VENUE_OWNER"]);
    for (const role of roles) {
      expect(demoAccounts[role].email).toContain("@cinebridge.demo");
      expect(demoAccounts[role].password.length).toBeGreaterThanOrEqual(8);
      expect(dashboardForRole(role)).toMatch(/^\/dashboard\//);
    }
    expect(dashboardForRole("FILMMAKER")).toBe("/dashboard/filmmaker");
    expect(dashboardForRole("ARTIST")).toBe("/dashboard/artist");
    expect(dashboardForRole("VENUE_OWNER")).toBe("/dashboard/venue-owner");
  });

  it("keeps every audition, artist and venue fixture addressable by a unique route id", () => {
    for (const entries of [auditions, artists, venues]) {
      const ids = entries.map(entry => entry.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.every(id => /^[a-z0-9-]+$/.test(id))).toBe(true);
    }
    expect(auditions.every(call => call.city && call.role && call.description)).toBe(true);
    expect(artists.every(person => person.city && person.skills.length > 0)).toBe(true);
    expect(venues.every(place => place.city && place.rate > 0)).toBe(true);
  });

  it("provides local artwork for every sample call and unique demo receipts", () => {
    expect(auditions.every(call => call.image.startsWith("/posters/"))).toBe(true);
    for (const kind of ["APP", "BKG"] as const) {
      const references = Array.from({ length: 20 }, () => createDemoReference(kind));
      expect(references.every(reference => new RegExp(`^CB-${kind}-[A-F0-9]{8}$`).test(reference))).toBe(true);
      expect(new Set(references).size).toBe(references.length);
    }
  });

  it("uses locally hosted, attributed film-production photos for every sample venue", () => {
    for (const place of venues) {
      expect(place.image.startsWith("/venues/")).toBe(true);
      expect(place.imageAlt).toBeTruthy();
      expect(place.imageCredit).toBeTruthy();
      expect(place.imageSource).toContain("commons.wikimedia.org/wiki/File:");
      expect(place.imageLicense).toBeTruthy();
      expect(existsSync(new URL(`../../public${place.image}`, import.meta.url))).toBe(true);
    }
  });
});
