const localSessionJson = localStorage.getItem('session');
let localSession = {};

if (localSession) {
  localSession = JSON.parse(localSessionJson);
}

export default function session(state = localSession, action) {
  let sessionData = {};
  switch (action.type) {
    case 'SESSION_LOADED':
      sessionData = {
        groupname: action.data.group.name || state.groupname,
        token: action.data.token || state.token,
      };
      localStorage.setItem('session', JSON.stringify(sessionData));
      return sessionData;
    default:
      return state;
  }
}
