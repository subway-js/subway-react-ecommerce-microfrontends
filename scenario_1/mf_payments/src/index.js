import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Subway } from "@subway-js/subway-react";
import { initAggregates } from "./subwayUtils";

import { aggregateConfig as shoppingCartAggregateConfig } from "./aggregates/shoppingCart";

Subway.microFrontends().install('payments', ({ domSelector }) => {
  // TODO move to SubwayJS utils?
  initAggregates([
    shoppingCartAggregateConfig
  ]);
});




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
