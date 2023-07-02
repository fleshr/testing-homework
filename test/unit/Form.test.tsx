import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { checkout } from "../../src/client/store";
import { createApp } from "./test-utils/createApp";
import { productsCart } from "./test-utils/mockedProducts";

describe("Форма заказа:", () => {
  const path = "/cart";
  const form = {
    name: "Имя",
    phone: "+79000000000",
    address: "Aдрес",
  };

  it("если введено невалидное имя, поле имеет класс 'is-invalid'", async () => {
    const { App } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    const btn = await findByRole("button", { name: /checkout/i });
    await userEvent.click(btn);

    const input = await findByRole("textbox", { name: /name/i });
    expect(input).toHaveClass("is-invalid");
  });

  it("если введен невалидный номер, поле имеет класс 'is-invalid'", async () => {
    const { App } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    const btn = await findByRole("button", { name: /checkout/i });
    await userEvent.click(btn);

    const input = await findByRole("textbox", { name: /phone/i });
    expect(input).toHaveClass("is-invalid");
  });

  it("если введен невалидный адрес, поле имеет класс 'is-invalid'", async () => {
    const { App } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    const btn = await findByRole("button", { name: /checkout/i });
    await userEvent.click(btn);

    const input = await findByRole("textbox", { name: /address/i });
    expect(input).toHaveClass("is-invalid");
  });

  it("если введено валидное имя, поле не должно имеет класс 'is-invalid'", async () => {
    const { App } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    const input = await findByRole("textbox", { name: /name/i });
    await userEvent.type(input, form.name);

    const btn = await findByRole("button", { name: /checkout/i });
    await userEvent.click(btn);

    expect(input).not.toHaveClass("is-invalid");
  });

  it("если введен валидный номер, поле не должно имеет класс 'is-invalid'", async () => {
    const { App } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    const input = await findByRole("textbox", { name: /phone/i });
    await userEvent.type(input, form.phone);

    const btn = await findByRole("button", { name: /checkout/i });
    await userEvent.click(btn);

    expect(input).not.toHaveClass("is-invalid");
  });

  it("если введен валидный адрес, поле не должно имеет класс 'is-invalid'", async () => {
    const { App } = createApp(path, productsCart);
    const { findByRole } = render(<App />);

    const input = await findByRole("textbox", { name: /address/i });
    await userEvent.type(input, form.address);

    const btn = await findByRole("button", { name: /checkout/i });
    await userEvent.click(btn);

    expect(input).not.toHaveClass("is-invalid");
  });

  it("после выполнения заказа, должно выводиться сообщение об успешном выполненнии заказа", async () => {
    const { App, store } = createApp(path, productsCart);
    const { findByText } = render(<App />);

    store.dispatch(checkout(form, productsCart));
    await findByText(/order # has been successfully completed\./i);
  });

  it("после выполнения заказа, корзина должна очищаться", async () => {
    const { App, store } = createApp(path, productsCart);
    const { findByText } = render(<App />);

    store.dispatch(checkout(form, productsCart));
    await findByText(/cart is empty\. please select products in the \./i);
  });
});
