export default function selectedItemId(state = 0, action) {
  switch (action.type) {
    case 'ITEM_SELECTED':
      return action.item._id;
    default:
      return state;
  }
}
