//General
import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Minor Modules
import AbilityButton from "./abilityButton";

//Context
import { CharacterContext } from "../../helper/character";

//Assets
import Loading from "../../assets/loading/donkey_web.gif";

//Styles
import "../styles/base.css";
import character from "./character";

export default function DungeonUI({ dungeon, dungeonLoad }) {
  const charContext = useContext(CharacterContext);
  const abilitiesInvId = charContext.abilitiesInv;
  const { loading: abilitiesInvLoad, data: abilitiesInvData } = useQuery(FETCH_ABILITIES_INV, { variables: { abilitiesInvId }, pollInterval: 200 });

  const [votes, setVotes] = useState({ action: null, destination: null });

  const setRoom = (index) => {
    setVotes({ ...votes, destination: index });
  };
  const resetRoom = () => {
    setVotes({ ...votes, destination: null });
  };

  const setAction = (index) => {
    setVotes({ ...votes, action: index });
  };

  const resetAction = () => {
    setVotes({ ...votes, action: null });
  };

  //Graphql
  const [roomVote, { loading: roomLoad }] = useMutation(ROOM_VOTE, {
    update(_, { data: roomData }) {
      resetRoom();
    },
  });

  const [actionVote, { loading: actionLoad }] = useMutation(ACTION_VOTE, {
    update(_, { data: actionData }) {
      resetAction();
    },
  });

  //Display
  const [selected, setSelected] = useState({
    narrator: true,
    turn: false,
    tokens: false,
    loot: false,
    actions: false,
    records: false,
  });

  const select = (target) => {
    setSelected({ narrator: false, turn: false, tokens: false, loot: false, actions: false, records: false, [target]: true });
  };

  const backgroundCalc = (target) => {
    if (target === "turn") {
      if (dungeon.turn[0][0] === charContext.characterId) {
        if (selected[target]) {
          return "#8718a8";
        } else {
          return "goldenrod";
        }
      } else {
        if (selected[target]) {
          return "#802960";
        } else {
          return "#873a2e";
        }
      }
    } else {
      if (selected[target]) {
        return "#802960";
      } else {
        return "#873a2e";
      }
    }
  };

  const tokenCalc = () => {
    console.log(dungeon);
    const index = dungeon.playerIds.indexOf(charContext.characterId);
    return dungeon.tokens[index];
  };

  const isHostile = () => {
    if (dungeon.occupants.length >= 1) {
      for (let i = 0; i < dungeon.occupants.length; i++) {
        let nonliving = ["treasure", "spring", "monument"];
        let notFullHealth = dungeon.occupants[i].health.current < dungeon.occupants[i].health.max;
        let notPassiveAlignment = dungeon.occupants[i].alignment < 30;
        let notFriendlyAlignment = dungeon.occupants[i].alignment < 60;
        let isLiving = nonliving.includes(dungeon.occupants[i].spirit);
        if (notPassiveAlignment) {
          return true;
        } else if (isLiving && notFullHealth && notFriendlyAlignment) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  const titleGenerator = () => {
    let title = ``;
    if (isHostile()) {
      if (dungeon.turn[0][0] === charContext.characterId) {
        title = `It is your turn`;
      } else {
        let currPlayerIndex = dungeon.playerIds.indexOf(dungeon.turn[0][0]);
        let currPlayer = dungeon.players[currPlayerIndex];
        if (currPlayer) {
          title = `It is ${currPlayer.name}'s turn`;
        } else if (dungeon.occupants[0]){
          title = `It is the ${dungeon.occupants[0].spirit}'s turn`;
        }
      }
    } else {
      title = `room dissolves in ${dungeon.room.lifespan} turns`;
    }
    return title;
  };

  const alertText = titleGenerator();

  const isParty = () => {
    if (dungeon.playerIds.length > 1) {
      return true;
    } else {
      return false;
    }
  };

  const hasVote = (anchor) => {
    if (anchor.includes(charContext.characterId)) {
      return true;
    } else {
      return false;
    }
  };

  const instantActions = ["flee", "leave"];
  const notHostileActions = ["rest", "embark", "leave"];
  const slots = [
    "slotOne",
    "slotTwo",
    "slotThree",
    "slotFour",
    "slotFive",
    "slotSix",
    "slotSeven",
    "slotEight",
    "slotNine",
    "slotTen",
    "slotEleven",
    "slotTwelve",
    "slotThirteen",
    "slotFourteen",
    "slotFifteen",
    "slotSixteen",
    "slotSeventeen",
    "slotEighteen",
    "slotNineteen",
    "slotTwenty",
  ];

  const viewManager = () => {
    if (selected.narrator) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px", height: "320px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "16px" }}>
                {alertText}
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "255px" }}>
            <div>
              {dungeon.log.map((msg, index) => (
                <div className="narrator-block" key={`${dungeon.id}-${index}-${msg}`}>
                  <h1 className="narrator-text">{msg}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (selected.tokens) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px", height: "320px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "16px" }}>
                {alertText}
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "255px" }}>
            <div>
              <h1 className="subheader"> {`You currently have ${tokenCalc()} tokens`}</h1>
              {dungeon.players.map((player, index) => (
                <div
                  key={player.id}
                  style={{
                    padding: "5px",
                    borderRadius: "5px",
                    border: "3.5px solid #222",
                    backgroundColor: "#000",
                    userSelect: "none",
                    marginBottom: "15px",
                    boxShadow: "0px 10px 7px -5px #000000",
                  }}
                >
                  <Grid container style={{ borderRadius: "5px" }}>
                    <Grid item xs={6}>
                      <img
                        src={require(`../../assets/skins/${player.skin}.jpg`)}
                        style={{ width: "100%", borderRadius: "5px" }}
                        alt={`character graphic for ${player.name}`}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ marginLeft: "10px", paddingRight: "5px" }}>
                        <h1 className="stats-text-alternate" style={{ fontSize: "26px", height: "30px", marginTop: "2px", marginBottom: "5px" }}>
                          {player.name}
                        </h1>
                        <h1
                          className="subheader"
                          style={{
                            fontSize: "12px",
                            height: "15",
                            lineHeight: "1.2",
                            padding: "5px",
                            paddingTop: "10px",
                            borderRadius: "5px",
                            backgroundColor: "#111",
                          }}
                        >{`Level ${player.level} ${player.spirit}`}</h1>
                        <h1
                          className="subheader"
                          style={{
                            textAlign: "left",
                            fontSize: "10px",
                            height: "15",
                            lineHeight: "2",
                            padding: "5px",
                            paddingTop: "10px",
                            borderRadius: "5px",
                            backgroundColor: "#111",
                          }}
                        >
                          Tokens per Room: {`${dungeon.tokenDistribution[index]}`}
                        </h1>
                        <h1
                          className="subheader"
                          style={{
                            textAlign: "left",
                            fontSize: "10px",
                            height: "15",
                            lineHeight: "2",
                            padding: "5px",
                            paddingTop: "10px",
                            borderRadius: "5px",
                            backgroundColor: "#111",
                          }}
                        >
                          Total Tokens Earned: {`${dungeon.totalTokens[index]}`}
                        </h1>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (selected.actions) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px", height: "320px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "16px" }}>
                {alertText}
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "255px" }}>
            <div>
              <Grid container>
                {dungeon.actions.actions.map((action, index) => (
                  <Grid item xs={6} key={action}>
                    <button
                      className="submit-button"
                      disabled={actionLoad || dungeonLoad || ((action === "rest" || action === "embark") && isHostile())}
                      style={{
                        marginBottom: "10px",
                        width: "95%",
                        height: isParty() ? "47px" : "30px",
                        marginTop: "auto",
                        backgroundColor:
                          notHostileActions.includes(action) && isHostile() ? "black" : hasVote(dungeon.actions.data[index]) ? "indigo" : "darkslategray",
                        pointerEvents: (actionLoad && "none") || (notHostileActions.includes(action) && isHostile() && "none"),
                        borderColor: notHostileActions.includes(action) && isHostile() && "#222",
                        boxShadow: "1px 15px 9px -10px #000000",
                        boxShadow: notHostileActions.includes(action) && isHostile() && "",
                        color: notHostileActions.includes(action) && isHostile() && "#222",
                      }}
                      onClick={() => {
                        if (hasVote(dungeon.actions.data[index])) {
                          actionVote({ variables: { index, action: "remove", characterId: charContext.characterId, dungeonId: charContext.place } });
                        } else {
                          actionVote({ variables: { index, action: "add", characterId: charContext.characterId, dungeonId: charContext.place } });
                        }
                        setAction(index);
                      }}
                    >
                      {actionLoad && votes.action === index ? (
                        <div>
                          {isParty() && <h1 className="subheader">{`${action}`}</h1>}
                          <img src={Loading} alt="loading" style={{ marginTop: "-18px" }} />
                        </div>
                      ) : !isHostile() && instantActions.includes(action) && isParty() ? (
                        <div>
                          <h1 className="subheader">{`${action}`}</h1>
                          <h1 className="subheader" style={{ height: "10px" }}>{``}</h1>
                        </div>
                      ) : (
                        <div>
                          <h1 className="subheader">{`${action}`}</h1>
                          {isParty() ? <h1 className="subheader">{`(${dungeon.actions.data[index].length}/${dungeon.playerIds.length})`}</h1> : ""}
                        </div>
                      )}
                    </button>
                  </Grid>
                ))}
                <div className="divider-alternate" style={{ marginBottom: "10px" }}></div>
                <Grid item xs={12}>
                  <h1 className="subheader">The exit leads to...</h1>
                </Grid>
                {dungeon.leadingRooms.map((room, index) => (
                  <Grid item xs={12} key={`${room.environment}-${index}`}>
                    <button
                      className="submit-button"
                      disabled={roomLoad || dungeonLoad}
                      style={{
                        marginBottom: "10px",
                        width: "95%",
                        height: isParty() ? "47px" : "30px",
                        width: isParty() ? "100%" : "60%",
                        marginTop: "auto",
                        backgroundColor: hasVote(room.vote) ? "darkred" : "#000",
                        pointerEvents: roomLoad && "none",
                        boxShadow: "1px 15px 9px -10px #000000",
                      }}
                      onClick={() => {
                        if (hasVote(room.vote)) {
                          roomVote({ variables: { index, action: "remove", characterId: charContext.characterId, dungeonId: charContext.place } });
                        } else {
                          roomVote({ variables: { index, action: "add", characterId: charContext.characterId, dungeonId: charContext.place } });
                        }
                        setRoom(index);
                      }}
                    >
                      {roomLoad && votes.destination === index ? (
                        <div>
                          {isParty() && <h1 className="subheader">{`${room.environment}`}</h1>}
                          <img src={Loading} alt="loading" style={{ marginTop: "-18px" }} />
                        </div>
                      ) : (
                        <div style={{ verticaAlign: "middle" }}>
                          <h1 className="subheader">{`${room.environment}`}</h1>
                          {isParty() ? <h1 className="subheader">{`(${room.vote.length}/${dungeon.playerIds.length})`}</h1> : ""}
                        </div>
                      )}
                    </button>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
      );
    } else if (selected.turn) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px", height: "320px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "16px" }}>
                {alertText}
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "255px" }}>
            <div>
              {dungeon.turn[0][0] === charContext.characterId ? (
                <div>
                  <Grid container>
                    <Grid item xs={6}>
                      <button
                        className="submit-button"
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          height: "30px",
                          marginTop: "auto",
                          backgroundColor: "darkslategray",
                          cursor: "pointer",
                          pointerEvents: roomLoad && "none",
                          boxShadow: "1px 15px 9px -10px #000000",
                        }}
                      >
                        Idle
                      </button>
                    </Grid>
                    <Grid item xs={6} style={{ marginBottom: "5px" }}>
                      <button
                        className="submit-button"
                        style={{
                          marginBottom: "10px",
                          width: "95%",
                          height: "30px",
                          marginTop: "auto",
                          backgroundColor: "darkslategray",
                          cursor: "pointer",
                          pointerEvents: roomLoad && "none",
                          boxShadow: "1px 15px 9px -10px #000000",
                        }}
                      >
                        Skip Turn
                      </button>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <div className="divider-alternate" style={{ marginBottom: "10px" }}></div>
                    {!abilitiesInvLoad && abilitiesInvData
                      ? slots.map((slot, index) =>
                          index < charContext.slots && abilitiesInvData.getAbilitiesInv[slot].item ? (
                            <AbilityButton key={slot} itemId={abilitiesInvData.getAbilitiesInv[slot].item} dungeonId={dungeon.id} slot={slot}/>
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </Grid>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        borderRadius: "5px",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        border: "2.5px solid #222",
        backgroundColor: "#111",
        padding: "10px",
        height: "450px",
        width: "100%",
      }}
    >
      <Grid style={{ marginBottom: "10px", width: "100%" }} container justify="space-between" align="start" spacing={1}>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("narrator") }} onClick={() => select("narrator")}>
            narrator
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("tokens") }} onClick={() => select("tokens")}>
            tokens
          </button>
        </Grid>
        <Grid item xs={4}>
          <button
            className="submit-button"
            disabled={!isHostile}
            style={{
              cursor: "pointer",
              backgroundColor: !isHostile ? "#000" : backgroundCalc("actions"),
              pointerEvents: !isHostile && "none",
              borderColor: !isHostile && "#222",
              color: !isHostile && "#333",
            }}
            onClick={() => select("actions")}
          >
            actions
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("turn") }} onClick={() => select("turn")}>
            turn
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("loot") }} onClick={() => select("loot")}>
            loot
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("records") }} onClick={() => select("records")}>
            records
          </button>
        </Grid>
      </Grid>
      <div className="divider-alternate" style={{ marginBottom: "15px" }}></div>
      <div className="stats-container" style={{ height: "340px" }}>
        {viewManager()}
      </div>
    </div>
  );
}

