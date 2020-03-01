import React from "react";
import {
  Container,
  Menu,
  Header,
  Button,
  Popup,
  List,
  Icon,
  Divider
} from "semantic-ui-react";
import { useObserveAggregateState, useReactToEvent } from "@subway-js/subway-react";
import { showLoginScreen, logout } from "../../commandCreators";

import { AGGREGATE_NAME as NAVIGATION_AGGREGATE_NAME } from "../../";

export function Navbar({ shoppingCartMenuItem }) {

  const [userLoggedInPayload] =
    useReactToEvent(
      NAVIGATION_AGGREGATE_NAME,
      "SESSION_STATUS_UPDATED",
      payload => payload
      );

  const { userLogged, username } = userLoggedInPayload || {};

  const [currentPage] = useObserveAggregateState(
    NAVIGATION_AGGREGATE_NAME,
    aggregateState => aggregateState.currentPage
  );

  return (
    <Menu size="small" borderless fixed="top">
      <Container>
        <Menu.Item>
          <Header color="teal">SubwayJS eComm</Header>
        </Menu.Item>

        {currentPage !== "checkout" && (
          <Menu.Item position="right">
            {shoppingCartMenuItem}
            {!userLogged && (
              <Button
                onClick={() => showLoginScreen()}
                style={{ marginLeft: 10 }}
                color="teal"
                basic
              >
                {" "}
                Log-in
              </Button>
            )}
            {userLogged && (
              <Popup
                on="click"
                position="bottom right"
                trigger={
                  <Button basic color="teal" icon style={{ marginLeft: 10 }}>
                    <Icon name="user" />
                  </Button>
                }
              >
                <Popup.Content style={{ padding: "0 !important" }}>
                  <List.Header>{`Hi, ${username}`} </List.Header>
                  <Divider />
                  <List selection verticalAlign="middle">
                    <List.Item onClick={() => logout()}>Logout</List.Item>
                  </List>
                </Popup.Content>
              </Popup>
            )}
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
}
