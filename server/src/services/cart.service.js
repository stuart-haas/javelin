const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

module.exports = {
  item: async(req, callback) => {
    try {
      const product = await Product.findById(req.body.id);
      const item = { id: product._id, price: product.price, quantity: parseInt(req.body.quantity) };
      callback(item);
    } catch(error) {
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
    const index = cart.items.findIndex((item) => item.id === nItem.id);
    cart.items.splice(index, 1, nItem);
    calculateTotal(cart);
  },
  remove: (cart, nItem) => {
    const index = cart.items.findIndex((item) => item.id === nItem.id);
    cart.items.splice(index, 1);
    calculateTotal(cart);
  },
  empty: (req, callback) => {
    if(req.session) {
      const cart = new Cart();
      const { items, total, formattedTotal } = cart;
      callback({ items, total, formattedTotal });
    }
  },
  save: (req, res, cart) => {
    if(req.session) {
      req.session.cart = cart;
      res.json(cart);
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
  cart.formattedTotal = formatTotal(cart.total);
};

function formatTotal(value) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  return formatter.format(value);
}
