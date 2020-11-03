const { model, Schema } = require("mongoose");
const { mind, body, soul, scale, effect } = require("./_Objects");

const abilitySchema = new Schema({
  lvl: Number,
  healthCost: Number,
  manaCost: Number,
  staminaCost: Number,
  shieldCost: Number,
  mind: mind,
  body: body,
  soul: soul,
  repeatable: { default: Number, max: Number, scaling: Boolean },
  mindRepeat: mind,
  bodyRepeat: body,
  soulRepeat: soul,
  effects: [effect],
  damage: scale,
  health: scale,
  mana: scale,
  stamina: scale,
  shield: scale,
});

module.exports = model("Ability", abilitySchema);
