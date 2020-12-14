const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); 

const fields = {
  username: {
    type: String,
    required: true,
  },
}

const UserSchema = new Schema(fields, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
});

UserSchema.plugin(passportLocalMongoose); 

module.exports = model('User', UserSchema, 'user');