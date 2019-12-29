import handleError from './error';
import * as server from '../connector';
import { locationUpdate } from './location';

function addingItem(item, where, amount) {
  return {
    type: 'ADDING_ITEM', item, where, amount,
  };
}

function itemUpdated(item) {
  return { type: 'ITEM_UPDATED', item };
}

function uploading(inputName) {
  return { type: 'UPLOADING', inputName };
}

function uploaded(inputName, picurl) {
  return { type: 'UPLOADED', inputName, data: picurl };
}

function creatingItem() {
  return { type: 'CREATING_ITEM'};
}

function itemCreated(item) {
  return { type: 'ITEM_CREATED', item};
}


export function addItem({ groupname, token }, {
  item, locationId, locationName, amount,
}) {
  return handleError(async (dispatch) => {
    dispatch(addingItem(item, locationId, locationName, amount));
    const resp = await server.post(server.ADD_ITEM(groupname, item._id), {
      locationId, locationName, amount,
    }, {
      Authorization: `Bearer ${token}`,
    });
    if (resp.location) {
      dispatch(locationUpdate(resp.location));
    }
    return dispatch(itemUpdated(resp.item));
  });
}

async function uploadPic({ groupname, token }, inputName, file) {
  const resp = await server.upload(server.UPLOAD_PIC(groupname), {
    file,
  }, {
    Authorization: `Bearer ${token}`,
  });
  return resp.url;
}

export function createItem(session, inputName, file, name) {
  return handleError(async (dispatch) => {
    dispatch(creatingItem());
    const picurl = await uploadPic(session, inputName, file);
    const resp = await server.post(server.CREATE_ITEM(session.groupname), {
      name, picurl,
    }, {
      Authorization: `Bearer ${session.token}`,
    });
    dispatch(itemCreated(resp.item));
  });
}
