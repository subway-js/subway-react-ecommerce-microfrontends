import { AGGREGATE_NAME } from "./index";
import { Commands } from "./verbs/commands";
import { Subway } from "@subway-js/subway-react";

export const selectHomePage = () => {
  Subway.selectAggregate(AGGREGATE_NAME).command(Commands.SELECT_HOME_PAGE);
};

export const showLoginScreen = () => {
  Subway.selectAggregate(AGGREGATE_NAME).publicChannel().command("SHOW_LOGIN_MODAL");
};

export const logout = () => {
  Subway.selectAggregate(AGGREGATE_NAME).publicChannel().command(
    "PERFORM_USER_LOGOUT"
  );
};
