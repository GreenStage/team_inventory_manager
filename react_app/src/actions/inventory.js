import handleError from './error';
import * as server from '../connector';

function inventoryLoading() {
  return { type: 'INVENTORY_LOADING' };
}

function inventoryLoaded(items) {
  return { type: 'INVENTORY_LOADED', items };
}

function normalizeInventory(inv) {
  const returnObj = { byId: {}, allIds: [] };
  inv.forEach((item) => {
    returnObj.byId[item._id] = item;
    returnObj.allIds.push(item._id);
  });
  return returnObj;
}

export function loadInventory({ groupname, token }) {
  return handleError(async (dispatch) => {
    dispatch(inventoryLoading());
    const resp = await server.get(server.INVENTORY_ENDPOINT(groupname), {}, {
      Authorization: `Bearer ${token}`,
    });
    dispatch(inventoryLoaded(normalizeInventory(resp.items)));
  });
}

export function searchInventory({ groupname, token }, search) {
  return handleError(async (dispatch) => {
    dispatch(inventoryLoading());
    const resp = await server.get(server.INVENTORY_SEARCH(groupname), { search }, {
      Authorization: `Bearer ${token}`,
    });
    return dispatch(inventoryLoaded(normalizeInventory(resp.items)));
  });
}

export function selectItem(item) {
  return { type: 'ITEM_SELECTED', item };
}

export function insertItem() {
  return { type: 'INSERT_CLICK' };
}
