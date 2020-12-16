const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); 

const fields = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  avatar: String,
};

const User = new Schema(fields, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
});

User.plugin(passportLocalMongoose); 

module.exports = model('User', User, 'user');