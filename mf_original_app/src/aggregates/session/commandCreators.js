import { AGGREGATE_NAME } from "./index";
import { Commands } from "./verbs/commands";
import { Subway } from "../../subwayUtils/";

export const showLoginScreen = () => {
  Subway.selectAggregate(AGGREGATE_NAME).command(
    Commands.UPDATE_LOGIN_MODAL_VISIBILITY,
    { show: true }
  );
};

export const hideLoginScreen = () => {
  Subway.selectAggregate(AGGREGATE_NAME).command(
    Commands.UPDATE_LOGIN_MODAL_VISIBILITY,
    { show: false }
  );
};

export const simulateLogin = (username, password, onRejected) => {
  Subway.selectAggregate(AGGREGATE_NAME).command(
    Commands.AUTHENTICATE_USER,
    { username, password },
    onRejected
  );
};
