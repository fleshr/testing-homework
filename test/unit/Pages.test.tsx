import { render } from "@testing-library/react";
import React from "react";
import { createApp } from "./test-utils/createApp";
import { products } from "./test-utils/mockedProducts";

describe("Страницы:", () => {
  it("в магазине должна быть страница главная", async () => {
    const { App } = createApp();
    const { findByText } = render(<App />);

    await findByText("Welcome to Example store!");
  });

  it("в магазине должна быть страница каталог", async () => {
    const { App } = createApp("/catalog");
    const { findByRole } = render(<App />);

    await findByRole("heading", { name: "Catalog" });
  });

  it("в магазине должна быть страница продукта", async () => {
    const { App } = createApp("/catalog/0");
    const { findByRole } = render(<App />);

    await findByRole("heading", { name: products[0].name });
  });

  it("в магазине должна быть страница условия доставки", async () => {
    const { App } = createApp("/delivery");
    const { findByRole } = render(<App />);

    await findByRole("heading", { name: "Delivery" });
  });

  it("в магазине должна быть страница контакты", async () => {
    const { App } = createApp("/contacts");
    const { findByRole } = render(<App />);

    await findByRole("heading", { name: "Contacts" });
  });
});
