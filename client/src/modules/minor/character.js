//General
import React, { useState, useContext, useEffect, memo } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Minor Modules
import Item from "./item";

//Contexts
import { DragContext } from "../../helper/drag";
import { CharacterContext } from "../../helper/character";

//Helpers
import { parseEquipped, abilityArray, slottedAbilityDetails } from "../../helper/helpers";

//Styles
import "../styles/base.css";

//Assets
import Loading from "../../assets/loading/donkey_web.gif";

function Character() {
  //Data
  const character = useContext(CharacterContext);
  const drag = useContext(DragContext);

  //Get Equipped items
  const { loading: equipmentLoad, data: equipmentData } = useQuery(FETCH_EQUIPS, { variables: { equipmentId: character.equipment }, pollInterval: 1000 });

  //Get Abilities
  const { loading: abilitiesInvLoad, data: abilitiesInvData, refetch } = useQuery(FETCH_ABILITIES_INV, {
    variables: { abilitiesInvId: character.abilitiesInv },
    pollInterval: 200,
  });

  //Switch items
  const [switchItems] = useMutation(SWITCH_ITEMS, {
    variables: { firstAnchor: drag.draggedFrom, secondAnchor: drag.draggedTo, firstTarget: drag.dragging, secondTarget: drag.draggedOn },
  });

  const [changeSkin, {loading: skinLoad}] = useMutation(CHANGE_SKIN);

  //Calculations
  //stores stat values of items equipped
  const [stat, setStat] = useState(parseEquipped(character.equipped));

  //stores how many slots you have available persistently
  const [slots, setSlots] = useState(abilityArray(character.slots + stat.slots));

  //Values: used for vanity only
  const [values, setValues] = useState({
    skinIndex: "",
    characterId: character.characterId,
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const resetValues = () => {
    setValues({
      skinIndex: "",
      characterId: character.characterId,
    });
  };

  //stores ability inventory (all ability slot id's)
  const [storedAbilities, setStoredAbilities] = useState();

  useEffect(() => {
    if (!equipmentLoad && equipmentData) {
      let tempEquipment = equipmentData.getEquips;
      character.equip(tempEquipment);
      setStat(parseEquipped(character.equipped));
      setSlots(abilityArray(character.slots + stat.slots));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipmentData]);

  useEffect(() => {
    if (!abilitiesInvLoad && abilitiesInvData) {
      let tempAbilities = abilitiesInvData.getAbilitiesInv;
      setStoredAbilities(tempAbilities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abilitiesInvData]);

  //Display
  const [selected, setSelected] = useState({
    character: true,
    stats: false,
    relations: false,
    vanity: false,
    connections: false,
    abilities: false,
  });

  const select = (target) => {
    setSelected({ character: false, stats: false, relations: false, vanity: false, connections: false, abilities: false, [target]: true });
  };

  const backgroundCalc = (target) => {
    if (selected[target]) {
      return "rgb(133, 20, 133)";
    } else {
      return "darkred";
    }
  };

  const colorCalc = (anchor) => {
    if (anchor === "mind") {
      return "darkcyan";
    } else if (anchor === "body") {
      return "firebrick";
    } else if (anchor === "soul") {
      return "darkorchid";
    }
  };

  const backgroundCalculator = (slot) => {
    if (drag.isDragging) {
      if (slot === drag.dragging && character.abilitiesInv === drag.draggedFrom) {
        return "#000";
      }
      if (slot === drag.draggedOn && character.abilitiesInv === drag.draggedTo) {
        return "#111";
      }
    } else {
      return "#333";
    }
  };

  //mapping targets
  const anchors = ["mind", "body", "soul"];
  const targets = [
    ["creation", "destruction", "restoration", "projection"],
    ["vitality", "defense", "strength", "dexterity"],
    ["luck", "capacity", "clarity", "will"],
  ];

  //TODO use this somewhere else
  // let alignmentText;
  // if (character.alignment > 300) alignmentText = "King Incarnate";
  // if (character.alignment > 100) alignmentText = "Saint";
  // if (character.alignment > 50) alignmentText = "Hero";
  // if (character.alignment > 10) alignmentText = "Good";
  // if (character.alignment <= 10 && character.alignment >= -10) alignmentText = "Neutral";
  // if (character.alignment < -10) alignmentText = "Impure";
  // if (character.alignment < -50) alignmentText = "Asura";
  // if (character.alignment < -100) alignmentText = "Sage";
  // if (character.alignment < -300) alignmentText = "Demon Incarnate";

  //Dragging (abilities tab)
  const dragStart = (event, target) => {
    let img = new Image();
    img.src = "";
    event.dataTransfer.setDragImage(img, 0, 0);
    drag.start({ firstAnchor: character.abilitiesInv, firstTarget: target });
  };

  const dragOver = (event, target) => {
    event.preventDefault();
    drag.over({ secondAnchor: character.abilitiesInv, secondTarget: target });
  };

  const finishDrag = async () => {
    if (drag.draggedFrom && drag.draggedOn) {
      if (drag.dragging.substring(0, 4) === "slot") {
        let tempAbilities = character.abilities;
        tempAbilities[drag.dragging] = null;
        character.use(tempAbilities);
      }
      switchItems();
      refetch();
    }
    drag.drop();
  };

  const capitalize = (word) => {
    let string = word[0];
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  let healthMax = character.health.max + character.body.cap * 2 + character.body.vitality * 4 + stat.body.cap * 2 + stat.body.vitality * 4;
  let healthRegen =
    character.health.division + character.soul.cap + character.body.vitality + character.body.defense + stat.soul.cap + stat.body.vitality + stat.body.defense;
  let manaMax =
    character.mana.max +
    character.mind.cap * 2 +
    character.soul.capacity * 4 +
    character.soul.clarity * 2 +
    stat.mind.cap * 2 +
    stat.soul.capacity * 4 +
    stat.soul.clarity * 2;
  let manaRegen =
    character.mana.division +
    character.soul.cap +
    character.soul.clarity * 2 +
    character.soul.capacity * 1 +
    character.mind.cap * 0.25 +
    stat.soul.cap +
    stat.soul.clarity * 2 +
    stat.soul.capacity * 1 +
    stat.mind.cap * 0.25;
  let staminaMax = character.stamina.max + character.body.strength * 4 + character.body.dexterity * 2 + stat.body.strength * 4 + stat.body.dexterity * 2;
  let staminaRegen = character.stamina.division + character.body.strength + character.body.dexterity * 2 + stat.body.strength + stat.body.dexterity;
  let shieldMax = character.shield.max + character.mind.projection * 5 + stat.mind.projection * 5;
  let shieldRegen = character.shield.division + character.mind.projection * 0.5 + stat.mind.projection * 0.5;
  let highestStat = Math.max(healthMax, manaMax, staminaMax, shieldMax);

  let healthMeasure;
  let manaMeasure;
  let staminaMeasure;
  let shieldMeasure;

  let damageReduction = character.defRes + character.body.defense * 0.5 + character.soul.will * 0.25;
  let debuffResistance = character.debuffRes + character.soul.will * 2 + character.body.defense * 0.5;

  if (healthMax === highestStat) {
    healthMeasure = "100%";
    manaMeasure = `${(manaMax / healthMax) * 100}%`;
    staminaMeasure = `${(staminaMax / healthMax) * 100}%`;
    shieldMeasure = `${(shieldMax / healthMax) * 100}%`;
  } else if (manaMax === highestStat) {
    manaMeasure = "100%";
    healthMeasure = `${(healthMax / manaMax) * 100}%`;
    staminaMeasure = `${(staminaMax / manaMax) * 100}%`;
    shieldMeasure = `${(shieldMax / manaMax) * 100}%`;
  } else if (staminaMax === highestStat) {
    staminaMeasure = "100%";
    healthMeasure = `${(healthMax / staminaMax) * 100}%`;
    manaMeasure = `${(manaMax / staminaMax) * 100}%`;
    shieldMeasure = `${(shieldMax / staminaMax) * 100}%`;
  } else if (shieldMax === highestStat) {
    shieldMeasure = "100%";
    healthMeasure = `${(healthMax / shieldMax) * 100}%`;
    manaMeasure = `${(manaMax / shieldMax) * 100}%`;
    staminaMeasure = `${(staminaMax / shieldMax) * 100}%`;
  }

  let expCalc = character.level.lvl * character.level.lvl * 10 + 5;

  const viewManager = () => {
    if (selected.character) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                {character.name}
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}>
            <h1 className="subheader">{`EXP: ${character.level.xp}/${expCalc}`}</h1>
            <div style={{ backgroundColor: "#111", paddingTop: "10px", marginTop: "10px", paddingBottom: "10px", height: "350px", borderRadius: "5px" }}>
              <div style={{ padding: "10px" }}>
                <h1 className="subheader" style={{ fontSize: "12px", textAlign: "left", marginLeft: "8px" }}>
                  {`Health: ${character.health.current}/${healthMax}`}
                </h1>
                <div
                  className="stat-bar"
                  data-total={`${healthMax}`}
                  data-value={`${character.health.current}`}
                  style={{ width: healthMeasure, marginRight: "auto" }}
                >
                  <div className="bar" style={{ background: "#c54" }}>
                    <div className="hit"></div>
                  </div>
                </div>
                <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "6px", marginTop: "5px" }}>
                  {`  regen: ${healthRegen} per turn`}
                </h1>
              </div>
              <div style={{ padding: "10px" }}>
                <h1 className="subheader" style={{ fontSize: "12px", textAlign: "left", marginLeft: "8px" }}>
                  {`Mana: ${character.mana.current}/${manaMax}`}
                </h1>
                <div
                  className="stat-bar"
                  data-total={`${manaMax}`}
                  data-value={`${character.mana.current}`}
                  style={{ width: manaMeasure, marginRight: "auto" }}
                >
                  <div className="bar" style={{ background: "#4474cc" }}>
                    <div className="hit"></div>
                  </div>
                </div>
                <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "6px", marginTop: "5px" }}>
                  {`  regen: ${manaRegen} per turn`}
                </h1>
              </div>
              <div style={{ padding: "10px" }}>
                <h1 className="subheader" style={{ fontSize: "12px", textAlign: "left", marginLeft: "8px" }}>
                  {`Stamina: ${character.stamina.current}/${staminaMax}`}
                </h1>
                <div
                  className="stat-bar"
                  data-total={`${staminaMax}`}
                  data-value={`${character.stamina.current}`}
                  style={{ width: staminaMeasure, marginRight: "auto" }}
                >
                  <div className="bar" style={{ background: "#44cc64" }}>
                    <div className="hit"></div>
                  </div>
                </div>
                <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "6px", marginTop: "5px" }}>
                  {`  regen: ${staminaRegen} per turn`}
                </h1>
              </div>
              <div style={{ padding: "10px", marginBottom: "5px" }}>
                <h1 className="subheader" style={{ fontSize: "12px", textAlign: "left", marginLeft: "8px" }}>
                  {`Shield: ${character.shield.current}/${shieldMax}`}
                </h1>
                {shieldMax > 0 ? (
                  <div
                    className="stat-bar"
                    data-total={`${shieldMax}`}
                    data-value={`${character.shield.current}`}
                    style={{ width: shieldMeasure, marginRight: "auto", minWidth: "20px" }}
                  >
                    <div className="bar" style={{ background: "#7132a8" }}>
                      <div className="hit"></div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "6px", marginTop: "5px" }}>
                  {`  regen: ${shieldRegen} flat and 10% max shield per turn`}
                </h1>
              </div>
              <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "16px", marginTop: "5px" }}>
                {`  Damage reduction: ${damageReduction}`}
              </h1>
              <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "16px", marginTop: "5px" }}>
                {`  Debuff Resistance: ${debuffResistance}`}
              </h1>
            </div>
          </div>
        </div>
      );
    } else if (selected.stats) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "20px" }}>
            <Grid container alignItems="flex-end" style={{ marginTop: "10px" }}>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <h1 className="subheader" style={{ fontSize: "12px" }}>
                  total
                </h1>
              </Grid>
              <Grid item xs={3}>
                <h1 className="subheader" style={{ fontSize: "12px" }}>
                  stats
                </h1>
              </Grid>
              <Grid item xs={3}>
                <h1 className="subheader" style={{ fontSize: "12px" }}>
                  equips
                </h1>
              </Grid>
            </Grid>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}>
            <div>
              {anchors.map((anchor, index) => (
                <Grid container style={{ color: colorCalc(anchor), marginBottom: "18px" }} key={`${anchor}-${index}`}>
                  <Grid item xs={3}>
                    <h1 className="subheader" style={{ fontSize: "14px", textTransform: "capitalize", textAlign: "right" }}>
                      {`${anchor} Cap`}
                    </h1>
                  </Grid>
                  <Grid item xs={3} className="text-outline">
                    <h1 className="subheader" style={{ fontSize: "14px" }}>
                      {`${character[anchor].cap + stat[anchor].cap}`}
                    </h1>
                  </Grid>
                  <Grid item xs={3}>
                    <h1 className="subheader" style={{ fontSize: "12px" }}>
                      {character[anchor].cap}
                    </h1>
                  </Grid>
                  <Grid item xs={3}>
                    <h1 className="subheader" style={{ fontSize: "12px" }}>
                      {stat[anchor].cap}
                    </h1>
                  </Grid>
                  {targets[index].map((target, targetIndex) => (
                    <Grid item xs={12} style={{ marginBottom: "3px", marginTop: targetIndex === 0 ? "3px" : "0px" }} key={`${anchor}-${target}`}>
                      <Grid container>
                        <Grid item xs={3}>
                          <h1 className="subheader" style={{ fontSize: "11px", textTransform: "capitalize", textAlign: "right" }}>
                            {`${target}`}
                          </h1>
                        </Grid>
                        <Grid item xs={3} className="text-outline">
                          <h1 className="subheader" style={{ fontSize: "14px" }}>
                            {`${character[anchor][target] + stat[anchor][target]}`}
                          </h1>
                        </Grid>
                        <Grid item xs={3}>
                          <h1 className="subheader" style={{ fontSize: "11px" }}>
                            {character[anchor][target]}
                          </h1>
                        </Grid>
                        <Grid item xs={3}>
                          <h1 className="subheader" style={{ fontSize: "11px" }}>
                            {stat[anchor][target]}
                          </h1>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (selected.abilities) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                Abilities
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}>
            {slots.map((slot, index) => (
              <Grid
                container
                alignItems="center"
                style={{
                  padding: "10px",
                  backgroundColor: "#222",
                  borderRadius: "5px",
                  width: "100%",
                  minHeight: "200px",
                  marginBottom: "20px",
                  border: "2px solid black",
                }}
                key={`${character.id}-${slot}`}
              >
                <Grid item xs={2}>
                  <div className="inventory" style={{ height: "60px", width: "60px", backgroundColor: "#000", marginBottom: "-10px" }}>
                    <li
                      style={{ backgroundColor: backgroundCalculator(slot), cursor: storedAbilities[slot].item ? "grab" : "default" }}
                      className="slot"
                      draggable={storedAbilities[slot].item ? true : false}
                      onDragStart={(e) => dragStart(e, slot)}
                      onDragOver={(e) => dragOver(e, slot)}
                      onDragLeave={drag.leave}
                      onDrop={finishDrag}
                    >
                      {storedAbilities[slot].item ? <Item itemId={storedAbilities[slot].item} status="slottedAbility" slot={slot} /> : null}
                    </li>
                  </div>
                </Grid>
                <Grid item xs={10} style={{ paddingTop: "8px", paddingLeft: "15px" }}>
                  <Grid item xs={12} style={{ height: "20px" }}>
                    <Grid container>
                      <Grid item xs={6}>
                        <h1 className="subheader" style={{ fontSize: "14px", textAlign: "left", marginLeft: "15px" }}>
                          {character.abilities[slot] ? character.abilities[slot].name : ""}
                        </h1>
                      </Grid>
                      <Grid item xs={6}>
                        <h1 className="subheader" style={{ fontSize: "12px" }}>
                          {character.abilities[slot] ? `level ${character.abilities[slot].ability.lvl}` : ""}
                        </h1>
                      </Grid>
                    </Grid>
                  </Grid>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <h1
                      className="subheader"
                      style={{
                        fontSize: "15px",
                        textAlign: "left",
                        marginTop: "2px",
                        lineHeight: "1.6",
                        fontFamily: "Piazzolla",
                        backgroundColor: "#111",
                        borderRadius: "5px",
                        padding: "5px",
                        paddingLeft: "10px",
                        marginLeft: "-5px",
                        width: "100%",
                        height: "55px",
                      }}
                    >
                      {character.abilities[slot] ? character.abilities[slot].desc : ""}
                    </h1>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    padding: "5px",
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    backgroundColor: "#111",
                    borderRadius: "5px",
                    minHeight: "80px",
                  }}
                >
                  {character.abilities[slot] ? slottedAbilityDetails(character.abilities[slot], character, stat).map((field) => field) : ""}
                </Grid>
              </Grid>
            ))}
          </div>
        </div>
      );
    } else if (selected.relations) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                relations (WIP)
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}></div>
        </div>
      );
    } else if (selected.vanity) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                Vanity
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}>
            <Grid container>
              <Grid item xs={12}>
                {" "}
                <img
                  src={require(`../../assets/skins/${character.skins[0]}.jpg`)}
                  style={{ height: "200px", borderRadius: "5px", border: "2.5px solid #222" }}
                  alt={`character graphic for ${character.skins[0]}`}
                />
                <h1 className="subheader">{capitalize(character.skins[0])}</h1>
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="skinSelect">Select Skin</label>
                <select id="skinSelect" name="skinIndex" value={values.skinIndex} onChange={handleChange}>
                  <option value=""></option>
                  {character.skins[1].map((skin, index) => (
                    <option key={skin} value={index}>
                      {skin}
                    </option>
                  ))}
                </select>
              </Grid>
              <Grid item xs={12}>
                <button
                  className="submit-button"
                  onClick={() => {
                    if (values.skinIndex) {
                      let newValues = values;
                      newValues.skinIndex = parseInt(newValues.skinIndex);
                      setValues(newValues);
                      changeSkin({ variables: values });
                    }
                  }}
                  style={{ marginBottom: "10px", width: "82.5%", marginTop: "auto" }}
                  disabled={skinLoad}
                >
                  {skinLoad ? <img src={Loading} alt="loading" style={{ marginTop: "-10px" }} /> : "Change Skin"}
                </button>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    } else if (selected.connections) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                connections (WIP)
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}></div>
        </div>
      );
    } else {
      return <h1>uh oh, an error has occurred</h1>;
    }
  };

  return (
    <div className="stats" style={{ width: "520px" }}>
      <Grid style={{ marginBottom: "10px", width: "100%" }} container justify="space-between" align="start" spacing={1}>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("character") }} onClick={() => select("character")}>
            character
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("stats") }} onClick={() => select("stats")}>
            stats
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("abilities") }} onClick={() => select("abilities")}>
            abilities
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("relations") }} onClick={() => select("relations")}>
            relations
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("connections") }} onClick={() => select("connections")}>
            connections
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("vanity") }} onClick={() => select("vanity")}>
            vanity
          </button>
        </Grid>
      </Grid>
      <div className="divider-alternate" style={{ marginBottom: "15px" }}></div>
      {character.name ? <div className="stats-container">{viewManager()}</div> : ""}
    </div>
  );
}

