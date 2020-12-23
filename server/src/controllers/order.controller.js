const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

module.exports = {
  admin: {
    findAll: async (req, res) => {
      const orders = await Order.find()
        .populate({
          path: 'items',
          populate: {
            path: 'product',
            select: 'name sku price image',
            model: 'Product',
          },
        })
        .populate('user')
        .exec();
      res.json(orders);
    },
  },
  findAll: async (req, res) => {
    const user = req.params.user;
    const orders = await Order.find({ user })
      .populate({
        path: 'items',
        populate: {
          path: 'product',
          model: 'Product',
        },
      })
      .populate('user')
      .exec();
    res.json(orders);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate({
        path: 'items',
        populate: {
          path: 'product',
          model: 'Product',
        },
      })
      .populate('user')
      .exec();
    res.json(order);
  },
  create: async (req, res) => {
    const user = req.user._id;
    const items = req.session.cart.items.map((item) => {
      return { product: item.id, quantity: item.quantity };
    });
    try {
      const order = new Order({ user, items });
      await order.save();
      req.session.cart = new Cart();
      res.json({ success: true, message: 'Order created', order });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
  update: async (req, res) => {},
  deleteAll: async (req, res) => {
    await Order.deleteMany();
    res.json({ error: true, message: 'Orders deleted' });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    await order.deleteOne();
    res.json({ success: true, message: 'Order deleted', order });
  },
  findMine: async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate({
        path: 'items',
        populate: {
          path: 'product',
          model: 'Product',
        },
      })
      .exec();
    res.json(order);
  },
};
