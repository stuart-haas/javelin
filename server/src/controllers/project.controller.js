const Project = require('../models/project.model');

module.exports = {
  findAll: async (req, res) => {
    const user = req.user._id;
    const projects = await Project.find(user);
    res.json(projects);
  },
  find: async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.json(project);
  },
  create: async (req, res) => {
    const user = req.user._id;
    const { body } = req;
    try {
      const project = new Project({...body, user});
      await project.save();
      res.json({ success: true, message: 'Project created', project });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      Object.keys(req.body).forEach((key) => {
        project[key] = req.body[key];
      });
      await project.save();
      res.json({ success: true, message: 'Project updated', project });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Project.findByIdAndDelete(id);
      res.json({ success: true, message: 'Project deleted', category });
    } catch (error) {
      res.status(422).json({ error: true, message: 'Something went wrong' });
    }
  },
};