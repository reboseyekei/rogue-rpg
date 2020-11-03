const { model, Schema } = require("mongoose");
const { modifier } = require("./_Objects");

const effectSchema = new Schema({
  name: String,
  target: Number,
  turns: Number,
  modifier: modifier,
});

module.exports = model("effect", effectSchema);
