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
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
      price: Number,
      total: Number,
    },
  ],
  subtotal: {
    type: Number,
    default: 0,
  },
  shipping: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  shippingOption: {
    type: String,
    default: 'Ground',
  },
  shippingProvider: {
    type: String,
    default: 'Shipping Provider',
  },
  status: {
    type: String,
    enum: ['authorized', 'shipped', 'completed', 'canceled', 'refunded'],
    default: 'authorized',
  },
  note: String,
};

const Order = new Schema(fields, {
  timestamps: true,
  toObject: {
    virtuals: true,
  },
});

Order.pre('save', async function () {
  if (!this.orderId) {
    const id = orderid.generate();
    this.orderId = id;
  }

  const order = await this.populate({
    path: 'items',
    populate: {
      path: 'product',
      model: 'Product',
    },
  }).execPopulate();

  const items = order.items.map((item) => {
    const { product, quantity } = item;
    const total = product.price * quantity;
    item.price = product.price;
    item.total = total;
    this.subtotal += total;
    this.total = this.subtotal + this.shipping;
    return item;
  });
  this.items = items;

  return this;
});

module.exports = model('Order', Order, 'order');
