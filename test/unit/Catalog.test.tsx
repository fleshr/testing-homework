import { findByRole, findByText, render } from "@testing-library/react";
import React from "react";
import { createApp } from "./test-utils/createApp";
import { productsCart, productsShort } from "./test-utils/mockedProducts";

describe("Каталог:", () => {
  const path = "/catalog";

  it("отображены товары, список которых приходит с сервера", async () => {
    const { App } = createApp(path);
    const { findByTestId } = render(<App />);

    await findByTestId(productsShort[0].id);
    await findByTestId(productsShort[1].id);
  });

  it("для каждого товара отображается название", async () => {
    const { App } = createApp(path);
    const { findByText } = render(<App />);

    await findByText(productsShort[0].name);
    await findByText(productsShort[1].name);
  });

  it("для каждого товара отображается цена", async () => {
    const { App } = createApp(path);
    const { findByText } = render(<App />);

    await findByText(`$${productsShort[0].price}`);
    await findByText(`$${productsShort[1].price}`);
  });

  it("для каждого товара отображается ссылка на страницу с подробной информацией о товаре", async () => {
    const { App } = createApp(path);
    const { findByTestId } = render(<App />);

    const card1 = await findByTestId(productsShort[0].id);
    const card1LinkEl = await findByRole(card1, "link", { name: /details/i });
    expect(card1LinkEl.getAttribute("href")).toEqual(
      `/catalog/${productsShort[0].id}`
    );

    const card2 = await findByTestId(productsShort[1].id);
    const card2LinkEl = await findByRole(card2, "link", { name: /details/i });
    expect(card2LinkEl.getAttribute("href")).toEqual(
      `/catalog/${productsShort[1].id}`
    );
  });

  it("если товар уже добавлен в корзину должно отображаться сообщение об этом", async () => {
    const { App } = createApp(path, productsCart);
    const { findByTestId } = render(<App />);

    const card1 = await findByTestId(productsShort[0].id);
    const card2 = await findByTestId(productsShort[1].id);

    await findByText(card1, /item in cart/i);
    await findByText(card2, /item in cart/i);
  });
});
