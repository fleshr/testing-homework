import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { createApp } from "./test-utils/createApp";

describe("Общие требования:", () => {
  it("название магазина в шапке должно быть ссылкой на главную страницу", async () => {
    const { App } = createApp();
    const { findAllByRole } = render(<App />);

    await findAllByRole("link", {
      name: /example store/i,
    });
  });

  it("в шапке отображается ссылка на страницу каталога", async () => {
    const { App } = createApp();
    const { findAllByRole } = render(<App />);

    await findAllByRole("link", {
      name: /catalog/i,
    });
  });

  it("в шапке отображается ссылка на страницу доставки", async () => {
    const { App } = createApp();
    const { findAllByRole } = render(<App />);

    await findAllByRole("link", {
      name: /delivery/i,
    });
  });

  it("в шапке отображается ссылка на страницу контактов", async () => {
    const { App } = createApp();
    const { findAllByRole } = render(<App />);

    await findAllByRole("link", {
      name: /contacts/i,
    });
  });

  it("в шапке отображается ссылка на страницу корзины", async () => {
    const { App } = createApp();
    const { findAllByRole } = render(<App />);

    await findAllByRole("link", {
      name: /cart/i,
    });
  });

  it("при клике по 'гамбургеру', меню не должно иметь класс 'collapse'", async () => {
    const { App } = createApp();
    const { findByRole, container } = render(<App />);

    const btn = await findByRole("button", {
      name: /toggle navigation/i,
    });
    await userEvent.click(btn);

    const menu = container.querySelector(".Application-Menu");
    expect(menu).not.toHaveClass("collapse");
  });

  it("при повторном клике по 'гамбургеру', меню должно иметь класс 'collapse'", async () => {
    const { App } = createApp();
    const { findByRole, container } = render(<App />);

    const btn = await findByRole("button", {
      name: /toggle navigation/i,
    });
    await userEvent.click(btn);
    await userEvent.click(btn);

    const menu = container.querySelector(".Application-Menu");
    expect(menu).toHaveClass("collapse");
  });

  it("при клике по элементу из меню, меню должно иметь класс 'collapse'", async function () {
    const { App } = createApp();
    const { findByRole, container } = render(<App />);

    const btn = await findByRole("button", {
      name: /toggle navigation/i,
    });
    await userEvent.click(btn);

    const link = await findByRole("link", {
      name: /contacts/i,
    });
    await userEvent.click(link);

    const menu = container.querySelector(".Application-Menu");
    expect(menu).toHaveClass("collapse");
  });
});
