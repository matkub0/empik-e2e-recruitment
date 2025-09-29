import { test, expect } from "../src/fixtures/app.fixtures";

test.describe("Cart", () => {
  test.beforeEach(async ({ page, homePage }) => {
    await homePage.goto();
    await homePage.acceptCookies();
    await homePage.goToBooksNewReleases();
  });

  test("should display cart counter with value 1 after adding first product", async ({
    productList,
    header,
  }) => {
    await productList.addToCartFirstProduct();
    await expect(header.cartCounter).toBeVisible();
    await expect(header.cartCounter).toHaveText("1");
  });
  test("should display product in cart", async ({
    productList,
    header,
    cart,
  }) => {
    await productList.addToCartFirstProduct();
    await header.cart.click();
    await expect(cart.product).toBeVisible();
  });
  test("should set recruitment cookie to 2025", async ({ page }) => {
    await page.context().addCookies([
      {
        name: "rekrutacja",
        value: "2025",
        domain: ".empik.com",
        path: "/",
        httpOnly: false,
        secure: true,
        sameSite: "Lax",
      },
    ]);
    const cookies = await page.context().cookies();
    const recruitmentCookie = cookies.find((c) => c.name === "rekrutacja");

    expect(recruitmentCookie).toBeDefined();
    expect(recruitmentCookie?.value).toBe("2025");
  });
});
