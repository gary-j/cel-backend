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
    name: String,
    address: String,
    zipcode: String,
    city: String,
    country: String,
    domain: String,
  },
  {
    timestamps: true,
  }
);

const Professional = model('Professional', professionalSchema);

module.exports = Professional;
