const mongoose = require('mongoose');
const { Schema } = mongoose; // (Schema = mongoose.Schema) - destructuring

const userSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    default: 0,
    min: 1,
    max: 255,
    required: true
  }
});

mongoose.model('users', userSchema);
