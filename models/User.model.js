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
      // required: true,
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
        required: true,
      },
    ],
    mostActiveThemes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Theme',
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
    stayConnected: {
      type: Boolean,
      default: false,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
      default: false,
      // required: true,
    },
    isModerator: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
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
    stories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

userSchema.pre('save', function () {
  this.setThreeThemesMax();
});

// les autres parentComment IDs sont spread(...) via le controller au Create
userSchema.methods.setThreeThemesMax = function () {
  if (this.selectedThemes.length > 3) {
    console.log(
      'il y a plus de 3 selections',
      this.selectedThemes,
      ': longueur: ',
      this.selectedThemes.length
    );
    // this.selectedThemes.slice(1, 3);
  }
};

userSchema.path('selectedThemes').validate(function (value) {
  // console.log(value.length, ': longueur');
  if (value.length !== 3) {
    throw new Error('Vous devez choisir 3 themes au maximum');
  }
});

const User = model('User', userSchema, 'user');

module.exports = User;
