const Comment = require('./comments.model');

module.exports = {
  async create(req, res) {
    try {
      const data = req.body;

      const comment = await Comment.create(data);
      res.status(201).json({ message: 'comment created', data: comment });
    } catch (err) {
      res.status(400).json({ message: 'comment not created', data: err });
    }
  },
  async list(req, res) {
    try {
      const comment = await Comment.find();
      res.status(200).json({ message: 'comments founds', data: comment });
    } catch (err) {
      res.status(400).json({ message: 'comments not founds', data: err });
    }
  },
  async show(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await Comment.findById(commentId);
      res.status(200).json({ message: 'comment found', data: comment });
    } catch (err) {
      res.status(400).json({ message: 'car not found', data: err });
    }
  },
  async update(req, res) {
    try {
      const data = req.body;
      const { commentId } = req.params;
      const comment = await Comment.findByIdAndUpdate(commentId, data, {
        new: true,
      });
      res.status(201).json({ message: 'comment updated', data: comment });
    } catch (err) {
      res.status(400).json({ message: 'comment not updated', data: err });
    }
  },
  async destroy(req, res) {
    try {
      const { commentId } = req.params;
      const comment = await Comment.findByIdAndDelete(commentId);
      res.status(201).json({ message: 'comment deleted', data: comment });
    } catch (err) {
      res.status(400).json({ message: 'comment not deleted', data: err });
    }
  },
};
