const Car = require('../car/car.model');
const User = require('../user/user.model');
const Booking = require('./booking.model');

module.exports = {
  async create(req, res) {
    try {
      const data = req.body;
      const id = req.user;
      const { carId } = req.params;
      const booking = await Booking.create({ ...data, user: id, car: carId });
      const user = await User.findById(id);
      user.bookings.push(booking);
      await user.save({ validateBeforeSave: false });
      const car = await Car.findById(carId);
      car.bookings.push(booking);
      await car.save({ validateBeforeSave: false });
      res.status(201).json({ message: 'booking created', data: booking });
    } catch (err) {
      res.status(400).json({ message: 'booking not created', data: err });
    }
  },
  async list(req, res) {
    try {
      const booking = await Booking.find();
      res.status(200).json({ message: 'bookings founds', data: booking });
    } catch (err) {
      res.status(400).json({ message: 'bookings not founds', data: err });
    }
  },
  async show(req, res) {
    try {
      const { bookingId } = req.params;
      const booking = await Booking.findById(bookingId);
      res.status(200).json({ message: 'booking found', data: booking });
    } catch (err) {
      res.status(400).json({ message: 'booking not found', data: err });
    }
  },
  async update(req, res) {
    try {
      const data = req.body;
      const { bookingId } = req.params;
      const booking = await Booking.findByIdAndUpdate(bookingId, data, {
        new: true,
      });
      res.status(201).json({ message: 'booking updated', data: booking });
    } catch (err) {
      res.status(400).json({ message: 'booking not updated', data: err });
    }
  },
  async destroy(req, res) {
    try {
      const { bookingId } = req.params;
      const booking = await booking.findByIdAndDelete(bookingId);
      res.status(201).json({ message: 'booking deleted', data: booking });
    } catch (err) {
      res.status(400).json({ message: 'booking not deleted', data: err });
    }
  },
};
