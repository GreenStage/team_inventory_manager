import express from 'express';
import bodyParser from 'body-parser';
import * as handlers from '../handlers';
import auth from '../middlewares';

export default function routes(config) {
  const router = express.Router();

  router.use(bodyParser.json());
  router.use(auth.bind(null, config));

  router.get('/', handlers.listInventory.bind(null, config));
  router.post('/:itemid/add', handlers.addItem.bind(null, config));
  router.post('/create', handlers.createItem.bind(null, config));
  router.get('/search', handlers.searchItem.bind(null, config));
  return router;
}
