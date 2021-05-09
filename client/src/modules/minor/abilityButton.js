//General
import React, { memo, useContext, useEffect, useState } from "react";
import { useQuery, useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Contexts
import { CharacterContext } from "../../helper/character";

//Styles
import "../styles/base.css";

function AbilityButton({ itemId, slot }) {
  //Context
  const character = useContext(CharacterContext);

  //Get Item
  const { loading: itemLoad, data: itemData } = useQuery(FETCH_ITEM, { variables: { itemId } });
  const [sendAbility, { loading: sendAbilityLoad }] = useMutation(SEND_ABILITY);

  //Getting ability off of item
  let loadingAbility = itemData ? false : true;
  let abilityId = itemData ? itemData.getItem.ability : "";
  const { loading: abilityLoad, data: abilityData } = useQuery(FETCH_ABILITY, {
    skip: loadingAbility,
    variables: { abilityId: abilityId },
  });

  if (!itemLoad && itemData && !abilityLoad && abilityData) {
    return (
      <Grid item xs={6}>
        <button
          className="submit-button"
          style={{ display: "flex", alignItems: "center", height: "60px", width: "80%", backgroundColor: "#111", cursor: "pointer" }}
          onClick={() => {
            sendAbility({ variables: { characterId: character.characterId, dungeonId: character.place, slot: slot } });
          }}
        >
          <Grid container justify="center" alignItems="center">
            <Grid item xs={5} md={3}>
              <object
                className="item"
                style={{ height: "48px", width: "48px", cursor: "grab" }}
                data={require(`../../assets/items/${abilityData.getAbility.tag}.svg`)}
                type="image/svg+xml"
              >
                <img src={require(`../../assets/items/${abilityData.getAbility.tag}.svg`)} alt={abilityData.getAbility.name} />
              </object>
            </Grid>
            <Grid item xs={7} md={9}>
              <span className="subheader" style={{ marginLeft: "20px" }}>
                {itemData.getItem.name}
              </span>
            </Grid>
          </Grid>
        </button>
      </Grid>
    );
  }
}

export default memo(AbilityButton);

const FETCH_ITEM = gql`
  query($itemId: ID!) {
    getItem(itemId: $itemId) {
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
`;

const FETCH_ABILITY = gql`
  query($abilityId: ID!) {
    getAbility(abilityId: $abilityId) {
      id
      tag
      lvl
      target
      healthCost
      manaCost
      staminaCost
      shieldCost
      mindReq
      bodyReq
      soulReq
      repeatable {
        max
        current
        division
      }
      mindRepeat {
        cap
        creation
        destruction
        restoration
        projection
      }
      bodyRepeat {
        cap
        vitality
        defense
        strength
        dexterity
      }
      soulRepeat {
        cap
        luck
        capacity
        clarity
        will
      }
      effects {
        name
        target
        turns
        modifiers {
          target
          scale {
            health {
              max
              current
              division
            }
            stamina {
              max
              current
              division
            }
            mana {
              max
              current
              division
            }
            shield {
              max
              current
              division
            }
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
            scaled
            value
          }
        }
      }
      damage {
        health {
          max
          current
          division
        }
        stamina {
          max
          current
          division
        }
        mana {
          max
          current
          division
        }
        shield {
          max
          current
          division
        }
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
        scaled
        value
      }
      healthGain {
        health {
          max
          current
          division
        }
        stamina {
          max
          current
          division
        }
        mana {
          max
          current
          division
        }
        shield {
          max
          current
          division
        }
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
        scaled
        value
      }
      manaGain {
        health {
          max
          current
          division
        }
        stamina {
          max
          current
          division
        }
        mana {
          max
          current
          division
        }
        shield {
          max
          current
          division
        }
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
        scaled
        value
      }
      staminaGain {
        health {
          max
          current
          division
        }
        stamina {
          max
          current
          division
        }
        mana {
          max
          current
          division
        }
        shield {
          max
          current
          division
        }
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
        scaled
        value
      }
      shieldGain {
        health {
          max
          current
          division
        }
        stamina {
          max
          current
          division
        }
        mana {
          max
          current
          division
        }
        shield {
          max
          current
          division
        }
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
        scaled
        value
      }
    }
  }
`;

const SEND_ABILITY = gql`
  mutation sendAbility($characterId: ID!, $dungeonId: ID!, $slot: String!) {
    sendAbility(characterId: $characterId, dungeonId: $dungeonId, slot: $slot)
  }
`;
