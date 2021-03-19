const { Schema, model } = require('mongoose');
const { timeToSeconds, timeToDecimal, timeToMinutes, timeToHours, formatTime, timeToHumanReadable } = require('../utils/time');

const fields = {
  name: String,
  duration: Number,
  durationDisplay: String,
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

Tracker.pre('save', function() {
  this.durationDisplay = durationDisplay(this.duration);
});

function durationDisplay(duration) {
  const hours = timeToHours(duration);
  const minutes = timeToMinutes(duration);
  const seconds = timeToSeconds(duration);

  const hoursDisplay = formatTime(hours);
  const minutesDisplay = formatTime(minutes);
  const secondsDisplay = formatTime(seconds);

  return timeToHumanReadable([hoursDisplay, minutesDisplay, secondsDisplay]);
}

module.exports = model('Tracker', Tracker, 'trackers');