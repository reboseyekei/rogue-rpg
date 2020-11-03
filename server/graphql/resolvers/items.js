const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../../util/checkAuth");
const { AuthenticationError } = require("apollo-server");
const { UserInputError } = require("apollo-server");

const Item = require("../../models/Item");
const User = require("../../models/User");

module.exports = {
  Query: {
    async getItem(_, { itemId }) {
      try {
        if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
          throw new Error("Invalid ID");
        }
        const item = await Item.findById(itemId);
        if (item) {
          return item;
        } else {
          throw new Error("Item not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createItem(
      _,
      {
        createItemInput: {
          name,
          desc,
          path,
          type,
          ability,
          slots,
          focus,
          essence,
          mindCap,
          bodyCap,
          soulCap,
          creation,
          restoration,
          destruction,
          projection,
          vitality,
          defense,
          strength,
          dexterity,
          luck,
          capacity,
          clarity,
          will,
          perks,
        },
      },
      context
    ) {
      const verify = checkAuth(context);
      const user = await User.findById(verify.id);
      if (user.username === "reboseyekei") {
        const nameCheck = await Item.findOne({ name });
        if (nameCheck) {
          throw new UserInputError("Item name is taken");
        }
        const newMind = {
          cap: mindCap,
          creation: creation,
          destruction: destruction,
          restoration: restoration,
          projection: projection,
        };

        const newBody = {
          cap: bodyCap,
          vitality: vitality,
          defense: defense,
          strength: strength,
          dexterity: dexterity,
        };

        const newSoul = {
          cap: soulCap,
          luck: luck,
          capacity: capacity,
          clarity: clarity,
          will: will,
        };

        const newEssence = {
          focus: focus,
          value: essence,
        };

        const newItem = new Item({
          name,
          desc,
          path,
          type,
          ability,
          slots,
          essence: newEssence,
          mind: newMind,
          body: newBody,
          soul: newSoul,
          perks,
        });

        const item = newItem.save();
        return item;
      } else {
        throw new AuthenticationError("Invalid Permissions");
      }
    },
    async removeItem(_, { itemId }, context) {
      const verify = checkAuth(context);
      const user = await User.findById(verify.id);
      if (user.username === "reboseyekei") {
        try {
          const item = await Item.findById(itemId);
          await item.delete();
          return "Item is removed from database";
        } catch (err) {
          throw new Error(err);
        }
      } else {
        throw new AuthenticationError("Invalid Permissions");
      }
    },
  },
};
