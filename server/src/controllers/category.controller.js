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
    const category = new Category(req.body);
    await category.save();
    res.json({ success: true, message: 'Category created', category });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    Object.keys(req.body).forEach((key) => {
      category[key] = req.body[key];
    });
    await category.save();
    res.json({ success: true, message: 'Category updated', category });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.json({ success: true, message: 'Category deleted', category });
  },
};
