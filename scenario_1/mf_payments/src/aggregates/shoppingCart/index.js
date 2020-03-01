import React from 'react';
import ReactDOM from "react-dom";

import { Subway, publishComponent } from "../../subwayUtils/";

import { Events } from "./verbs/events";
import { PublicCommands } from "./verbs/public";

import { cmdHandlers } from "./handlers/commands";
import { evtHandlers } from "./handlers/events";

import { Checkout } from "./ui/containers/checkout";
import { HeaderShoppingCartDropdown } from "./ui/containers/headerShoppingCartDropdown";

export const AGGREGATE_NAME = "ShoppingCartAggregate";

export const aggregateConfig = {
  name: AGGREGATE_NAME,
  initialState: { checkoutSuccessful: null, items: new Map() },
  cmdHandlers,
  evtHandlers,
  bootstrap: () => {

    // publishComponent(Subway.selectAggregate(AGGREGATE_NAME),
    //   "HeaderShoppingCartDropdown", HeaderShoppingCartDropdown);
    Subway
      .selectAggregate(AGGREGATE_NAME)
      .publicChannel()
      .publishComponent("HeaderShoppingCartDropdown",
        (props, { container }) => {
          ReactDOM.render(<HeaderShoppingCartDropdown {...props} />, container);
        },
        ({ container }) => {
          ReactDOM.unmountComponentAtNode(container);
        });

     // publishComponent(AGGREGATE_NAME, "Checkout", Checkout);

    Subway
      .selectAggregate(AGGREGATE_NAME)
      .publicChannel()
      .publishComponent("Checkout",
        (props, { container }) => {
          ReactDOM.render(<Checkout {...props} />, container);
        },
        ({ container }) => {
          ReactDOM.unmountComponentAtNode(container);
        });

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
