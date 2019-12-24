export default function group(state = {}, action) {
  switch (action.type) {
    case 'SESSION_LOADED':
      return action.data.group;
    case 'IDLE':
      return {};
    default:
      return state;
  }
}
