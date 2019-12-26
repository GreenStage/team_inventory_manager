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
      namelower: {
        $regex: `.*${searchQuery.toLowerCase()}.*`,
      },
    }).sort({ name: 1 });
  } catch (err) {
    return resp.json({ message: 'NO_ITEM_FOUND' });
  }

  return resp.json({ message: 'OK', items });
}

export async function createItem(config, req, resp) {
  if (typeof req.body.name !== 'string') return resp.json({ message: 'NO_ITEM_NAME' });
  const item = new Item({ name: req.body.name, namelower:req.body.name,
     group: req.group.id, picurl: req.body.picurl});

  try {
    await item.save();
  } catch (err) {
    return resp.json({ message: 'ERR_SAVE_ITEM' });
  }

  return resp.json({ message: 'OK', item });
}

export async function addItem(config, req, resp, remove = false) {
  let item = {};

  if (typeof req.body._id !== 'string') return resp.json({ message: 'NO_ITEM_ID' });
  if (typeof req.body.where !== 'string') return resp.json({ message: 'NO_WHERE' });
  if (typeof req.body.amount !== 'number') return resp.json({ message: 'NO_AMOUNT' });
  if (req.body.amount < 0) return resp.json({ message: 'NEGATIVE_AMOUNT' });
  try {
    item = await Item.findById(req.body._id);
  } catch (err) {
    return resp.json({ message: 'ERR_FIND_ITEM' });
  }

  const addLocation = item.storedAt.find((i) => i.where === req.body.where);
  if (!addLocation){
    const newlocation = req.group.locations.find((i) => i.where === req.body.where);
    if(!newlocation){
      return resp.json({ message: 'LOCATION_NOT_FOUND' });
    }
    item.storedAt.push({
      where: newlocation._id,
      amount: req.body.amount
    })
  }

  addLocation.amount += remove ? -req.body.amount : req.body.amount;
  if (addLocation.amount < 0) return resp.json({ message: 'INVALID_AMOUNT' });

  try {
    await item.save();
  } catch (err) {
    return resp.json({ message: 'ERR_SAVE_ITEM' });
  }

  return resp.json({ message: 'OK', item });
}

export async function removeItem(config, req, resp) {
  return exports.addItem(req, resp, true);
}
