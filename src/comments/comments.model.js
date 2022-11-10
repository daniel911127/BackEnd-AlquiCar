const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    message: String,
    calification: Number,
    booking: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
