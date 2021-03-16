const Tracker = require('../models/tracker.model');

module.exports = {
  findAll: async (req, res) => {
    const user = req.user._id;
    const trackers = await Tracker.find({user});
    res.json(trackers);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const tracker = await Tracker.findById(id);
    res.json(tracker);
  },
  create: async (req, res) => {
    const user = req.user._id;
    const { body } = req;
    try {
      const tracker = new Tracker({...body, user});
      await tracker.save();
      res.json({ success: true, message: 'Tracker created', tracker });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    try {
      const tracker = await Tracker.findById(id);
      Object.keys(req.body).forEach((key) => {
        tracker[key] = req.body[key];
      });
      await tracker.save();
      res.json({ success: true, message: 'Tracker updated', tracker });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Tracker.findByIdAndDelete(id);
      res.json({ success: true, message: 'Tracker deleted', category });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
};