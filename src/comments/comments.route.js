const router = require('express').Router();
const commentController = require('./comments.controller');

router.route('/:commentId').get(commentController.show);
router.route('/').get(commentController.list);
router.route('/').post(commentController.create);
router.route('/:commentId').put(commentController.update);
router.route('/:commentId').delete(commentController.destroy);

module.exports = router;
