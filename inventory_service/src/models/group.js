import { Schema, model } from 'mongoose';
import UserSchema from './user';
import LocationSchema from './location';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  picurl: {
    type: String,
    default: 'default_group_pic.png',
  },
  users: [UserSchema],
  locations: [LocationSchema],
  invite_codes: [{
    code: Schema.Types.ObjectId,
    expiresAt: Schema.Types.Date,
  }],
});

schema.methods.findUser = async function findUser(username) {
  return new Promise((resolve, reject) => {
    const user = this.users.filter((u) => u.username === username);
    return user ? resolve(user) : reject(new Error('User not found'));
  });
};

exports.GroupSchema = schema;
export default model('Group', schema);
