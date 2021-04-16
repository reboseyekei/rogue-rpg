import React, { useReducer, createContext } from "react";

const initialState = {
  characterId: null,
  owner: null,
  name: null,
  spirit: null,
  party: null,
  tags: [],
  titles: [],
  place: null,
  location: null,
  level: null,
  cap: null,
  alignment: null,
  humanity: null,
  attributes: null,
  buffs: null,
  debuffs: null,
  slots: null,
  abilitiesInv: null,
  cooldown: null,
  mind: null,
  body: null,
  soul: null,
  health: null,
  mana: null,
  stamina: null,
  shield: null,
  defRes: null,
  debuffRes: null,
  perks: null,
  effects: null,
  canEquip: null,
  equipment: null,
  inventory: null,
  familiar: null,
  abilities: {
    slotOne: null,
    slotTwo: null,
    slotThree: null,
    slotFour: null,
    slotFive: null,
    slotSix: null,
    slotSeven: null,
    slotEight: null,
    slotNine: null,
    slotTen: null,
    slotEleven: null,
    slotThirteen: null,
    slotFourteen: null,
    slotFifteen: null,
    slotSixteen: null,
    slotSeventeen: null,
    slotEighteen: null,
    slotNineteen: null,
    slotTwenty: null,
    //Let status: 1 be the hero. One knows not whether it has retired or still upholds its duty; but all is peaceful
    status: 1,
  },
  equipped: { head: null, upperBody: null, leftHand: null, rightHand: null, lowerBody: null, feet: null, ringOne: null, ringTwo: null, status: 1 },
  skins: null,
  lines: null,
};

const CharacterContext = createContext({
  characterId: null,
  owner: null,
  name: null,
  spirit: null,
  party: null,
  tags: null,
  titles: null,
  place: null,
  location: null,
  cap: null,
  level: null,
  alignment: null,
  humanity: null,
  attributes: null,
  buffs: null,
  debuffs: null,
  slots: null,
  abilitiesInv: null,
  cooldown: null,
  mind: null,
  body: null,
  soul: null,
  health: null,
  mana: null,
  stamina: null,
  shield: null,
  defRes: null,
  debuffRes: null,
  perks: null,
  effects: null,
  canEquip: null,
  equipment: null,
  inventory: null,
  familiar: null,
  abilities: {
    slotOne: null,
    slotTwo: null,
    slotThree: null,
    slotFour: null,
    slotFive: null,
    slotSix: null,
    slotSeven: null,
    slotEight: null,
    slotNine: null,
    slotTen: null,
    slotEleven: null,
    slotThirteen: null,
    slotFourteen: null,
    slotFifteen: null,
    slotSixteen: null,
    slotSeventeen: null,
    slotEighteen: null,
    slotNineteen: null,
    slotTwenty: null,
    status: 1,
  },
  equipped: { head: null, upperBody: null, leftHand: null, rightHand: null, lowerBody: null, feet: null, ringOne: null, ringTwo: null, status: 1 },
  skins: null,
  lines: null,
  update: (data) => {},
  equip: (data) => {},
  use: (data) => {},
  reset: () => {},
});

