//General
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";

//Styles
import "../styles/base.css";

//Assets
import Load from "../../assets/loading/donkey_web.gif";

//Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CharCreation({ open, handleClose }) {
  //NEW CHARACTER VALUES
  const [values, setValues] = useState({
    charName: "",
    place: "Spawn Village",
    abilityChoice: 1,
  });

  const handleChange = (event) => {
    if (event.target.name === "abilityChoice") {
      let num = parseInt(event.target.value);
      setValues({ ...values, abilityChoice: num });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
    }
  };

  const resetValues = () => {
    setValues({
      charName: "",
      place: "Spawn Village",
      abilityChoice: 1,
    });
    setErrors({});
  };

  const [errors, setErrors] = useState({});

  const [createCharacter, loading] = useMutation(CREATE_CHARACTER, {
    update(_, data) {
      handleClose();
      resetValues();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
    variables: values,
  });

  const createCharacterSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    createCharacter();
  };

  const dialog = (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{ style: { backgroundColor: "#000", fontFamily: "Press Start 2P", color: "white" } }}
    >
      <form onSubmit={createCharacterSubmit} noValidate>
        <Grid container style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <Grid item xs={11}>
            <p style={{ color: "white", marginLeft: "20px", fontSize: "1.5em", marginTop: "30px", textAlign: "center" }}>Create a Character</p>
          </Grid>
          <Grid item xs={1}>
            <button className="null-button" onClick={handleClose}>
              <h1>X</h1>
            </button>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="characterName">Character name</label>
            <input type="text" id="characterName" name="charName" value={values.charName} onChange={handleChange} />
            <p>{errors.charName}</p>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="placeSelect">Spawn place</label>
            <select id="placeSelect" name="place" value={values.place} onChange={handleChange}>
              <option value="Spawn Village">Spawn Village</option>
            </select>
            <div>
              <p style={{ color: "white", lineHeight: "1.6", height: "auto" }}>
                Your spawning place decides where your character starts. Certain classes can only be selected in certain spawn places. Dangerous starts will be
                colored.
              </p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="abilityChoice">Class select</label>
            <select id="abilityChoice" name="abilityChoice" value={values.abilityChoice} onChange={handleChange}>
              <option value={1}>Warrior</option>
              <option value={2}>Rogue</option>
              <option value={3}>Wizard</option>
            </select>
            <p style={{ color: "white", lineHeight: "1.6", height: "auto" }}>
              Classes only decide your character's starting skin and ability, unless indicated as rare
            </p>
          </Grid>
          <Grid item xs={10} md={5} lg={3}>
            <button className="submit-button" style={{ borderColor: loading ? "#ab9d48" : "#bbb", marginBottom: "10px" }}>
              {loading ? <img src={Load} alt="loading" style={{ marginTop: "-10px" }} /> : "Create character"}
            </button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
  return dialog;
}

const CREATE_CHARACTER = gql`
  mutation createCharacter($charName: String!, $place: String!, $abilityChoice: Int!) {
    createCharacter(createCharacterInput: { charName: $charName, place: $place, abilityChoice: $abilityChoice }) {
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
