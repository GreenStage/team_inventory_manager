export default function selectedItem(state = {}, action) {
  switch (action.type) {
    case 'ITEM_SELECTED':
      return action.item;
    default:
      return state;
  }
}
