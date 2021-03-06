import express from 'express';
import bodyParser from 'body-parser';

import { signup, signin, newGroup } from '../handlers';

export default function routes(config) {
  const router = express.Router();
  router.use(bodyParser.json());

  router.post('/signin', signin.bind(null, config));
  router.post('/signup', signup.bind(null, config));
  router.post('/newgroup', newGroup.bind(null, config));
  return router;
}
