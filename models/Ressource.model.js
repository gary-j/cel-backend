const { Schema, model } = require('mongoose');

const ressourceSchema = new Schema(
  {
    relatedStory: {
      type: Schema.Types.ObjectId,
      ref: 'Story',
    },
    mediaType: {
      type: String,
      enum: [
        'citation',
        'film',
        'influenceur',
        'livre',
        'musique',
        'podcast',
        'serie',
      ],
      maxlength: 1,
    },
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: String,
    author: String,
    url: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ressource = model('Ressource', ressourceSchema, 'ressource');

module.exports = Ressource;
