const service = require('../services/cart.service');
const Product = require('../models/product.model');

module.exports = {
  merge: async (req, res) => {
    const cart = service.session(req);
    const ids = cart.items.map((item) => {
      return item.id;
    });
    const products = await Product.find().where('_id').in(ids);
    const productsJSON = JSON.parse(JSON.stringify(products));
    let merged = [];

    for (let i = 0; i < productsJSON.length; i++) {
      merged.push({
        ...productsJSON[i],
        ...cart.items.find((item) => item.id === productsJSON[i]._id),
      });
    }

    res.json(merged);
  },
  get: async (req, res) => {
    const cart = service.session(req);
    res.json(cart);
  },
  add: (req, res) => {
    const cart = service.session(req);
    service.item(req, (nItem) => {
      if (nItem) {
        const item = service.find(cart, nItem);
        if (!item) {
          service.add(cart, nItem);
        } else {
          service.update(cart, nItem);
        }
        service.save(req, res, cart);
      } else {
        res.status(404).json({ error: true, message: 'Product not found' });
      }
    });
  },
  remove: (req, res) => {
    const cart = service.session(req);
    service.item(req, (item) => {
      service.remove(cart, item);
      service.save(req, res, cart);
    });
  },
  empty: (req, res) => {
    service.empty(req, (cart) => {
      service.save(req, res, cart);
    });
  },
};
