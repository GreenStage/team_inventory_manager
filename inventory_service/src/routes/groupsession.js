import express from 'express';
import * as handlers from '../handlers';
import auth from '../middlewares';

export default function routes(config) {
  const router = express.Router();

  router.use(auth.bind(null, config));
  router.get('/inventory', handlers.listInventory.bind(null, config));
  router.get('/inventory/search', handlers.searchItem.bind(null, config));
  router.post('/inventory/', handlers.addItem.bind(null, config));
  router.get('/createcode', handlers.createGroupCode.bind(null, config));
  return router;
}
