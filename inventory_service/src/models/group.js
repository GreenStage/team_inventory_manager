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
    const user = this.users.find((u) => u.username === username);
    return user ? resolve(user) : reject(new Error('User not found'));
  });
};

schema.methods.findLocation = function findLocation({_id,name}){
    let location = null;
    if(typeof _id === 'string'){
      location = this.locations.find(l=> l._id.toString() === _id);
    }else if(typeof name === 'string'){
      const namelower = name.toLowerCase();
      location = this.locations.find(l=> l.namelower === namelower);
    }else{
      return null;
    }
    return location;
}

schema.methods.addLocation = async function addLocation(loc){
  return new Promise((resolve,reject) => {
    if(this.findLocation({loc})){
      return reject('Location already exists');
    }else{
      if(!loc.namelower) loc.namelower = loc.name.toLowerCase();
      this.locations.push(loc);
      return this.save().then(resolve());
    }
  });
}

exports.GroupSchema = schema;
export default model('Group', schema);
