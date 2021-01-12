const { model, Schema } = require("mongoose");
const { attributes, buffs, debuffs, mind, body, soul, level, division } = require("./_Objects");

const characterSchema = new Schema({
  owner: String,
  name: String,
  place: String,
  level: level,
  alignment: Number,
  slots: Number,
  attributes: attributes,
  buffs: buffs,
  debuffs: debuffs,
  abilitiesInv: String,
  cooldown: [Number],
  mind: mind,
  body: body,
  soul: soul,
  shield: division,
  health: division,
  mana: division,
  stamina: division,
  perks: [String],
  effects: [String],
  equipment: String,
  inventory: String,
  familiar: String,
  skin: String,
});

module.exports = model("Character", characterSchema);
