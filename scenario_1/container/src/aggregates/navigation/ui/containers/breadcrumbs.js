import React from "react";
import { Breadcrumb, Button, Grid } from "semantic-ui-react";

import {
  useSpyAggregateEvent,
  useObserveAggregateState
} from "../../../../subwayUtils/";
import { selectHomePage } from "../../commandCreators";

import { AGGREGATE_NAME as NAVIGATION_AGGREGATE_NAME } from "../../";

export function Breadcrumbs() {

  const [navigationState] = useObserveAggregateState(NAVIGATION_AGGREGATE_NAME);
  const { currentPage, selectedProductName} = navigationState || {};

  return (
    <Grid relaxed columns={2}>
      <Grid.Column>
        <Breadcrumb>
          {currentPage === "home" && (
            <Breadcrumb.Section active>Products</Breadcrumb.Section>
          )}
          {currentPage === "product" && selectedProductName && (
            <>
              <Breadcrumb.Section active link onClick={() => selectHomePage()}>
                Products
              </Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>
                {selectedProductName}
              </Breadcrumb.Section>
            </>
          )}
          {currentPage === "checkout" && (
            <>
              <Breadcrumb.Section active link onClick={() => selectHomePage()}>
                Products
              </Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active>Checkout</Breadcrumb.Section>
            </>
          )}
        </Breadcrumb>
      </Grid.Column>
      {(currentPage === "product" || currentPage === "checkout") && (
        <Grid.Column textAlign="right">
          <Button
            onClick={() => selectHomePage()}
            size="tiny"
            content="Back to products"
            icon="angle left"
            color="teal"
            labelPosition="left"
          />
        </Grid.Column>
      )}
    </Grid>
  );
}
