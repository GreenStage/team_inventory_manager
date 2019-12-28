import { Item } from '../models';
import {Types} from 'mongoose';

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

export async function addItem(config, req, resp, next, remove = false) {
  let item = {};

  if (typeof req.body._id !== 'string') return resp.json({ message: 'NO_ITEM_ID' });
  if (typeof req.body.location !== 'string') return resp.json({ message: 'NO_LOCATION' });
  if (typeof req.body.amount !== 'number') return resp.json({ message: 'NO_AMOUNT' });
  if (req.body.amount < 0) return resp.json({ message: 'NEGATIVE_AMOUNT' });
  try {
    item = await Item.findById(req.body._id);
  } catch (err) {
    return resp.json({ message: 'ERR_FIND_ITEM' });
  }

  const locId = Types.ObjectId(req.body.location);

  let addLocation = item.storedAt.find((i) => i.where.equals(locId));
  if (!addLocation){
    const newlocation = req.group.locations.find((i) => i._id.equals(locId));
    if(!newlocation){
      return resp.json({ message: 'LOCATION_NOT_FOUND' });
    }
    addLocation = {where:newlocation._id, amount: 0};
    const l = item.storedAt.push(addLocation);
    addLocation = item.storedAt[l-1];
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

export async function removeItem(config, req, resp, next) {
  return exports.addItem(req, resp, next, true);
}
