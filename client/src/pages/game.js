//General
import React, { useContext} from "react";

//Pages
import Login from "../modules/major/login";
import Selection from "../modules/major/selection";
import Dungeon from "../modules/major/dungeon";
import Settlement from "../modules/major/settlement";

//Minor Modules

//Context
import { AuthContext } from "../helper/auth";
import { PlaceContext } from "../helper/place";

export default function Game() {
  const context = useContext(AuthContext);
  const placeContext = useContext(PlaceContext);

  if (context.user) {
    if (context.character && placeContext.placeId) {
        if(placeContext.type === "dungeon") {
          return <Dungeon/>
        } else {
          return <Settlement/>
        }
    } else {
      return <Selection/>;
    }
  } else {
    return <Login />;
  }
}
