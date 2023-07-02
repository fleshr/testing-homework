import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { Application } from "../../../src/client/Application";
import { CartApi } from "../../../src/client/api";
import { initStore } from "../../../src/client/store";
import { CartState } from "../../../src/common/types";
import mockApi from "./mockApi";

export const createApp = (
  path: string = "/",
  initCartState: CartState = {}
) => {
  const api = mockApi;

  const cart = new CartApi();
  cart.getState = () => initCartState;

  const store = initStore(api, cart);

  const App = () => {
    return (
      <MemoryRouter initialEntries={[path]}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );
  };

  return { App, store };
};
