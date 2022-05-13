const { Schema, model } = require('mongoose');

const thumbOnCommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: true,
    },
    isUp: {
      type: Boolean,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const ThumbOnComment = model('ThumbOnComment', thumbOnCommentSchema);

module.exports = ThumbOnComment;
