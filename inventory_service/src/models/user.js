import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picurl: {
    type: String,
    default: 'default_user_pic.png',
  },
});

function hashPw(next) {
  if (!this.isModified('password')) return next();
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    return bcrypt.hash(this.password, salt, (err2, hash) => {
      if (err2) return next(err2);
      this.password = hash;
      return next();
    });
  });
}

schema.pre('save', hashPw);
schema.pre('updateOne', hashPw);

schema.methods.matchPassword = async function matchFnc(other) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(other, this.password, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

export { schema as default };
