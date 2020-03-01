import React from 'react';

import { Subway } from "../../subwayUtils/";

// import { addProductToCart } from "./commandCreators";
import { Events } from "./verbs/events";
import { PublicCommands } from "./verbs/public";

import { cmdHandlers } from "./handlers/commands";
import { evtHandlers } from "./handlers/events";

import { HeaderShoppingCartDropdown } from "./ui/containers/headerShoppingCartDropdown";

export const AGGREGATE_NAME = "ShoppingCartAggregate";

export {
  HeaderShoppingCartDropdown
} from "./ui/containers/headerShoppingCartDropdown";
export { Checkout } from "./ui/containers/checkout";

export const aggregateConfig = {
  name: AGGREGATE_NAME,
  initialState: { checkoutSuccessful: null, items: new Map() },
  cmdHandlers,
  evtHandlers,
  bootstrap: () => {
    Subway.selectAggregate(AGGREGATE_NAME).publicChannel().publishComponent("HeaderShoppingCartDropdown", () => (
      <HeaderShoppingCartDropdown />
    ));

    Subway.selectAggregate(AGGREGATE_NAME).publicChannel().reactToCommand(
      PublicCommands.ADD_TO_SHOPPING_CART,
      ({ payload }, { triggerEvents }) => {
        triggerEvents([
            {
              id: Events.PRODUCT_ADDED_TO_CART,
              payload
            }
          ])
      }
    );
  }
};
