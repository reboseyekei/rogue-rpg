//General Imports
import React from "react";

//Pages
import Game from "./pages/game";

//Context
import { AuthProvider } from "./helper/auth";
import { DragProvider } from "./helper/drag";
import { CharacterProvider } from "./helper/character";
import { PlaceProvider } from "./helper/place";

function App() {
  return (
    <AuthProvider>
      <DragProvider>
        <CharacterProvider>
          <PlaceProvider>
            <Game />
          </PlaceProvider>
        </CharacterProvider>
      </DragProvider>
    </AuthProvider>
  );
}

export default App;
