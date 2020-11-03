const { model, Schema } = require("mongoose");
const { attribute, buff, debuff } = require("./_Objects");

const perkSchema = new Schema({
  name: String,
  desc: String,
  attribute: attribute,
  buff: buff,
  debuff: debuff,
});

module.exports = model("Perk", perkSchema);
