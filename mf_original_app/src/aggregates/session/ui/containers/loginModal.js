import React, { useState, useEffect } from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";
import { useObserveAggregateState } from "../../../../subwayUtils";
import {
  hideLoginScreen,
  simulateLogin
} from "../../commandCreators";

export function LoginModal() {
  const [authInProgress, setAuthInProgress] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [isLoginModalVisible] = useObserveAggregateState(
    "SessionAggregate",
    aggregateState => aggregateState.loginModalVisible
  );

  useEffect(() => {
    setAuthInProgress(false);
    setWrongCredentials(false);
  }, [isLoginModalVisible]);

  return (
    <Modal
      open={isLoginModalVisible}
      dimmer="blurring"
      size="small"
      onClose={() => hideLoginScreen()}
    >
      {!wrongCredentials && <Header color="teal" icon="user" content="Enter your credentials" />}
      {wrongCredentials && <Header color="red" icon="user" content="Wrong credentials: try again" />}

      <Modal.Content>
        <Form>
          <Form.Field>
            <Form.Input disabled value="testuser" label="Enter Username" />
          </Form.Field>
          <Form.Field>
            <Form.Input
              disabled
              value="password"
              label="Enter Password"
              type="password"
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          disabled={authInProgress}
          color="grey"
          onClick={() => hideLoginScreen()}
        >
          <Icon name="cancel" /> Cancel
        </Button>

        <Button
          loading={authInProgress}
          disabled={authInProgress}
          color="teal"
          onClick={() => {
            setAuthInProgress(true);
            simulateLogin("MichaelJordan23", "wrongPassword", ({ reasonString, meta }) => {
              setWrongCredentials(true);
              setAuthInProgress(false);
            });
          }}
        >
          <Icon name="checkmark" /> Simulate wrong credentials
        </Button>

        <Button
          loading={authInProgress}
          disabled={authInProgress}
          color="teal"
          onClick={() => {
            setAuthInProgress(true);
            simulateLogin("MichaelJordan23", "air23");
          }}
        >
          <Icon name="checkmark" /> Simulate Successful Login
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
