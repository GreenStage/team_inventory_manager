import mongoose from 'mongoose';
import models from './models';
import cloudinary from 'cloudinary';
import API from './api/v1';

const options = {
  PORT: process.env.PORT || 8000,
  SIGN_KEY: process.env.SIGN_KEY || 'SHOULD_DEFINE_ENV_SIGN_KEY',
  SESSION_KEEP_ALIVE: process.env.SESSION_KEEP_ALIVE || '10d',
  MONGO_URL: process.env.MONGODB_URI || 'SHOULD_DEFINE_ENV_MONGO_URL',
  imageHost: cloudinary,
  models: models
};

const app = API(options);

mongoose.connect(options.MONGO_URL)
  .then(() => {

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
