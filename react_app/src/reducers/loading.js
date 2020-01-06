export default function loading(state = {}, action) {
  const newState = state;
  switch (action.type) {
    case 'ITEM_CREATED':
      newState['ITEM_CREATE'] = false;
      return newState;
    case 'CREATING_ITEM':
      newState['ITEM_CREATE'] = true;
      return newState;
    default:
      return state;
  }
}
