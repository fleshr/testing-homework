import { findByRole, findByText, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { createApp } from "./test-utils/createApp";
import { productsCart } from "./test-utils/mockedProducts";

describe("Корзина:", () => {
  const path = "/cart";

  it("в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async () => {
    const { App } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    await findByRole("link", {
      name: /cart \(2\)/i,
    });
  });

  it("должна отображаться таблица с добавленными в нее товарами", async () => {
    const { App } = createApp(path, productsCart);
    const { findByTestId } = render(<App />);

    await findByTestId(0);
    await findByTestId(1);
  });

  it("для каждого товара отображается название", async () => {
    const { App } = createApp(path, productsCart);
    const { findByTestId } = render(<App />);

    const product1 = await findByTestId(0);
    await findByText(product1, productsCart[0].name);

    const product2 = await findByTestId(1);
    await findByText(product2, productsCart[1].name);
  });

  it("для каждого товара отображается цена", async () => {
    const { App } = createApp(path, productsCart);
    const { findByTestId } = render(<App />);

    const product1 = await findByTestId(0);
    await findByText(product1, `$${productsCart[0].price}`);

    const product2 = await findByTestId(1);
    await findByText(product2, `$${productsCart[1].price}`);
  });

  it("для каждого товара отображается количество", async () => {
    const { App } = createApp(path, productsCart);
    const { findByTestId } = render(<App />);

    const product1 = await findByTestId(0);
    await findByText(product1, productsCart[0].count);

    const product2 = await findByTestId(1);
    await findByText(product2, productsCart[1].count);
  });

  it("для каждого товара отображается стоимость", async () => {
    const { App } = createApp(path, productsCart);
    const { findByTestId } = render(<App />);

    const product1 = await findByTestId(0);
    await findByText(
      product1,
      `$${productsCart[0].price * productsCart[0].count}`
    );

    const product2 = await findByTestId(1);
    await findByText(
      product2,
      `$${productsCart[1].price * productsCart[1].count}`
    );
  });

  it("отображается общая сумма заказа", async () => {
    const { App } = createApp(path, productsCart);
    const { findByText } = render(<App />);

    await findByText(
      `$${
        productsCart[0].price * productsCart[0].count +
        productsCart[1].price * productsCart[1].count
      }`
    );
  });

  it("должна быть кнопка 'очистить корзину'", async () => {
    const { App } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    await findByRole("button", {
      name: /clear shopping cart/i,
    });
  });

  it("по нажатию на кнопку 'очистить корзину' все товары должны удаляться", async () => {
    const { App, store } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    const btn = await findByRole("button", {
      name: /clear shopping cart/i,
    });

    await userEvent.click(btn);

    expect(store.getState().cart).toEqual({});
  });

  it("если пустая, должна отображаться ссылка на каталог товаров", async () => {
    const { App } = createApp(path);
    const { findByText } = render(<App />);

    const cartEmptyText = await findByText(
      /cart is empty\. please select products in the \./i
    );

    await findByRole(cartEmptyText, "link", {
      name: /catalog/i,
    });
  });
});
