
import { describe, it, expect } from "vitest";
import { demoCSV, demoRows, groupByTopic, trendByYear, demoTopics, demoYears } from "./visual-data";
describe("synthetic educational fixture", () => {
  it("has one row per topic and year, with ordered stages", () => {
    expect(demoRows).toHaveLength(demoTopics.length * demoYears.length);
    expect(new Set(demoRows.map(r => r.year + ":" + r.topic)).size).toBe(demoRows.length);
    for (const r of demoRows) expect(r.planned >= r.active && r.active >= r.reviewed && r.reviewed >= 0).toBe(true);
  });
  it("keeps aggregate and topic totals in sync", () => {
    for (const year of demoYears) {
      const sum = groupByTopic(year,"active").reduce((total,r)=>total+r.value,0);
      expect(trendByYear("all","active").find(r=>r.year===year)?.value).toBe(sum);
    }
  });
  it("exports a stable fixture CSV", () => {
    expect(demoCSV().split("\n")).toHaveLength(13);
    expect(demoCSV()).toContain("year,topic,planned,active,reviewed");
  });
});
