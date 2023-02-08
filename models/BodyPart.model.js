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
        'Bras',
        'Buste',
        'Cernes',
        'Cheveux',
        'Cou',
        'Dents & Gencives',
        'Dos',
        'Fesses',
        'Hanches',
        'Jambes',
        'Lèvres',
        'Mâchoire',
        'Mains',
        'Menton',
        'Nez',
        'Oreilles',
        'Organes génitaux féminins',
        'Organes génitaux masculins',
        'Peau',
        'Pieds',
        'Seins',
        'Silhouette',
        'Sourcils',
        'Ventre',
        'Visage',
        'Yeux',
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
