//General
import React, {useContext } from "react";
import {useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";
import Slide from '@material-ui/core/Slide';

//Contexts
import { CharacterContext } from "../../helper/character";

//Styles
import "../styles/base.css";

export default function Dungeon() {
  //Context
  const charContext = useContext(CharacterContext);

  //Graphql
  const { loading: dungeonLoad, data: dungeonData } = useQuery(FETCH_DUNGEON, { variables: { dungeonId: charContext.place } });
  const { loading: playersLoad, data: playersData } = useQuery(FETCH_PLAYERS, { variables: { dungeonId: charContext.place }, pollInterval: 200 });

  const tokenCalc = (dungeon) => {
    console.log(dungeon.players);
    const index = dungeon.players.indexOf(charContext.characterId);
    return dungeon.tokens[index];
  };

  return (
    <div className="stats-container" style={{ height: "525px", width: "550px" }}>
      <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
        <div style={{ display: "block", height: "45px" }}>
          <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
            <span className="subheader" style={{ fontSize: "20px" }}>
              Players
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="inner-scrollbar" style={{ padding: "10px", height: "440px" }}>
          {!dungeonLoad && dungeonData && !playersLoad && playersData ? (
            <div>
              <h1 className="subheader"> {`You currently have ${tokenCalc(dungeonData.getDungeon)} tokens`}</h1>
              {playersData.getPlayers.map((character, index) => (
                <div
                  key={character.id}
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
                        src={require(`../../assets/skins/${character.skins[0]}.jpg`)}
                        style={{ width: "100%", borderRadius: "5px" }}
                        alt={`character graphic for ${character.skins[0]}`}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <div style={{ marginLeft: "10px", paddingRight: "5px" }}>
                        <h1 className="stats-text-alternate" style={{ fontSize: "26px", height: "30px", marginTop: "2px", marginBottom: "5px" }}>
                          {character.name}
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
                        >{`Level ${character.level.lvl} ${character.spirit}`}</h1>
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
                          Tokens per Room: &nbsp;&nbsp;&nbsp;&thinsp;&thinsp;&thinsp;&thinsp;&thinsp;{`${dungeonData.getDungeon.tokenDistribution[index]}`}
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
                        >{`Total Tokens Earned: ${dungeonData.getDungeon.totalTokens[index]}`}</h1>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </div>
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </div>
  );
}

const FETCH_DUNGEON = gql`
  query($dungeonId: ID!) {
    getDungeon(dungeonId: $dungeonId) {
      players
      tokens
      totalTokens
      tokenDistribution
    }
  }
`;

const FETCH_PLAYERS = gql`
  query($dungeonId: ID!) {
    getPlayers(dungeonId: $dungeonId) {
      name
      skins
      spirit
      level {
        lvl
      }
    }
  }
`;