export default memo(Character);

const SWITCH_ITEMS = gql`
  mutation switchItems($firstAnchor: ID!, $secondAnchor: ID!, $firstTarget: String!, $secondTarget: String!) {
    switchItems(switchItemsInput: { firstAnchor: $firstAnchor, secondAnchor: $secondAnchor, firstTarget: $firstTarget, secondTarget: $secondTarget })
  }
`;

const CHANGE_SKIN = gql`
  mutation changeSkin($skinIndex: Int!, $characterId: ID!) {
    changeSkin(skinIndex: $skinIndex, characterId: $characterId) {
      name
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

const FETCH_ABILITIES_INV = gql`
  query($abilitiesInvId: ID!) {
    getAbilitiesInv(abilitiesInvId: $abilitiesInvId) {
      slotOne {
        item
        enchantments {
          target
          value
        }
      }
      slotTwo {
        item
        enchantments {
          target
          value
        }
      }
      slotThree {
        item
        enchantments {
          target
          value
        }
      }
      slotFour {
        item
        enchantments {
          target
          value
        }
      }
      slotFive {
        item
        enchantments {
          target
          value
        }
      }
      slotSix {
        item
        enchantments {
          target
          value
        }
      }
      slotSeven {
        item
        enchantments {
          target
          value
        }
      }
      slotEight {
        item
        enchantments {
          target
          value
        }
      }
      slotNine {
        item
        enchantments {
          target
          value
        }
      }
      slotTen {
        item
        enchantments {
          target
          value
        }
      }
      slotEleven {
        item
        enchantments {
          target
          value
        }
      }
      slotTwelve {
        item
        enchantments {
          target
          value
        }
      }
      slotThirteen {
        item
        enchantments {
          target
          value
        }
      }
      slotFourteen {
        item
        enchantments {
          target
          value
        }
      }
      slotFifteen {
        item
        enchantments {
          target
          value
        }
      }
      slotSixteen {
        item
        enchantments {
          target
          value
        }
      }
      slotSeventeen {
        item
        enchantments {
          target
          value
        }
      }
      slotEighteen {
        item
        enchantments {
          target
          value
        }
      }
      slotNineteen {
        item
        enchantments {
          target
          value
        }
      }
      slotTwenty {
        item
        enchantments {
          target
          value
        }
      }
    }
  }
`;
