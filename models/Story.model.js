const { Schema, model, mongoose } = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const storySchema = new Schema(
  {
    writter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    theme: {
      type: Schema.Types.ObjectId,
      ref: 'Theme',
      required: true,
    },
    title: { type: String, maxlength: 150 },
    slugTitle: {
      type: String,
      slug: 'title',
    },
    content: {
      type: String,
      required: true,
    },
    professionalConsulted: {
      type: Schema.Types.ObjectId,
      ref: 'Professional',
    },
    ressource: {
      type: Schema.Types.ObjectId,
      ref: 'Ressource',
    },
    isAnonym: Boolean,
    physicalTransformation: {
      isSelected: Boolean,
      bodyPart: {
        type: Schema.Types.ObjectId,
        ref: 'BodyPart',
      },
      treatment: String,
      beforePictureUrl: String,
      beforePictureName: String,
      afterPictureUrl: String,
      afterPictureName: String,
      isSatisfied: Boolean,
    },
    comments: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    isReported: {
      type: Boolean,
      default: false,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Story = model('Story', storySchema, 'story');

module.exports = Story;
