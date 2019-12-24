export default function user(state = {}, action) {
  switch (action.type) {
    case 'SESSION_LOADED':
      return action.data.user;
    case 'IDLE':
      return {};
    default:
      return state;
  }
}
