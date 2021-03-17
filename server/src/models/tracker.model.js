const { Schema, model } = require('mongoose');

const fields = {
  name: String,
  time: String,
  rate: Number,
  complete: Boolean,
  project: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }, 
};

const Tracker = new Schema(fields, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
});

module.exports = model('Tracker', Tracker, 'trackers');