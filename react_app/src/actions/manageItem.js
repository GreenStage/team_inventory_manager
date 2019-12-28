import handleError from './error';
import * as server from '../connector';

function addingItem(item, where, amount) {
  return {
    type: 'ADDING_ITEM', item, where, amount,
  };
}

function itemUpdated(item) {
  return { type: 'ITEM_UPDATED', item };
}

export function addItem({ groupname, token }, { item, location, amount }) {
  return handleError(async (dispatch) => {
    dispatch(addingItem(item, location, amount));
    const resp = await server.post(server.ADD_ITEM(groupname), {
      _id: item._id, location, amount,
    }, {
      Authorization: `Bearer ${token}`,
    });
    
    return dispatch(itemUpdated(resp.item));
  });
}
