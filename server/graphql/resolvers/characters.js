const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const mongoose = require("mongoose");

const User = require("../../models/User");
const Character = require("../../models/Character");
const Level = require("../../models/Level");
const Inventory = require("../../models/Inventory");
const Equipment = require("../../models/Equipment");
const Attributes = require("../../models/Attribute");
const Debuffs = require("../../models/Debuffs");
const Buffs = require("../../models/Buffs");
const AbilitiesInv = require("../../models/AbilitiesInv");

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
      const equipmentId = mongoose.Types.ObjectId();
      const abilitiesInvId = mongoose.Types.ObjectId();

      user.characters.push(characterId);

      //TODO: Adding certain bonuses and perks by checking a specific enterprise level
      const newLevel = new Level({
        lvl: 0,
        xp: 0,
        potentialIncrease: 1,
        capIncrease: 3,
        statIncrease: 6,
        cap: 5,
        stat: 5,
        health: 4,
        mana: 2,
        stamina: 2,
        shield: 0,
        bonus: [],
        perks: [],
      });

      const newAttributes = new Attributes({
        space: { default: 0, mod: 0 },
        time: { default: 0, mod: 0 },
        death: { default: 0, mod: 0 },
        life: { default: 0, mod: 0 },
        fire: { default: 0, mod: 0 },
        water: { default: 0, mod: 0 },
        earth: { default: 0, mod: 0 },
        air: { default: 0, mod: 0 },
      });

      const newBuffs = new Buffs({
        regen: { default: 0, mod: 0 },
        dread: { default: 0, mod: 0 },
        poison: { default: 0, mod: 0 },
        scorch: { default: 0, mod: 0 },
        cold: { default: 0, mod: 0 },
        spark: { default: 0, mod: 0 },
        reflect: { default: 0, mod: 0 },
        summon: { default: 0, mod: 0 },
        taunt: { default: 0, mod: 0 },
        flee: { default: 0, mod: 0 },
        immortal: 0,
        strong: 0,
        warped: 0,
        sniper: 0,
        wellspring: 0,
        overcharged: 0,
        scavenger: 0,
        swift: 0,
      });

      const newDebuffs = new Debuffs({
        fear: { default: 0, mod: 0 },
        burn: { default: 0, mod: 0 },
        freeze: { default: 0, mod: 0 },
        shock: { default: 0, mod: 0 },
        toxin: { default: 0, mod: 0 },
        decay: { default: 0, mod: 0 },
        bleed: { default: 0, mod: 0 },
        exhaustion: { default: 0, mod: 0 },
        explosion: 0,
        paralysis: 0,
        frozen: 0,
        scorched: 0,
        sleep: 0,
      });

      const newMind = {
        cap: 0,
        creation: 0,
        destruction: 0,
        restoration: 0,
        projection: 0,
      };

      const newBody = {
        cap: 0,
        vitality: 0,
        defense: 0,
        strength: 0,
        dexterity: 0,
      };

      const newSoul = {
        cap: 0,
        luck: 0,
        capacity: 0,
        clarity: 0,
        will: 0,
      };

      //Health, shield, mana, and stamina.
      //Max indicates max, current indicates current health, etc(if you've taken damage it will be less than max)
      //Division indicates regen
      const newHealth = {
        max: 40,
        current: 40,
        division: 2,
      };

      const newShield = {
        max: 0,
        current: 0,
        division: 0,
      };

      const newMana = {
        max: 20,
        current: 20,
        division: 4,
      };

      const newStamina = {
        max: 20,
        current: 20,
        division: 4,
      };

      const newEquipment = new Equipment({
        _id: equipmentId,
        owner: characterId,
        head: { item: null, enchantments: [] },
        upperBody: { item: null, enchantments: [] },
        lowerBody: { item: null, enchantments: [] },
        feet: { item: null, enchantments: [] },
        ringOne: { item: null, enchantments: [] },
        ringTwo: { item: null, enchantments: [] },
        rightHand: { item: null, enchantments: [] },
        leftHand: { item: null, enchantments: [] },
      });

      const newInventory = new Inventory({
        _id: inventoryId,
        owner: characterId,
        one: { item: null, enchantments: [] },
        two: { item: null, enchantments: [] },
        three: { item: null, enchantments: [] },
        four: { item: null, enchantments: [] },
        five: { item: null, enchantments: [] },
        six: { item: null, enchantments: [] },
        seven: { item: null, enchantments: [] },
        eight: { item: null, enchantments: [] },
        nine: { item: null, enchantments: [] },
        ten: { item: null, enchantments: [] },
        eleven: { item: null, enchantments: [] },
        twelve: { item: null, enchantments: [] },
        thirteen: { item: null, enchantments: [] },
        fourteen: { item: null, enchantments: [] },
        fifteen: { item: null, enchantments: [] },
      });

      //Struggle is set as the default ability
      let defaultAbility = "5ff780e201734201adfea07a";

      //TODO Update this later to allow for more classes, probably using strings instead of ints
      let skin = "";
      let chosenAbility = "";
      if (abilityChoice === 1) {
        skin = "warrior";
        chosenAbility = "5ff7830701734201adfeaf95";
      } else if (abilityChoice === 2) {
        skin = "rogue";
        chosenAbility = "5ff783dc01734201adfeb582";
      } else if (abilityChoice === 3) {
        skin = "mage";
        chosenAbility = "5ff7822101734201adfea93f";
      }

      const newAbilitiesInv = new AbilitiesInv({
        _id: abilitiesInvId,
        owner: characterId,
        slotOne: { item: defaultAbility, enchantments: [] },
        slotTwo: { item: chosenAbility, enchantments: [] },
        slotThree: { item: null, enchantments: [] },
        slotFour: { item: null, enchantments: [] },
        slotFive: { item: null, enchantments: [] },
        slotSix: { item: null, enchantments: [] },
        slotSeven: { item: null, enchantments: [] },
        slotEight: { item: null, enchantments: [] },
        slotNine: { item: null, enchantments: [] },
        slotTen: { item: null, enchantments: [] },
        slotEleven: { item: null, enchantments: [] },
        slotTwelve: { item: null, enchantments: [] },
        slotThirteen: { item: null, enchantments: [] },
        slotFourteen: { item: null, enchantments: [] },
        slotFifteen: { item: null, enchantments: [] },
        slotSixteen: { item: null, enchantments: [] },
        slotSeventeen: { item: null, enchantments: [] },
        slotEighteen: { item: null, enchantments: [] },
        slotNineteen: { item: null, enchantments: [] },
        slotTwenty: { item: null, enchantments: [] },
      });

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
        debuffs: newDebuffs,
        abilitiesInv: abilitiesInvId,
        cooldowns: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mind: newMind,
        body: newBody,
        soul: newSoul,
        shield: newShield,
        health: newHealth,
        mana: newMana,
        stamina: newStamina,
        perks: [],
        effects: [],
        equipment: equipmentId,
        inventory: inventoryId,
        familiar: "",
        skin: skin,
        createdAt: new Date().toISOString(),
      });

      await user.save();
      await newEquipment.save();
      await newInventory.save();
      await newAbilitiesInv.save();
      const character = await newCharacter.save();

      return character;
    },
    async updateCharacterStats(
      _,
      {
        updateCharacterStatsInput: {
          characterId,
          capUsed,
          statUsed,
          mindCap,
          bodyCap,
          soulCap,
          creation,
          destruction,
          restoration,
          projection,
          vitality,
          defense,
          strength,
          dexterity,
          luck,
          capacity,
          clarity,
          will,
        },
      }
    ) {
      try {
        if (!characterId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const character = await Character.findById(characterId);
        if (character) {
          //Adding up the values of what was sent to the server for math
          let totalMind = creation + destruction + restoration + projection;
          let totalBody = vitality + defense + strength + dexterity;
          let totalSoul = luck + capacity + clarity + will;
          //
          let totalStat = totalMind + totalBody + totalSoul;
          let totalCap = mindCap + bodyCap + soulCap;

          //Adding up the values of what was sent and what is currently on the server for math
          let fullMind = totalMind + character.mind.creation + character.mind.destruction + character.mind.restoration + character.mind.projection;
          let fullBody = totalBody + character.body.vitality + character.body.defense + character.body.strength + character.body.dexterity;
          let fullSoul = totalSoul + character.soul.luck + character.soul.capacity + character.soul.clarity + character.soul.will;

          if (capUsed <= character.level.cap && statUsed <= character.level.stat && totalStat <= character.level.stat && totalCap <= character.level.cap) {
            //Evaluating that the character's stats fit inside the character's cap limit
            if (mindCap + character.mind.cap >= fullMind && bodyCap + character.body.cap >= fullBody && soulCap + character.soul.cap >= fullSoul) {
              //Checking for mismatches in the total stat/cap points used. If there is a mismatch its likely an exploit
              if (totalStat === statUsed && totalCap === capUsed) {
                //removing used stat/cap points
                character.level.cap -= capUsed;
                character.level.stat -= statUsed;

                //saving changes made in mind,body, and soul categories
                //mind
                character.mind.cap += mindCap;
                character.mind.creation += creation;
                character.mind.destruction += destruction;
                character.mind.restoration += restoration;
                character.mind.projection += projection;

                //body
                character.body.cap += bodyCap;
                character.body.vitality += vitality;
                character.body.defense += defense;
                character.body.strength += strength;
                character.body.dexterity += dexterity;

                //soul
                character.soul.cap += soulCap;
                character.soul.luck += luck;
                character.soul.capacity += capacity;
                character.soul.clarity += clarity;
                character.soul.will += will;

                let totalHealth = bodyCap * 2 + vitality * 4;
                let totalHealthRegen = vitality + defense;
                let totalMana = mindCap * 2 + capacity * 4 + clarity * 2;
                let totalManaRegen = clarity * 2 + capacity * 1;
                let totalStamina = strength * 4 + dexterity * 2;
                let totalStaminaRegen = strength * 1 + dexterity * 2;
                let totalShield = projection * 5;
                let totalShieldRegen = projection * 1;

                character.health.current += totalHealth;
                character.mana.current += totalMana;
                character.stamina.current += totalStamina;
                character.shield.current += totalShield;

                await character.save();
                return character;
              } else {
                throw new Error("Exploit likely detected, invalid request");
              }
            } else {
              throw new Error("Invalid stat point placement: not enough cap, etc");
            }
          } else {
            throw new Error("Insufficient level points");
          }
        } else {
          throw new Error("Character not found");
        }
      } catch (err) {
        throw new Error(err);
      }
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
