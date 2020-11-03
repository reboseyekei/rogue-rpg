const { model, Schema } = require("mongoose");

const levelSchema = new Schema({
  lvl: Number,
  xp: Number,
  capIncrease: Number,
  statIncrease: Number,
  cap: Number,
  stat: Number,
  bonus: [Number],
  perks: [String],
});

module.exports = model("Level", levelSchema);
