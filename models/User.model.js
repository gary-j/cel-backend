const { Schema, model, mongoose } = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    lastname: {
      type: String,
      required: true,
      default: null,
    },
    firstname: {
      type: String,
      required: true,
      default: null,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      trim: true,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      trim: true,
    },
    profilePictureUrl: String,
    biography: {
      type: String,
      maxlength: 2200,
    },
    selectedThemes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Theme',
        maxlength: 3,
        required: true,
      },
    ],
    mostActiveThemes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Theme',
        maxlength: 3,
      },
    ],
    followers: {
      type: Schema.Types.ObjectId,
      ref: 'Follower',
    },
    followings: {
      type: Schema.Types.ObjectId,
      ref: 'Follower',
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
      required: true,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    isModerator: {
      type: Boolean,
      default: false,
    },
    isPlumeDor: {
      type: Boolean,
      default: false,
    },
    isReported: {
      type: Boolean,
      default: false,
    },
    stories: {
      type: Schema.Types.ObjectId,
      ref: 'Story',
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
