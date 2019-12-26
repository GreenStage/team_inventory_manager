import express from 'express';
import * as handlers from '../handlers';
import auth from '../middlewares';

export default function routes(config) {
  const router = express.Router();

  router.use(auth.bind(null, config));
  router.get('/inventory', handlers.listInventory.bind(null, config));
  router.get('/inventory/search', handlers.searchItem.bind(null, config));
  router.post('/inventory/add', handlers.addItem.bind(null, config));
  router.post('/inventory/create', handlers.createItem.bind(null, config));
  router.get('/createcode', handlers.createGroupCode.bind(null, config));

  router.post('/locations', handlers.addLocation.bind(null, config));
  router.get('/locations', handlers.listLocations.bind(null, config));

  router.get('/',handlers.getGroup.bind(null, config));
  return router;
}
