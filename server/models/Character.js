const { model, Schema } = require("mongoose");
const { attribute, buff, debuff, mind, body, soul, level, inventory, equipment } = require("./_Objects");

const characterSchema = new Schema({
  owner: String,
  name: String,
  place: String,
  level: level,
  alignment: Number,
  slots: Number,
  attribute: attribute,
  buff: buff,
  debuff: debuff,
  abilities: [String],
  cooldown: [Number],
  mind: mind,
  body: body,
  soul: soul,
  shield: Number,
  health: Number,
  mana: Number,
  stamina: Number,
  perks: [String],
  effects: [String],
  equipment: equipment,
  inventory: String,
  familiar: String,
  skin: String,
});

module.exports = model("Character", characterSchema);
