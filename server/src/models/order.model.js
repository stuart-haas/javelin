const { Schema, model } = require('mongoose');
const orderid = require('order-id')(process.env.ORDER_ID_SECRET);

const fields = {
  orderId: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  subtotal: {
    type: Number,
  },
  shipping: {
    type: Number,
  },
  total: {
    type: Number,
  },
  shippingProvider: {
    type: String,
  },
  status: {
    type: String,
    enum: ['authorized', 'shipped', 'completed', 'canceled', 'refunded'],
    default: 'authorized',
  },
};

const Order = new Schema(fields, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
});

Order.pre('save', function () {
  if (!this.orderId) {
    const id = orderid.generate();
    this.orderId = id;
  }
  return this;
});

module.exports = model('Order', Order, 'order');
