import React, { useState } from "react";
import {
  Grid,
  Image,
  Label,
  Icon,
  Card,
  Rating,
  Button,
  Dimmer
} from "semantic-ui-react";

import { useObserveAggregateState } from "@subway-js/subway-react";

import { AGGREGATE_NAME as PRODUCTS_AGGREGATE_NAME } from "../../";

import {
  selectProductForDetails,
  triggerAddToShoppingCart
} from "../../commandCreators";

import { AddToCartButton } from "../components/addToCartButton";

export function ProductList() {
  const [detailsButtonHoveredId, setDetailsButtonHoveredId] = useState(null);

  const [productList] = useObserveAggregateState(
    PRODUCTS_AGGREGATE_NAME,
    aggregateState => aggregateState.productsList
  );

  return (
    <Grid columns={3}>
      {productList &&
        productList.map(product => {
          const {
            id,
            img,
            title,
            price,
            rating,
            reviewsCount,
            newPrice = null,
            ccy
          } = product;
          return (
            <Grid.Column key={id}>
              <Card>
                {newPrice && (
                  <Image
                    fluid
                    label={{
                      as: "a",
                      color: "orange",
                      corner: "left",
                      icon: "star"
                    }}
                  />
                )}
                <Dimmer.Dimmable
                  style={{ padding: 40, backgroundColor: "white" }}
                  as={Image}
                  onMouseOver={() => {
                    setDetailsButtonHoveredId(id);
                  }}
                  onMouseLeave={() => {
                    setDetailsButtonHoveredId(null);
                  }}
                  dimmed={detailsButtonHoveredId === id}
                >
                  <Image src={img} wrapped />

                  <Dimmer active={detailsButtonHoveredId === id}>
                    <Button
                      basic
                      size="small"
                      color="teal"
                      onClick={() => selectProductForDetails(product)}
                    >
                      <Button.Content>
                        <Icon name="magnify" /> Product details
                      </Button.Content>
                    </Button>
                  </Dimmer>
                </Dimmer.Dimmable>
                <Card.Content>
                  <Card.Header as="a">{title}</Card.Header>
                  <Card.Meta>
                    <Rating
                      size="mini"
                      disabled
                      icon="star"
                      defaultRating={rating}
                      maxRating={5}
                    />{" "}
                    {reviewsCount} Reviews
                  </Card.Meta>
                  {newPrice && (
                    <>
                      <Card.Description>
                        <strike>
                          {ccy}
                          {price}
                        </strike>{" "}
                        <Icon name="arrow right" />{" "}
                        <Label as="span" color="orange" tag>
                          {ccy}
                          {newPrice}
                        </Label>
                      </Card.Description>
                    </>
                  )}
                  {!newPrice && (
                    <Card.Description>
                      {ccy}
                      {price}{" "}
                    </Card.Description>
                  )}
                </Card.Content>
                <Card.Content extra>
                  <AddToCartButton
                    size="small"
                    product={product}
                    onClick={triggerAddToShoppingCart}
                  />
                  {
                    // <Button size="small" fluid color="teal">
                    //   <Button.Content>
                    //     <Icon name="shop" /> Add to cart
                    //   </Button.Content>
                    // </Button>
                  }
                </Card.Content>
              </Card>
            </Grid.Column>
          );
        })}
    </Grid>
  );
}
