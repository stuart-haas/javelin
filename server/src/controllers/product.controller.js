const Product = require('../models/product.model');

module.exports = {
  findAll: async(req, res, next) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch(error) {
      res.json(error);
    }
  },
  find: async(req, res, next) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      res.json(product);
    } catch(error) {
      res.json(error);
    }
  },
  create: async(req, res, next) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.json(product);
    } catch(error) {
      res.json(error);
    }
  },
  update: async(req, res, next) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      Object.keys(req.body).forEach((key) => {
        if (product[key]) {
          product[key] = req.body[key];
        }
      });
      await product.save();
      res.json(product);
    } catch(error) {
      res.json(error);
    }
  },
  delete: async(req, res, next) => {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndDelete(id);
      res.json(product);
    } catch(error) {
      res.json(error);
    }
  }
};
