import React, { useState, useEffect } from "react";
import {
  Table,
  Label,
  Header,
  Message,
  Button,
  Icon,
  Image
} from "semantic-ui-react";

import { AGGREGATE_NAME as SHOPPING_CART_AGGREGATE_NAME } from "../../";
import {
  useObserveAggregateState,
  useReactToEvent
} from "../../../../subwayUtils/";
import { showLoginScreen, submitSuccessfulOrder } from "../../commandCreators";

export function Checkout() {
  const [loading, setLoading] = useState(false);
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [state] = useObserveAggregateState(SHOPPING_CART_AGGREGATE_NAME);
  const {
    items: shoppingMap = [],
    checkoutSuccessful: orderSuccessful = false
  } = state ? state : {};

  const [userLoggedInPayload] = useReactToEvent(SHOPPING_CART_AGGREGATE_NAME, "SESSION_STATUS_UPDATED");
  const { userLogged, username } = userLoggedInPayload || {};

  useEffect(() => {
    setCheckoutCompleted(orderSuccessful);
    setLoading(false);
  }, [orderSuccessful]);

  const list = Array.from(shoppingMap || []).map(item => ({ ...item[1] }));
  const totalCurrency = list[0] ? list[0].ccy : null;
  const count = list.reduce((acc, curr) => +acc + +curr.count, 0);
  const total = list
    .reduce(
      (acc, curr) => +acc + +((curr.newPrice || curr.price) * curr.count),
      0
    )
    .toFixed(2);

  if (!loading && checkoutCompleted) {
    return (
      <Header
        color="teal"
        style={{ marginTop: 100 }}
        as="h2"
        icon
        textAlign="center"
      >
        <Icon name="winner" />
        Order processed successfully!
        <Header.Subheader>
          Thanks {username}! You will receive your products tomorrow!
        </Header.Subheader>
      </Header>
    );
  }
  return (
    <>
      <div>{loading}</div>
      <Table columns={4} color="teal">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={5}>PRODUCT</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">QUANTITY</Table.HeaderCell>
            <Table.HeaderCell width={5} textAlign="center">
              UNIT PRICE
            </Table.HeaderCell>
            <Table.HeaderCell width={5} textAlign="right">
              TOTAL
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list.map(({ id, title, count, newPrice, price, ccy, img }) => (
            <Table.Row key={id}>
              <Table.Cell>
                {newPrice && (
                  <Label color="orange" size="mini" ribbon>
                    OFFER!
                  </Label>
                )}
                {title} <Image src={img} size="mini" />
              </Table.Cell>

              <Table.Cell textAlign="center"> {count}</Table.Cell>
              <Table.Cell textAlign="center">
                <Header as="h5">
                  <Header.Content>
                    {newPrice || price} {ccy}
                    {newPrice && (
                      <Header.Subheader
                        style={{ textDecoration: "line-through" }}
                      >
                        {price} {ccy}
                      </Header.Subheader>
                    )}
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell positive textAlign="right">
                <Header as="h4">
                  <Header.Content>
                    {((newPrice || price) * count).toFixed(2)} {ccy}
                  </Header.Content>
                </Header>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell textAlign="center">
              {count} articles
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell positive textAlign="right">
              {total} {totalCurrency}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <Message color="teal" attached>
        <Header as="h4">
          {username
            ? `Hi ${username}, you can buy in one click!`
            : "Buy in one click"}
          <Header.Subheader>
            Pay with your default paying method and receive tomorrow at your
            home address.
          </Header.Subheader>
        </Header>
        <br />

        {!checkoutCompleted && !loading && userLogged && (
          <Button
            color="orange"
            floated="right"
            onClick={() => {
              setLoading(true);
              submitSuccessfulOrder(list);
            }}
          >
            Buy in 1-click!
          </Button>
        )}
        {!checkoutCompleted && !loading && !userLogged && (
          <Button
            animated="fade"
            color="teal"
            floated="right"
            onClick={() => showLoginScreen()}
          >
            <Button.Content visible>Buy in 1-click!</Button.Content>
            <Button.Content hidden>Login first</Button.Content>
          </Button>
        )}
        {!checkoutCompleted && loading && (
          <Button color="orange" disabled floated="right" loading>
            Buy in 1-click!
          </Button>
        )}
        {!loading && checkoutCompleted && "FINALIZED"}

        <br />
        <br />
      </Message>
      {!userLogged && (
        <Message attached="bottom" warning>
          <Icon name="info" />
          If you are not logged in, we will ask for your credentials before
          proceeding with the order
        </Message>
      )}
    </>
  );
}
