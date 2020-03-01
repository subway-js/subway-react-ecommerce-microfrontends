import { Events } from "../verbs/events";

export const evtUpdateLoginModalVisibilityHandler = {
  command: Events.LOGIN_MODAL_VISIBILITY_UPDATED,
  handler: ({ state, payload }, { updateState }) => {
    updateState({
      ...state,
      loginModalVisible: payload.show
    })
  }
};

export const evtLoginModalRequestedHandler = {
  command: Events.LOGIN_MODAL_REQUESTED,
  handler: ({ state, payload }, { triggerEvents }) => {
    triggerEvents([
      { id: Events.LOGIN_MODAL_VISIBILITY_UPDATED, payload: { show: true } }
    ])
  }
};

export const evtLogoutUserRequestedHandler = {
  command: Events.LOGOUT_USER_REQUESTED,
  handler: ({ state, payload }, { triggerEvents, updateState, broadcastEvent }) => {
    broadcastEvent(Events.SESSION_STATUS_UPDATED, {
      userLogged: false,
    });
    updateState({
      ...state,
      userLogged: false,
      jwt: null,
      username: null
    })
    triggerEvents([{
      id: Events.SESSION_STATUS_UPDATED,
      payload: {
        userLoggedIn: false,
      }
    }])
  }
};

export const evtUserSuccessfullyAuthenticatedHandler = {
  command: Events.USER_SUCCESSFULLY_AUTHENTICATED,
  handler: ({ state, payload }, { triggerEvents, updateState, broadcastEvent }) => {
    const { jwt, username } = payload;

    broadcastEvent(Events.SESSION_STATUS_UPDATED, {
      userLogged: true,
      username
    });
    updateState({
      ...state,
      userLogged: true,
      loginModalVisible: false,
      jwt,
      username
    })
    triggerEvents([{
      id: Events.SESSION_STATUS_UPDATED,
      payload: {
        userLogged: true,
        username
      }
    }]) 
  }
};

export const evtHandlers = [
  evtUpdateLoginModalVisibilityHandler,
  evtLoginModalRequestedHandler,
  evtUserSuccessfullyAuthenticatedHandler,
  evtLogoutUserRequestedHandler
];
