const router = require('express').Router();
const userController = require('./user.controller');

router.route('/:userId').get(userController.show);
router.route('/').get(userController.list);
router.route('/').post(userController.create);
router.route('/:userId').put(userController.update);
router.route('/:userId').delete(userController.destroy);
//router.route('/signin').post(userController.signInHandle);
//router.route('/signup').post(userController.signUpHandle);
router.post('/signup', userController.signUpHandle);
router.post('/signin', userController.signInHandle);

module.exports = router;
