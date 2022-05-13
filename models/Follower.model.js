const { Schema, model } = require('mongoose');

const followerSchema = new Schema(
  {
    followedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Follower = model('Follower', followerSchema, 'follower');

module.exports = Follower;
