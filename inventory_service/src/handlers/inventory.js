import { Item } from '../models';

export async function listInventory(config, req, resp) {
  let items = [];
  try {
    items = await Item.find({ group: req.group.id }).sort({ updatedAt: -1 });
  } catch (err) {
    return resp.json({ message: 'NO_ITEM_FOUND' });
  }

  return resp.json({ message: 'OK', items });
}

export async function searchItem(config, req, resp) {
  const searchQuery = req.query.search || '';
  let items = [];
  try {
    items = await Item.find({
      group: req.group.id,
      name: {
        $regex: `.*${searchQuery}.*`,
      },
    }).sort({ name: 1 });
  } catch (err) {
    return resp.json({ message: 'NO_ITEM_FOUND' });
  }

  return resp.json({ message: 'OK', items });
}

export async function createItem(config, req, resp) {
  if (typeof req.body.name !== 'string') return resp.json({ message: 'NO_ITEM_NAME' });
  const item = new Item({ name: req.body.name, group: req.group.id });

  try {
    await item.save();
  } catch (err) {
    return resp.json({ message: 'ERR_SAVE_ITEM' });
  }

  return resp.json({ message: 'OK', ...item });
}

export async function addItem(config, req, resp, remove = false) {
  let item = {};

  if (typeof req.body.id !== 'string') return resp.json({ message: 'NO_ITEM_ID' });
  if (typeof req.body.location_id !== 'string') return resp.json({ message: 'NO_LOCATION_ID' });
  if (typeof req.body.amount !== 'number') return resp.json({ message: 'NO_AMOUNT' });

  try {
    item = await Item.findById(req.body.id);
  } catch (err) {
    return resp.json({ message: 'ERR_FIND_ITEM' });
  }

  const addLocation = item.storedAt.find((i) => i.id === req.body.location);
  if (!addLocation) return resp.json({ message: 'LOCATION_NOT_FOUND' });

  addLocation.amount += remove ? -req.body.amount : req.body.amount;
  if (addLocation.amount < 0) return resp.json({ message: 'INVALID_AMOUNT' });

  try {
    await item.save();
  } catch (err) {
    return resp.json({ message: 'ERR_SAVE_ITEM' });
  }

  return resp.json({ message: 'OK', ...item });
}

export async function removeItem(config, req, resp) {
  return exports.addItem(req, resp, true);
}
