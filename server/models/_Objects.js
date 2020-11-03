const { model, Schema } = require("mongoose");

const enchantment = new Schema({
  target: String,
  value: Number,
});

const modItem = new Schema({
  item: String,
  enchantments: [enchantment],
});

const essence = new Schema({
  focus: String,
  value: Number,
});

const mind = new Schema({
  cap: Number,
  creation: Number,
  destruction: Number,
  restoration: Number,
  projection: Number,
});

const body = new Schema({
  cap: Number,
  vitality: Number,
  defense: Number,
  strength: Number,
  dexterity: Number,
});

const soul = new Schema({
  cap: Number,
  luck: Number,
  capacity: Number,
  clarity: Number,
  will: Number,
});

const attribute = new Schema({
  space: { default: Number, mod: Number },
  time: { default: Number, mod: Number },
  death: { default: Number, mod: Number },
  life: { default: Number, mod: Number },
  fire: { default: Number, mod: Number },
  water: { default: Number, mod: Number },
  earth: { default: Number, mod: Number },
  air: { default: Number, mod: Number },
});

const buff = new Schema({
  regen: { default: Number, mod: Number },
  dread: { default: Number, mod: Number },
  poison: { default: Number, mod: Number },
  scorch: { default: Number, mod: Number },
  cold: { default: Number, mod: Number },
  spark: { default: Number, mod: Number },
  reflect: { default: Number, mod: Number },
  summon: { default: Number, mod: Number },
  taunt: { default: Number, mod: Number },
  immortal: Number,
  strong: Number,
  warped: Number,
  sniper: Number,
  wellspring: Number,
  overcharged: Number,
  scavenger: Number,
  swift: Number,
});

const debuff = new Schema({
  fear: { default: Number, mod: Number },
  burn: { default: Number, mod: Number },
  freeze: { default: Number, mod: Number },
  shock: { default: Number, mod: Number },
  toxin: { default: Number, mod: Number },
  decay: { default: Number, mod: Number },
  explosion: Number,
  paralysis: Number,
  frozen: Number,
  scorched: Number,
});

const scale = new Schema({
  name: String,
  health: { max: Number, current: Number, division: Number },
  stamina: { max: Number, current: Number, division: Number },
  mana: { max: Number, current: Number, division: Number },
  shield: { max: Number, current: Number, division: Number },
  mind: mind,
  body: body,
  soul: soul,
  attribute: attribute,
  debuff: debuff,
  buff: buff,
  value: Number,
});

const modifier = new Schema({
  space: scale,
  time: scale,
  death: scale,
  life: scale,
  fire: scale,
  water: scale,
  earth: scale,
  air: scale,
  creation: scale,
  destruction: scale,
  restoration: scale,
  projection: scale,
  vitality: scale,
  defense: scale,
  strength: scale,
  dexterity: scale,
  luck: scale,
  capacity: scale,
  clarity: scale,
  will: scale,
  regen: scale,
  dread: scale,
  poison: scale,
  scorch: scale,
  cold: scale,
  spark: scale,
  reflect: scale,
  summon: scale,
  taunt: scale,
  immortal: scale,
  strong: scale,
  warped: scale,
  sniper: scale,
  wellspring: scale,
  overcharged: scale,
  scavenger: scale,
  swift: scale,
  fear: scale,
  burn: scale,
  freeze: scale,
  shock: scale,
  toxin: scale,
  decay: scale,
  explosion: scale,
  paralysis: scale,
  frozen: scale,
  scorched: scale,
  damage: scale,
  health: scale,
  mana: scale,
  stamina: scale,
  shield: scale,
});

const effect = new Schema({
  name: String,
  turns: Number,
  target: Boolean,
  modifier: modifier,
});

const perk = new Schema({
  name: String,
  desc: String,
  attribute: attribute,
  buff: buff,
  debuff: debuff,
});

const ability = new Schema({
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

const item = new Schema({
  name: String,
  desc: String,
  path: String,
  ability: String,
  slots: Number,
  essence: essence,
  mind: mind,
  body: body,
  soul: soul,
  perks: [String],
});

const equipment = new Schema({
  feet: modItem,
  arms: modItem,
  torso: modItem,
  head: modItem,
  hands: modItem,
  ringOne: modItem,
  ringTwo: modItem,
});

const inventory = new Schema({
  owner: String,
  one: modItem,
  two: modItem,
  three: modItem,
  four: modItem,
  five: modItem,
  six: modItem,
  seven: modItem,
  eight: modItem,
  nine: modItem,
  ten: modItem,
  eleven: modItem,
  twelve: modItem,
  thirteen: modItem,
  fourteen: modItem,
  fifteen: modItem,
  sixteen: modItem,
});

const level = new Schema({
  lvl: Number,
  xp: Number,
  capIncrease: Number,
  statIncrease: Number,
  cap: Number,
  stat: Number,
  bonus: [Number],
  perks: [String],
});

const familiar = new Schema({
  owner: String,
  level: level,
  health: Number,
  damage: Number,
  perks: [String],
  inventory: inventory,
});

const enterprise = new Schema({
  name: String,
  level: Number,
  cost: Number,
});

module.exports = {
  mind,
  body,
  soul,
  attribute,
  buff,
  debuff,
  perk,
  scale,
  modifier,
  effect,
  perk,
  ability,
  item,
  essence,
  modItem,
  equipment,
  inventory,
  level,
  familiar,
  enterprise,
};
