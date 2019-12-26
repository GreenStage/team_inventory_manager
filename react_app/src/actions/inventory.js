import handleError from './error';
import * as server from '../connector';

function inventoryLoading() {
  return { type: 'INVENTORY_LOADING' };
}

function inventoryLoaded(serverResponse) {
  return { type: 'INVENTORY_LOADED', items: serverResponse.items || {} };
}

function addingItem(item, where, amount) {
  return {
    type: 'ADDING_ITEM', item, where, amount,
  };
}

function itemUpdated(item) {
  return { type: 'ADDING_ITEM', item };
}

export function loadInventory({ groupname, token }) {
  return handleError(async (dispatch) => {
    dispatch(inventoryLoading());
    const resp = await server.get(server.INVENTORY_ENDPOINT(groupname), {}, {
      Authorization: `Bearer ${token}`,
    });
    dispatch(inventoryLoaded(resp));
  });
}

class CachedResults {
  constructor() {
    this.results = [];
    this.MAX_CACHED_RESULTS = 10;
    this.MAX_CACHED_SECONDS = 120;
  }

  update() {
    const now = new Date().getTime();
    this.results = this.results.filter((r) => {
      if (now - r.memoAt > this.MAX_CACHED_SECONDS * 1000) {
        return true;
      }
      return false;
    });
  }

  memoize(query, res) {
    this.update();
    const newSize = this.results.unshift({
      query, res, memoAt: new Date().getTime(),
    });
    if (newSize > this.MAX_CACHED_RESULTS) {
      this.results.pop();
    }
  }

  get(query) {
    this.update();
    return this.results.find((r) => r.query === query);
  }
}

const cachedResults = new CachedResults();

export function searchInventory({ groupname, token }, search) {
  return handleError(async (dispatch) => {
    dispatch(inventoryLoading());

    //   let resp = cachedResults.get(search);
    //    if (resp) return dispatch(inventoryLoaded(resp));
    const resp = await server.get(server.INVENTORY_SEARCH(groupname), { search }, {
      Authorization: `Bearer ${token}`,
    });
    //   cachedResults.memoize(search, resp);
    return dispatch(inventoryLoaded(resp));
  });
}


export function addItem({ groupname, token }, { item, where, amount }) {
  return handleError(async (dispatch) => {
    dispatch(addingItem(item, where, amount));
    const resp = await server.get(server.INVENTORY_SEARCH(groupname), {
      _id: item._id, where, amount,
    }, {
      Authorization: `Bearer ${token}`,
    });
    return dispatch(itemUpdated(resp.item));
  });
}

export function selectItem(item) {
  return { type: 'ITEM_SELECTED', item };
}
