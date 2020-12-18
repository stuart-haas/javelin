const Category = require('../models/category.model');

module.exports = {
  findAll: async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.json(category);
  },
  create: async (req, res) => {
    const product = new Category(req.body);
    await product.save();
    res.json(product);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    Object.keys(req.body).forEach((key) => {
      category[key] = req.body[key];
    });
    await category.save();
    res.json(category);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const product = await Category.findByIdAndDelete(id);
    res.json(product);
  },
};
