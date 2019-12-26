import { Schema } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  namelower:{
    type: String,
    required:true
  },
  address: {
    type: String,
  },
});

export { schema as default };
