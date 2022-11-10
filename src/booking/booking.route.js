const router = require('express').Router();
const bookingController = require('./booking.controller');
const { authenticate } = require('../utils/Auth');

//router.route('/:bookingId').get(bookingController.show);
router.route('/').get(bookingController.list);
//router.route('/:bookingId').put(bookingController.update);
//router.route('/:bookingId').delete(bookingController.destroy);

router.post('/', authenticate, bookingController.create);

module.exports = router;
