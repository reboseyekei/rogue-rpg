//General
import React, { useContext, useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";

//Minor Modules
import Modal from "../minor/modal";
import Inventory from "../minor/inventory";
import Stats from "../minor/stats";
import Equipment from "../minor/equipment";
import Character from "../minor/character";
import Dungeon from "../minor/dungeon";
import Players from "../minor/players";
import Occupant from "../minor/occupant";
import DungeonUI from "../minor/dungeonui";

//Contexts
import { AuthContext } from "../../helper/auth";
import { CharacterContext } from "../../helper/character";
import { PlaceContext } from "../../helper/place";

//Styles
import "../styles/base.css";

//Assets
import Load from "../../assets/loading/large_donkey_web.gif";

export default function Settlement() {
  //GENERAL VALUES
  const context = useContext(AuthContext);
  const character = useContext(CharacterContext);
  const place = useContext(PlaceContext);

  const characterId = context.character.id;
  const userId = context.user.id;

  const [modal, setModal] = useState({
    stats: false,
    character: false,
    equipment: false,
    inventory: false,
    dungeon: false,
  });

  const toggleModal = (target) => {
    let toggle = !modal[target];
    setModal({ ...modal, [target]: toggle });
  };

  //Page loading in with all data
  //Character Data
  let isPlace = character.place ? false : true;
  const { loading: characterLoad, data: characterData, refetch } = useQuery(FETCH_CHARACTER, { variables: { characterId }, pollInterval: 500 });
  const { loading: dungeonLoad, data: dungeonData } = useQuery(FETCH_DUNGEON_OUTPUT, {
    variables: { dungeonId: character.place, characterId: character.characterId },
    skip: isPlace,
    pollInterval: 100,
  });

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
      <Grid container justify="center" style={{ height: "100vh", overflow: "hidden" }}>
        <Grid item md={10} lg={11} align="center" style={{ backgroundColor: "#000" }}>
          {dungeonData ? (
            <Grid container alignContent="space-between" style={{ height: "100%" }}>
              <Grid item xs={4} style={{ height: "42.5%" }}>
                <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                    <Grid item xs={12}>
                      <DungeonUI dungeon={dungeonData.getDungeonOutput} dungeonLoad={dungeonLoad} />
                    </Grid>
                  </Slide>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={7}>
                {dungeonData.getDungeonOutput.occupants[0] ? (
                  <Slide direction="down" in={!!dungeonData.getDungeonOutput.occupants[0]} mountOnEnter unmountOnExit>
                    <Grid item xs={12}>
                      <Occupant occupant={dungeonData.getDungeonOutput.occupants[0]} turn={dungeonData.getDungeonOutput.turn} />
                    </Grid>
                  </Slide>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                  <Grid item xs={12}>
                    <Players players={dungeonData.getDungeonOutput.players} turn={dungeonData.getDungeonOutput.turn} />
                  </Grid>
                </Slide>
              </Grid>
            </Grid>
          ) : (
            <div className="loading" style={{ backgroundColor: "#000" }}>
              <img src={Load} alt="loading" />
              <h1 className="header-alternate" style={{ marginTop: "50px" }}>
                Loading...
              </h1>
            </div>
          )}
        </Grid>
        <Grid item md={2} lg={1} style={{ backgroundColor: "#1c1c1c", borderLeft: "2px solid #111", overflow: "hidden" }} align="center">
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
          <button className="side-button" onClick={() => toggleModal("dungeon")}>
            bidding
          </button>
          {modal.dungeon ? <Modal title="Dungeon" component={<Dungeon />} /> : ""}
        </Grid>
      </Grid>
    );
  }
}

const FETCH_DUNGEON_OUTPUT = gql`
  query($dungeonId: ID!, $characterId: ID!) {
    getDungeonOutput(dungeonId: $dungeonId, characterId: $characterId) {
      room {
        environment
        lifespan
        template {
          name
        }
      }
      players {
        id
        name
        spirit
        level
        skin
        health {
          max
          current
        }
        mana {
          max
          current
        }
        stamina {
          max
          current
        }
        shield {
          max
          current
        }
      }
      occupants {
        id
        name
        spirit
        level
        skin
        alignment
        health {
          max
          current
        }
        mana {
          max
          current
        }
        stamina {
          max
          current
        }
        shield {
          max
          current
        }
      }
      log
      tokens
      tokenDistribution
      totalTokens
      playerIds
      actions {
        actions
        data
      }
      leadingRooms {
        environment
        vote
      }
      turn
    }
  }
`;

const FETCH_CHARACTER = gql`
  query($characterId: ID!) {
    getCharacter(characterId: $characterId) {
      owner
      name
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
