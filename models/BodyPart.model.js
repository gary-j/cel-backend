const { Schema, model, mongoose } = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const bodypartSchema = new Schema(
  {
    name: {
      type: String,
      // unique: true,
      // enum ou api externe ?
      enum: [
        'peau',
        'cheveux',
        'visage',
        'front',
        'oeil',
        'nez',
        'lèvre',
        'menton',
        'joue',
        'oreille',
        'cou',
        'poitrine',
        'sein',
        'ventre',
        'nombril',
        'hanche',
        'fessier',
        'fesse',
        'sexe',
        'penis',
        'vagin',
        'clitoris',
        'cuisse',
        'mollet',
        'pied',
        'orteil',
        'épaule',
        'bras',
        'avant-bras',
        'main',
        'doigt',
      ],
    },
    slug: {
      type: String,
      slug: 'name',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const BodyPart = model('BodyPart', bodypartSchema, 'body_part');

module.exports = BodyPart;
