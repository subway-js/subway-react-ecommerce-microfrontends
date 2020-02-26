import React from "react";
import { Container } from "semantic-ui-react";
import { Subway } from "./subwayUtils";
import { useObserveAggregateState } from "./subwayUtils/";

import { Navbar, Breadcrumbs } from "./aggregates/navigation";
import { ProductList, ProductDetails, Disclaimer } from "./aggregates/products";
import { Checkout } from "./aggregates/shoppingCart";

import { LoginModal } from "./aggregates/session";
function App() {
  const [currentPage] = useObserveAggregateState(
    "NavigationAggregate",
    aggregateState => aggregateState.currentPage
  );

  const importedComponent = Subway.selectAggregate(
    "ShoppingCartAggregate"
  ).publicChannel().getComponent("HeaderShoppingCartDropdown");
  const HeaderShoppingCartDropdown = importedComponent.factoryFunction();

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
        {currentPage === "checkout" && <Checkout />}

        <Disclaimer />
      </Container>
    </div>
  );
}

export default App;
