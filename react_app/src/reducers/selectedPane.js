export default function selectedPane(state = 0, action) {
  switch (action.type) {
    case 'ITEM_SELECTED':
      return {
        type: 'ITEM_MANAGE',
        itemid: action.item._id,
      };
    case 'INSERT_CLICK':
      return {
        type: 'ITEM_INSERT',
      };
    case 'ITEM_CREATED':
      if (state.type === 'ITEM_INSERT') {
        return 0;
      }
      break;
    default:
      return state;
  }
}
