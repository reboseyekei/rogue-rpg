const { model, Schema } = require("mongoose");
const { room, floor} = require("./_Objects");

const dungeonSchema = new Schema({
    name: String,
    floors: [[room]],
    bossRooms: [room],
    currFloor: Number,
    currRoom: Number,
    leadingTo: [Number],
    chaos: Number,
    droprate: Number,
    occupants: [String],
    players: [String],
    tokens: [Number],
    totalTokens: [Number],
    tokenDistribution: [Number],
    return: String,
    log: [String]
});

module.exports = model("Dungeon", dungeonSchema);
