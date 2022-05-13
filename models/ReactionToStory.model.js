const { Schema, model, mongoose } = require('mongoose');

const reactionToStorySchema = new Schema(
  {
    story: { type: Schema.Types.ObjectId, ref: 'Story', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reaction: {
      type: String,
      enum: ['like', 'same', 'solidarity', 'wow', 'plume'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReactionToStory = model(
  'ReactionToStory',
  reactionToStorySchema,
  'reaction_to_story'
);

module.exports = ReactionToStory;
