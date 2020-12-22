const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

module.exports = {
  findAll: async (req, res) => {
    const orders = await Order.find()
      .populate({
        path: 'products',
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
        path: 'products',
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
    const products = req.session.cart.items.map((item) => {
      return { product: item.id, quantity: item.quantity };
    });
    const { total } = req.session.cart;
    try {
      const order = new Order({ user, products, total });
      await order.save();
      req.session.cart = new Cart();
      res.json({ success: true, message: 'Order created', order });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
  update: async (req, res) => {},
  deleteAll: async (req, res) => {
    const order = await Order.deleteMany();
    res.json(order);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    res.json({ success: true, message: 'Order deleted', order });
  },
};
