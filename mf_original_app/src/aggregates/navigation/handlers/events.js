import { Events } from "../verbs/events";

export const evtHomePageSelectedHandler = {
  command: Events.HOME_PAGE_SELECTED,
  handler: ({ state }, { updateState }) => {
    updateState({
      ...state,
      selectedProductName: null,
      currentPage: "home"
    })
  }
};

export const evtProductPageSelectedHandler = {
  command: Events.PRODUCT_PAGE_SELECTED,
  handler: ({ state, payload }, { updateState }) => {
    updateState({
      ...state,
      selectedProductName: payload.product.title,
      currentPage: "product"
    })
  }
};

export const evtCheckoutPageRequestSubmittedHandler = {
  command: Events.CHECKOUT_PAGE_REQUEST_SUBMITTED,
  handler: ({ state }, { updateState }) => {
    updateState({
      ...state,
      selectedProductName: null,
      currentPage: "checkout"
    })
  }
};

export const evtHandlers = [
  evtHomePageSelectedHandler,
  evtProductPageSelectedHandler,
  evtCheckoutPageRequestSubmittedHandler
];
