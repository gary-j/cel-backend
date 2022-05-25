const { Schema, model, mongoose } = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const themeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      slug: 'name',
    },
    svg_title: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Theme = model('Theme', themeSchema, 'theme');

module.exports = Theme;
