import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { createApp } from "./test-utils/createApp";
import { products, productsCart } from "./test-utils/mockedProducts";

describe("Страница товара:", () => {
  const path = "/catalog/0";

  it("отображается название товара", async () => {
    const { App } = createApp(path);
    const { findByText } = render(<App />);

    await findByText(products[0].name);
  });

  it("отображается описание товара", async () => {
    const { App } = createApp(path);
    const { findByText } = render(<App />);

    await findByText(products[0].description);
  });

  it("отображается цена товара", async () => {
    const { App } = createApp(path);
    const { findByText } = render(<App />);

    await findByText(`$${products[0].price}`);
  });

  it("отображается цвет товара", async () => {
    const { App } = createApp(path);
    const { findByText } = render(<App />);

    await findByText(products[0].color);
  });

  it("отображается материал товара", async () => {
    const { App } = createApp(path);
    const { findByText } = render(<App />);

    await findByText(products[0].material);
  });

  it("отображается кнопка 'добавить в корзину'", async () => {
    const { App } = createApp(path);
    const { findByRole } = render(<App />);

    await findByRole("button", {
      name: /add to cart/i,
    });
  });

  it("кнопка 'Add to Cart' добавляет товар в корзину", async () => {
    const { App, store } = createApp(path);
    const { findByRole } = render(<App />);

    const btn = await findByRole("button", { name: /add to cart/i });
    await userEvent.click(btn);

    expect(store.getState().cart).toEqual({
      "0": { ...productsCart[0], count: 1 },
    });
  });

  it("если товар уже добавлен в корзину должно отображаться сообщение об этом", async () => {
    const { App } = createApp(path, productsCart);
    const { findByText } = render(<App />);

    await findByText(/item in cart/i);
  });

  it("если товар уже добавлен в корзину, повторное нажатие кнопки 'добавить в корзину' должно увеличивать его количество", async () => {
    const { App, store } = createApp(path, {
      "0": productsCart[0],
    });
    const { findByRole } = render(<App />);

    const btn = await findByRole("button", { name: /add to cart/i });
    await userEvent.click(btn);

    expect(store.getState().cart).toEqual({
      "0": { ...productsCart[0], count: productsCart[0].count + 1 },
    });
  });
});
