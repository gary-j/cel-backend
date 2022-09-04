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
    complete: {
      type: Object,
      required: true,
      validate: [
        (object) => {
          //our custom validator, object is the provided object
          let allowedKeys = [
            'citation',
            'film',
            'influenceur',
            'livre',
            'musique',
            'podcast',
            'serie',
            'video',
          ];
          let correctKeys = Object.keys(object).every((key) =>
            allowedKeys.includes(key)
          ); //make sure all keys are inside `allowedKeys`

          // let min = 5;
          // let max = 10;
          // let correctValues = Object.values(object).every(
          //   (value) => value > min && value < max
          // );
          //make sure all values are in correct range

          return correctKeys;
          // && correctValues;
          //return true if keys and values pass validation
        },
        'La clé doit etre un type de ressource autorisé, ex : "livre".',
      ],
      // url: String,
      // url2: String,
      // why: String,
    },

    physicalTransformation: {
      type: Object,
      validate: [
        (object) => {
          let allowedKeys = [
            'bodyPart',
            'treatment',
            'beforeUrl',
            'afterUrl',
            'isSatisfied',
          ];
          let correctKeys = Object.keys(object).every((key) =>
            allowedKeys.includes(key)
          );
          return correctKeys;
        },
        'La clé ne fait pas parti de la liste autorisée, ex : "bodyPart".',
      ],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ressource = model('Ressource', ressourceSchema, 'ressource');

module.exports = Ressource;
