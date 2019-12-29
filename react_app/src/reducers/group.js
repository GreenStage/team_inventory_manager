// TODO mix reducers
export default function group(state = {}, action) {
  const newstate = state;
  switch (action.type) {
    case 'SESSION_LOADED':
      return action.data.group;
    case 'IDLE':
      return {};
    case 'LOCATION_UPDATE':
      const lFound = newstate.locations.find((l) => l._id === action.location._id);
      if (!lFound) {
        newstate.locations.push(action.location);
      }
      return newstate;
    default:
      return state;
  }
}
