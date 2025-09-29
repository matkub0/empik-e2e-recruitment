import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductList } from "../pages/ProductsListPage";
import { Header } from "../pages/Header";
import { Cart } from "../pages/Cart";

type AppFixtures = {
  homePage: HomePage;
  productList: ProductList;
  header: Header;
  cart: Cart;
};

export const test = base.extend<AppFixtures>({
  context: async ({ context }, use) => {
    const adHosts = [
      "googlesyndication.com",
      "doubleclick.net",
      "googleads.g.doubleclick.net",
      "adservice.google.com",
      "adservice.google.pl",
      "securepubads.g.doubleclick.net",
      "pagead2.googlesyndication.com",
    ];
    for (const host of adHosts) {
      await context.route(
        new RegExp(`^https?://([a-z0-9.-]+\\.)?${host}(/|$)`),
        (r) => r.abort()
      );
    }
    await use(context);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productList: async ({ page }, use) => {
    await use(new ProductList(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  cart: async ({ page }, use) => {
    await use(new Cart(page));
  },
});

export { expect } from "@playwright/test";
