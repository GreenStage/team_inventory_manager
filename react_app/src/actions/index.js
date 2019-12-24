import * as server from '../connector';

function handleError(fn) {
  return function errHandler(dispatch) {
    fn(dispatch).catch((error) => dispatch({ type: 'ERROR', error }));
  };
}

function sessionLoading() {
  return { type: 'SESSION_LOADING' };
}

function sessionLoaded(serverResponse) {
  return { type: 'SESSION_LOADED', data: serverResponse || {} };
}

function inventoryLoading() {
  return { type: 'INVENTORY_LOADING' };
}

function inventoryLoaded(serverResponse) {
  return { type: 'INVENTORY_LOADED', items: serverResponse.items || {} };
}

export function signin(params) {
  return handleError(async (dispatch) => {
    dispatch(sessionLoading());
    const resp = await server.post(server.SIGNIN_ENDPOINT, params);
    dispatch(sessionLoaded(resp));
  });
}

export function signup(params) {
  return handleError(async (dispatch) => {
    dispatch(sessionLoading());
    const resp = await server.post(server.SIGNUP_ENDPOINT, params);
    dispatch(sessionLoaded(resp));
  });
}

export function creategroup(params) {
  return handleError(async (dispatch) => {
    dispatch(sessionLoading());
    const resp = await server.post(server.NEWGROUP_ENDPOINT, params);
    dispatch(sessionLoaded(resp));
  });
}

export function restoreSession({ groupname, token }) {
  return handleError(async (dispatch) => {
    dispatch(sessionLoading());
    const resp = await server.get(server.GROUP_ENDPOINT(groupname), {}, {
      Authorization: `Bearer ${token}`,
    });
    dispatch(sessionLoaded(resp));
  });
}

export function loadInventory({ groupname, token }) {
  return handleError(async (dispatch) => {
    dispatch(inventoryLoading());
    const resp = await server.get(server.INVENTORY_ENDPOINT(groupname), {}, {
      Authorization: `Bearer ${token}`,
    });
    dispatch(inventoryLoaded(resp));
  });
}
