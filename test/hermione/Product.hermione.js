require("hermione");
const { adaptiveTest } = require("./test-utils/adaptiveTest");

describe("Страница продукта:", function () {
  const path = `http://localhost:3000/hw/store/catalog/0?bug_id=${
    process.env.BUG_ID || 0
  }`;

  afterEach(async function () {
    await this.browser.execute(() =>
      window.localStorage.removeItem("example-store-cart")
    );
  });

  it("содержимое корзины должно сохраняться между перезагрузками страницы", async function () {
    await this.browser.setWindowSize(480, 2000);
    await this.browser.url(path);

    await this.browser.$(".ProductDetails-AddToCart").click();
    await this.browser.refresh();
    await this.browser.pause(200);

    expect(await this.browser.$(".CartBadge").isExisting()).toBeTruthy();
  });

  adaptiveTest(path);
});
