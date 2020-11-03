//General
import React, { useContext } from "react";

//Major Modules
import Login from "../modules/major/login";
import Selection from "../modules/major/selection";
import Settlement from "../modules/major/settlement";

//Minor Modules

//Context
import { AuthContext } from "../helper/auth";

export default function Home() {
  const context = useContext(AuthContext);

  if (context.user) {
    if (context.character) {
      return <Settlement />;
    } else {
      return <Selection />;
    }
  } else {
    return <Login />;
  }
}
