const { Schema, model } = require('mongoose');

const fanRessourceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    ressourceId: { type: Schema.Types.ObjectId, ref: 'Ressource' },
  },
  {
    timestamps: true,
  }
);

const FanRessource = model('FanRessource', fanRessourceSchema, 'fan_ressource');

module.exports = FanRessource;
