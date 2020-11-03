//General
import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Minor Modules
import Inventory from "../minor/inventory";

//Contexts
import { AuthContext } from "../../helper/auth";

//Styles
import "../styles/base.css";

//Transition

export default function Selection() {
  //GENERAL VALUES
  const context = useContext(AuthContext);
  const characterId = context.character.id;
  const { loading, data } = useQuery(FETCH_CHARACTER, { variables: { characterId } });
  //GRAPHQL FUNCTIONS
  return loading ? (
    ""
  ) : (
    <div>
      <Inventory inventoryId="5f90c0399bf12b59b442e28a" />
      <Inventory inventoryId={data.getCharacter.inventory} />
    </div>
  );
}

const FETCH_CHARACTER = gql`
  query($characterId: ID!) {
    getCharacter(characterId: $characterId) {
      inventory
    }
  }
`;
