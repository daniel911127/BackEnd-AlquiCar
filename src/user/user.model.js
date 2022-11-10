const { Schema, model, models } = require('mongoose');

const emailRegex = new RegExp('[a-zA-Z0-9]{5,}@[a-z]{3,7}.com');

const userSchema = new Schema(
  {
    rol: {
      type: String,
      enum: ['user', 'admin'],
      required: [true, 'el campo rol es requerido'],
    },
    name: {
      type: String,
      required: [true, 'el campo nombre es requerido'],
    },
    lastname: {
      type: String,
      required: [true, 'el campo apellido es requerido'],
    },
    identification: {
      type: Number,
      required: [true, 'el campo identificación es requerido'],
    },
    driverLicense: {
      type: Number,
      required: [true, 'el campo licencia de conducción es requerido'],
    },
    email: {
      type: String,
      required: [true, 'el campo correo es requerido'],
      match: [emailRegex, 'el email no es valido'],
      validate: [
        {
          async validator(value) {
            try {
              const user = await models.User.findOne({ email: value });
              return !user;
            } catch {
              return false;
            }
          },
          message: 'ya existe un usuario con ese correo',
        },
      ],
    },
    password: {
      type: String,
      required: [true, 'el campo contraseña es requerido'],
      minlenght: [8, 'la contraseña debe tener minimo 8 caracteres'],
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

const User = model('User', userSchema);

module.exports = User;
