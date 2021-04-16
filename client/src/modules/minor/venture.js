//General
import React, { useContext, memo, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Context
import { CharacterContext } from "../../helper/character";
import { PlaceContext } from "../../helper/place";

//Assets
import Loading from "../../assets/loading/donkey_web.gif";

//Styles
import "../styles/base.css";

function Venture() {
  const character = useContext(CharacterContext);
  const place = useContext(PlaceContext);

  //GraphQl
  let isParty = character.party ? false : true;

  const { loading: areasLoad, data: areasData } = useQuery(FETCH_AREAS, { variables: { locationId: character.place }, pollInterval: 1000 });
  const { loading: partyLoad, data: partyData } = useQuery(FETCH_PARTY, { variables: { partyId: character.party }, skip: isParty, pollInterval: 1000 });
  const [createDungeon, { loading: dungeonLoad, data: dungeonData }] = useMutation(CREATE_DUNGEON);

  useEffect(() => {
    if (!dungeonLoad && dungeonData) {
      place.place({
        placeId: dungeonData.createDungeon.id,
        type: "dungeon",
        name: dungeonData.createDungeon.name,
        desc: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dungeonData]);

  //Text Generation
  const rarityText = (rarity) => {
    if (rarity === 0) {
      return "There are no mutated creatures";
    } else if (rarity === 1 || rarity === 2) {
      return "There is a low level of mutation";
    } else if (rarity === 3) {
      return "There is a normal level of mutation";
    } else if (rarity === 4) {
      return "There is a high level of mutation";
    } else if (rarity === 5) {
      return "There is a extreme level of mutation";
    }
  };

  const chaosText = (chaos) => {
    if (chaos === 0) {
      return "- It is easy to traverse this place";
    } else if (chaos === 1 || chaos === 2) {
      return "- There are a few tricks to watch out for";
    } else if (chaos === 3) {
      return "- You can expect to get a little lost";
    } else if (chaos === 4 || chaos === 5) {
      return "- Few can find there way through this place";
    }
    return "";
  };

  const dropText = (droprate) => {
    if (droprate === 0) {
      return "- This place has little to take";
    } else if (droprate === 1 || droprate === 2) {
      return "- This place has a few treasures";
    } else if (droprate === 3) {
      return "- This place has an adequate number of treasures to find";
    } else if (droprate === 4 || droprate === 5) {
      return "- This place is filled with treasures";
    }
    return "";
  };

  const alignmentText = (alignment) => {
    if (alignment <= 10) {
      return "The creatures here act as they should";
    } else if (alignment > 10 && alignment < 30) {
      return "The creatures here are somewhat tame";
    } else if (alignment >= 30 && alignment < 60) {
      return "The creatures here are somewhat friendly";
    } else if (alignment >= 60) {
      return "The creatures here are much more peaceful and kind than their counterparts";
    }
    return "";
  };

  const humanityText = (humanity) => {
    if (humanity <= 10) {
      return "The creatures here are of their base intellect";
    } else if (humanity > 10 && humanity < 30) {
      return "The creatures here are somewhat intelligent";
    } else if (humanity >= 30 && humanity < 60) {
      return "The creatures here are of noticeable intellect";
    } else if (humanity >= 60) {
      return "The intelligence of creatures here rivals man";
    }
    return "";
  };

  const floorText = (size, rooms, containment) => {
    let generalText = [`There are ${size} floors, each with around ${rooms} rooms. `, []];
    for (let i = 0; i < containment.length; i++) {
      let starterText = `floor ${i + 1}: `;
      let containmentText = "";
      if (containment[i] === 0) {
        containmentText = "can leave after room encounters, cannot perish";
      } else if (containment[i] === 1) {
        containmentText = "can leave after room encounters, can perish";
      } else if (containment[i] === 2) {
        containmentText = "can only leave through teleporter rooms, can perish";
      }
      let totalText = starterText + containmentText;
      generalText[1].push(totalText);
    }
    return (
      <div>
        <h1
          className="subheader"
          key="general"
          style={{
            textAlign: "left",
            lineHeight: "1.2",
            fontSize: "10px",
            height: "15",
            padding: "10px",
            paddingTop: "10px",
            borderRadius: "5px",
            backgroundColor: "#111",
          }}
        >
          {generalText[0]}
        </h1>
        {generalText[1].map((text) => (
          <h1
            className="subheader"
            key={text}
            style={{
              textAlign: "left",
              lineHeight: "1.2",
              fontSize: "10px",
              height: "15",
              padding: "10px",
              paddingTop: "10px",
              borderRadius: "5px",
              backgroundColor: "#111",
            }}
          >
            {text}
          </h1>
        ))}
      </div>
    );
  };

  const typeText = (type) => {
    let newType = type.charAt(0).toUpperCase() + type.slice(1);
    return newType;
  };

  const buttonText = (isParty, isPartyLeader, type) => {
    if (isParty) {
      return `Enter the ${type}`;
    } else if (!isParty && isPartyLeader) {
      return `Enter the ${type} (with party)`;
    } else {
      return "Must be party leader to venture";
    }
  };

  if ((!areasLoad && areasData && isParty) || (!areasLoad && areasData && !isParty && !partyLoad && partyData)) {
    let areas = areasData.getAreas;
    let party;
    let isPartyLeader = true;

    if (!isParty) {
      party = partyData.getParty;
      isPartyLeader = party.characters[0] === character.characterId;
    }

    return (
      <div className="stats-container" style={{ height: "550px", width: "650px" }}>
        <div className="inner-scrollbar" style={{ padding: "10px", height: "500px" }}>
          {areas.map((area) => (
            <div
              key={area.id}
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
              <Grid container style={{ borderRadius: "5px" }}>
                <Grid item xs={5}>
                  <img
                    src={require(`../../assets/icons/${area.icon}.jpg`)}
                    style={{ width: "238px", height: "238px", borderRadius: "5px" }}
                    alt={`dungeon graphic for ${area.name}`}
                  />
                </Grid>
                <Grid item xs={7}>
                  <div style={{ marginLeft: "10px", paddingRight: "5px" }}>
                    <h1 className="stats-text-alternate" style={{ fontSize: "26px", height: "30px", marginTop: "2px", marginBottom: "5px" }}>
                      {area.name}
                    </h1>
                    <h1
                      className="subheader"
                      style={{
                        lineHeight: "1.2",
                        fontSize: "10px",
                        height: "15",
                        padding: "5px",
                        paddingTop: "10px",
                        borderRadius: "5px",
                        backgroundColor: "#111",
                      }}
                    >{`Recommended level: ${area.level}`}</h1>
                    <h1
                      className="subheader"
                      style={{
                        textAlign: "left",
                        lineHeight: "1.2",
                        fontSize: "10px",
                        height: "15",
                        padding: "10px",
                        paddingTop: "10px",
                        borderRadius: "5px",
                        backgroundColor: "#111",
                      }}
                    >{`${area.desc}`}</h1>
                    <h1
                      className="subheader"
                      style={{
                        textAlign: "left",
                        lineHeight: "1.2",
                        fontSize: "10px",
                        height: "15",
                        padding: "10px",
                        paddingTop: "10px",
                        borderRadius: "5px",
                        backgroundColor: "#111",
                      }}
                    >
                      {dropText(area.droprate)}
                    </h1>
                    <h1
                      className="subheader"
                      style={{
                        textAlign: "left",
                        lineHeight: "1.2",
                        fontSize: "10px",
                        height: "15",
                        padding: "10px",
                        paddingTop: "10px",
                        borderRadius: "5px",
                        backgroundColor: "#111",
                      }}
                    >
                      {chaosText(area.chaos)}
                    </h1>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <h1
                    className="subheader"
                    style={{
                      textAlign: "left",
                      lineHeight: "1.2",
                      fontSize: "10px",
                      height: "15",
                      padding: "10px",
                      paddingTop: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#111",
                    }}
                  >
                    {floorText(area.size, area.length, area.containment)}
                  </h1>
                  <h1
                    className="subheader"
                    style={{
                      textAlign: "left",
                      lineHeight: "1.2",
                      fontSize: "10px",
                      height: "15",
                      padding: "10px",
                      paddingTop: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#111",
                    }}
                  >
                    {rarityText(area.rarity)}
                  </h1>
                  <h1
                    className="subheader"
                    style={{
                      textAlign: "left",
                      lineHeight: "1.2",
                      fontSize: "10px",
                      height: "15",
                      padding: "10px",
                      paddingTop: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#111",
                    }}
                  >
                    {humanityText(area.humanity)}
                  </h1>
                  <h1
                    className="subheader"
                    style={{
                      textAlign: "left",
                      lineHeight: "1.2",
                      fontSize: "10px",
                      height: "15",
                      padding: "10px",
                      paddingTop: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#111",
                    }}
                  >
                    {alignmentText(area.alignment)}
                  </h1>
                </Grid>
                <Grid item xs={12}>
                  <button
                    className="submit-button"
                    disabled={!isPartyLeader}
                    style={{
                      backgroundColor: isPartyLeader ? "green" : "gray",
                      pointerEvents: isPartyLeader ? "auto" : "none",
                      marginBottom: "10px",
                      width: "82.5%",
                      marginTop: "auto",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      let values = {
                        templateId: area.id,
                        partyId: !isParty ? character.party : null,
                        characterId: character.characterId,
                        locationId: character.place,
                      };
                      console.log(values);
                      createDungeon({ variables: values });
                    }}
                  >
                    {dungeonLoad ? <img src={Loading} alt="loading" style={{ marginTop: "-10px" }} /> : buttonText(isParty, isPartyLeader, typeText(area.type))}
                  </button>
                </Grid>
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

export default memo(Venture);

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

const FETCH_AREAS = gql`
  query($locationId: ID!) {
    getAreas(locationId: $locationId) {
      id
      name
      desc
      icon
      level
      size
      length
      containment
      chaos
      rarity
      droprate
      alignment
      humanity
      type
    }
  }
`;

const CREATE_DUNGEON = gql`
  mutation createDungeon($templateId: ID!, $partyId: ID, $characterId: ID!, $locationId: ID!) {
    createDungeon(createDungeonInput: { templateId: $templateId, partyId: $partyId, characterId: $characterId, locationId: $locationId }) {
      id
      name
    }
  }
`;
