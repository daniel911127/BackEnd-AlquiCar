const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  /*   {   
    "rol":"admin",
    "name": "daniel",
    "lastname":"moreno",
    "identification":"1032454387",
    "driverLicense":"12330989574",
    "email": "admin1@test.com",
    "password": "admin1234"
} */
  async signUpHandle(req, res) {
    try {
      const userData = req.body;
      const existingUser = await User.findOne({ email: userData.email });

      if (existingUser) {
        throw new Error('El email ya esta registrado');
      }

      const encPassword = await bcrypt.hash(userData.password, 10);

      const user = await User.create({ ...userData, password: encPassword });

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(201).json({
        message: 'User created successfully',
        data: {
          dataUser: {
            rol: user.rol,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            identification: user.identification,
            driverLicense: user.driverLicense,
            email: user.email,
          },
          token,
        },
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'User could not be created', error: error });
    }
  },
  // async signUpHandle(req, res) {
  //   const userData = req.body;
  //   try {
  //     const existingUser = await User.findOne({ email: userData.email });
  //     if (existingUser) {
  //       const encPassword = await bcrypt.hash(userData.password, 10);
  //       const updateUser = await User.findByIdAndUpdate(
  //         existingUser._id,
  //         { ...userData, password: encPassword },
  //         { new: true }
  //       );
  //       const token = jwt.sign({ id: updateUser._id }, process.env.SECRET_KEY, {
  //         expiresIn: 60 * 60 * 24,
  //       });
  //       return res.status(200).json({
  //         message: 'User updated successfully',
  //         data: { token },
  //       });
  //     } else {
  //       const encPassword = await bcrypt.hash(userData.password, 10);
  //       const user = await signUp(userData, encPassword);
  //       const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
  //         expiresIn: 60 * 60 * 24,
  //       });
  //       await transporter.sendMail(welcome(user));
  //       return res
  //         .status(201)
  //         .json({ message: 'User created successfully', data: { token } });
  //     }
  //   } catch (err) {
  //     return res
  //       .status(400)
  //       .json({ message: 'User could not be created', error: err });
  //   }
  // },

  async signInHandle(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      console.log('1111111InputPassword:', password, 'userPassword:', user);
      if (!user) {
        throw new Error('Some of your credentials are invalid');
      }
      console.log('InputPassword:', password, 'userPassword:', user.password);
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('Some of your credentials are invalid');
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      return res.status(200).json({
        message: 'Login successfully',
        data: {
          dataUser: {
            email: user.email,
            rol: user.rol,
            name: user.name,
            lastname: user.lastname,
          },
          token,
        },
      });
    } catch (err) {
      return res
        .status(400)
        .json({ message: 'User could not login', error: err.message });
    }
  },
  async create(req, res) {
    try {
      const data = req.body;

      const user = await User.create(data);
      res.status(201).json({ message: 'user created', data: user });
    } catch (err) {
      res.status(400).json({ message: 'user not created', data: err });
    }
  },
  async list(req, res) {
    try {
      const user = await User.find();
      res.status(200).json({ message: 'Users founds', data: user });
    } catch (err) {
      res.status(400).json({ message: 'Users not founds', data: err });
    }
  },
  async show(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).populate({ path: 'bookings' });
      res.status(200).json({ message: 'user found', data: user });
    } catch (err) {
      res.status(400).json({ message: 'user not found', data: err });
    }
  },
  async update(req, res) {
    try {
      const data = req.body;
      const { userId } = req.params;
      const user = await User.findByIdAndUpdate(userId, data, { new: true });
      res.status(201).json({ message: 'user updated', data: user });
    } catch (err) {
      res.status(400).json({ message: 'user not updated', data: err });
    }
  },
  async destroy(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByIdAndDelete(userId);
      res.status(201).json({ message: 'User deleted', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User not deleted', data: err });
    }
  },
};
