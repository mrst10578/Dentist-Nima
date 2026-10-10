import {expect,test} from "@playwright/test";
test("cinematic portfolio gives access to a detailed work template",async({page})=>{
 await page.goto("/");
 await expect(page.getByRole("heading",{level:1})).toContainText("یک جستجوگر");
 await expect(page.locator("[data-hero-visual]")).toBeVisible();
 await page.getByRole("link",{name:"ورود به آرشیو"}).click();
 await expect(page).toHaveURL(/\/research$/);
 await expect(page.getByRole("heading",{level:1,name:/پژوهش‌ها/})).toBeVisible();
 await page.getByRole("link",{name:"مشاهده قالب مطالعه ساختار مینا"}).click();
 await expect(page.getByRole("heading",{level:1,name:"قالب مطالعه ساختار مینا"})).toBeVisible();
 await expect(page.getByText("هنوز فایل قابل دریافت وجود ندارد")).toBeVisible();
});
test("mobile navigation and editorial sections are usable",async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto("/");
 await expect(page.getByRole("heading",{level:1})).toBeVisible();
 await page.locator(".mobile-nav summary").click();
 await expect(page.getByRole("navigation",{name:"ناوبری موبایل"}).getByRole("link",{name:"ارائه‌ها"})).toBeVisible();
 await expect(page.locator("body")).toHaveJSProperty("scrollWidth",390);
});
test("about and presentations have clearly identified placeholder information",async({page})=>{
 await page.goto("/about");
 await expect(page.getByRole("heading",{level:1,name:/پشت هر اثر/})).toBeVisible();
 await expect(page.getByText(/پس از تأیید صاحب پورتفولیو/)).toBeVisible();
 await page.goto("/presentations");
 await expect(page.getByRole("heading",{level:1,name:/ارائه‌ها/})).toBeVisible();
 await expect(page.getByText(/نمونه|قالب/).first()).toBeVisible();
});
test("rejected applications remain removed",async({page})=>{
 for(const path of ["/lab","/insights"]){
  await page.goto(path);
  await expect(page.getByRole("heading",{name:"این صفحه در آرشیو پیدا نشد."})).toBeVisible();
  await expect(page.locator("[data-dashboard],[data-lab-render]")).toHaveCount(0);
 }
});
