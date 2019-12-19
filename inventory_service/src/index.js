import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import spdy from 'spdy';
import fs from 'fs';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes';

const PORT = 8000;

const options = {
  PORT: process.env.PORT || 8000,
  SIGN_KEY: process.env.SIGN_KEY || 'SHOULD_DEFINE_ENV_SIGN_KEY',
  SESSION_KEEP_ALIVE: process.env.SESSION_KEEP_ALIVE || '1d',
  MONGO_URL: process.env.MONGO_URL || 'SHOULD_DEFINE_ENV_MONGO_URL',
  key: fs.readFileSync(`${__dirname}/../server.key`),
  cert: fs.readFileSync(`${__dirname}/../server.crt`),
};

mongoose.connect(options.MONGO_URL)
  .then(() => {
    const app = express();
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(cors());
    app.disable('x-powered-by');
    app.enable('trust proxy');
    app.use(routes(options));

    app.get('/ping', (req, res) => {
      res.send('pong');
    });

    app.use((err, req, resp, next) => {
      if (err.name === 'UnauthorizedError') {
        return resp.status(401).json({ message: 'INVALID_TOKEN' });
      }
      return next();
    });

    spdy.createServer(options, app)
      .listen(PORT, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Listening on port: ${PORT}.`);
        }
      });
  }).catch((err) => console.log(err));
