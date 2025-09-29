import { Page, Locator } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly cartCounter: Locator;
  readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartCounter = page.locator(".infoCircle.ta-counter");
    this.cart = page.locator('a[href="/cart/"]');
  }
}
