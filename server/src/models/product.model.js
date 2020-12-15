const { Schema, model } = require('mongoose');
const fns = require('../utils/functions');

const fields = {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: String,
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
};

const Product = new Schema(fields, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
});

Product.pre('save', function() {
  this.slug = fns.slugify(this.name);
  return this;
});

module.exports = model('Product', Product, 'product');