function characterReducer(state, action) {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        characterId: action.payload.characterId,
        owner: action.payload.owner,
        name: action.payload.name,
        spirit: action.payload.spirit,
        party: action.payload.party,
        tags: action.payload.tags,
        titles: action.payload.titles,
        place: action.payload.place,
        location: action.payload.location,
        cap: action.payload.cap,
        level: action.payload.level,
        alignment: action.payload.alignment,
        humanity: action.payload.humanity,
        attributes: action.payload.attributes,
        buffs: action.payload.buffs,
        debuffs: action.payload.debuffs,
        slots: action.payload.slots,
        abilitiesInv: action.payload.abilitiesInv,
        cooldown: action.payload.cooldown,
        mind: action.payload.mind,
        body: action.payload.body,
        soul: action.payload.soul,
        health: action.payload.health,
        mana: action.payload.mana,
        stamina: action.payload.stamina,
        shield: action.payload.shield,
        defRes: action.payload.defRes,
        debuffRes: action.payload.debuffRes,
        perks: action.payload.perks,
        effects: action.payload.effects,
        canEquip: action.payload.canEquip,
        equipment: action.payload.equipment,
        inventory: action.payload.inventory,
        familiar: action.payload.familiar,
        skins: action.payload.skins,
        lines: action.payload.lines,
      };
    case "EQUIP":
      return {
        ...state,
        equipped: action.payload,
      };
    case "USE":
      return {
        ...state,
        abilities: action.payload,
      };
    case "PLACE":
      return {
        ...state,
        place: action.payload,
      };
    case "RESET":
      return {
        ...state,
        characterId: null,
        owner: null,
        name: null,
        spirit: null,
        party: null,
        tags: [],
        titles: [],
        place: null,
        location: null,
        level: null,
        cap: null,
        alignment: null,
        humanity: null,
        attributes: null,
        buffs: null,
        debuffs: null,
        slots: null,
        abilitiesInv: null,
        cooldown: null,
        mind: null,
        body: null,
        soul: null,
        health: null,
        mana: null,
        stamina: null,
        shield: null,
        defRes: null,
        debuffRes: null,
        perks: null,
        effects: null,
        canEquip: null,
        equipment: null,
        inventory: null,
        familiar: null,
        abilities: {
          slotOne: null,
          slotTwo: null,
          slotThree: null,
          slotFour: null,
          slotFive: null,
          slotSix: null,
          slotSeven: null,
          slotEight: null,
          slotNine: null,
          slotTen: null,
          slotEleven: null,
          slotThirteen: null,
          slotFourteen: null,
          slotFifteen: null,
          slotSixteen: null,
          slotSeventeen: null,
          slotEighteen: null,
          slotNineteen: null,
          slotTwenty: null,
          status: 1,
        },
        equipped: { head: null, upperBody: null, leftHand: null, rightHand: null, lowerBody: null, feet: null, ringOne: null, ringTwo: null, status: 1 },
        skins: null,
        lines: null,
      };
    default:
      return state;
  }
}

function CharacterProvider(props) {
  const [state, dispatch] = useReducer(characterReducer, initialState);

  function update(data) {
    dispatch({
      type: "UPDATE",
      payload: data,
    });
  }

  function equip(data) {
    dispatch({
      type: "EQUIP",
      payload: data,
    });
  }

  function use(data) {
    dispatch({
      type: "USE",
      payload: data,
    });
  }

  function reset() {
    dispatch({
      type: "RESET",
    });
  }

  return (
    <CharacterContext.Provider
      value={{
        characterId: state.characterId,
        owner: state.owner,
        name: state.name,
        spirit: state.spirit,
        party: state.party,
        tags: state.tags,
        titles: state.titles,
        place: state.place,
        cap: state.cap,
        level: state.level,
        alignment: state.alignment,
        humanity: state.humanity,
        attributes: state.attributes,
        buffs: state.buffs,
        debuffs: state.debuffs,
        slots: state.slots,
        abilitiesInv: state.abilitiesInv,
        cooldown: state.cooldown,
        mind: state.mind,
        body: state.body,
        soul: state.soul,
        health: state.health,
        mana: state.mana,
        stamina: state.stamina,
        shield: state.shield,
        defRes: state.defRes,
        debuffRes: state.debuffRes,
        perks: state.perks,
        effects: state.effects,
        canEquip: state.canEquip,
        equipment: state.equipment,
        inventory: state.inventory,
        familiar: state.familiar,
        skins: state.skins,
        lines: state.lines,
        equipped: state.equipped,
        abilities: state.abilities,
        update,
        equip,
        use,
        reset,
      }}
      {...props}
    />
  );
}

export { CharacterContext, CharacterProvider };
