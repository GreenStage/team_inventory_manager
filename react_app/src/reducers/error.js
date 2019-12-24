export default function error(state = {}, action) {
  if (action.error) {
    return action.error;
  }
  return state;
}
