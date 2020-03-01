import { Commands } from "../verbs/commands";
import { Events } from "../verbs/events";
import * as MockAPI from "../api/mockApi";

export const cmdSubmitOrderHandler = {
  command: Commands.SUBMIT_ORDER,
  handler: async ({ state, payload }, { triggerEvents }) => {
    const { items } = payload;
    const orderSubmissionResult = await MockAPI.submitSuccessfulOrder(items);
    let events = [];
    const { status } = orderSubmissionResult;
    if (status === "ok") {
      events = events.concat([
        {
          id: Events.ORDER_PROCESSED,
          payload: { successful: true, items }
        }
      ]);
    }

    triggerEvents(events);
  }
};

export const cmdHandlers = [cmdSubmitOrderHandler];
