//General
import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Minor Module
import PartyDetails from "./partyDetail";

//Material UI
import Grid from "@material-ui/core/Grid";

//Contexts
import { CharacterContext } from "../../helper/character";

//Assets
import Loading from "../../assets/loading/donkey_web.gif";

//Styles
import "../styles/base.css";

export default function Party() {
  //Context
  const character = useContext(CharacterContext);

  //Calculations
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    name: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  //Graphql
  const { loading: partiesLoad, data: partiesData } = useQuery(FETCH_PARTIES, {
    variables: { locationId: character.place },
    pollInterval: 200,
  });

  const [createParty, { loading: createPartyLoad }] = useMutation(CREATE_PARTY, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { locationId: character.place, characterId: character.characterId, name: values.name },
  });

  const createPartySubmit = (event) => {
    event.preventDefault();
    createParty();
  };

  const [joinParty] = useMutation(JOIN_PARTY);
  const [leaveParty] = useMutation(LEAVE_PARTY);
  const [kickParty] = useMutation(KICK_PARTY);

  //Display
  const [selected, setSelected] = useState({
    party: true,
    lookup: false,
  });

  const select = (target) => {
    setSelected({ party: false, lookup: false, [target]: true });
  };

  const backgroundCalc = (target) => {
    if (selected[target]) {
      return "rgb(133, 20, 133)";
    } else {
      return "darkred";
    }
  };

  const viewManager = () => {
    if (selected.party) {
      return character.party ? (
        <PartyDetails partyId={character.party} kickable={true} kick={kickParty} leave={leaveParty} />
      ) : (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                Create a Party
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "440px" }}>
            <Grid container style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <Grid item xs={12}>
                <label htmlFor="partyName">Party name</label>
                <input type="text" id="partyName" name="name" spellCheck="false" value={values.name} onChange={handleChange} />
                <p>{!errors.name ? "" : errors.name}</p>
              </Grid>
              <Grid item xs={12}>
                <button
                  className="submit-button"
                  onClick={createPartySubmit}
                  style={{ borderColor: createPartyLoad ? "#ab9d48" : "#bbb", marginBottom: "10px", width: "82.5%", marginTop: "auto" }}
                >
                  {createPartyLoad ? <img src={Loading} alt="loading" style={{ marginTop: "-10px" }} /> : "Create Party"}
                </button>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    } else if (selected.lookup) {
      return (
        <div style={{ paddingTop: "5px", paddingLeft: "5px", paddingRight: "5px" }}>
          <div style={{ display: "block", height: "45px" }}>
            <div style={{ paddingTop: "20px", marginLeft: "auto", marginRight: "auto" }}>
              <span className="subheader" style={{ fontSize: "20px" }}>
                Lookup Parties
              </span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="inner-scrollbar" style={{ padding: "10px", height: "440px" }}>
            {!partiesLoad && partiesData
              ? partiesData.getParties.map((party) =>
                  party.charting ? (
                    ""
                  ) : (
                    <div
                      key={party.id}
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "3.5px solid #111",
                        backgroundColor: "#222",
                        userSelect: "none",
                        marginBottom: "15px",
                        boxShadow: "0px 10px 7px -5px #000000",
                      }}
                    >
                      <Grid container>
                        <Grid item xs={8}>
                          <h1
                            className="stats-text-alternate"
                            style={{ textAlign: "left", fontSize: "24px", height: "30px", marginTop: "2px", marginBottom: "20px" }}
                          >
                            {party.name}
                          </h1>
                          <span
                            className="subheader"
                            style={{ float: "left", height: "15", padding: "5px", paddingTop: "10px", borderRadius: "5px", backgroundColor: "#111" }}
                          >{`${party.characters.length} / 6`}</span>
                        </Grid>
                        <Grid item xs={4}>
                          <button
                            className="submit-button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (party.id === character.party) {
                                leaveParty({ variables: { partyId: party.id, characterId: character.characterId } });
                              } else {
                                joinParty({ variables: { partyId: party.id, characterId: character.characterId } });
                              }
                            }}
                            style={{ backgroundColor: character.party === party.id ? "darkred" : "green", height: "100%", fontSize: "24px" }}
                          >
                            {party.id === character.party ? "Leave" : "Join"}
                          </button>
                        </Grid>
                      </Grid>
                    </div>
                  )
                )
              : "Loading..."}
          </div>
        </div>
      );
    } else {
      return <h1>uh oh, an error has occurred</h1>;
    }
  };

  return (
    <div className="stats">
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <button
          className="submit-button"
          style={{ float: "initial", width: "150px", cursor: "pointer", backgroundColor: backgroundCalc("party") }}
          onClick={() => select("party")}
        >
          party
        </button>
        <button
          className="submit-button"
          style={{ float: "initial", width: "150px", marginLeft: "auto", cursor: "pointer", backgroundColor: backgroundCalc("stats") }}
          onClick={() => select("lookup")}
        >
          lookup
        </button>
      </div>
      <div className="divider-alternate" style={{ marginBottom: "15px" }}></div>
      <div className="stats-container" style={{ height: "525px" }}>
        {viewManager()}
      </div>
    </div>
  );
}

const FETCH_PARTIES = gql`
  query($locationId: ID!) {
    getParties(locationId: $locationId) {
      id
      name
      characters
      charting
    }
  }
`;

const CREATE_PARTY = gql`
  mutation createParty($locationId: ID!, $characterId: ID!, $name: String!) {
    createParty(locationId: $locationId, characterId: $characterId, name: $name) {
      name
    }
  }
`;

const JOIN_PARTY = gql`
  mutation joinParty($partyId: ID!, $characterId: ID!) {
    joinParty(partyId: $partyId, characterId: $characterId) {
      name
    }
  }
`;

const LEAVE_PARTY = gql`
  mutation leaveParty($partyId: ID!, $characterId: ID!) {
    leaveParty(partyId: $partyId, characterId: $characterId)
  }
`;

const KICK_PARTY = gql`
  mutation kickParty($partyId: ID!, $characterId: ID!) {
    kickParty(partyId: $partyId, characterId: $characterId)
  }
`;
