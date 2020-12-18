const Product = require('../models/product.model');

module.exports = {
  findAll: async (req, res) => {
    const products = await Product.find();
    res.json(products);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  },
  create: async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });
    await product.save();
    res.json(product);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.json(product);
  },
};
