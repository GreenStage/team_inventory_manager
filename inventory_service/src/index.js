import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

const options = {
  PORT: process.env.PORT || 443,
  SIGN_KEY: process.env.SIGN_KEY || 'SHOULD_DEFINE_ENV_SIGN_KEY',
  SESSION_KEEP_ALIVE: process.env.SESSION_KEEP_ALIVE || '10d',
  MONGO_URL: process.env.MONGODB_URI || 'SHOULD_DEFINE_ENV_MONGO_URL',
};

mongoose.connect(options.MONGO_URL)
  .then(() => {
    const app = express();
    app.use(logger('dev'));
    app.use(cors());
    app.disable('x-powered-by');
    app.enable('trust proxy');
    app.use(routes(options));

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

    app.listen(options.PORT, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Listening on port: ${options.PORT}.`);
        }
      });
  }).catch((err) => console.log(err));
