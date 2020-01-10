import express from 'express';
import formData from 'express-form-data'
import * as handlers from '../handlers';
import auth from '../middlewares';

export default function routes(config) {
  const router = express.Router();
  router.use(auth.bind(null, config));
  router.use(formData.parse());

  router.post('/pic', handlers.uploadPic.bind(null, config));
  return router;
}
