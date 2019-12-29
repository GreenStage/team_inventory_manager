import express from 'express';
import bodyParser from 'body-parser';
import * as handlers from '../handlers';
import auth from '../middlewares';
export default function routes(config) {
  const router = express.Router();

  router.use(bodyParser.json());
  router.use(auth.bind(null, config));

  router.get('/createcode', handlers.createGroupCode.bind(null, config));
  router.get('/restoresession',handlers.getGroup.bind(null, config));
  return router;
}
