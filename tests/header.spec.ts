import { test, expect } from "../src/fixtures/app.fixtures";

test.describe("Header", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test("should have correct homepage title", async ({ homePage }) => {
    const title = await homePage.getTitle();
    await expect(title).toBe(
      "Empik.com | 10 000 000 produktów i pomysłów na prezent | Dostawa za 0 zł z Empik Premium"
    );
  });
});
