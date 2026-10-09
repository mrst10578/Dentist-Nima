
import { expect, test } from "@playwright/test";

test("BioGlass home navigation and asset placeholders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("به روایت پژوهش");
  await expect(page.locator('[data-hero-visual]')).toBeVisible();
  await expect(page.getByText("VISUAL STUDY")).toBeVisible();
  await page.getByRole("link", { name: "مرور پژوهش‌ها" }).click();
  await expect(page).toHaveURL(/\/research$/);
  await expect(page.getByRole("heading", { name: "پژوهش‌ها", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "مشاهده قالب مطالعه ساختار مینا" }).click();
  await expect(page.getByText("این صفحه نمونه‌ی طراحی است")).toBeVisible();
});

test("mobile navigation reveals site sections", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".mobile-nav summary").click();
  await expect(page.getByRole("navigation", { name: "ناوبری موبایل" }).getByRole("link", { name: "ارائه‌ها" })).toBeVisible();
});
