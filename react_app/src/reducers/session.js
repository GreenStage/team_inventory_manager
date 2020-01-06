
const localSession = () => {
  const localSessionJson = localStorage.getItem('session');
  return localSessionJson ? JSON.parse(localSessionJson) : {};
};

export default function session(state = localSession(), action) {
  let sessionData = {};
  switch (action.type) {
    case 'SESSION_LOADED':
      sessionData = {
        groupname: action.data.group.name || state.groupname,
        token: action.data.token || state.token,
      };
      localStorage.setItem('session', JSON.stringify(sessionData));
      return sessionData;
    case 'SIGN_OUT':
      localStorage.removeItem('session');
      return {};
    default:
      return state;
  }
}
