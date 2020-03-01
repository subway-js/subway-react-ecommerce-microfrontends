import React from "react";
import {
  Segment,
  Image,
  Header,
  Container,
  Rating,
  Divider,
  Icon,
  Label
} from "semantic-ui-react";

import { AGGREGATE_NAME as PRODUCTS_AGGREGATE_NAME } from "../../";

import { useObserveAggregateState } from "@subway-js/subway-react";
import { AddToCartButton } from "../components/addToCartButton";
import { triggerAddToShoppingCart } from "../../commandCreators";

export function ProductDetails() {
  const [product] = useObserveAggregateState(
    PRODUCTS_AGGREGATE_NAME,
    aggregateState => aggregateState.selectedProduct
  );

  return (
    <>
      {" "}
      {product && (
        <Segment.Group horizontal>
          <Segment padded="very">
            <Image src={product.img} wrapped />

            <Segment.Group horizontal compact>
              {[1, 2, 3].map(i => (
                <Segment key={i} basic>
                  <Image src={product.img} size="tiny" />
                </Segment>
              ))}
            </Segment.Group>
          </Segment>
          <Segment>
            <Header size="huge">
              {product.title}{" "}
              {product.newPrice && (
                <Label as="span" color="orange" tag>
                  ON SALE
                </Label>
              )}
            </Header>
            <Container>
              <Rating
                disabled
                icon="star"
                defaultRating={product.rating}
                maxRating={5}
              />{" "}
              {product.reviewsCount} Reviews
            </Container>
            <br />
            <Container>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Container>

            <br />

            {product.newPrice && (
              <>
                <Label as="span" color="grey" basic size="huge">
                  <strike>
                    {product.ccy}
                    {product.price}
                  </strike>
                </Label>
                <Icon name="arrow right" size="big" />
                <Label as="span" color="orange" size="huge">
                  {product.ccy}
                  {product.newPrice}
                </Label>
              </>
            )}
            {!product.newPrice && (
              <Header size="huge">
                {product.ccy}
                {product.price}
              </Header>
            )}

            <Divider />
            <AddToCartButton
              size="huge"
              product={product}
              onClick={triggerAddToShoppingCart}
            />
            {
              // <Button size="huge" fluid color="teal">
              //   <Button.Content>
              //     <Icon name="shop" /> Add to cart
              //   </Button.Content>
              // </Button>
            }
          </Segment>
        </Segment.Group>
      )}
    </>
  );
}
