import { Events } from "../verbs/events";

export const evtProductsListLoadedHandler = {
  command: Events.PRODUCTS_LIST_LOADED,
  handler: ({ state, payload = {} }, { updateState }) => {
    const { productsList } = payload;
    updateState({
      ...state,
      productsList
    })
  }
};

// TODO review communication messaging logic
export const evtProductSelectedForDetailsHandler = {
  command: Events.PRODUCT_SELECTED_FOR_DETAILS,
  handler: ({ state, payload = {} }, { updateState }) => {
    const { product } = payload;
    updateState({
      ...state,
      selectedProduct: product
    })
  }
};

export const evtHandlers = [
  evtProductsListLoadedHandler,
  evtProductSelectedForDetailsHandler
];
