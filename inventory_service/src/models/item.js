import { Schema, model } from 'mongoose';

const schema = new Schema({
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
  picurl: {
    type: String,
    default: 'default_group_pic.png',
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
}, { timestamps: true });

export default model('Item', schema);
