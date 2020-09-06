const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: {
    type: String,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    min: 6,
    max: 255
    required: true
  },
  responded: {
    type: Boolean,
    default: false,
    required: true
  }
});

// subDocument, schema is not required to be registered
module.exports = recipientSchema;
