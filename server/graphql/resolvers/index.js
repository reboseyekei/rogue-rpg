const usersResolvers = require("./users");
const charactersResolvers = require("./characters");
const inventoriesResolvers = require("./inventories");
const itemsResolvers = require("./items");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...charactersResolvers.Query,
    ...inventoriesResolvers.Query,
    ...itemsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...charactersResolvers.Mutation,
    ...inventoriesResolvers.Mutation,
    ...itemsResolvers.Mutation,
  },
};
