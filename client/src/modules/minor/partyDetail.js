//General
import React, { useContext, memo } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Context
import { CharacterContext } from "../../helper/character";

//Styles
import "../styles/base.css";

function PartyDetails({ partyId, kickable, kick, leave }) {
  const charContext = useContext(CharacterContext);

  //Get Party
  const { loading: partyLoad, data: partyData } = useQuery(FETCH_PARTY, {
    variables: { partyId },
    pollInterval: 200,
  });

  const { loading: membersLoad, data: membersData } = useQuery(FETCH_MEMBERS, {
    variables: { partyId },
    pollInterval: 200,
  });

  if (!partyLoad && !membersLoad) {
    const party = partyData.getParty;
    const characters = membersData.getMembers;

    return (
      <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px", height: "500px" }}>
        <div style={{ display: "block", height: "45px" }}>
          <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
            <span className="subheader" style={{ fontSize: "20px" }}>
              {party.name}
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="inner-scrollbar" style={{ padding: "10px", height: "440px" }}>
          <h1 className="subheader">{`Party (${party.characters.length} / 6)`}</h1>
          {characters.map((character) => (
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
                      style={{ fontSize: "10px", height: "15", padding: "5px", paddingTop: "10px", borderRadius: "5px", backgroundColor: "#111" }}
                    >{`Level ${character.level.lvl} ${character.spirit}`}</h1>
                    <h1
                      className="subheader"
                      style={{ fontSize: "10px", height: "15", padding: "5px", paddingTop: "10px", borderRadius: "5px", backgroundColor: "#111" }}
                    >{`${character.health.current} Health`}</h1>
                    <h1
                      className="subheader"
                      style={{ fontSize: "10px", height: "15", padding: "5px", paddingTop: "10px", borderRadius: "5px", backgroundColor: "#111" }}
                    >{`${character.shield.current} Shield`}</h1>
                    <h1
                      className="subheader"
                      style={{ fontSize: "10px", height: "15", padding: "5px", paddingTop: "10px", borderRadius: "5px", backgroundColor: "#111" }}
                    >{`${character.stamina.current} Stamina`}</h1>
                    <h1
                      className="subheader"
                      style={{ fontSize: "10px", height: "15", padding: "5px", paddingTop: "10px", borderRadius: "5px", backgroundColor: "#111" }}
                    >{`${character.mana.current} Mana`}</h1>
                  </div>
                </Grid>
                {charContext.characterId === character.id ? (
                  <Grid item xs={12}>
                    <button
                      className="submit-button"
                      onClick={() => {
                        leave({ variables: { partyId: party.id, characterId: charContext.characterId } });
                      }}
                      style={{ marginBottom: "10px", width: "82.5%", marginTop: "auto" }}
                    >
                      Leave Party
                    </button>
                  </Grid>
                ) : (
                  ""
                )}
                {party.characters[0] === charContext.characterId && character.id !== charContext.characterId && kickable ? (
                  <Grid item xs={12}>
                    <button
                      className="submit-button"
                      onClick={() => {
                        kick({ variables: { partyId: party.id, characterId: character.id } });
                      }}
                      style={{ marginBottom: "10px", width: "82.5%", marginTop: "auto" }}
                    >
                      Kick from Party
                    </button>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return "";
  }
}

export default memo(PartyDetails);

const FETCH_PARTY = gql`
  query($partyId: ID!) {
    getParty(partyId: $partyId) {
      id
      name
      characters
      tokenDistribution
    }
  }
`;

const FETCH_MEMBERS = gql`
  query($partyId: ID!) {
    getMembers(partyId: $partyId) {
      id
      name
      party
      level {
        lvl
      }
      spirit
      skins
      health {
        current
      }
      shield {
        current
      }
      stamina {
        current
      }
      mana {
        current
      }
    }
  }
`;
