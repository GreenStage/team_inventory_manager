import * as server from '../connector';
import handleError from './error';

function sessionLoading() {
  return { type: 'SESSION_LOADING' };
}

function sessionLoaded(serverResponse) {
  return { type: 'SESSION_LOADED', data: serverResponse || {} };
}


export function signout() {
  return { type: 'SIGN_OUT' };
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
    const resp = await server.get(server.RESTORE_SESSION_ENDPOINT(groupname), {}, {
      Authorization: `Bearer ${token}`,
    });
    dispatch(sessionLoaded(resp));
  });
}

export * from './inventory';
export * from './manageItem';
export * from './location';
