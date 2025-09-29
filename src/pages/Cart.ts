import { Page, Locator } from "@playwright/test";

export class Cart {
  readonly page: Page;
  readonly product: Locator;

  constructor(page: Page) {
    this.page = page;
    this.product = page.locator('[data-ta="product-box"]');
  }
}
