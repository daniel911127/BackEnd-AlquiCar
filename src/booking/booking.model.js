const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
  {
    date: [],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Car',
      required: true,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    comments: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model('Booking', bookingSchema);

module.exports = Booking;
