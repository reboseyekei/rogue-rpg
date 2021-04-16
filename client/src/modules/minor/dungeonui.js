//General
import React, { useContext, useState } from "react";

//Material UI
import Grid from "@material-ui/core/Grid";

//Context
import { CharacterContext } from "../../helper/character";

//Styles
import "../styles/base.css";

export default function DungeonUI({ dungeon }) {
  const charContext = useContext(CharacterContext);

  //Display
  const [selected, setSelected] = useState({
    narrator: true,
    turn: false,
    tokens: false,
    loot: false,
    destinations: false,
    records: false,
  });

  const select = (target) => {
    setSelected({ narrator: false, turn: false, tokens: false, loot: false, destinations: false, records: false, [target]: true });
  };

  const backgroundCalc = (target) => {
    if (selected[target]) {
      return "#802960";
    } else {
      return "#873a2e";
    }
  };

  const tokenCalc = () => {
    console.log(dungeon);
    const index = dungeon.playerIds.indexOf(charContext.characterId);
    return dungeon.tokens[index];
  };

  const viewManager = () => {
    if (selected.tokens) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px", height: "280px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                {`room dissolves in ${dungeon.room.lifespan}`}
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "220px" }}>
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
                            fontSize: "10px",
                            height: "15",
                            lineHeight: "2",
                            padding: "5px",
                            paddingTop: "10px",
                            borderRadius: "5px",
                            backgroundColor: "#111",
                          }}
                        >
                          Tokens per Room: &nbsp;&nbsp;&nbsp;&thinsp;&thinsp;&thinsp;&thinsp;&thinsp;{`${dungeon.tokenDistribution[index]}`}
                        </h1>
                        <h1
                          className="subheader"
                          style={{
                            fontSize: "10px",
                            height: "15",
                            lineHeight: "2",
                            padding: "5px",
                            paddingTop: "10px",
                            borderRadius: "5px",
                            backgroundColor: "#111",
                          }}
                        >{`Total Tokens Earned: ${dungeon.totalTokens[index]}`}</h1>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ))}
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
        height: "100%",
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
          <button
            className="submit-button"
            style={{ cursor: "pointer", backgroundColor: backgroundCalc("destinations") }}
            onClick={() => select("destinations")}
          >
            destinations
          </button>
        </Grid>
        <Grid item xs={4}>
          <button className="submit-button" style={{ cursor: "pointer", backgroundColor: backgroundCalc("records") }} onClick={() => select("records")}>
            records
          </button>
        </Grid>
      </Grid>
      <div className="divider-alternate" style={{ marginBottom: "15px" }}></div>
      <div className="stats-container" style={{ height: "300px" }}>
        {viewManager()}
      </div>
    </div>
  );
}
