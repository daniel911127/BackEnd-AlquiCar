const router = require('express').Router();
const carController = require('./car.controller');

router.route('/:carId').get(carController.show);
router.route('/').get(carController.list);
router.route('/').post(carController.create);
router.route('/:carId').put(carController.update);
router.route('/:carId').delete(carController.destroy);

module.exports = router;
