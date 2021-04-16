//General
import React, { useContext, useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Minor Modules
import Modal from "../minor/modal";
import Inventory from "../minor/inventory";
import Stats from "../minor/stats";
import Equipment from "../minor/equipment";
import Character from "../minor/character";
import Party from "../minor/party";
import Venture from "../minor/venture";

//Contexts
import { AuthContext } from "../../helper/auth";
import { CharacterContext } from "../../helper/character";
import { PlaceContext } from "../../helper/place";

//Styles
import "../styles/base.css";

//Assets

export default function Settlement() {
  //GENERAL VALUES
  const context = useContext(AuthContext);
  const character = useContext(CharacterContext);
  const place = useContext(PlaceContext);

  const characterId = context.character.id;
  const userId = context.user.id;

  const [modal, setModal] = useState({
    stats: false,
    equipment: false,
    inventory: false,
    vault: false,
    party: false,
    character: false,
    venture: false,
  });

  const toggleModal = (target) => {
    let toggle = !modal[target];
    setModal({ ...modal, [target]: toggle });
  };

  //Page loading in with all data
  //Character Data
  const { loading: characterLoad, data: characterData, refetch } = useQuery(FETCH_CHARACTER, { variables: { characterId }, pollInterval: 500 });

  //Getting user vaults
  const { loading: vaultLoad, data: vaultData } = useQuery(FETCH_VAULTS, { variables: { userId } });

  //Getting equipped items, important for applying stats without renders (Lazy Query)
  const [getEquips, { loading: equipmentLoad, data: equipmentData }] = useLazyQuery(FETCH_EQUIPS);

  useEffect(() => {
    if (!characterLoad) {
      let tempData = characterData;
      let tempCharacter = tempData.getCharacter;
      character.update({ ...tempCharacter, characterId: characterId });
      let tempEquipment = tempCharacter.equipment;
      getEquips({ variables: { equipmentId: tempEquipment } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterData]);

  useEffect(() => {
    if (equipmentData && !equipmentLoad) {
      let tempData = equipmentData.getEquips;
      character.equip(tempData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipmentData]);

  if (characterLoad) {
    return "";
  } else {
    return (
      <Grid container justify="center" style={{ height: "100vh" }}>
        <Grid item md={10} lg={11} align="center">
          <h1 className="header">{place.name}</h1>
          <h1 className="subheader-alternate">{place.desc}</h1>
        </Grid>
        <Grid item md={2} lg={1} style={{ backgroundColor: "#1c1c1c", borderLeft: "2px solid black", overflow: "hidden" }} align="center">
          <button className="side-button" onClick={() => toggleModal("character")}>
            character
          </button>
          {modal.character ? <Modal title="Character" component={<Character />} /> : ""}
          <button className="side-button" onClick={() => toggleModal("stats")}>
            stats
          </button>
          {modal.stats ? (
            <Modal
              title={characterData.getCharacter.name}
              subtitle={
                <div>
                  <h4 className="subheader">{`Level ${characterData.getCharacter.level.lvl}`}</h4>
                </div>
              }
              component={<Stats characterId={characterId} refetch={refetch} refreshData={characterLoad} />}
            />
          ) : (
            ""
          )}
          <button className="side-button" onClick={() => toggleModal("equipment")}>
            equipment
          </button>
          {modal.equipment ? <Modal title="Equipment" component={<Equipment equipmentId={characterData.getCharacter.equipment} />} /> : ""}
          <button className="side-button" onClick={() => toggleModal("inventory")}>
            inventory
          </button>
          {modal.inventory ? <Modal title="Inventory" component={<Inventory inventoryId={characterData.getCharacter.inventory} />} /> : ""}
          <button className="side-button" onClick={() => toggleModal("vault")}>
            vault
          </button>
          {modal.vault && !vaultLoad ? <Modal title="Vault" component={<Inventory inventoryId={vaultData.getUser.vault[0]} />} /> : ""}
          <button className="side-button" onClick={() => toggleModal("party")}>
            party
          </button>
          {modal.party && character.place ? <Modal title="Party" component={<Party />} /> : ""}
          <button className="side-button" onClick={() => toggleModal("venture")}>
            venture
          </button>
          {modal.venture && character.place ? <Modal title="Venture" component={<Venture />} /> : ""}
        </Grid>
      </Grid>
    );
  }
}

const FETCH_CHARACTER = gql`
  query($characterId: ID!) {
    getCharacter(characterId: $characterId) {
      owner
      name
      party
      spirit
      place
      tags
      titles
      level {
        lvl
        xp
        cap
        stat
      }
      alignment
      humanity
      slots
      cooldowns
      mind {
        cap
        creation
        destruction
        restoration
        projection
      }
      body {
        cap
        vitality
        defense
        strength
        dexterity
      }
      soul {
        cap
        luck
        capacity
        clarity
        will
      }
      attributes {
        space {
          default
          mod
        }
        time {
          default
          mod
        }
        death {
          default
          mod
        }
        life {
          default
          mod
        }
        fire {
          default
          mod
        }
        water {
          default
          mod
        }
        earth {
          default
          mod
        }
        air {
          default
          mod
        }
      }
      buffs {
        regen {
          default
          mod
        }
        dread {
          default
          mod
        }
        poison {
          default
          mod
        }
        scorch {
          default
          mod
        }
        cold {
          default
          mod
        }
        spark {
          default
          mod
        }
        reflect {
          default
          mod
        }
        summon {
          default
          mod
        }
        taunt {
          default
          mod
        }
        flee {
          default
          mod
        }
        immortal
        strong
        warped
        sniper
        wellspring
        overcharged
        scavenger
        swift
      }
      debuffs {
        fear {
          default
          mod
        }
        burn {
          default
          mod
        }
        freeze {
          default
          mod
        }
        shock {
          default
          mod
        }
        toxin {
          default
          mod
        }
        decay {
          default
          mod
        }
        bleed {
          default
          mod
        }
        exhaustion {
          default
          mod
        }
        explosion
        paralysis
        frozen
        scorched
        sleep
      }
      perks
      abilitiesInv
      equipment
      inventory
      familiar
      skins
      health {
        max
        current
        division
      }
      mana {
        max
        current
        division
      }
      stamina {
        max
        current
        division
      }
      shield {
        max
        current
        division
      }
      defRes
      debuffRes
    }
  }
`;

const FETCH_VAULTS = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      vault
    }
  }
`;

const FETCH_EQUIPS = gql`
  query($equipmentId: ID!) {
    getEquips(equipmentId: $equipmentId) {
      head {
        name
        desc
        path
        type
        ability
        slots
        mind {
          cap
          creation
          restoration
          destruction
          projection
        }
        body {
          cap
          vitality
          defense
          strength
          dexterity
        }
        soul {
          cap
          luck
          capacity
          clarity
          will
        }
        essence {
          focus
          value
        }
      }
      upperBody {
        name
        desc
        path
        type
        ability
        slots
        mind {
          cap
          creation
          restoration
          destruction
          projection
        }
        body {
          cap
          vitality
          defense
          strength
          dexterity
        }
        soul {
          cap
          luck
          capacity
          clarity
          will
        }
        essence {
          focus
          value
        }
      }
      lowerBody {
        name
        desc
        path
        type
        ability
        slots
        mind {
          cap
          creation
          restoration
          destruction
          projection
        }
        body {
          cap
          vitality
          defense
          strength
          dexterity
        }
        soul {
          cap
          luck
          capacity
          clarity
          will
        }
        essence {
          focus
          value
        }
      }
      feet {
        name
        desc
        path
        type
        ability
        slots
        mind {
          cap
          creation
          restoration
          destruction
          projection
        }
        body {
          cap
          vitality
          defense
          strength
          dexterity
        }
        soul {
          cap
          luck
          capacity
          clarity
          will
        }
        essence {
          focus
          value
        }
      }
      leftHand {
        name
        desc
        path
        type
        ability
        slots
        mind {
          cap
          creation
          restoration
          destruction
          projection
        }
        body {
          cap
          vitality
          defense
          strength
          dexterity
        }
        soul {
          cap
          luck
          capacity
          clarity
          will
        }
        essence {
          focus
          value
        }
      }
      rightHand {
        name
        desc
        path
        type
        ability
        slots
        mind {
          cap
          creation
          restoration
          destruction
          projection
        }
        body {
          cap
          vitality
          defense
          strength
          dexterity
        }
        soul {
          cap
          luck
          capacity
          clarity
          will
        }
        essence {
          focus
          value
        }
      }
      ringOne {
        name
        desc
        path
        type
        ability
        slots
        mind {
          cap
          creation
          restoration
          destruction
          projection
        }
        body {
          cap
          vitality
          defense
          strength
          dexterity
        }
        soul {
          cap
          luck
          capacity
          clarity
          will
        }
        essence {
          focus
          value
        }
      }
      ringTwo {
        name
        desc
        path
        type
        ability
        slots
        mind {
          cap
          creation
          restoration
          destruction
          projection
        }
        body {
          cap
          vitality
          defense
          strength
          dexterity
        }
        soul {
          cap
          luck
          capacity
          clarity
          will
        }
        essence {
          focus
          value
        }
      }
    }
  }
`;
