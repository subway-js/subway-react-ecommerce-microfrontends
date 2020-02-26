import { AGGREGATE_NAME } from "./index";
import { Commands } from "./verbs/commands";
import { Subway } from "../../subwayUtils/";

export const addProductToCart = product => {
  Subway.selectAggregate(AGGREGATE_NAME).command(
    Commands.ADD_PRODUCT_TO_CART,
    { product }
  );
};

export const goToCheckout = product => {
  Subway.selectAggregate(AGGREGATE_NAME).publicChannel().command(
    "NAVIGATE_TO_CHECKOUT_PAGE"
  );
};

export const showLoginScreen = () => {
  Subway.selectAggregate(AGGREGATE_NAME).publicChannel().command("SHOW_LOGIN_MODAL");
};

export const submitSuccessfulOrder = items => {
  Subway.selectAggregate(AGGREGATE_NAME).command(Commands.SUBMIT_ORDER, {
    items
  });
};
