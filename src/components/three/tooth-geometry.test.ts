import { describe, expect, it } from "vitest";
import { Vector3 } from "three";

import { createCrownGeometry, createTaperedRootGeometry } from "./tooth-geometry";

describe("BioGlass procedural anatomy", () => {
  it("creates a bounded, non-empty four-cusp crown", () => {
    const crown = createCrownGeometry();
    expect(crown.getAttribute("position").count).toBeGreaterThan(1000);
    expect(crown.index?.count).toBeGreaterThan(1000);
    expect(crown.boundingSphere?.radius).toBeGreaterThan(0.5);
    crown.dispose();
  });

  it("produces tapered, finite root vertices", () => {
    const root = createTaperedRootGeometry([
      new Vector3(0, 0, 0),
      new Vector3(0.1, -0.4, 0),
      new Vector3(0.3, -1, 0),
    ]);
    const array = root.getAttribute("position").array;
    expect(array.length).toBeGreaterThan(500);
    for (let i = 0; i < array.length; i++) expect(Number.isFinite(array[i])).toBe(true);
    root.dispose();
  });
});
