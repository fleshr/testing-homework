require("hermione");

describe("Форма:", function () {
  const path = `http://localhost:3000/hw/store/cart?bug_id=${
    process.env.BUG_ID || 0
  }`;

  afterEach(async function () {
    await this.browser.execute(() =>
      window.localStorage.removeItem("example-store-cart")
    );
  });

  it("форма выводит ошибки если введены невалидные данные", async function () {
    await this.browser.setWindowSize(480, 2000);
    await this.browser.url(path);

    await this.browser.execute(() =>
      window.localStorage.setItem(
        "example-store-cart",
        '{"0":{"name":"Test product name 1","price":100,"count":1}}'
      )
    );
    await this.browser.refresh();
    await this.browser.pause(200);

    await this.browser.$(".Form-Submit").click();
    await this.browser.pause(200);

    await this.browser.assertView("page", "body");
  });

  it("форма проходит валидацию если введеные корректные данные", async function () {
    await this.browser.setWindowSize(480, 2000);
    await this.browser.url(path);

    await this.browser.execute(() =>
      window.localStorage.setItem(
        "example-store-cart",
        '{"0":{"name":"Test product name 1","price":100,"count":1}}'
      )
    );
    await this.browser.refresh();
    await this.browser.pause(200);

    await this.browser.$("#f-name").setValue("Имя");
    await this.browser.$("#f-phone").setValue("+79000000000");
    await this.browser.$("#f-address").setValue("Адрес");

    await this.browser.$(".Form-Submit").click();
    await this.browser.pause(200);

    await this.browser.assertView("page", "body", {
      ignoreElements: [".Cart-Number"],
    });
  });
});
