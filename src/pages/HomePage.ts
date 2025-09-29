import { expect, Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly navBooks: Locator;
  readonly navNewReleasesBooks: Locator;
  readonly cookiesAccept: Locator;
  readonly top: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navBooks = page
      .getByRole("main")
      .getByRole("link", { name: "Książki ›" });
    this.navNewReleasesBooks = page
      .getByRole("main")
      .locator(
        'li.nav-categories__item[data-name="Książki"] .nav-subcategories a.nav-subcategories__link[title="Nowości"][href="/nowosci/ksiazki"]:visible'
      );
    this.cookiesAccept = page.getByRole("button", { name: "Zaakceptuj zgody" });
    this.top = page.getByRole("link", { name: "Top 100" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async goToBooksNewReleases() {
    await this.navBooks.hover();
    await this.navNewReleasesBooks.click();
    await this.page.waitForTimeout(1000);
  }

  async acceptCookies() {
    const btn = this.cookiesAccept;
    if (await btn.isVisible()) {
      await btn.click();
      await expect(btn).toBeHidden();
    }
    await this.page.waitForTimeout(3000);
  }
}
