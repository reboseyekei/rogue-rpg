//General
import React, { useState, useContext, useEffect} from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Contexts
import { CharacterContext } from "../../helper/character";

//Assets
import Cap from "../../assets/icons/cap.svg";
import Stat from "../../assets/icons/stat.svg";
import Loading from "../../assets/loading/donkey_web.gif";

//Styles
import "../styles/base.css";

export default function Stats({ characterId, refetch, refreshData }) {
  //TODO add perks
  const character = useContext(CharacterContext);

  //Calculations
  const [rerender, setRerender] = useState(Math.random());
  const [stat, setStat] = useState({
    capUsed: 0,
    statUsed: 0,
    mind: {
      capUsed: character.mind.creation + character.mind.destruction + character.mind.restoration + character.mind.projection,
      cap: 0,
      creation: 0,
      destruction: 0,
      restoration: 0,
      projection: 0,
    },
    body: {
      capUsed: character.body.vitality + character.body.defense + character.body.strength + character.body.dexterity,
      cap: 0,
      vitality: 0,
      defense: 0,
      strength: 0,
      dexterity: 0,
    },
    soul: {
      capUsed: character.soul.luck + character.soul.capacity + character.soul.clarity + character.soul.will,
      cap: 0,
      luck: 0,
      capacity: 0,
      clarity: 0,
      will: 0,
    },
  });

  const resetStat = () => {
    let newStat = {
      capUsed: 0,
      statUsed: 0,
      mind: {
        capUsed: character.mind.creation + character.mind.destruction + character.mind.restoration + character.mind.projection,
        cap: 0,
        creation: 0,
        destruction: 0,
        restoration: 0,
        projection: 0,
      },
      body: {
        capUsed: character.body.vitality + character.body.defense + character.body.strength + character.body.dexterity,
        cap: 0,
        vitality: 0,
        defense: 0,
        strength: 0,
        dexterity: 0,
      },
      soul: {
        capUsed: character.soul.luck + character.soul.capacity + character.soul.clarity + character.soul.will,
        cap: 0,
        luck: 0,
        capacity: 0,
        clarity: 0,
        will: 0,
      },
    };
    setStat(newStat);
  };

  const changeCap = (anchor, increment) => {
    let temp = stat;
    let tempAnchor = temp[anchor];

    temp.capUsed += increment;
    tempAnchor.cap += increment;
    temp[anchor] = tempAnchor;
    setStat(temp);
    setStat({ ...stat });
  };

  const changeStat = (anchor, target, increment) => {
    let temp = stat;
    let tempAnchor = temp[anchor];

    temp.statUsed += increment;
    tempAnchor[target] += increment;
    tempAnchor.capUsed += increment;
    temp[anchor] = tempAnchor;
    setStat(temp);
    setStat({ ...stat });
  };

  const disableCalc = (type, anchor, target, increment) => {
    if (type === "cap") {
      if (increment === 1) {
        return character.level.cap <= stat.capUsed ? true : false;
      } else if (increment === -1) {
        return stat.capUsed === 0 || stat[anchor].cap === 0 ? true : false;
      }
    } else if (type === "stat") {
      if (increment === 1) {
        return stat[anchor].capUsed >= stat[anchor].cap + character[anchor].cap || character.level.stat - stat.statUsed <= 0 ? true : false;
      } else if (increment === -1) {
        let temp = stat[anchor];
        return temp[target] <= 0 ? true : false;
      }
    } else {
      return false;
    }
  };

  //Graphql
  const [updateCharacterStats, { loading: characterLoad }] = useMutation(UPDATE_CHARACTER_STATS, {
    variables: {
      characterId: characterId,
      capUsed: stat.capUsed,
      statUsed: stat.statUsed,
      mindCap: stat.mind.cap,
      bodyCap: stat.body.cap,
      soulCap: stat.soul.cap,
      creation: stat.mind.creation,
      destruction: stat.mind.destruction,
      restoration: stat.mind.restoration,
      projection: stat.mind.projection,
      vitality: stat.body.vitality,
      defense: stat.body.defense,
      strength: stat.body.strength,
      dexterity: stat.body.dexterity,
      luck: stat.soul.luck,
      capacity: stat.soul.capacity,
      clarity: stat.soul.clarity,
      will: stat.soul.will,
    },
  });

  function finalize() {
    updateCharacterStats();
    refetch();
    if (!characterLoad || !refreshData) {
      resetStat();
    }
    setRerender(Math.random());
  }

  //Display
  const [selected, setSelected] = useState({
    stats: true,
    attributes: false,
    status: false,
    perks: false,
  });

  const select = (target) => {
    setSelected({ stats: false, attributes: false, status: false, perks: false, [target]: true });
  };

  const backgroundCalc = (target) => {
    if (selected[target]) {
      return "rgb(133, 20, 133)";
    } else {
      return "darkred";
    }
  };

  const anchors = ["mind", "body", "soul"];
  const targets = [
    ["creation", "destruction", "restoration", "projection"],
    ["vitality", "defense", "strength", "dexterity"],
    ["luck", "capacity", "clarity", "will"],
  ];

  const attributesTargets = ["space", "time", "death", "life", "fire", "water", "earth", "air"];

  const statusAnchors = ["buffs", "debuffs"];
  const statusTargets = [
    [
      ["regen", "dread", "poison", "scorch", "cold", "spark", "reflect", "summon", "taunt", "flee"],
      ["immortal", "strong", "warped", "sniper", "wellspring", "overcharged", "scavenger", "swift"],
    ],
    [
      ["fear", "burn", "freeze", "shock", "toxin", "decay", "bleed", "exhaustion"],
      ["explosion", "paralysis", "frozen", "scorched", "sleep"],
    ],
  ];

  let debuffResistance = character.soul.will * 2 + character.body.defense * 0.5;

  const displayCap = (anchor) => {
    return <span className="subheader">{`:${stat[anchor].capUsed}/${character[anchor].cap + stat[anchor].cap}`}</span>;
  };

  useEffect(() => {
    resetStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  const viewManager = () => {
    if (selected.stats) {
      return (
        <div key={rerender} style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ backgroundColor: "#111", borderRadius: "5px", width: "120px", height: "40px", float: "left" }}>
              <div style={{ float: "left" }}>
                <img src={Cap} style={{ marginLeft: "5px", marginTop: "3px" }} alt="Cap Points" />
                <span className="stats-text" style={{ marginLeft: "2px" }}>
                  {character.level.cap - stat.capUsed}
                </span>
              </div>
            </div>
            <div style={{ float: "left", paddingTop: "20px", marginLeft: "12.5%" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                Stats
              </span>
            </div>
            <div style={{ backgroundColor: "#111", borderRadius: "5px", width: "120px", height: "40px", float: "right" }}>
              <div style={{ float: "left" }}>
                <img src={Stat} style={{ marginLeft: "5px", marginTop: "3px" }} alt="Stat Points" />
                <span className="stats-text" style={{ marginLeft: "2px" }}>
                  {character.level.stat - stat.statUsed}
                </span>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}>
            {anchors.map((anchor, index) => (
              <div style={{ marginBottom: "10px" }} key={`${anchor}-${index}-${rerender}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", height: "30px", marginBottom: "10px" }}>
                  <h1 className="subheader" style={{ fontSize: "18px", marginTop: "10px", float: "left", textTransform: "capitalize" }}>
                    {anchor}
                    <span className="subheader">{`:${stat[anchor].capUsed}/${character[anchor].cap + stat[anchor].cap}`}</span>
                  </h1>
                  <div>
                    <button
                      className="null-button"
                      style={{ float: "right", height: "30px", width: "40px", marginTop: 0, marginRight: "5px" }}
                      disabled={disableCalc("cap", anchor, "", 1)}
                      onClick={() => changeCap(anchor, 1)}
                    >
                      +
                    </button>
                    <button
                      className="null-button"
                      style={{ float: "right", height: "30px", width: "40px", marginTop: 0 }}
                      disabled={disableCalc("cap", anchor, "", -1)}
                      onClick={() => changeCap(anchor, -1)}
                    >
                      -
                    </button>
                  </div>
                </div>
                {targets[index].map((target, index) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      height: "30px",
                      paddingLeft: "10px",
                    }}
                    key={`${anchor}-${target}-${index}`}
                  >
                    <h1 className="subheader" style={{ fontSize: "14px", marginTop: "5px", float: "left", textTransform: "capitalize" }}>
                      {`- ${target}`}
                      <span className="subheader" style={{ fontSize: "14px", verticalAlign: "middle" }}>{`:${
                        character[anchor][target] + stat[anchor][target]
                      }`}</span>
                    </h1>
                    <div>
                      <button
                        className="null-button"
                        style={{ float: "right", height: "20px", width: "25px", fontSize: "10px", marginTop: 0 }}
                        disabled={disableCalc("stat", anchor, target, 1)}
                        onClick={() => changeStat(anchor, target, 1)}
                      >
                        +
                      </button>
                      <button
                        className="null-button"
                        style={{ float: "right", height: "20px", width: "25px", fontSize: "10px", marginTop: 0 }}
                        disabled={disableCalc("stat", anchor, target, -1)}
                        onClick={() => changeStat(anchor, target, -1)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (selected.attributes) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                Attributes
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}>
            {attributesTargets.map((target, index) => (
              <div style={{ marginBottom: "10px" }} key={`${target}-${index}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", height: "30px", marginBottom: "10px" }}>
                  <h1 className="subheader" style={{ fontSize: "18px", marginTop: "10px", float: "left", textTransform: "capitalize" }}>
                    {target}
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    height: "30px",
                    paddingLeft: "10px",
                  }}
                >
                  <h1 className="subheader" style={{ fontSize: "14px", marginTop: "5px", float: "left", textTransform: "capitalize" }}>
                    {`- default`}
                    <span className="subheader" style={{ fontSize: "14px", verticalAlign: "middle" }}>
                      {`:${character.attributes[target].default}`}
                    </span>
                  </h1>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    height: "30px",
                    paddingLeft: "10px",
                  }}
                >
                  <h1 className="subheader" style={{ fontSize: "14px", marginTop: "5px", float: "left", textTransform: "capitalize" }}>
                    {`- mod`}
                    <span className="subheader" style={{ fontSize: "14px", verticalAlign: "middle" }}>
                      {`:${character.attributes[target].mod}`}
                    </span>
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (selected.perks) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                Perks (WIP)
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}></div>
        </div>
      );
    } else if (selected.status) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                Status
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "400px" }}>
            {statusAnchors.map((anchor, index) => (
              <div style={{ marginBottom: "10px" }} key={`${anchor}-${index}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", height: "30px", marginBottom: "10px" }}>
                  <h1 className="subheader" style={{ fontSize: "18px", marginTop: "10px", float: "left", textTransform: "capitalize" }}>
                    {anchor}
                  </h1>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  {statusTargets[index][0].map((target) => (
                    <div style={{ marginBottom: "10px" }} key={`${anchor}-${target}-${index}`}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignContent: "center",
                          height: "30px",
                          paddingLeft: "10px",
                        }}
                      >
                        <h1 className="subheader" style={{ fontSize: "12px", marginTop: "5px", float: "left", textTransform: "capitalize" }}>
                          {target}
                        </h1>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignContent: "center",
                          height: "20px",
                          paddingLeft: "12px",
                        }}
                      >
                        <h1 className="subheader" style={{ fontSize: "10px", marginTop: "2px", float: "left", textTransform: "capitalize" }}>
                          {index === 1
                            ? `-default: ${character[anchor][target].default - debuffResistance}`
                            : `- default: ${character[anchor][target].default}`}
                        </h1>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignContent: "center",
                          height: "20px",
                          paddingLeft: "12px",
                        }}
                      >
                        <h1 className="subheader" style={{ fontSize: "10px", marginTop: "2px", float: "left", textTransform: "capitalize" }}>
                          {`- mod: ${character[anchor][target].mod}`}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: "20px" }}>
                  {statusTargets[index][1].map((target) => (
                    <div key={`${anchor}-${target}-${index}`}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignContent: "center",
                          height: "30px",
                          paddingLeft: "10px",
                        }}
                      >
                        <h1 className="subheader" style={{ fontSize: "12px", marginTop: "5px", float: "left", textTransform: "capitalize" }}>
                          {`${target}`}
                          <span className="subheader" style={{ fontSize: "10px", verticalAlign: "middle" }}>
                            {`: ${character[anchor][target]}`}
                          </span>
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <h1>uh oh, an error has occurred</h1>;
    }
  };

  return (
    <div className="stats" key={rerender}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <button
          className="submit-button"
          style={{ float: "initial", width: "100px", cursor: "pointer", backgroundColor: backgroundCalc("stats") }}
          onClick={() => select("stats")}
        >
          stats
        </button>
        <button
          className="submit-button"
          style={{ float: "initial", width: "150px", cursor: "pointer", backgroundColor: backgroundCalc("attributes") }}
          onClick={() => select("attributes")}
        >
          attributes
        </button>
        <button
          className="submit-button"
          style={{ float: "initial", width: "100px", cursor: "pointer", backgroundColor: backgroundCalc("perks") }}
          onClick={() => select("perks")}
        >
          perks
        </button>
        <button
          className="submit-button"
          style={{ float: "initial", width: "100px", cursor: "pointer", backgroundColor: backgroundCalc("status") }}
          onClick={() => select("status")}
        >
          status
        </button>
      </div>
      <div className="divider-alternate" style={{ marginBottom: "15px" }}></div>
      <div className="stats-container">{viewManager()}</div>
      <div>
        <button
          className="submit-button"
          style={{ float: "left", width: "120px", cursor: "pointer", marginTop: "20px", marginLeft: "20px", backgroundColor: "#000" }}
          onClick={resetStat}
        >
          discard
        </button>
        <button
          className="submit-button"
          style={{ float: "right", width: "120px", cursor: "pointer", marginTop: "20px", marginRight: "20px", backgroundColor: "green" }}
          onClick={finalize}
        >
          {characterLoad || refreshData ? <img src={Loading} alt="loading" style={{ marginTop: "-10px" }} /> : "finalize"}
        </button>
      </div>
    </div>
  );
}

const UPDATE_CHARACTER_STATS = gql`
  mutation updateCharacterStats(
    $characterId: ID!
    $capUsed: Int!
    $statUsed: Int!
    $mindCap: Int!
    $bodyCap: Int!
    $soulCap: Int!
    $creation: Int!
    $restoration: Int!
    $destruction: Int!
    $projection: Int!
    $vitality: Int!
    $defense: Int!
    $strength: Int!
    $dexterity: Int!
    $luck: Int!
    $capacity: Int!
    $clarity: Int!
    $will: Int!
  ) {
    updateCharacterStats(
      updateCharacterStatsInput: {
        characterId: $characterId
        capUsed: $capUsed
        statUsed: $statUsed
        mindCap: $mindCap
        bodyCap: $bodyCap
        soulCap: $soulCap
        creation: $creation
        restoration: $restoration
        destruction: $destruction
        projection: $projection
        vitality: $vitality
        defense: $defense
        strength: $strength
        dexterity: $dexterity
        luck: $luck
        capacity: $capacity
        clarity: $clarity
        will: $will
      }
    ) {
      id
    }
  }
`;
