const checkAuth = require("../../util/checkAuth");
const { AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");

const User = require("../../models/User");
const Character = require("../../models/Character");
const Equipment = require("../../models/Equipment");
const Item = require("../../models/Item");
const Dungeon = require("../../models/Dungeon");
const Party = require("../../models/Party");
const Location = require("../../models/Location");
const MonsterTemplate = require("../../models/MonsterTemplate");
const AreaTemplate = require("../../models/AreaTemplate");

const { parseEquipped, parseEquip, sum } = require("../../util/helpers");

async function getTotalStats(character) {
  const equipment = await Equipment.findById(character.equipment);
  if (equipment) {
    const head = await Item.findById(equipment.head.item);
    const upperBody = await Item.findById(equipment.upperBody.item);
    const lowerBody = await Item.findById(equipment.lowerBody.item);
    const feet = await Item.findById(equipment.feet.item);
    const ringOne = await Item.findById(equipment.ringOne.item);
    const ringTwo = await Item.findById(equipment.ringTwo.item);
    const rightHand = await Item.findById(equipment.rightHand.item);
    const leftHand = await Item.findById(equipment.leftHand.item);
    const equipped = { head, upperBody, lowerBody, feet, ringOne, ringTwo, rightHand, leftHand };
    const equipStats = parseEquipped(equipped);
    const charStats = parseEquip(character);
    const totalStats = sum(equipStats, charStats);
    return totalStats;
  } else {
    return null;
  }
}

function getDivisions(character, stat) {
  let healthMax = character.health.max + stat.body.cap * 2 + stat.body.vitality * 4;
  let healthRegen = character.health.division + stat.soul.cap + stat.body.vitality + stat.body.defense;
  let manaMax = character.mana.max + stat.mind.cap * 2 + stat.soul.capacity * 4 + stat.soul.clarity * 2;
  let manaRegen = character.mana.division + stat.soul.cap + stat.soul.clarity * 2 + stat.soul.capacity * 1 + stat.mind.cap * 0.25;
  let staminaMax = character.stamina.max + stat.body.strength * 4 + stat.body.dexterity * 2;
  let staminaRegen = character.stamina.division + stat.body.strength + stat.body.dexterity;
  let shieldMax = character.shield.max + stat.mind.projection * 5;
  let shieldRegen = character.shield.division + stat.mind.projection * 0.5;
  const health = { max: healthMax, current: character.health.current, division: healthRegen };
  const mana = { max: manaMax, current: character.mana.current, division: manaRegen };
  const stamina = { max: staminaMax, current: character.stamina.current, division: staminaRegen };
  const shield = { max: shieldMax, current: character.shield.current, division: shieldRegen };
  const divisions = { health, mana, stamina, shield };
  return divisions;
}

module.exports = {
  Query: {
    async getDungeon(_, { dungeonId }) {
      try {
        if (!dungeonId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const dungeon = await Dungeon.findById(dungeonId);
        if (dungeon) {
          return dungeon;
        } else {
          throw new Error("Dungeon not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPlace(_, { placeId }) {
      try {
        if (!placeId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const dungeon = await Dungeon.findById(placeId);
        const location = await Location.findById(placeId);
        if (dungeon) {
          return dungeon;
        } else if (location) {
          return location;
        } else {
          throw new Error("Place not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPlaces(_, { userId }) {
      try {
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const user = await User.findById(userId);
        if (user) {
          let res = { places: [], data: [] };
          for (let i = 0; i < user.characters.length; i++) {
            const character = await Character.findById(user.characters[i]);
            if (character) {
              const dungeon = await Dungeon.findById(character.place);
              const location = await Location.findById(character.place);
              if (dungeon) {
                res.places.push(character.place);
                res.data.push(dungeon);
              } else if (location) {
                res.places.push(character.place);
                res.data.push(location);
              } else {
                throw new Error("Character place not found");
              }
            } else {
              user.characters.splice(index, 1);
            }
          }
          user.save();
          return res;
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getParties(_, { locationId }) {
      try {
        if (!locationId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const location = await Location.findById(locationId);
        if (location) {
          let data = [];
          location.parties.map(async (partyId, index) => {
            const party = Party.findById(partyId);
            if (party) {
              data.push(party);
            } else {
              location.parties.splice(index, 1);
            }
          });
          location.save();
          return data;
        } else {
          throw new Error("Location not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getParty(_, { partyId }) {
      try {
        if (!partyId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const party = await Party.findById(partyId);
        if (party) {
          return party;
        } else {
          throw new Error("Party not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMembers(_, { partyId }) {
      try {
        if (!partyId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const party = await Party.findById(partyId);
        if (party) {
          let data = [];
          party.characters.map((characterId, index) => {
            const character = Character.findById(characterId);
            if (character) {
              data.push(character);
            } else {
              party.characters.splice(index, 1);
            }
          });
          party.save();
          return data;
        } else {
          throw new Error("Party not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPlayers(_, { dungeonId }) {
      try {
        if (!dungeonId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const dungeon = await Dungeon.findById(dungeonId);
        if (dungeon) {
          let data = [];
          dungeon.players.map((characterId, index) => {
            const character = Character.findById(characterId);
            if (character) {
              data.push(character);
            } else {
              dungeon.players.splice(index, 1);
            }
          });
          dungeon.save();
          return data;
        } else {
          throw new Error("Dungeon not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getRoom(_, { dungeonId, floor, room }) {
      try {
        if (!dungeonId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const dungeon = await Dungeon.findById(dungeonId);
        if (dungeon) {
          const currRoom = dungeon.floors[floor][room];
          return currRoom;
        } else {
          throw new Error("Dungeon not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getDungeonOutput(_, { dungeonId }) {
      try {
        if (!dungeonId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const dungeon = await Dungeon.findById(dungeonId);
        if (dungeon) {
          let room = dungeon.floors[dungeon.currFloor][dungeon.currRoom];
          let occupants = [];
          let players = [];
          for (let i = 0; i < dungeon.players.length; i++) {
            const character = await Character.findById(dungeon.players[i]);
            if (character) {
              const totalStats = await getTotalStats(character);
              if (totalStats) {
                const divisions = getDivisions(character, totalStats);
                const charOutput = {
                  id: character.id,
                  name: character.name,
                  level: character.level.lvl,
                  spirit: character.spirit,
                  skin: character.skins[0][0],
                  health: divisions.health,
                  mana: divisions.mana,
                  stamina: divisions.stamina,
                  shield: divisions.shield,
                  effects: character.effects,
                };
                players.push(charOutput);
              } else {
                throw new Error("Invalid stat calculations, suspected faulty items");
              }
            } else {
              dungeon.players.splice(i, 1);
            }
          }
          for (let i = 0; i < dungeon.occupants.length; i++) {
            const character = await Character.findById(dungeon.occupants[i]);
            if (character) {
              occupants.push(character);
            } else {
              dungeon.occupants.splice(i, 1);
            }
          }
          return {
            room: room,
            occupants: occupants,
            players: players,
            playerIds: dungeon.players,
            tokens: dungeon.tokens,
            tokenDistribution: dungeon.tokenDistribution,
            totalTokens: dungeon.totalTokens,
          };
        } else {
          throw new Error("Dungeon not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createDungeon(_, { createDungeonInput: { templateId, partyId, characterId, locationId } }) {
      //Checking if ID's are valid
      if (!templateId.match(/^[0-9a-fA-F]{24}$/) || !characterId.match(/^[0-9a-fA-F]{24}$/) || !locationId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error("Invalid ID's for Dungeon Creation");
      }

      let dungeonId = mongoose.Types.ObjectId();
      const template = await AreaTemplate.findById(templateId);
      const location = await Location.findById(locationId);
      const character = await Character.findById(characterId);
      const party = partyId ? await Party.findById(partyId) : null;

      //Checking if data was actually retrieved
      if (!template || !location || !character) {
        throw new Error("Data not found");
      } else if (partyId && !party) {
        throw new Error("Data not found");
      }

      //Updating party to be "charting"
      if (party) {
        party.charting = true;
        party.save();
      }

      //Checking if it was the party leader
      if (party && characterId !== party.characters[0]) {
        throw new AuthenticationError("Must be party leader to create dungeon");
      }

      //Updating each of the party members locations
      if (party) {
        for (i = 0; i < party.characters.length; i++) {
          if (!party.characters[i].match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error("Invalid ID for character");
          }
          const player = await Character.findById(party.characters[i]);
          if (!player) {
            throw new Error("Invalid character");
          }
          player.place = dungeonId;
          player.save();
        }
      } else if (!party) {
        const player = await Character.findById(characterId);
        if (!player) {
          throw new Error("Invalid Character");
        }
        player.place = dungeonId;
        player.save();
      }

      //Getting mobs
      let mobs = [];
      for (i = 0; i < template.mobs.length; i++) {
        let monsterTemplateId = template.mobs[i];
        if (!monsterTemplateId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID for monster template");
        }
        const monsterTemplate = await MonsterTemplate.findById(monsterTemplateId);
        if (monsterTemplate) {
          monsterTemplate.alignmentRange = Math.floor(Math.random() * monsterTemplate.alignmentRange) + template.alignment;
          monsterTemplate.humanity += template.humanity;
          monsterTemplate.rarity += template.rarity;
          mobs.push(monsterTemplate);
        } else {
          throw new Error("Monster template not found");
        }
      }

      //Getting bosses
      let bosses = [];
      for (i = 0; i < template.bosses.length; i++) {
        let monsterTemplateId = template.bosses[i];
        if (!monsterTemplateId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID for monster template");
        }
        const monsterTemplate = await MonsterTemplate.findById(monsterTemplateId);
        if (monsterTemplate) {
          monsterTemplate.alignmentRange = Math.floor(Math.random() * monsterTemplate.alignmentRange) + template.alignment;
          monsterTemplate.humanity += Math.floor(Math.random() * template.humanity);
          monsterTemplate.rarity += template.rarity;
          bosses.push(monsterTemplate);
        } else {
          throw new Error("Monster template not found");
        }
      }

      //Creating the dungeon
      let dungeonStructure = [];
      let bossStructure = [];
      for (i = 0; i < template.size; i++) {
        let bossEnvironment = bosses[i].environments[Math.floor(Math.random() * bosses[i].environments.length)];
        bossStructure[i] = {
          lifespan: 10,
          environment: bossEnvironment,
          template: bosses[i],
        };
        let floorSize = template.length + Math.floor(Math.random() * (template.range * 2)) - template.range;
        dungeonStructure[i] = [];
        dungeonStructure[i][0] = { lifespan: 10, environment: "entrance" };
        for (j = 1; j < floorSize; j++) {
          let lifespanCalc = Math.floor(Math.random() * template.maxLifespan);
          let environmentCalc = template.environments[Math.floor(Math.random() * template.environments.length)];
          let validMobs = [];
          for (k = 0; k < mobs.length; k++) {
            let mobEnvironments = mobs[k].environments;
            if (mobEnvironments.includes(environmentCalc)) {
              validMobs.push(mobs[k]);
            }
          }
          let mob = validMobs[Math.floor(Math.random() * validMobs.length)];
          dungeonStructure[i][j] = {
            lifespan: lifespanCalc,
            environment: environmentCalc,
            template: mob,
          };
        }
      }

      //Max amount of choices is 4
      let choices = 1 + Math.floor(Math.random() * 3);
      let leads = [];
      for (i = 0; i < choices; i++) {
        let distance = Math.floor(Math.random() * 10);
        let location = distance;
        while (leads.includes(location)) {
          location += 1;
        }
        leads.push(location);
      }

      let tokenDist = [];
      if (partyId && party) {
        if (party.tokenDistribution.length > 0) {
          tokenDist = party.tokenDistribution;
        } else if (party.characters.length > 1) {
          for (let i = 0; i < party.characters.length; i++) {
            tokenDist.push(3);
          }
        }
      } else {
        tokenDist = [6];
      }

      const newDungeon = new Dungeon({
        _id: dungeonId,
        name: template.name,
        floors: dungeonStructure,
        bossRooms: bossStructure,
        currFloor: 0,
        currRoom: 0,
        leadingTo: leads,
        chaos: template.chaos,
        droprate: template.droprate,
        occupants: [],
        players: partyId ? party.characters : characterId,
        tokens: tokenDist,
        totalTokens: tokenDist,
        tokenDistribution: tokenDist,
        return: locationId,
        log: [],
      });

      const dungeon = newDungeon.save();
      return dungeon;
    },
    async createParty(_, { locationId, characterId, name }) {
      if (!locationId.match(/^[0-9a-fA-F]{24}$/) && !characterId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error("Invalid ID's for Party Creation");
      }
      const location = await Location.findById(locationId);
      const character = await Character.findById(characterId);
      if (character && location && character.place === locationId) {
        let partyId = mongoose.Types.ObjectId();
        character.party = partyId;
        character.save();
        location.parties.push(partyId);
        location.save();
        const newParty = new Party({
          _id: partyId,
          name,
          location: locationId,
          charting: false,
          characters: [characterId],
          tokenDistribution: [],
        });
        const party = newParty.save();
        return party;
      } else {
        throw new Error("Error: Invalid character, location, or character does not match specified location");
      }
    },
    async joinParty(_, { partyId, characterId }) {
      if (!partyId.match(/^[0-9a-fA-F]{24}$/) && !characterId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error("Invalid ID's for Party Join");
      }
      const party = await Party.findById(partyId);
      const character = await Character.findById(characterId);
      if (character && party && character.place === party.location && !party.characters.includes(characterId)) {
        if (party.characters.length >= 6) {
          throw new UserInputError("Errors", { join: "party is full" });
        }
        let newParty = party;
        newParty.characters.push(characterId);
        newParty.tokenDistribution = [];
        if (character.party) {
          let oldParty = await Party.findById(partyId);
          if (oldParty) {
            const index = oldParty.characters.indexOf(characterId);
            oldParty.characters.splice(index, 1);
            if (oldParty.characters.length === 0) {
              const location = Location.findById(oldParty.location);
              location.parties.splice(location.parties.indexOf(partyId), 1);
              location.save();
              oldParty.delete();
            } else if (oldParty.tokenDistribution) {
              oldParty.tokenDistribution[0] += oldParty.tokenDistribution[index];
              oldParty.save();
            }
          }
        }
        character.party = partyId;
        newParty.save();
        character.save();
        return newParty;
      } else {
        throw new Error("Invalid character, location, character already within party, or character does not match specified location");
      }
    },
    async leaveParty(_, { partyId, characterId }) {
      if (!partyId.match(/^[0-9a-fA-F]{24}$/) && !characterId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error("Invalid ID's for Party Leave");
      }
      const party = await Party.findById(partyId);
      const character = await Character.findById(characterId);
      if (character && party && character.place === party.location && party.characters.includes(characterId)) {
        const index = party.characters.indexOf(characterId);
        let newParty = party;
        newParty.characters.splice(index, 1);
        if (party.characters.length === 0) {
          newParty.delete();
          const location = await Location.findById(party.location);
          const locIndex = location.parties.indexOf(partyId);
          location.parties.splice(locIndex, 1);
          location.save();
        } else if (party.tokenDistribution.length > 0) {
          let unAllocTokens = party.tokenDistribution(index);
          newParty.tokenDistribution[0] += unAllocTokens;
          newParty.tokenDistribution.splice(index, 1);
          newParty.save();
        } else {
          newParty.save();
        }
        character.party = null;
        character.save();
        return "Left Party";
      } else {
        throw new Error("Invalid character, location, or character does not match specified location");
      }
    },
    async kickParty(_, { partyId, characterId }, context) {
      const verify = checkAuth(context);
      const user = await User.findById(verify.id);
      if (user) {
        if (!partyId.match(/^[0-9a-fA-F]{24}$/) && !characterId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID's for Party Leave");
        }
        const party = await Party.findById(partyId);
        const character = await Character.findById(characterId);
        if (character && party && character.place === party.location && party.characters.includes(characterId)) {
          const leaderCharId = party.characters[0];
          const leaderChar = await Character.findById(leaderCharId);
          if (leaderChar.owner == user.id) {
            const index = party.characters.indexOf(characterId);
            let newParty = party;
            newParty.characters.splice(index, 1);
            if (party.tokenDistribution.length > 0) {
              let unAllocTokens = party.tokenDistribution(index);
              newParty.tokenDistribution[0] += unAllocTokens;
              newParty.tokenDistribution.splice(index, 1);
            }
            character.party = null;
            character.save();
            newParty.save();
            return `${character.name} was kicked from the party`;
          } else {
            throw new AuthenticationError("Invalid Permissions");
          }
        } else {
          throw new Error("Invalid character, location, or character does not match specified location");
        }
      } else {
        throw new AuthenticationError("Invalid Account");
      }
    },
    async disbandParty(_, { partyId }, context) {
      const verify = checkAuth(context);
      const user = await User.findById(verify.id);
      if (user) {
        if (!partyId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid Party ID");
        }
        const party = await Party.findById(partyId);
        if (party) {
          const leaderCharId = party.characters[0];
          const leaderChar = await Character.findById(leaderCharId);
          if (leaderChar.owner == user.id) {
            party.characters.map((characterId) => {
              const character = Character.findById(characterId);
              if (character) {
                character.place = null;
                character.save();
              }
            });
            const location = await Location.findById(party.location);
            const index = location.parties.indexOf(partyId);
            location.parties.splice(index, 1);
            location.save();
            party.delete();
            return "Party disbanded";
          } else {
            throw new AuthenticationError("Invalid Permissions");
          }
        } else {
          throw new Error("Invalid character, location, or character does not match specified location");
        }
      } else {
        throw new AuthenticationError("Invalid Account");
      }
    },
    async updatePartyToken(_, { partyId, newTokenDist }) {
      if (!partyId.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error("Invalid party Id");
      }
      const party = await Party.findById(partyId);
      if (party) {
        let newParty = party;
        newParty.tokenDistrubtion = newTokenDist;
        newParty.save();
        return newParty;
      } else {
        throw new Error("Party not found");
      }
    },
  },
};
