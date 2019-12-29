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

    case 'ITEM_CREATED':
      if (!state.items.allIds.some((id) => id === action.item._id)) {
        state.items.allIds.push(action.item._id);
      }
      // fallthrough
    case 'ITEM_UPDATED':
      if (state.items.allIds.some((id) => id === action.item._id)) {
        newState.items.byId[action.item._id] = action.item;
        /*       newState.items.allIds = state.items.allIds.sort((i1, i2) => {
          const a = new Date(newState.items.byId[i1].updatedAt);
          const b = new Date(newState.items.byId[i2].updatedAt);
          return a.getTime() - b.getTime();
        });
        PASSAR PARA COMPONENTE
        */
        return newState;
      }
      return state;

    default:
      return state;
  }
}
