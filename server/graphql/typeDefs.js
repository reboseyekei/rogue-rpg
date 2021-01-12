const { gql } = require("apollo-server");

module.exports = gql`
  """
  ====================== GENERAL ======================
  """
  type Division {
    max: Float
    current: Float
    division: Float
  }
  input DivisionInput {
    max: Float
    current: Float
    division: Float
  }
  type Alter {
    default: Int
    mod: Int
  }
  input AlterInput {
    default: Int
    mod: Int
  }
  type Enchantment {
    target: String!
    value: Int!
  }
  input EnchantmentInput {
    target: String!
    value: Int!
  }
  type ModItem {
    item: String
    enchantments: [Enchantment]
  }
  input ModItemInput {
    item: String
    enchantments: [EnchantmentInput]
  }
  type Essence {
    focus: String!
    value: Int!
  }
  input EssenceInput {
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
  input MindInput {
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
  input BodyInput {
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
  input SoulInput {
    cap: Int
    luck: Int
    capacity: Int
    clarity: Int
    will: Int
  }
  """
  ====================== ATTRIBUTES ======================
  """
  type Attributes {
    space: Alter
    time: Alter
    death: Alter
    life: Alter
    fire: Alter
    water: Alter
    earth: Alter
    air: Alter
  }
  input AttributesInput {
    space: AlterInput
    time: AlterInput
    death: AlterInput
    life: AlterInput
    fire: AlterInput
    water: AlterInput
    earth: AlterInput
    air: AlterInput
  }
  """
  ====================== BUFFS/DEBUFFS ======================
  """
  type Buffs {
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
    flee: Alter
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
  input BuffsInput {
    regen: AlterInput
    dread: AlterInput
    poison: AlterInput
    scorch: AlterInput
    cold: AlterInput
    spark: AlterInput
    reflect: AlterInput
    summon: AlterInput
    taunt: AlterInput
    flee: AlterInput
    immortal: Int
    strong: Int
    warped: Int
    sniper: Int
    wellspring: Int
    overcharged: Int
    scavenger: Int
    swift: Int
  }
  type Debuffs {
    """
    Value debuffs
    """
    fear: Alter
    burn: Alter
    freeze: Alter
    shock: Alter
    toxin: Alter
    decay: Alter
    bleed: Alter
    exhaustion: Alter
    """
    Timed debuffs
    """
    explosion: Int
    paralysis: Int
    frozen: Int
    scorched: Int
    sleep: Int
  }
  input DebuffsInput {
    fear: AlterInput
    burn: AlterInput
    freeze: AlterInput
    shock: AlterInput
    toxin: AlterInput
    decay: AlterInput
    bleed: AlterInput
    exhaustion: AlterInput
    explosion: Int
    paralysis: Int
    frozen: Int
    scorched: Int
    sleep: Int
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
    attributes: Attributes
    buffs: Buffs
    debuffs: Debuffs
  }
  input PerkInput {
    name: String!
    desc: String!
    attributes: AttributesInput
    buffs: BuffsInput
    debuffs: DebuffsInput
  }
  type Scale {
    """
    Scaling of value according to stats
    any # greater than 0 means that for each # of stat the value a positive multiplier is added
    any # greater than 0 means that for each # of stat the value a negative multiplier is added
    0 means no scaling
    at the end all multipliers are added together
    example one: character has 50 dex and the dex scale is 10. a 5x multiplier is applied
    example two: character has 50 dex and 20 strength. The modifier for dexterity is 10 and the modifier for strength is -10. A 3x multiplier is applied
    example three: an ability that deals 50 damage for each turn of scorched debuff, value inside Scale would be 50 and debuff.scorched would be 1

    Ideally abilities with negative modifiers won't be used but it allows for more flexibility

    Scaling of value according to health, stamina, and mana
    All previous rules apply, except instead of stat values scaling can go by:
    Your max of that stat
    Your current value of that stat
    Your division of that stat

    division will apply a multiplier to the value of your max/current

    example: character has 50 health with a max of 200, division multiplier is 2. A 8x modifier is applied
    max is equivalent to the highest value the ability scales up to
    """
    health: Division
    stamina: Division
    mana: Division
    shield: Division
    mind: Mind
    body: Body
    soul: Soul
    attributes: Attributes
    debuffs: Debuffs
    buffs: Buffs
    """
    Value decides the initial value, scaling effects how much the stats effect that value. This will usually be 1, but also 0 in the case of no scaling
    Scaled provides an easy way for the server to check if it needs to check for scaling or not
    """
    scaled: Boolean!
    value: Int!
  }
  input ScaleInput {
    health: DivisionInput
    stamina: DivisionInput
    mana: DivisionInput
    shield: DivisionInput
    mind: MindInput
    body: BodyInput
    soul: SoulInput
    attributes: AttributesInput
    debuffs: DebuffsInput
    buffs: BuffsInput
    scaled: Boolean!
    value: Int!
  }
  type Modifier {
    target: String
    scale: Scale
  }
  input ModifierInput {
    target: String
    scale: ScaleInput
  }
  type Effect {
    id: ID
    name: String!
    target: Boolean!
    turns: Int!
    modifiers: [Modifier]
  }
  input EffectInput {
    name: String!
    target: Int!
    turns: Int!
    modifiers: [ModifierInput]
  }
  type Ability {
    id: ID!
    tag: String!
    lvl: Int!
    target: Int
    """
    Ability Costs
    """
    healthCost: Int
    manaCost: Int
    staminaCost: Int
    shieldCost: Int
    """
    Stat requirement (Caps)
    """
    mindReq: Int
    bodyReq: Int
    soulReq: Int
    """
    Repeatability checks default amount of repeats, the max amount of repeats, whether the ability can scale with stats (current), and how it scales with stats(division) (ex: bodyRepeat.dexterity = 2, every 2 dexterity causes a repeat)
    """
    repeatable: Division
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
    healthGain: Scale
    manaGain: Scale
    staminaGain: Scale
    shieldGain: Scale
  }
  type AbilitiesInv {
    slotOne: ModItem
    slotTwo: ModItem
    slotThree: ModItem
    slotFour: ModItem
    slotFive: ModItem
    slotSix: ModItem
    slotSeven: ModItem
    slotEight: ModItem
    slotNine: ModItem
    slotTen: ModItem
    slotEleven: ModItem
    slotTwelve: ModItem
    slotThirteen: ModItem
    slotFourteen: ModItem
    slotFifteen: ModItem
    slotSixteen: ModItem
    slotSeventeen: ModItem
    slotEighteen: ModItem
    slotNineteen: ModItem
    slotTwenty: ModItem
  }
  input CreateAbilityInput {
    tag: String!
    lvl: Int!
    target: Int!
    healthCost: Int
    manaCost: Int
    staminaCost: Int
    shieldCost: Int
    mindReq: Int
    bodyReq: Int
    soulReq: Int
    repeatable: DivisionInput
    mindRepeat: MindInput
    bodyRepeat: BodyInput
    soulRepeat: SoulInput
    effects: [EffectInput]
    damage: ScaleInput
    healthGain: ScaleInput
    manaGain: ScaleInput
    staminaGain: ScaleInput
    shieldGain: ScaleInput
  }
  """
  ====================== ITEMS/EQUIPMENT/INVENTORY ======================
  """
  type Item {
    id: ID
    name: String
    desc: String
    path: String
    type: String
    ability: String
    slots: Int
    essence: Essence
    mind: Mind
    body: Body
    soul: Soul
    perks: [String]
  }
  type Equipment {
    id: ID!
    owner: ID!
    head: ModItem
    upperBody: ModItem
    lowerBody: ModItem
    feet: ModItem
    ringOne: ModItem
    ringTwo: ModItem
    rightHand: ModItem
    leftHand: ModItem
  }
  type Equips {
    head: Item
    upperBody: Item
    lowerBody: Item
    feet: Item
    ringOne: Item
    ringTwo: Item
    rightHand: Item
    leftHand: Item
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
  }
  input SwitchItemsInput {
    firstAnchor: ID!
    secondAnchor: ID!
    firstTarget: String!
    secondTarget: String!
  }
  input DeleteItemInput {
    inventoryId: ID!
    target: Int!
  }
  input DeleteEquipInput {
    equipmentId: ID!
    target: Int!
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
    """
    potential: How much cap you gain in all categories on level up
    capIncrease: How many cap points you gain on level up
    statIncrease: how many stat points you get on level upwww
    """
    potentialIncrease: Int!
    capIncrease: Int!
    statIncrease: Int!
    cap: Int!
    stat: Int!
    """
    How much of base stats you gain per level
    """
    health: Int!
    mana: Int!
    stamina: Int!
    shield: Int!
    """
    Bonus is the level which you unlock the corresponding perk in the array at if there are class specific perks
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
    attributes: Attributes
    buffs: Buffs
    debuffs: Debuffs
    slots: Int!
    abilitiesInv: String!
    cooldown: [Int]
    mind: Mind!
    body: Body!
    soul: Soul!
    health: Division!
    mana: Division!
    stamina: Division!
    shield: Division!
    perks: [String]
    effects: [Effect]
    equipment: String!
    inventory: String!
    familiar: String
    skin: String!
  }
  input CreateCharacterInput {
    charName: String!
    place: String!
    abilityChoice: Int!
  }
  input updateCharacterStatsInput {
    characterId: ID!
    capUsed: Int!
    statUsed: Int!
    mindCap: Int!
    bodyCap: Int!
    soulCap: Int!
    creation: Int!
    restoration: Int!
    destruction: Int!
    projection: Int!
    vitality: Int!
    defense: Int!
    strength: Int!
    dexterity: Int!
    luck: Int!
    capacity: Int!
    clarity: Int!
    will: Int!
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
    getEquipment(equipmentId: ID!): Equipment
    getEquips(equipmentId: ID!): Equips
    getItem(itemId: ID!): Item
    getActiveItem(anchor: ID!, target: String!): Item
    getAbility(abilityId: ID!): Ability
    getAbilitiesInv(abilitiesInvId: ID!): AbilitiesInv
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
    createCharacter(createCharacterInput: CreateCharacterInput): Character!
    updateCharacterStats(updateCharacterStatsInput: updateCharacterStatsInput): Character!
    deleteCharacter(characterId: ID!): String!
    switchItems(switchItemsInput: SwitchItemsInput): String!
    deleteItem(deleteItemInput: DeleteItemInput): String!
    deleteInventory(inventoryId: ID!): String!
    deleteEquip(deleteEquipInput: DeleteEquipInput): String!
    deleteEquipment(equipmentId: ID!): String!
    createItem(createItemInput: CreateItemInput): Item!
    removeItem(itemId: ID!): String!
    createAbility(createAbilityInput: CreateAbilityInput): Ability!
  }
`;
