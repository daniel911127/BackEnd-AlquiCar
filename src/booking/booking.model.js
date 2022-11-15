const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
  {
    date: [],
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
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
