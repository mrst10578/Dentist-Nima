import {expect,test} from "@playwright/test";
test("landing page leads to research archive and a documented work template",async({page})=>{
 await page.goto("/");
 await expect(page.getByRole("heading",{level:1})).toContainText("ذهنِ کنجکاو");
 await expect(page.locator("[data-hero-visual]")).toBeVisible();
 await page.getByRole("link",{name:"ورود به آرشیو آثار"}).click();
 await expect(page).toHaveURL(/\/research$/);
 await expect(page.getByRole("heading",{level:1,name:/پژوهش‌ها/})).toBeVisible();
 await page.getByRole("link",{name:"مشاهده قالب مطالعه ساختار مینا"}).click();
 await expect(page.getByRole("heading",{level:1,name:"قالب مطالعه ساختار مینا"})).toBeVisible();
 await expect(page.getByText("هنوز فایل قابل دریافت وجود ندارد")).toBeVisible();
});
test("mobile navigation remains accessible",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto("/");
 await page.locator(".mobile-nav summary").click();
 await expect(page.getByRole("navigation",{name:"ناوبری موبایل"}).getByRole("link",{name:"ارائه‌ها"})).toBeVisible();
});
test("profile and archive pages are available without fabricated publications",async({page})=>{
 await page.goto("/about");
 await expect(page.getByRole("heading",{level:1,name:/پشت هر اثر/})).toBeVisible();
 await expect(page.getByText(/اطلاعات فردی، دانشگاه و سوابق/)).toBeVisible();
 await page.goto("/presentations");
 await expect(page.getByRole("heading",{level:1,name:/ارائه‌ها/})).toBeVisible();
 await expect(page.getByText(/قالب‌های نمونه/)).toBeVisible();
});
test("rejected lab and analytics applications stay removed",async({page})=>{
 const lab=await page.goto("/lab");expect(lab?.status()).toBe(404);
 const insight=await page.goto("/insights");expect(insight?.status()).toBe(404);
});
