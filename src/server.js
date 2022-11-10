require('dotenv').config();
const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const morgan = require('morgan');
const adminRouter = require('./admin/admin.route');
const userRouter = require('./user/user.route');
const carRouter = require('./car/car.route');
const commentRouter = require('./comments/comments.route');
const bookingRouter = require('./booking/booking.route');

const app = express();
const port = process.env.PORT || 8080;
connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/car', carRouter);
app.use('/comment', commentRouter);
app.use('/booking', bookingRouter);

app.listen(port, () => {
  console.log(`server run at http://localhost:${port}`);
});
