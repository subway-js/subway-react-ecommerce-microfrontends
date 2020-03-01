import { Commands } from "../verbs/commands";
import { Events } from "../verbs/events";

import * as MockAPI from "../api/mockApi";

export const cmdLoadProductsListHandler = {
  command: Commands.LOAD_PRODUCTS_LIST,
  handler: async ({ state, payload }, { triggerEvents }) => {
    const productsList = await MockAPI.getProductsList();
    triggerEvents([{ id: Events.PRODUCTS_LIST_LOADED, payload: { productsList } }])
  }
};

export const cmdSelectProductForDetailsHandler = {
  command: "SELECT_PRODUCT",
  handler: ({ state, payload }, { triggerEvents }) => {
    triggerEvents([
      {
        id: Events.PRODUCT_SELECTED_FOR_DETAILS,
        payload: { product: payload.product }
      }
    ])
  }
};

export const cmdHandlers = [
  cmdLoadProductsListHandler,
  cmdSelectProductForDetailsHandler
];
