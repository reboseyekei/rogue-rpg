//General
import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Minor Modules
import CharCreation from "../minor/charCreation";

//Contexts
import { AuthContext } from "../../helper/auth";

//Styles
import "../styles/base.css";

//TODO REPLACE ART WITH MODULAR LINKS
import plus from "../../assets/loading/plus.jpg";

//Transition

export default function Selection() {
  //GENERAL VALUES
  const context = useContext(AuthContext);
  const userId = context.user.id;

  //GRAPHICAL MANAGEMENT
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //GRAPHQL FUNCTIONS
  const { loading, data } = useQuery(FETCH_CHARACTERS, { variables: { userId }, pollInterval: 500 });

  return (
    <div>
      <Grid container>
        <Grid item xs={8} md={11}>
          <h1 className="title">PICK A CHARACTER</h1>
        </Grid>
        <Grid item xs={4} md={1}>
          <button className="base-button" onClick={context.logout} style={{ fontFamily: "Piazzolla", height: "100%", marginRight: "auto", float: "right" }}>
            <h1>LOGOUT</h1>
          </button>
        </Grid>
      </Grid>
      <section className="basic-grid">
        {loading ? (
          <h1 style={{ fontFamily: "Piazzola", textAlign: "center" }}>Loading Characters...</h1>
        ) : (
          data.getCharacters &&
          data.getCharacters.map((character) => (
            <div
              className="card"
              key={character.id}
              onClick={() => {
                context.setCharacter({ id: character.id, skin: character.skin });
              }}
            >
              <img
                src={require(`../../assets/skins/${character.skin}.jpg`)}
                style={{ width: "200px", height: "200px" }}
                alt={`character graphic for ${character.skin}`}
              />
              <h5 style={{ fontFamily: "Piazzolla", marginBottom: "0" }}>{character.name}</h5>
              <div style={{ marginTop: "0", fontFamily: "Press Start 2P", fontSize: ".25em", textAlign: "center" }}>
                <p style={{ height: "30px" }}>{`${character.place}`}</p>
                <p>{`level: ${character.level.lvl}`}</p>
              </div>
            </div>
          ))
        )}
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
      skin
      name
      place
      level {
        lvl
      }
    }
  }
`;
