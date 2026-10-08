
export const collectionIds = ["research", "projects", "presentations", "gallery"] as const;
export type CollectionId = (typeof collectionIds)[number];

export const assetCatalog = {
  "hero-molar": { file: "hero-molar.webp", label: "دندان سه‌بعدی شاخص", ratio: "4 / 5" },
  "research-enamel": { file: "research-enamel.webp", label: "بافت مینا در نمای ماکرو", ratio: "4 / 3" },
  "research-microscopy": { file: "research-microscopy.webp", label: "بافت‌شناسی میکروسکوپی", ratio: "4 / 3" },
  "project-anatomy": { file: "project-anatomy.webp", label: "آناتومی سه‌بعدی دندان", ratio: "4 / 3" },
  "project-biomaterial": { file: "project-biomaterial.webp", label: "مواد ترمیمی آزمایشگاهی", ratio: "4 / 3" },
  "presentation-pulp": { file: "presentation-pulp.webp", label: "پوستر علمی پالپ", ratio: "4 / 3" },
  "presentation-crown": { file: "presentation-crown.webp", label: "آناتومی تاج دندان", ratio: "4 / 3" },
  "gallery-laboratory": { file: "gallery-laboratory.webp", label: "محیط آزمایشگاه دندان‌پزشکی", ratio: "4 / 3" },
  "gallery-model": { file: "gallery-model.webp", label: "مدل آموزشی دندان", ratio: "4 / 3" },
  "portrait": { file: "portrait.webp", label: "پرتره صاحب پورتفولیو", ratio: "4 / 5" },
} as const;

export type AssetKey = keyof typeof assetCatalog;

// Keep null until a reviewed, optimized asset is committed under public/assets.
// This prevents broken images and makes placeholder-to-asset replacement intentional.
export const activeAssets: Partial<Record<AssetKey, string>> = {};

export const collections: Record<CollectionId, {
  title: string;
  english: string;
  description: string;
  short: string;
  index: string;
}> = {
  research: {
    title: "پژوهش‌ها",
    english: "Research archive",
    description: "جایگاهی برای مقاله‌ها، خلاصه پژوهش، مرور منابع و مسیر شکل‌گیری ایده‌ها.",
    short: "از یک پرسش علمی تا ثبت نتایج و منابع.",
    index: "01",
  },
  projects: {
    title: "پروژه‌ها",
    english: "Selected projects",
    description: "ویترینی برای پروژه‌های دانشگاهی، کارهای آزمایشگاهی و نمونه‌های آموزشی.",
    short: "از ایده تا ساخت و ارائه.",
    index: "02",
  },
  presentations: {
    title: "ارائه‌ها",
    english: "Presentation library",
    description: "آرشیو اسلایدها، پوسترها و سمینارها همراه با فایل قابل مشاهده یا دانلود پس از انتشار.",
    short: "دانش، روایت‌شده با اسلاید و تصویر.",
    index: "03",
  },
  gallery: {
    title: "گالری علمی",
    english: "Visual laboratory",
    description: "نمایش تصاویر آزمایشگاهی و مدل‌های آموزشی، بدون انتشار اطلاعات هویتی بیماران.",
    short: "آرشیوی برای مشاهده جزئیات.",
    index: "04",
  },
};

export type PortfolioItem = {
  slug: string;
  collection: CollectionId;
  title: string;
  category: string;
  description: string;
  asset: AssetKey;
  outline: readonly string[];
};

export const entries: readonly PortfolioItem[] = [
  {
    slug: "enamel-research",
    collection: "research",
    title: "قالب مطالعه ساختار مینا",
    category: "الگوی پژوهش",
    description: "پیش‌نمایش ساختار یک صفحه تحقیق شامل مسئله، روش، یافته‌ها و منابع.",
    asset: "research-enamel",
    outline: ["صورت مسئله و فرضیه", "روش بررسی و داده‌ها", "یافته‌ها، محدودیت‌ها و منابع"],
  },
  {
    slug: "histology-review",
    collection: "research",
    title: "قالب مرور بافت‌شناسی",
    category: "الگوی مرور منابع",
    description: "فضای رزروشده برای مرور مقالات و منابع با امکان توسعه محتوای علمی.",
    asset: "research-microscopy",
    outline: ["پرسش مرور", "کلیدواژه‌ها و راهبرد جست‌وجو", "جدول منابع و جمع‌بندی"],
  },
  {
    slug: "tooth-anatomy",
    collection: "projects",
    title: "قالب پروژه آناتومی دندان",
    category: "الگوی پروژه",
    description: "نمایش هدف، مراحل اجرا، تصاویر، فایل‌ها و نتیجه یک پروژه در آینده.",
    asset: "project-anatomy",
    outline: ["هدف پروژه", "مراحل اجرا و مستندات", "خروجی نهایی"],
  },
  {
    slug: "biomaterials",
    collection: "projects",
    title: "قالب پروژه بیومتریال",
    category: "الگوی آزمایشگاهی",
    description: "چیدمان آماده برای ثبت مراحل یک آزمایش و نتایج مستند آن.",
    asset: "project-biomaterial",
    outline: ["مواد و تجهیزات", "روش اجرا", "نتیجه، تصاویر و منابع"],
  },
  {
    slug: "pulp-seminar",
    collection: "presentations",
    title: "قالب ارائه بافت پالپ",
    category: "الگوی ارائه",
    description: "جایگاه آماده برای افزودن فایل PDF، پوستر، چکیده و اسلایدهای ارائه.",
    asset: "presentation-pulp",
    outline: ["اطلاعات ارائه", "اسلایدها و فایل اصلی", "منابع و پیوست‌ها"],
  },
  {
    slug: "crown-slides",
    collection: "presentations",
    title: "قالب اسلاید آناتومی تاج",
    category: "الگوی اسلاید",
    description: "نمونه نحوه نمایش یک مجموعه اسلاید دانشگاهی در پورتفولیو.",
    asset: "presentation-crown",
    outline: ["چکیده", "پیش‌نمایش فایل", "دریافت فایل پس از انتشار"],
  },
  {
    slug: "lab-imaging",
    collection: "gallery",
    title: "قالب گالری آزمایشگاه",
    category: "الگوی گالری",
    description: "فضای اختصاصی تصاویر ثبت‌شده با توضیح روش، تاریخ و تجهیزات.",
    asset: "gallery-laboratory",
    outline: ["تصویر اصلی", "شرح علمی تصویر", "جزئیات تجهیزات"],
  },
  {
    slug: "study-models",
    collection: "gallery",
    title: "قالب مدل‌های آموزشی",
    category: "الگوی مدل",
    description: "نمایش تصاویر مدل‌ها و ماکت‌های آموزشی در گالری ساختاریافته.",
    asset: "gallery-model",
    outline: ["نمای کلی", "نماهای جزئی", "توضیحات مدل"],
  },
];

export function isCollectionId(value: string): value is CollectionId {
  return (collectionIds as readonly string[]).includes(value);
}

export function entriesFor(collection: CollectionId): PortfolioItem[] {
  return entries.filter((item) => item.collection === collection);
}

export function getEntry(collection: CollectionId, slug: string) {
  return entries.find((item) => item.collection === collection && item.slug === slug);
}
