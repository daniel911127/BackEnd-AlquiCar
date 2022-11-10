const Car = require('./car.model');

module.exports = {
  async create(req, res) {
    try {
      const data = req.body;

      const car = await Car.create(data);
      res.status(201).json({ message: 'car created', data: car });
    } catch (err) {
      res.status(400).json({ message: 'car not created', data: err });
    }
  },
  async list(req, res) {
    try {
      const car = await Car.find();
      res.status(200).json({ message: 'cars founds', data: car });
    } catch (err) {
      res.status(400).json({ message: 'cars not founds', data: err });
    }
  },
  async show(req, res) {
    try {
      const { carId } = req.params;
      const car = await Car.findById(carId);
      res.status(200).json({ message: 'car found', data: car });
    } catch (err) {
      res.status(400).json({ message: 'car not found', data: err });
    }
  },
  async update(req, res) {
    try {
      const data = req.body;
      const { carId } = req.params;
      const car = await Car.findByIdAndUpdate(carId, data, { new: true });
      res.status(201).json({ message: 'car updated', data: car });
    } catch (err) {
      res.status(400).json({ message: 'car not updated', data: err });
    }
  },
  async destroy(req, res) {
    try {
      const { carId } = req.params;
      const car = await Car.findByIdAndDelete(carId);
      res.status(201).json({ message: 'car deleted', data: car });
    } catch (err) {
      res.status(400).json({ message: 'car not deleted', data: err });
    }
  },
};
