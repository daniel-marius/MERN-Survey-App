const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./recipient');

const surveySchema = new Schema({
  title: {
    type: String,
    min: 1,
    max: 255,
    required: true
  },
  body: {
    type: String,
    min: 1,
    max: 255,
    required: true
  },
  subject: {
    type: String,
    min: 1,
    max: 255,
    required: true
  },
  recipients:[RecipientSchema],
  imageUrl: {
    type: String,
    min: 8,
    required: true
  },
  yes: {
    type: Number,
    default: 0,
    required: true
  },
  no: {
    type: Number,
    default: 0,
    required: true
  },
  // relationship between two schemas
  _user: {
    type: Schema.Types.ObjectId, // id of the user
    ref: 'User' // belongs to user collection
  },
  dateSent: {
    type: Date,
    required: true
  },
  lastResponded: {
    type: Date,
    required: true
  }
});

mongoose.model('surveys', surveySchema);
