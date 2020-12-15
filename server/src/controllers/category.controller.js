const Category = require('../models/category.model');

module.exports = {
  findAll: async(req, res, next) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch(error) {
      res.json(error);
    }
  },
  find: async(req, res, next) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id);
      res.json(category);
    } catch(error) {
      res.json(error);
    }
  },
  create: async(req, res, next) => {
    try {
      const product = new Category(req.body);
      await product.save();
      res.json(product);
    } catch(error) {
      res.json(error);
    }
  },
  update: async(req, res, next) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id);
      Object.keys(req.body).forEach((key) => {
        if (category[key]) {
          category[key] = req.body[key];
        }
      });
      await category.save();
      res.json(category);
    } catch(error) {
      res.json(error);
    }
  },
  delete: async(req, res, next) => {
    const { id } = req.params;
    try {
      const product = await Category.findByIdAndDelete(id);
      res.json(product);
    } catch(error) {
      res.json(error);
    }
  }
};
