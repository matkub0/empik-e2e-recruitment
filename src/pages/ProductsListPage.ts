import { expect, Page, Locator } from "@playwright/test";

export enum SortOption {
  Relevance = "scoreDesc",
  PriceAsc = "priceAsc",
  PriceDesc = "priceDesc",
  Newest = "publishDesc",
  Oldest = "publishAsc",
  Popularity = "popularityDesc",
}

export class ProductList {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly prices: Locator;
  readonly firstTile: Locator;
  readonly addToCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.getByLabel("Sortuj według:");
    this.prices = page.locator('[itemprop="price"]');
    this.firstTile = page
      .locator('[itemtype="https://schema.org/Product"][itemprop="item"]')
      .first();
    this.addToCart = page.getByRole("button", { name: /do koszyka/i });
  }

  async selectSortOption(option: SortOption) {
    await this.sortDropdown.selectOption(option);
  }

  async getFirstPrice(): Promise<number> {
    const first = this.prices.first();
    const content = await first.getAttribute("content");
    return parseFloat(content || "0");
  }

  async getPriceDifference(): Promise<number> {
    await this.selectSortOption(SortOption.PriceAsc);
    await this.page.waitForTimeout(2000);
    const min = await this.getFirstPrice();
    await this.selectSortOption(SortOption.PriceDesc);
    await this.page.waitForTimeout(2000);
    const max = await this.getFirstPrice();

    return max - min;
  }

  async addToCartFirstProduct() {
    await this.firstTile.hover();
    await this.addToCart.click();
  }
}
