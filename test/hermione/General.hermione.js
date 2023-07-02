require("hermione");

describe("Общие требования:", function () {
  const path = `http://localhost:3000/hw/store?bug_id=${
    process.env.BUG_ID || 0
  }`;

  it("на ширине меньше 576px навигационное меню должно скрываться за 'гамбургер'", async function () {
    this.browser.setWindowSize(480, 20000);
    await this.browser.url(path);

    await this.browser.assertView("navbar", ".navbar");
  });

  it("при клике по 'гамбургеру', меню должно открываться", async function () {
    this.browser.setWindowSize(480, 20000);
    await this.browser.url(path);

    await (await this.browser.$(".navbar-toggler")).click();
    await this.browser.pause(200);

    await this.browser.assertView("navbar", ".navbar");
  });

  it("при повторном клике по 'гамбургеру', меню должно закрываться", async function () {
    this.browser.setWindowSize(480, 20000);
    await this.browser.url(path);

    await (await this.browser.$(".navbar-toggler")).click();
    await (await this.browser.$(".navbar-toggler")).click();
    await this.browser.pause(200);

    await this.browser.assertView("navbar", ".navbar");
  });

  it("при выборе элемента из меню 'гамбургера', меню должно закрываться", async function () {
    this.browser.setWindowSize(480, 20000);
    await this.browser.url(path);

    await this.browser.$(".navbar-toggler").click();
    await this.browser.$(".nav-link[href='/hw/store/contacts']").click();

    await this.browser.assertView("navbar", ".navbar");
  });
});
