import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {  Subway } from "@subway-js/subway-react";
import { initAggregates } from "./subwayUtils";

import { aggregateConfig as productAggregateConfig } from "./aggregates/products";
import { aggregateConfig as navigationAggregateConfig } from "./aggregates/navigation";
// import { aggregateConfig as shoppingCartAggregateConfig } from "./aggregates/shoppingCart";
import { aggregateConfig as sessionAggregateConfig } from "./aggregates/session";

// TODO move to SubwayJS utils?
initAggregates([
  sessionAggregateConfig,
  productAggregateConfig,
  navigationAggregateConfig,
  // shoppingCartAggregateConfig
]);

Subway.microFrontends().install('container', ({ domSelector }) => {
  ReactDOM.render(<App />, document.getElementById(domSelector));
});
  // ReactDOM.render(<App />, document.getElementById("root"));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
