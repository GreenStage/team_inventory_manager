export default function status(state = 'IDLE', action) {
  switch (action.type) {
    case 'IDLE':
    case 'SESSION_LOADING':
    case 'SESSION_LOADED':
      return action.type;
    default:
      return state;
  }
}
