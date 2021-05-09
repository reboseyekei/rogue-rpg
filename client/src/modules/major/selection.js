//General
import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Minor Modules
import CharCreation from "../minor/charCreation";

//Contexts
import { AuthContext } from "../../helper/auth";
import { PlaceContext } from "../../helper/place";

//Styles
import "../styles/base.css";

//Assets
import plus from "../../assets/loading/plus.jpg";

//Transition

export default function Selection() {
  //GENERAL VALUES
  const context = useContext(AuthContext);
  const userId = context.user.id;
  const placeContext = useContext(PlaceContext);

  //GRAPHICAL MANAGEMENT
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(Math.random());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //GRAPHQL FUNCTIONS
  const { loading: charactersLoad, data: charactersData } = useQuery(FETCH_CHARACTERS, { variables: { userId }, pollInterval: 500 });
  const { loading: placesLoad, data: placesData, refetch } = useQuery(FETCH_PLACES, { variables: { userId }, fetchPolicy: "no-cache" });

  useEffect(() => {
    setReset(Math.random());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placesData]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charactersData]);

  const findPlace = (places, place) => {
    const index = places.places.indexOf(place);
    return index;
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={8} md={11}>
          <h1 className="title">ROGUE RPG</h1>
        </Grid>
        <Grid item xs={4} md={1}>
          <button className="base-button" onClick={context.logout} style={{ fontFamily: "Piazzolla", height: "100%", marginRight: "auto", float: "right" }}>
            <h1>LOGOUT</h1>
          </button>
        </Grid>
      </Grid>
      <section className="basic-grid" key={reset}>
        {charactersLoad && placesLoad
          ? ""
          : !charactersLoad &&
            charactersData.getCharacters &&
            !placesLoad &&
            placesData.getPlaces &&
            !open &&
            charactersData.getCharacters.map((character) => (
              <div
                className="card"
                key={character.id}
                onClick={() => {
                  if (placesData.getPlaces.data[findPlace(placesData.getPlaces, character.place)]) {
                    context.setCharacter({ id: character.id, skins: character.skins, place: character.place });
                    let places = placesData.getPlaces;
                    placeContext.place({
                      placeId: character.place,
                      type: places.data[findPlace(places, character.place)].desc ? "location" : "dungeon",
                      name: places.data[findPlace(places, character.place)].name,
                      desc: places.data[findPlace(places, character.place)].desc,
                    });
                  }
                }}
              >
                <img
                  src={require(`../../assets/skins/${character.skins[0]}.jpg`)}
                  style={{ width: "300px", height: "300px" }}
                  alt={`character graphic for ${character.skins[0]}`}
                />
                <h5 style={{ fontFamily: "Piazzolla", marginBottom: "0" }}>{character.name}</h5>
                <div style={{ marginTop: "0", fontFamily: "Press Start 2P", fontSize: ".25em", textAlign: "center" }}>
                  <p style={{ height: "30px" }}>
                    {placesData.getPlaces.data[findPlace(placesData.getPlaces, character.place)]
                      ? placesData.getPlaces.data[findPlace(placesData.getPlaces, character.place)].name
                      : "Loading..."}
                  </p>
                  <p>{`level: ${character.level.lvl}`}</p>
                </div>
              </div>
            ))}
        <div className="card" key={"plus"} onClick={handleClickOpen}>
          <img src={plus} style={{ width: "200px", height: "200px" }} alt="create a new character" />
          <h5 style={{ fontFamily: "Piazzolla", marginBottom: "0" }}>New Character</h5>
        </div>
        <CharCreation open={open} handleClose={handleClose} />
      </section>
    </div>
  );
}

const FETCH_CHARACTERS = gql`
  query($userId: ID!) {
    getCharacters(userId: $userId) {
      id
      skins
      name
      place
      level {
        lvl
      }
    }
  }
`;

const FETCH_PLACES = gql`
  query($userId: ID!) {
    getPlaces(userId: $userId) {
      places
      data {
        ... on Dungeon {
          name
        }
        ... on Location {
          name
          desc
        }
      }
    }
  }
`;
