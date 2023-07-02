const { productsShort, products } = require("./mockedProducts");

module.exports.adaptiveTest = function (path) {
  afterEach(async function () {
    await this.browser.execute(() =>
      window.localStorage.removeItem("example-store-cart")
    );
  });

  describe("Верстка:", function () {
    it("< 576px", async function () {
      const mockProducts = await this.browser.mock("**/hw/store/api/products", {
        method: "get",
      });

      const mockProduct = await this.browser.mock(
        "**/hw/store/api/products/0",
        {
          method: "get",
        }
      );

      mockProducts.respond(productsShort);
      mockProduct.respond(products[0]);

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

      await this.browser.assertView("page", "body");

      mockProducts.restore();
      mockProduct.restore();
    });

    it("576px - 768px", async function () {
      const mockProducts = await this.browser.mock("**/hw/store/api/products", {
        method: "get",
      });

      const mockProduct = await this.browser.mock(
        "**/hw/store/api/products/0",
        {
          method: "get",
        }
      );

      mockProducts.respond(productsShort);
      mockProduct.respond(products[0]);

      await this.browser.setWindowSize(640, 2000);
      await this.browser.url(path);

      await this.browser.execute(() =>
        window.localStorage.setItem(
          "example-store-cart",
          '{"0":{"name":"Test product name 1","price":100,"count":1}}'
        )
      );
      await this.browser.refresh();
      await this.browser.pause(200);

      await this.browser.assertView("page", "body");

      mockProducts.restore();
      mockProduct.restore();
    });

    it("768px - 992px", async function () {
      const mockProducts = await this.browser.mock("**/hw/store/api/products", {
        method: "get",
      });

      const mockProduct = await this.browser.mock(
        "**/hw/store/api/products/0",
        {
          method: "get",
        }
      );

      mockProducts.respond(productsShort);
      mockProduct.respond(products[0]);

      await this.browser.setWindowSize(860, 2000);
      await this.browser.url(path);

      await this.browser.execute(() =>
        window.localStorage.setItem(
          "example-store-cart",
          '{"0":{"name":"Test product name 1","price":100,"count":1}}'
        )
      );
      await this.browser.refresh();
      await this.browser.pause(200);

      await this.browser.assertView("page", "body");

      mockProducts.restore();
      mockProduct.restore();
    });

    it("992px - 1200px", async function () {
      const mockProducts = await this.browser.mock("**/hw/store/api/products", {
        method: "get",
      });

      const mockProduct = await this.browser.mock(
        "**/hw/store/api/products/0",
        {
          method: "get",
        }
      );

      mockProducts.respond(productsShort);
      mockProduct.respond(products[0]);

      await this.browser.setWindowSize(1100, 2000);
      await this.browser.url(path);

      await this.browser.execute(() =>
        window.localStorage.setItem(
          "example-store-cart",
          '{"0":{"name":"Test product name 1","price":100,"count":1}}'
        )
      );
      await this.browser.refresh();
      await this.browser.pause(200);

      await this.browser.assertView("page", "body");

      mockProducts.restore();
      mockProduct.restore();
    });

    it("1200px - 1400px", async function () {
      const mockProducts = await this.browser.mock("**/hw/store/api/products", {
        method: "get",
      });

      const mockProduct = await this.browser.mock(
        "**/hw/store/api/products/0",
        {
          method: "get",
        }
      );

      mockProducts.respond(productsShort);
      mockProduct.respond(products[0]);

      await this.browser.setWindowSize(1280, 2000);
      await this.browser.url(path);

      await this.browser.execute(() =>
        window.localStorage.setItem(
          "example-store-cart",
          '{"0":{"name":"Test product name 1","price":100,"count":1}}'
        )
      );
      await this.browser.refresh();
      await this.browser.pause(200);

      await this.browser.assertView("page", "body");

      mockProducts.restore();
      mockProduct.restore();
    });

    it("> 1400px", async function () {
      const mockProducts = await this.browser.mock("**/hw/store/api/products", {
        method: "get",
      });

      const mockProduct = await this.browser.mock(
        "**/hw/store/api/products/0",
        {
          method: "get",
        }
      );

      mockProducts.respond(productsShort);
      mockProduct.respond(products[0]);

      await this.browser.setWindowSize(1440, 2000);
      await this.browser.url(path);

      await this.browser.execute(() =>
        window.localStorage.setItem(
          "example-store-cart",
          '{"0":{"name":"Test product name 1","price":100,"count":1}}'
        )
      );
      await this.browser.refresh();
      await this.browser.pause(200);

      await this.browser.assertView("page", "body");

      mockProducts.restore();
      mockProduct.restore();
    });
  });
};
