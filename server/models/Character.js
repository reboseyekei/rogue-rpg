const { model, Schema } = require("mongoose");
const { attributes, buffs, debuffs, mind, body, soul, level, division, appliedEffect} = require("./_Objects");

const characterSchema = new Schema({
  owner: String,
  name: String,
  spirit: String,
  place: String,
  party: String,
  level: level,
  cap: Number,
  tags: [String],
  titles: [String],
  alignment: Number,
  humanity: Number,
  attributes: attributes,
  buffs: buffs,
  debuffs: debuffs,
  slots: Number,
  abilitiesInv: String,
  cooldowns: [Number],
  mind: mind,
  body: body,
  soul: soul,
  health: division,
  mana: division,
  stamina: division,
  shield: division,
  defRes: Number,
  debuffRes: Number,
  perks: [String],
  effects: [appliedEffect],
  canEquip: Number,
  equipment: String,
  inventory: String,
  familiar: String,
  skins: [[String]],
  lines: [[String]],
  ai: String,
});

module.exports = model("Character", characterSchema);
