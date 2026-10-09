
export const layerIds = ["enamel", "dentin", "pulp", "root"] as const;
export type LayerId = (typeof layerIds)[number];
export const layers: Record<LayerId, { title: string; latin: string; description: string; note: string; color: string }> = {
  enamel: { title: "مینا", latin: "ENAMEL", description: "لایه سخت پوشاننده تاج دندان که از بافت‌های زیرین محافظت می‌کند.", note: "پوسته خارجی تاج در این نمایش نیمه‌شفاف است.", color: "#d6fcff" },
  dentin: { title: "عاج", latin: "DENTIN", description: "بافت معدنی زیر مینا که بخش عمده حجم تاج و ریشه را می‌سازد.", note: "حجم داخلی برای فهم ارتباط ساختاری نمایش داده شده است.", color: "#f7dba0" },
  pulp: { title: "پالپ", latin: "PULP", description: "بافت نرم مرکزی شامل عروق خونی و اعصاب.", note: "مسیر مرکزی شماتیک، جایگاه نسبی پالپ را نشان می‌دهد.", color: "#ed8f92" },
  root: { title: "ریشه", latin: "ROOT", description: "بخش دندان درون استخوان آلوئول که در نگهداری دندان نقش دارد.", note: "ریشه‌های مدل هنری ساده‌سازی شده‌اند و ابعاد تشخیصی ندارند.", color: "#81cada" },
};
export const demoYears = [1402, 1403, 1404, 1405] as const;
export type DemoYear = (typeof demoYears)[number];
export const demoTopics = [
  { id: "anatomy", label: "آناتومی", color: "#168ca6" },
  { id: "materials", label: "بیومتریال", color: "#e5a84f" },
  { id: "histology", label: "بافت‌شناسی", color: "#a98bd2" },
] as const;
export type DemoTopic = (typeof demoTopics)[number]["id"];
export type DemoRow = { year: DemoYear; topic: DemoTopic; planned: number; active: number; reviewed: number };
/** Synthetic educational fixture, NOT real publications, experiments, or user data. */
export const demoRows: readonly DemoRow[] = [
  { year: 1402, topic: "anatomy", planned: 3, active: 2, reviewed: 1 },
  { year: 1402, topic: "materials", planned: 2, active: 1, reviewed: 1 },
  { year: 1402, topic: "histology", planned: 4, active: 1, reviewed: 1 },
  { year: 1403, topic: "anatomy", planned: 4, active: 3, reviewed: 2 },
  { year: 1403, topic: "materials", planned: 3, active: 2, reviewed: 1 },
  { year: 1403, topic: "histology", planned: 3, active: 2, reviewed: 1 },
  { year: 1404, topic: "anatomy", planned: 5, active: 4, reviewed: 3 },
  { year: 1404, topic: "materials", planned: 5, active: 3, reviewed: 2 },
  { year: 1404, topic: "histology", planned: 4, active: 3, reviewed: 2 },
  { year: 1405, topic: "anatomy", planned: 6, active: 5, reviewed: 3 },
  { year: 1405, topic: "materials", planned: 4, active: 3, reviewed: 2 },
  { year: 1405, topic: "histology", planned: 5, active: 4, reviewed: 3 },
];
export const metrics = ["planned", "active", "reviewed"] as const;
export type Metric = (typeof metrics)[number];
export const metricLabels: Record<Metric, string> = { planned: "طرح‌های تعریف‌شده", active: "در جریان", reviewed: "مرورشده" };
export function groupByTopic(year: DemoYear, metric: Metric) {
  return demoTopics.map(topic => ({
    ...topic,
    value: demoRows.filter(row => row.year === year && row.topic === topic.id)
      .reduce((sum, row) => sum + row[metric], 0),
  }));
}
export function trendByYear(topic: DemoTopic | "all", metric: Metric) {
  return demoYears.map(year => ({
    year,
    value: demoRows.filter(row => row.year === year && (topic === "all" || row.topic === topic))
      .reduce((sum, row) => sum + row[metric], 0),
  }));
}
export function demoCSV() {
  return ["year,topic,planned,active,reviewed", ...demoRows.map(row => [row.year, row.topic, row.planned, row.active, row.reviewed].join(","))].join("\n");
}
