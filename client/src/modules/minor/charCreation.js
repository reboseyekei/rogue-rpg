//General
import React, { useState, useContext, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";

//Styles
import "../styles/base.css";

//Assets
import Load from "../../assets/loading/donkey_web.gif";

//Contexts
import { AuthContext } from "../../helper/auth";

//Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CharCreation({ open, handleClose}) {
  const context = useContext(AuthContext);
  const userId = context.user.id;

  //NEW CHARACTER VALUES
  const [values, setValues] = useState({
    charName: "",
    locationId: "",
    spiritId: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const resetValues = () => {
    setValues({
      charName: "",
      locationId: "",
      spiritId: "",
    });
    setErrors({});
  };

  const [errors, setErrors] = useState({});

  const [createCharacter, { loading: characterLoad, data: characterData }] = useMutation(CREATE_CHARACTER, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const createCharacterSubmit = (event) => {
    event.preventDefault();
    createCharacter();
  };

  const { loading: locationsLoad, data: locationsData } = useQuery(FETCH_LOCATIONS, { variables: { userId } });
  const { loading: spiritsLoad, data: spiritsData } = useQuery(FETCH_SPIRITS, { variables: { userId } });

  useEffect(() => {
    const passTime = (ms) => new Promise((res) => setTimeout(res, ms));
    async function closeWindow() {
      resetValues();
      await passTime(1000);
      handleClose();
    }

    if(!characterLoad && characterData) {
      closeWindow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterData]);

  const dialog = (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{ style: { backgroundColor: "#000", fontFamily: "Press Start 2P", color: "white" } }}
    >
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
          <p>{!errors.charName ? "" : errors.charName}</p>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="locationSelect">Spawn place</label>
          <select id="locationSelect" name="locationId" value={values.place} onChange={handleChange}>
            <option value=""></option>
            {!locationsLoad && locationsData
              ? locationsData.getLocations.map((location) => <option key={location.id} value={location.id}>{`${location.name}`}</option>)
              : ""}
          </select>
          <div>
            <p style={{ color: "white", lineHeight: "1.6", height: "auto" }}>
              Your spawning place decides where your character starts. Certain classes can only be selected in certain spawn places. Dangerous starts will be
              colored.
            </p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="spiritSelect">Class select</label>
          <select id="spiritSelect" name="spiritId" value={values.abilityChoice} onChange={handleChange}>
            <option value=""></option>
            {!spiritsLoad && spiritsData ? spiritsData.getSpirits.map((spirit) => <option key={spirit.id} value={spirit.id}>{`${spirit.name}`}</option>) : ""}
          </select>
          <p style={{ color: "white", lineHeight: "1.6", height: "auto" }}>
            Classes can influence how you play the game, but aren't hard limitations on what your character can do
          </p>
        </Grid>
        <Grid item xs={10} md={5} lg={3}>
          <button className="submit-button" onClick={createCharacterSubmit} style={{ borderColor: characterLoad ? "#ab9d48" : "#bbb", marginBottom: "10px" }}>
            {characterLoad ? <img src={Load} alt="loading" style={{ marginTop: "-10px" }} /> : "Create Character"}
          </button>
        </Grid>
      </Grid>
    </Dialog>
  );
  return dialog;
}

const CREATE_CHARACTER = gql`
  mutation createCharacter($charName: String!, $locationId: String!, $spiritId: String!) {
    createCharacter(createCharacterInput: { charName: $charName, locationId: $locationId, spiritId: $spiritId }) {
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

const FETCH_LOCATIONS = gql`
  query($userId: ID!) {
    getLocations(userId: $userId) {
      id
      name
    }
  }
`;

const FETCH_SPIRITS = gql`
  query($userId: ID!) {
    getSpirits(userId: $userId) {
      id
      name
      desc
    }
  }
`;
