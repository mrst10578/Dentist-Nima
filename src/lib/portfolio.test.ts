
import { describe, expect, it } from "vitest";

import { assetCatalog, collectionIds, entries, entriesFor, getEntry, isCollectionId } from "./portfolio";

describe("BioGlass portfolio registry", () => {
  it("has valid collection routes and item slugs", () => {
    for (const collection of collectionIds) {
      expect(isCollectionId(collection)).toBe(true);
      expect(entriesFor(collection).length).toBeGreaterThan(0);
    }
    expect(isCollectionId("unknown")).toBe(false);
    for (const item of entries) {
      expect(getEntry(item.collection, item.slug)).toEqual(item);
      expect(assetCatalog[item.asset]).toBeDefined();
    }
  });

  it("keeps all sample slugs unique within each collection", () => {
    const paths = entries.map((entry) => entry.collection + "/" + entry.slug);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
