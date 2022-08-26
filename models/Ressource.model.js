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
        'video',
      ],
    },
    theme: {
      type: Schema.Types.ObjectId,
      ref: 'Theme',
    },
    fans: [{ type: Schema.Types.ObjectId, ref: 'FanRessource' }],
    title: String,
    author: String,
    actor1: String,
    actor2: String,
    artist: String,
    influencer: String,
    url: String,
    url2: String,
    why: String,
    complete: Object,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ressource = model('Ressource', ressourceSchema, 'ressource');

module.exports = Ressource;
