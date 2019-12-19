import { Schema, model } from 'mongoose';

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    index: { unique: true },
  },
  amount: Number,
  storedAt: [{
    where: { type: Schema.ObjectId, ref: 'Location' },
    amount: Number,
  }],
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
}, { timestamps: true });

export default model('Item', schema);
