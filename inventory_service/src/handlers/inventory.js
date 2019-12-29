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

  return resp.json({ message: 'OK', item, group: req.group });
}

export async function addItem(config, req, resp, next, remove = false) {
  let item = {};

  if (typeof req.params.itemid !== 'string') return resp.json({ message: 'NO_ITEM_ID' });
  if (typeof req.body.amount !== 'number') return resp.json({ message: 'NO_AMOUNT' });
  if (req.body.amount < 0) return resp.json({ message: 'NEGATIVE_AMOUNT' });

  try {
    item = await Item.findById(req.params.itemid);
  } catch (err) {
    return resp.json({ message: 'ERR_FIND_ITEM' });
  }

  let addLocation = req.group.findLocation({_id: req.body.locationid, name: req.body.locationName})

  if(!addLocation){
    try{
      await req.group.addLocation({name: req.body.locationName});
    }catch(err){
      return resp.json({ message: 'ERROR_CREATING_LOCATION' });
    }
    addLocation = req.group.findLocation({name: req.body.locationName});
  }

  if(!addLocation){
    return resp.json({ message: 'INVALID_LOCATION' });
  }

  let locationInItem = item.storedAt.find(l=>l.where.equals(addLocation._id));
  if(!locationInItem){
    item.storedAt.push({
      where: addLocation._id,
      amount: req.body.amount
    });
  }else{
    locationInItem.amount += req.body.amount;
  }
  console.log(addLocation);
  console.log(locationInItem)
  try {
    await item.save();
  } catch (err) {
    return resp.json({ message: 'ERR_SAVE_ITEM' });
  }

  return resp.json({ message: 'OK', item, location: addLocation });
}

export async function removeItem(config, req, resp, next) {
  return exports.addItem(req, resp, next, true);
}