const ROOM_VOTE = gql`
  mutation roomVote($index: Int!, $action: String!, $characterId: ID!, $dungeonId: ID!) {
    roomVote(index: $index, action: $action, characterId: $characterId, dungeonId: $dungeonId) {
      name
    }
  }
`;

const ACTION_VOTE = gql`
  mutation actionVote($index: Int!, $action: String!, $characterId: ID!, $dungeonId: ID!) {
    actionVote(index: $index, action: $action, characterId: $characterId, dungeonId: $dungeonId) {
      name
    }
  }
`;

const FETCH_ABILITIES_INV = gql`
  query($abilitiesInvId: ID!) {
    getAbilitiesInv(abilitiesInvId: $abilitiesInvId) {
      slotOne {
        item
      }
      slotTwo {
        item
      }
      slotThree {
        item
      }
      slotFour {
        item
      }
      slotFive {
        item
      }
      slotSix {
        item
      }
      slotSeven {
        item
      }
      slotEight {
        item
      }
      slotNine {
        item
      }
      slotTen {
        item
      }
      slotEleven {
        item
      }
      slotTwelve {
        item
      }
      slotThirteen {
        item
      }
      slotFourteen {
        item
      }
      slotFifteen {
        item
      }
      slotSixteen {
        item
      }
      slotSeventeen {
        item
      }
      slotEighteen {
        item
      }
      slotNineteen {
        item
      }
      slotTwenty {
        item
      }
    }
  }
`;
