const usersResolvers = require("./users");
const charactersResolvers = require("./characters");
const inventoriesResolvers = require("./inventories");
const equipmentsResolvers = require("./equipments");
const itemsResolvers = require("./items");
const abilitiesResolvers = require("./abilities");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...charactersResolvers.Query,
    ...inventoriesResolvers.Query,
    ...equipmentsResolvers.Query,
    ...itemsResolvers.Query,
    ...abilitiesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...charactersResolvers.Mutation,
    ...inventoriesResolvers.Mutation,
    ...equipmentsResolvers.Mutation,
    ...itemsResolvers.Mutation,
    ...abilitiesResolvers.Mutation,
  },
};
