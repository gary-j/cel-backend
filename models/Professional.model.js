const { Schema, model, mongoose } = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const professionalSchema = new Schema(
  {
    relatedUser: {
      // un pro peut aussi être un user inscrit, (coach, avocat, etc..)
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    // voir fichier excel
    titre: { type: String, enum: ['Dr.', 'Me.', 'Pr.', 'Aud.', 'Coach'] },
    name: String,
    firstname: String,
    address: String,
    zipcode: String,
    city: String,
    country: String,
    domain: String,
    verified: Boolean,
  },
  {
    timestamps: true,
  }
);

const Professional = model('Professional', professionalSchema, 'professional');

module.exports = Professional;
