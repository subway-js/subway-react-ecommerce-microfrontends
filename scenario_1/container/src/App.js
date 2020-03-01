import React, { useState, useEffect, useRef } from "react";
import { Container } from "semantic-ui-react";
import { Subway } from "@subway-js/subway-react";
import { useObserveAggregateState, useConsumeComponent } from "@subway-js/subway-react";

import { Navbar, Breadcrumbs } from "./aggregates/navigation";
import { ProductList, ProductDetails, Disclaimer } from "./aggregates/products";
// import { Checkout } from "./aggregates/shoppingCart";

import { LoginModal } from "./aggregates/session";
function App() {
  const [currentPage] = useObserveAggregateState(
    "NavigationAggregate",
    aggregateState => aggregateState.currentPage
  );

  const CheckoutPage = useConsumeComponent("ShoppingCartAggregate", "Checkout")
  const HeaderShoppingCartDropdown = useConsumeComponent("ShoppingCartAggregate", "HeaderShoppingCartDropdown")


  return (
    <div style={{ background: "#f8f9fa" }}>
      <Container>
        <LoginModal />
        <Navbar shoppingCartMenuItem={HeaderShoppingCartDropdown} />
        <br />
        <br />
        <br />
        <br />
        <Breadcrumbs />
        <br />
        <br />
        {(!currentPage || currentPage === "home") && <ProductList />}
        {currentPage === "product" && <ProductDetails />}
        {currentPage === "checkout" && CheckoutPage /*<div id="checkout2"></div>*/}

        <Disclaimer />
      </Container>
    </div>
  );
}

export default App;
