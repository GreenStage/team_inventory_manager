export default function inventory(state = {
  status: 'INVENTORY_UNLOADED',
  items: [],
}, action) {
  switch (action.type) {
    case 'INVENTORY_LOADING':
    case 'INVENTORY_LOADED':
      return { status: action.type, items: action.items };
    default:
      return state;
  }
}
