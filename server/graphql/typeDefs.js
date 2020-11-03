const { gql } = require("apollo-server");

module.exports = gql`
  """
  ====================== GENERAL ======================
  """
  type Division {
    max: Int
    current: Int
    division: Int
  }
  type Alter {
    default: Int
    mod: Int
  }
  type Enchantment {
    target: String!
    value: Int!
  }
  type ModItem {
    item: String
    enchantments: [Enchantment]
  }
  type Essence {
    focus: String!
    value: Int!
  }
  """
  ====================== STATS ======================
  """
  type Mind {
    cap: Int
    creation: Int
    destruction: Int
    restoration: Int
    projection: Int
  }
  type Body {
    cap: Int
    vitality: Int
    defense: Int
    strength: Int
    dexterity: Int
  }
  type Soul {
    cap: Int
    luck: Int
    capacity: Int
    clarity: Int
    will: Int
  }

  """
  ====================== ATTRIBUTES ======================
  """
  type Attribute {
    space: Alter
    time: Alter
    death: Alter
    life: Alter
    fire: Alter
    water: Alter
    earth: Alter
    air: Alter
  }

  """
  ====================== BUFFS/DEBUFFS ======================
  """
  type Buff {
    """
    Value buffs
    """
    regen: Alter
    dread: Alter
    poison: Alter
    scorch: Alter
    cold: Alter
    spark: Alter
    reflect: Alter
    summon: Alter
    taunt: Alter
    """
    Timed buffs
    """
    immortal: Int
    strong: Int
    warped: Int
    sniper: Int
    wellspring: Int
    overcharged: Int
    scavenger: Int
    swift: Int
  }
  type Debuff {
    """
    Value debuffs
    """
    fear: Alter
    burn: Alter
    freeze: Alter
    shock: Alter
    toxin: Alter
    decay: Alter
    """
    Timed debuffs
    """
    explosion: Int
    paralysis: Int
    frozen: Int
    scorched: Int
  }

  """
  ====================== PERKS/EFFECTS/ABILITIES ======================
  """
  type Perk {
    name: String!
    desc: String!
    """
    The values the perk adds onto for display and removal
    """
    attribute: Attribute
    buff: Buff
    debuff: Debuff
  }
  type Scale {
    name: String!
    """
    Scaling of value according to stats
    any # greater than 0 means that for each # of stat the value a positive multiplier is added
    any # greater than 0 means that for each # of stat the value a negative multiplier is added
    0 means no scaling
    at the end all multipliers are added together
    example one: character has 50 dex and the dex scale is 10. a 5x multiplier is applied
    example two: character has 50 dex and 20 strength. The modifier for dexterity is 10 and the modifier for strength is -10. A 3x multiplier is applied

    Ideally abilities with negative modifiers won't be used but it allows for more flexibility

    Scaling of value according to health, stamina, and mana
    All previous rules apply, except instead of stat values scaling can go by:
    Your max of that stat
    Your current value of that stat
    Your division of that stat

    division will apply a multiplier to the value of your max/current

    example: character has 50 health with a max of 200, division multiplier is 2. A 8x modifier is applied
    """
    health: Division
    stamina: Division
    mana: Division
    shield: Division
    mind: Mind
    body: Body
    soul: Soul
    attribute: Attribute
    debuff: Debuff
    buff: Buff
    """
    Value decides the initial value, scaling effects how much the stats effect that value. This will usually be 1, but also 0 in the case of no scaling
    """
    value: Int!
  }
  type Modifier {
    """
    Modifiers keep track of what an ability could modify
    example one: an ability that increases Creation by 1 for every 2 dexterity points, value inside Scale would be 1 and body.dexterity would be 2
    example two: an ability that deals 50 damage for each turn of scorched debuff, value inside Scale would be 50 and debuff.scorched would be 1

    example three:
    an ability that increases death attribute by 5 and adds 10 summon per 3 death attributes
    - value inside scale for death would be 5 with no modifiers
    - value inside scale for summon would be 10 and attribute.death would be 3
    """
    space: Scale
    time: Scale
    death: Scale
    life: Scale
    fire: Scale
    water: Scale
    earth: Scale
    air: Scale
    creation: Scale
    destruction: Scale
    restoration: Scale
    projection: Scale
    vitality: Scale
    defense: Scale
    strength: Scale
    dexterity: Scale
    luck: Scale
    capacity: Scale
    clarity: Scale
    will: Scale
    regen: Scale
    dread: Scale
    poison: Scale
    scorch: Scale
    cold: Scale
    spark: Scale
    reflect: Scale
    summon: Scale
    taunt: Scale
    immortal: Scale
    strong: Scale
    warped: Scale
    sniper: Scale
    wellspring: Scale
    overcharged: Scale
    scavenger: Scale
    swift: Scale
    fear: Scale
    burn: Scale
    freeze: Scale
    shock: Scale
    toxin: Scale
    decay: Scale
    explosion: Scale
    paralysis: Scale
    frozen: Scale
    scorched: Scale
    damage: Scale
    health: Scale
    mana: Scale
    stamina: Scale
    shield: Scale
  }
  type Effect {
    id: ID
    name: String!
    target: Int!
    turns: Int!
    modifier: Modifier
  }
  type Ability {
    id: ID!
    lvl: Int!
    """
    Ability Costs
    """
    healthCost: Int
    manaCost: Int
    staminaCost: Int
    shieldCost: Int
    """
    Stat requirement
    """
    mind: Mind
    body: Body
    soul: Soul
    """
    Repeatability checks default amount of repeats, the max amount of repeats, whether the ability can scale with stats (current), and how it scales with stats(division) (ex: bodyRepeat.dexterity = 2, every 2 dexterity causes a repeat)
    """
    repeatable: Division!
    mindRepeat: Mind
    bodyRepeat: Body
    soulRepeat: Soul
    """
    Keeps track of all effects an ability bestows
    """
    effects: [Effect]
    """
    Scaling for one time effects
    """
    damage: Scale
    health: Scale
    mana: Scale
    stamina: Scale
    shield: Scale
  }

  """
  ====================== ITEMS/EQUIPMENT/INVENTORY ======================
  """
  type Item {
    id: ID!
    name: String!
    desc: String!
    path: String!
    type: String!
    ability: String
    slots: Int
    essence: Essence
    mind: Mind
    body: Body
    soul: Soul
    perks: [String]
  }
  type Equipment {
    feet: ModItem
    arms: ModItem
    torso: ModItem
    head: ModItem
    hands: ModItem
    ringOne: ModItem
    ringTwo: ModItem
  }
  type Inventory {
    id: ID!
    owner: ID!
    one: ModItem
    two: ModItem
    three: ModItem
    four: ModItem
    five: ModItem
    six: ModItem
    seven: ModItem
    eight: ModItem
    nine: ModItem
    ten: ModItem
    eleven: ModItem
    twelve: ModItem
    thirteen: ModItem
    fourteen: ModItem
    fifteen: ModItem
    sixteen: ModItem
  }
  input SwitchItemsInput {
    firstInventory: ID!
    secondInventory: ID!
    firstItem: String!
    secondItem: String!
  }
  input DeleteItemInput {
    inventoryId: ID!
    index: Int!
  }
  input CreateItemInput {
    name: String!
    desc: String!
    path: String!
    type: String!
    ability: String
    focus: String
    essence: Int
    mindCap: Int
    bodyCap: Int
    soulCap: Int
    creation: Int
    restoration: Int
    destruction: Int
    projection: Int
    vitality: Int
    defense: Int
    strength: Int
    dexterity: Int
    luck: Int
    capacity: Int
    clarity: Int
    will: Int
    perks: [String]
  }
  """
  ====================== LEVEL MANAGER ======================
  """
  type Level {
    lvl: Int!
    xp: Int!
    capIncrease: Int!
    statIncrease: Int!
    cap: Int!
    stat: Int!
    """
    Bonus is the level which you unlock the corresponding perk in the array at
    """
    bonus: [Int]
    perks: [String]
  }

  """
  ====================== FAMILIARS/CHARACTERS ======================
  """
  type Familiar {
    id: ID!
    owner: ID
    lvl: Level!
    health: Int!
    damage: Int!
    perks: [String]
    inventory: String
  }
    type Character {
      id: ID!
      owner: ID!
      name: String!
      place: ID!
      level: Level
      alignment: Int!
      attribute: Attribute
      buffs: Buff
      debuffs: Debuff
      slots: Int!
      abilities: [String]
      cooldown: [Int]
      mind: Mind!
      body: Body!
      soul: Soul!
      health: Int!
      mana: Int!
      stamina: Int!
      shield: Int!
      perks: [String]
      effects: [Effect]
      equipment: Equipment
      inventory: String!
      familiar: String
      skin: String!
    }
  input CreateCharacterInput {
    charName: String!
    place: String!
    abilityChoice: Int!
  }
  """
  ====================== ENTERPRISE ======================
  """
  type Enterprise {
    name: String!
    level: Int
    cost: Int
  }

  """
  ====================== USER MANAGEMENT ======================
  """
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    characters: [String]!
    familiars: [String]!
    gold: Int!
    vault: [String]
    library: [String]
    laboratory: [String]
    shop: Enterprise
    auction: Enterprise
    guild: Enterprise
    smith: Enterprise
    manor: Enterprise
    palace: Enterprise
    caravan: Enterprise
    createdAt: String!
  }
  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
    username: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }

  """
  ====================== QUERY/MUTATION ======================
  """
  type Query {
    getUser(userId: ID!): User
    getCharacter(characterId: ID!): Character
    getCharacters(userId: ID!): [Character]
    getInventory(inventoryId: ID!): Inventory
    getItem(itemId: ID!): Item
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createCharacter(createCharacterInput: CreateCharacterInput): Character!
    deleteCharacter(characterId: ID!): String!
    switchItems(switchItemsInput: SwitchItemsInput): String!
    deleteItem(deleteItemInput: DeleteItemInput): String!
    deleteInventory(inventoryId: ID!): String!
    createItem(createItemInput: CreateItemInput): Item!
    removeItem(itemId: ID!): String!
  }
`;
