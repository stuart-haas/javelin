const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const fns = require('../utils/functions');

module.exports = {
  item: async (req, callback) => {
    try {
      const product = await Product.findById(req.body.id);
      const item = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: parseInt(req.body.quantity),
      };
      callback(item);
    } catch (error) {
      callback(false);
    }
  },
  find: (cart, nItem) => {
    return cart.items.find((item) => {
      return String(item.id) === String(nItem.id);
    });
  },
  add: (cart, item) => {
    cart.items.push(item);
    calculateTotal(cart);
  },
  update: (cart, nItem) => {
    const index = cart.items.findIndex(
      (item) => String(item.id) === String(nItem.id)
    );
    if (index > -1) {
      cart.items.splice(index, 1, nItem);
      calculateTotal(cart);
    }
  },
  remove: (cart, nItem) => {
    const index = cart.items.findIndex(
      (item) => String(item.id) === String(nItem.id)
    );
    if (index > -1) {
      cart.items.splice(index, 1);
      calculateTotal(cart);
    }
  },
  empty: (req, callback) => {
    if (req.session) {
      const cart = new Cart();
      const { items, total, formattedTotal } = cart;
      callback({ items, total, formattedTotal });
    }
  },
  save: async (req, res, cart) => {
    if (req.session) {
      req.session.cart = cart;
      res.json({ success: true, message: 'Product added to cart', cart });
    }
  },
  session: (req) => {
    const cart = new Cart();
    const { items, total, formattedTotal } = cart;
    return req.session.cart || { items, total, formattedTotal };
  },
};

function calculateTotal(cart) {
  cart.total = 0;
  cart.items.forEach((item) => {
    const price = item.price;
    const quantity = item.quantity;
    const total = price * quantity;
    cart.total += total;
  });
  cart.formattedTotal = fns.formatCurrency(cart.total);
}
