export default function inventory(state = {
  status: 'INVENTORY_UNLOADED',
  items: { byId: {}, allIds: [] },
}, action) {
  let newState = state;
  switch (action.type) {
    case 'INVENTORY_LOADING':
      newState = state;
      newState.status = 'INVENTORY_LOADING';
      return newState;

    case 'INVENTORY_LOADED':
      return { status: action.type, items: action.items };

    case 'ITEM_UPDATED':
      if (action.item._id in state.items.byId) {
        newState.items.byId[action.item._id] = action.item;
        newState.items.allIds = state.items.allIds.sort((i1, i2) => {
          const a = new Date(newState.items.byId[i1].updatedAt);
          const b = new Date(newState.items.byId[i2].updatedAt);
          return a.getTime() - b.getTime();
        });
        return newState;
      }
      return state;

    default:
      return state;
  }
}
