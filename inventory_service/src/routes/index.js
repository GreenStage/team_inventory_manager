import express from 'express';
import groupSessionRouter from './groupsession';
import { signup, signin, newGroup } from '../handlers';

export default function routes(config) {
  const router = express.Router();

  router.post('/signin', signin).bind(null, config);
  router.post('/signup', signup).bind(null, config);
  router.post('/newgroup', newGroup).bind(null, config);
  router.use('/group/:groupname', groupSessionRouter(config));
  return router;
}
