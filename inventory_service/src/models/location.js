import { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});


export { schema as default };
