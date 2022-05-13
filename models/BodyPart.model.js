const { Schema, model, mongoose } = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const bodypartSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      // enum ou api externe ?
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

const BodyPart = model('BodyPart', bodypartSchema);

module.exports = BodyPart;
