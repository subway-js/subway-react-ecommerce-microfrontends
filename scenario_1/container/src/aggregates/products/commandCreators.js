import { AGGREGATE_NAME } from "./index";
import { Commands } from "./verbs/commands";
import { Subway } from "@subway-js/subway-react";

export const loadProductsList = () => {
  Subway.selectAggregate(AGGREGATE_NAME).command(
    Commands.LOAD_PRODUCTS_LIST
  );
};

export const selectProductForDetails = product => {
  const productAggregate = Subway.selectAggregate(AGGREGATE_NAME);
  productAggregate.publicChannel().command("NAVIGATE_TO_PRODUCT_DETAILS", { product });
  productAggregate.command("SELECT_PRODUCT", { product });
};

export const triggerAddToShoppingCart = product => {
  Subway.selectAggregate(AGGREGATE_NAME).publicChannel().command(
    "ADD_TO_SHOPPING_CART",
    { product }
  );
};
