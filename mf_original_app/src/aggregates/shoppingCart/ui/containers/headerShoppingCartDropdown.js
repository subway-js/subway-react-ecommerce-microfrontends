import React from "react";
import {
  Button,
  Popup,
  Header,
  Icon,
  Segment,
  Item,
  Label
} from "semantic-ui-react";
import { AGGREGATE_NAME as SHOPPING_CART_AGGREGATE_NAME } from "../../";
import { useObserveAggregateState } from "../../../../subwayUtils/";
import { goToCheckout } from "../../commandCreators";

export function HeaderShoppingCartDropdown({ size }) {
  const [shoppingData] = useObserveAggregateState(
    SHOPPING_CART_AGGREGATE_NAME,
    aggregateState => aggregateState || {}
  );
  const { items = new Map() } = shoppingData || {};
  const cartItems = Array.from(items).map(item => ({ ...item[1] }));
  const itemsTotal = cartItems.reduce((acc, curr) => +acc + +curr.count, 0);
  return (
    <Popup
      on="click"
      position="bottom right"
      trigger={
        <Button color="teal" icon>
          <Icon name="shopping cart" />
          {itemsTotal > 0 && `    (${itemsTotal})`}
        </Button>
      }
    >
      <Popup.Content>
        {(!cartItems || cartItems.length === 0) && (
          <Segment basic textAlign="center">
            <Icon name="frown outline" size="big" color="teal" />
            <Header size="tiny">
              <Header.Subheader>Your shopping cart is empty</Header.Subheader>
            </Header>
          </Segment>
        )}
        {cartItems && cartItems.length > 0 && (
          <Item.Group divided>
            {cartItems.map(
              ({ id, img, title, price, newPrice, ccy, count }) => (
                <Item key={id}>
                  <Item.Image size="mini" src={img} />

                  <Item.Content>
                    <Item.Description>
                      {count && count > 1 && (
                        <Label circular size="tiny" color="black">
                          x{count}
                        </Label>
                      )}{" "}
                      {title}
                    </Item.Description>
                    <Item.Meta>
                      <span className="price">
                        {ccy}
                        {(newPrice || price) * count}
                      </span>
                    </Item.Meta>
                  </Item.Content>
                </Item>
              )
            )}
            <Item>
              <Item.Header as="h4">
                Total: {cartItems[0].ccy}{" "}
                {cartItems
                  .reduce(
                    (acc, curr) =>
                      +acc + +((curr.newPrice || curr.price) * curr.count),
                    0
                  )
                  .toFixed(2)}
              </Item.Header>
            </Item>

            <Item>
              <Item.Content>
                <Button fluid color="teal" onClick={() => goToCheckout()}>
                  Checkout
                </Button>
              </Item.Content>
            </Item>
          </Item.Group>
        )}
      </Popup.Content>
    </Popup>
  );
}
