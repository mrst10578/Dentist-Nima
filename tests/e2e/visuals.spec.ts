
import { test, expect } from "@playwright/test";
test("anatomy lab controls and explanations work", async ({ page }) => {
 await page.goto("/lab");
 await expect(page.getByRole("heading",{name:/لایه‌های دندان/})).toBeVisible();
 await page.getByRole("button",{name:/پالپ/}).click();
 await expect(page.getByRole("button",{name:/پالپ/})).toHaveAttribute("aria-pressed","true");
 await expect(page.getByText("بافت نرم مرکزی شامل عروق خونی و اعصاب.")).toBeVisible();
 await page.getByRole("button",{name:/بازنشانی نما/}).click();
 await expect(page.getByRole("button",{name:/مینا/})).toHaveAttribute("aria-pressed","true");
});
test("synthetic research filters update URL and table", async ({ page }) => {
 await page.goto("/insights");
 await expect(page.getByText("داده‌های شبیه‌سازی‌شده")).toBeVisible();
 await expect(page.locator('[data-dashboard="synthetic"]')).toBeVisible();
 await page.getByRole("combobox",{name:"حوزه پژوهشی"}).selectOption("materials");
 await page.getByRole("combobox",{name:"سال نمایشی"}).selectOption("1403");
 await expect(page).toHaveURL(/year=1403/);
 await expect(page.getByRole("heading",{name:"مقایسه حوزه‌ها در 1403"})).toBeVisible();
});
