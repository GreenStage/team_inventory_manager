import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  namelower:{
	type: String,
    required: true,
    index: { unique: true },
  },
  amount: Number,
  storedAt: [{
    where: { type: Schema.ObjectId, ref: 'Location',
    required: true, },
    amount: Number,
  }],
  picurl: {
    type: String,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
}, { timestamps: true });

function setLowerName(next){
  this.namelower = this.name.toLowerCase();
  next();
}

schema.pre('updateOne', setLowerName);
schema.pre('save', setLowerName);
export default model('Item', schema);
