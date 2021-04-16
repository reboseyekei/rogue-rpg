//General
import React, { memo, useContext, useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Contexts
import { DragContext } from "../../helper/drag";
import { CharacterContext } from "../../helper/character";

//Helper Functions
import { checkCategory, categoryDetails } from "../../helper/helpers";

//Styles
import "../styles/base.css";

function Item({ itemId, enchantments, status, type, slot, setSlot }) {
  //Context
  const drag = useContext(DragContext);
  const character = useContext(CharacterContext);

  //Data
  const [fetchedItem, setFetchedItem] = useState();
  const [fetchedAbility, setFetchedAbility] = useState();
  const [itemMailer, setItemMailer] = useState({});

  //Get Item
  const { loading: itemLoad, data: itemData } = useQuery(FETCH_ITEM, { variables: { itemId } });

  //Getting ability off of item
  const [getAbility, { loading: abilityLoad, data: abilityData }] = useLazyQuery(FETCH_ABILITY);

  const bodyGenerator = (item) => {
    let typeText = "";
    let details = [];

    switch (item.type) {
      case "consumable_cap":
        typeText = (
          <h5 style={{ fontFamily: "Piazzolla", margin: 0, marginTop: "2px", textAlign: "center", color: "orchid" }} key={`${itemId}-type`}>
            Potential Gem
          </h5>
        );
        if (item.mind.cap)
          details.push(
            <h6 style={{ margin: 0, marginTop: "1px" }} key={`${itemId}-mind-cap`}>
              {`+ ${item.mind.cap} to `}
              <span style={{ color: "darkcyan", textDecoration: "underline" }}>Mind cap</span>
            </h6>
          );
        if (item.body.cap)
          details.push(
            <h6 style={{ margin: 0, marginTop: "1px" }} key={`${itemId}-body-cap`}>
              {`+ ${item.body.cap} to `}
              <span style={{ color: "firebrick", textDecoration: "underline" }}>Body cap</span>
            </h6>
          );
        if (item.soul.cap)
          details.push(
            <h6 style={{ margin: 0, marginTop: "1px" }} key={`${itemId}-soul-cap`}>
              {`+ ${item.soul.cap} to `}
              <span style={{ color: "darkorchid", textDecoration: "underline" }}>Soul cap</span>
            </h6>
          );
        if (item.slots) details.push(`+ ${item.slots} slots`);
        break;
      case "head":
        typeText = (
          <h5 style={{ fontFamily: "Piazzolla", margin: 0, marginTop: "2px", textAlign: "center", color: "crimson" }} key={`${itemId}-type`}>
            Head
          </h5>
        );
        if (checkCategory(item, "mind")) details = details.concat(categoryDetails(itemId, item.mind, "mind"));
        if (checkCategory(item, "body")) details = details.concat(categoryDetails(itemId, item.body, "body"));
        if (checkCategory(item, "soul")) details = details.concat(categoryDetails(itemId, item.soul, "soul"));
        break;
      case "ring":
        typeText = (
          <h5 style={{ fontFamily: "Piazzolla", margin: 0, marginTop: "2px", textAlign: "center", color: "crimson" }} key={`${itemId}-type`}>
            Ring
          </h5>
        );
        if (checkCategory(item, "mind")) details = details.concat(categoryDetails(itemId, item.mind, "mind"));
        if (checkCategory(item, "body")) details = details.concat(categoryDetails(itemId, item.body, "body"));
        if (checkCategory(item, "soul")) details = details.concat(categoryDetails(itemId, item.soul, "soul"));
        break;
      default:
    }

    return (
      <div>
        <div className={fetchedItem.ability ? "" : "divider"}></div>
        {typeText}
        {details.map((detail) => detail)}
      </div>
    );
  };

  useEffect(() => {
    if (itemData && !itemLoad) {
      let tempItem = itemData.getItem;
      setFetchedItem(tempItem);
      if (status === "equip") {
        let temp = character.equipped;
        temp[type] = fetchedItem;
        character.equip(temp);
      }
      if (tempItem.type === "ability" && tempItem.ability) {
        getAbility({ variables: { abilityId: tempItem.ability } });
        setItemMailer({ ...itemMailer, name: tempItem.name, desc: tempItem.desc });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemData]);

  useEffect(() => {
    if (abilityData && !abilityLoad) {
      let tempAbility = abilityData.getAbility;
      if (status === "slottedAbility") {
        let tempAbilities = character.abilities;
        tempAbilities[slot] = { ...itemMailer, ability: tempAbility };
        character.use(tempAbilities);
        setFetchedAbility(tempAbility);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abilityData]);

  if (!itemLoad && itemData && fetchedItem) {
    if (status === "slottedAbility") {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <object
            className="item"
            style={{ height: "48px", width: "48px", cursor: "grab" }}
            data={require(`../../assets/items/${fetchedItem.path}.svg`)}
            type="image/svg+xml"
          >
            <img src={require(`../../assets/items/${fetchedItem.path}.svg`)} alt={fetchedItem.name} />
          </object>
        </div>
      );
    } else {
      return (
        <div className="tooltip" style={{ display: "flex", alignItems: "center" }}>
          <object
            className="item"
            style={{ height: "48px", width: "48px", cursor: "grab" }}
            data={require(`../../assets/items/${fetchedItem.path}.svg`)}
            type="image/svg+xml"
          >
            <img src={require(`../../assets/items/${fetchedItem.path}.svg`)} alt={fetchedItem.name} />
          </object>
          {!drag.isDragging ? (
            <div
              ref={(el) => {
                if (!el) return null;
                let left = el.getBoundingClientRect().x;
                let top = el.getBoundingClientRect().y;
                let heightCap = (window.innerHeight * 2) / 4;
                let widthCap = (window.innerWidth * 2) / 4;
                if (top < heightCap) {
                  el.style.cssText = "top: 60%; left: 50%;";
                  if (left < 0) {
                    el.style.cssText = "top: 60%; left: 106%;";
                  }
                  if (left > widthCap) {
                    el.style.cssText = "top: 60%; left: -6%";
                  }
                }
                if (top > heightCap) {
                  el.style.cssText = "bottom: 60%; left: 50%";
                  if (left < 0) {
                    el.style.cssText = "bottom: 60%; left: 106%";
                  }
                  if (left > widthCap) {
                    el.style.cssText = "bottom: 60%; left: -6%";
                  }
                }
              }}
              className="tooltiptext"
            >
              <h4 key={fetchedAbility ? "placeholder" : "random"} style={{ fontFamily: "Piazzolla", margin: 0, textAlign: "center", color: "gold" }}>{fetchedItem.name}</h4>
              <h6 style={{ margin: 0, marginBottom: "2px" }}>{fetchedItem.desc}</h6>
              {bodyGenerator(fetchedItem)}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

export default memo(Item);

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
