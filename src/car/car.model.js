const { Schema, model } = require('mongoose');

const carSchema = new Schema(
  {
    plate: {
      type: String,
      required: [true, 'el campo es requerido'],
    },
    transmition: {
      type: String,
      required: [true, 'el campo es requerido'],
    },
    bodyWork: {
      type: String,
      required: [true, 'el campo es requerido'],
    },
    brand: {
      type: String,
      required: [true, 'el campo es requerido'],
    },
    model: {
      type: String,
      required: [true, 'el campo es requerido'],
    },
    price: {
      type: Number,
      required: [true, 'el campo es requerido'],
    },
    availability: {
      type: Boolean,
      default: true,
      required: [true, 'el campo es requerido'],
    },
    bookings: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Booking',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Car = model('Car', carSchema);

module.exports = Car;
