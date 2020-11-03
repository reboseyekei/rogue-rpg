const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const mongoose = require("mongoose");

const User = require("../../models/User");
const Character = require("../../models/Character");
const Level = require("../../models/Level");
const Inventory = require("../../models/Inventory");

const { validateCharacterInput } = require("../../util/validators");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    async getCharacters(_, { userId }) {
      try {
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const user = await User.findById(userId);
        if (user) {
          let data = [];
          user.characters.map((characterId, index) => {
            const character = Character.findById(characterId);
            if (character) {
              data.push(character);
            } else {
              user.splice(index, 1);
            }
          });
          user.save();
          return data;
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getCharacter(_, { characterId }) {
      try {
        if (!characterId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const character = await Character.findById(characterId);
        if (character) {
          return character;
        } else {
          throw new Error("Character not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createCharacter(_, { createCharacterInput: { charName, place, abilityChoice } }, context) {
      const verify = checkAuth(context);

      const user = await User.findById(verify.id);

      const { valid, errors } = validateCharacterInput(charName);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const characterId = mongoose.Types.ObjectId();
      const inventoryId = mongoose.Types.ObjectId();

      user.characters.push(characterId);

      //TODO: Adding certain bonuses and perks by checking a specific enterprise level
      const newLevel = new Level({
        lvl: 0,
        xp: 0,
        capIncrease: 5,
        statIncrease: 2,
        cap: 0,
        stat: 10,
        bonus: [],
        perks: [],
      });

      const newAttributes = {
        space: { default: 0, mod: 0 },
        time: { default: 0, mod: 0 },
        death: { default: 0, mod: 0 },
        life: { default: 0, mod: 0 },
        fire: { default: 0, mod: 0 },
        water: { default: 0, mod: 0 },
        earth: { default: 0, mod: 0 },
        air: { default: 0, mod: 0 },
      };

      const newBuffs = {
        regen: { default: 0, mod: 0 },
        dread: { default: 0, mod: 0 },
        poison: { default: 0, mod: 0 },
        scorch: { default: 0, mod: 0 },
        cold: { default: 0, mod: 0 },
        spark: { default: 0, mod: 0 },
        reflect: { default: 0, mod: 0 },
        summon: { default: 0, mod: 0 },
        taunt: { default: 0, mod: 0 },
        immortal: 0,
        strong: 0,
        warped: 0,
        sniper: 0,
        wellspring: 0,
        overcharged: 0,
        scavenger: 0,
        swift: 0,
      };

      const newDebuff = {
        fear: { default: 0, mod: 0 },
        burn: { default: 0, mod: 0 },
        freeze: { default: 0, mod: 0 },
        shock: { default: 0, mod: 0 },
        toxin: { default: 0, mod: 0 },
        decay: { default: 0, mod: 0 },
        explosion: 0,
        paralysis: 0,
        frozen: 0,
        scorched: 0,
      };

      const newMind = {
        cap: 10,
        creation: 0,
        destruction: 0,
        restoration: 0,
        projection: 0,
      };

      const newBody = {
        cap: 10,
        vitality: 0,
        defense: 0,
        strength: 0,
        dexterity: 0,
      };

      const newSoul = {
        cap: 10,
        luck: 0,
        capacity: 0,
        clarity: 0,
        will: 0,
      };

      const newEquipment = {
        feet: { item: null, enchantments: [] },
        arms: { item: null, enchantments: [] },
        torso: { item: null, enchantments: [] },
        head: { item: null, enchantments: [] },
        hands: { item: null, enchantments: [] },
        ringOne: { item: null, enchantments: [] },
        ringTwo: { item: null, enchantments: [] },
      };

      const newInventory = new Inventory({
        _id: inventoryId,
        owner: characterId,
        one: { item: "5f8f4a0fb83a0b8e2b7fb9ee", enchantments: [] },
        two: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        three: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        four: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        five: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        six: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        seven: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        eight: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        nine: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        ten: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        eleven: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        twelve: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        thirteen: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        fourteen: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        fifteen: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
        sixteen: { item: "5f8f4afab42a919537d55e09", enchantments: [] },
      });
      //ability is placeholder for the time being

      let ability = "";
      let skin = "";
      if (abilityChoice === 1) {
        skin = "warrior";
        ability = "strike";
      } else if (abilityChoice === 2) {
        skin = "rogue";
        ability = "flee";
      } else if (abilityChoice === 3) {
        skin = "mage";
        ability = "fireball";
      }

      /*
      TODO: 
      - Changing amount of default of certain stats based on enterprises or special items.
      - Giving a certain ability based on focus you initially choose
      */
      const newCharacter = new Character({
        _id: characterId,
        owner: user.id,
        name: charName,
        place,
        level: newLevel,
        alignment: 0,
        slots: 3,
        attributes: newAttributes,
        buffs: newBuffs,
        debuffs: newDebuff,
        abilities: [ability],
        cooldowns: [0, 0, 0],
        mind: newMind,
        body: newBody,
        soul: newSoul,
        shield: 10,
        health: 20,
        mana: 20,
        stamina: 10,
        perks: [],
        effects: [],
        equipment: newEquipment,
        inventory: inventoryId,
        familiar: "",
        skin: skin,
        createdAt: new Date().toISOString(),
      });

      await user.save();
      await newInventory.save();
      const character = await newCharacter.save();

      return character;
    },
    async deleteCharacter(_, { characterId }) {
      try {
        const character = await Character.findById(characterId);
        await character.delete();
        return "Character has died";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
