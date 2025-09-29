import { test, expect } from "../src/fixtures/app.fixtures";

test.describe("Book Price", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
    await homePage.acceptCookies();
    await homePage.goToBooksNewReleases();
  });

  test("should check price difference", async ({ productList }) => {
    const diff = await productList.getPriceDifference();
    console.log(`Różnica ceny: ${diff} zł"`);
    expect(diff).toBeGreaterThan(0);
  });
});
