import express from 'express';
import groupActionRouter from './groupactions';
import itemRouter from './item';
import uploadsRouter from './uploads';
import staticRoute from './static';
import enterRoutes from './enter';

export default function routes(config) {
  const router = express.Router();
  
  router.use('/group/:groupname/upload',uploadsRouter(config));
  router.use('/group/:groupname/action', groupActionRouter(config));
  router.use('/group/:groupname/inventory', itemRouter(config));
  
  router.use('/enter/',enterRoutes(config));
  router.use('/',staticRoute(config));

  return router;
}
