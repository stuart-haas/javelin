const { Schema, model } = require('mongoose');
const orderid = require('order-id')(process.env.ORDER_ID_SECRET);

const fields = {
  orderId: {
    type: String,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  shippingProvider: {
    type: String,
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    default: null,
  }],
};

const Order = new Schema(fields, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
});

Order.pre('save', (next) => {
  if(!this.orderId) {
    const id = orderid.generate();
    this.orderId = id;
  }
  next();
});

module.exports = model('Order', Order, 'order');