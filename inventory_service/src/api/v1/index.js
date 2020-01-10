import express from 'express';
import logger from 'morgan';
import routes from './routes';
import cors from 'cors';

export default function API(config){
  const app = express();
  app.use(logger('dev'));
  app.use(cors());
  app.disable('x-powered-by');
  app.enable('trust proxy');
  app.use(routes(config));

  app.get('/ping', (req, res) => {
    res.send('pong');
  });

  app.use((err, req, resp, next) => {
    console.log(err)
    if (err.name === 'UnauthorizedError') {
      return resp.status(401).json({ message: 'INVALID_TOKEN' });
    }
    return next();
  });

  return app;
}