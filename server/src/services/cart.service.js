const Product = require('../models/product.model');

function Cart() {
  this.items = [];
  this.total = 0;
  this.count = 0;
}

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
  },
  update: (cart, nItem) => {
    const index = cart.items.findIndex((item) => item.id === nItem.id);
    cart.items.splice(index, 1, nItem);
  },
  remove: (cart, nItem) => {
    const index = cart.items.findIndex((item) => item.id === nItem.id);
    cart.items.splice(index, 1);
  },
  save: (req, res, cart) => {
    calculateTotals(cart);
    req.session.cart = cart;
    req.session.save((error) => {
      if (error) return res.json(error);
      const cart = req.session.cart;
      res.json(cart);
    });
  },
  empty: (req, cart) => {
    if(req.session) {
      req.session.cart.items = [];
      req.session.cart.total = 0;
      req.session.cart.count = 0;
    }
  },
  session: (req) => {
    return req.session.cart || new Cart();
  },
};

function calculateTotals(cart) {
  cart.total = 0;
  cart.count = 0;
  cart.items.forEach((item) => {
    const price = item.price;
    const quantity = item.quantity;
    const total = price * quantity;
    cart.total += total;
    cart.count += quantity;
  });
};
