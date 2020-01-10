import express from 'express';

export default function routes(config) {
  const router = express.Router();
  router.use('/',express.static(__dirname + '/../../public'));
  return router;
}
    