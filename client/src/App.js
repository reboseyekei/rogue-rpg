//General Imports
import React from "react";

//Pages
import Home from "./pages/home";

//Context
import { AuthProvider } from "./helper/auth";
import { DragProvider } from "./helper/drag";
import { CharacterProvider } from "./helper/character";

function App() {
  return (
    <AuthProvider>
      <DragProvider>
        <CharacterProvider>
          <Home />
        </CharacterProvider>
      </DragProvider>
    </AuthProvider>
  );
}

export default App;
