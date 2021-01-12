import React, { useReducer, createContext } from "react";

const initialState = {
  characterId: null,
  owner: null,
  name: null,
  place: null,
  level: null,
  alignment: null,
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
  perks: null,
  effects: null,
  equipment: null,
  inventory: null,
  familiar: null,
  skin: null,
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
};

const CharacterContext = createContext({
  characterId: null,
  owner: null,
  name: null,
  place: null,
  level: null,
  alignment: null,
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
  perks: null,
  effects: null,
  equipment: null,
  inventory: null,
  familiar: null,
  skin: null,
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
  update: (data) => {},
  equip: (data) => {},
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
        place: action.payload.place,
        level: action.payload.level,
        alignment: action.payload.alignment,
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
        perks: action.payload.perks,
        effects: action.payload.effects,
        equipment: action.payload.equipment,
        inventory: action.payload.inventory,
        familiar: action.payload.familiar,
        skin: action.payload.skin,
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
    case "RESET":
      return {
        ...state,
        characterId: null,
        owner: null,
        name: null,
        place: null,
        level: null,
        alignment: null,
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
        perks: null,
        effects: null,
        equipment: null,
        inventory: null,
        familiar: null,
        skin: null,
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
        place: state.place,
        level: state.level,
        alignment: state.alignment,
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
        perks: state.perks,
        effects: state.effects,
        equipment: state.equipment,
        inventory: state.inventory,
        familiar: state.familiar,
        skin: state.skin,
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
