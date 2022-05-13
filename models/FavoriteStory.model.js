const { Schema, model } = require('mongoose');

const favoriteStorySchema = new Schema(
  {
    story: { type: Schema.Types.ObjectId, ref: 'Story', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const FavoriteStory = model('FavoriteStory', favoriteStorySchema);

module.exports = FavoriteStory;
