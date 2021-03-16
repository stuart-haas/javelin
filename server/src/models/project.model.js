const { Schema, model } = require('mongoose');

const fields = {
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }, 
};

const Project = new Schema(fields, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
});

module.exports = model('Project', Project, 'projects');