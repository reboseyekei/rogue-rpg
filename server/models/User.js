const { model, Schema } = require("mongoose");
const { enterprise } = require("./_Objects");

const userSchema = new Schema({
  email: String,
  password: String,
  username: String,
  characters: [String],
  familiars: [String],
  gold: Number,
  vault: [String],
  library: [String],
  laboratory: [String],
  shop: enterprise,
  auction: enterprise,
  guild: enterprise,
  smith: enterprise,
  manor: enterprise,
  palace: enterprise,
  caravan: enterprise,
  createdAt: String,
});

module.exports = model("User", userSchema);
