//General Imports
import React from "react";

//Pages
import Home from "./pages/home";

//Context
import { AuthProvider } from "./helper/auth";
import { DragProvider } from "./helper/drag";

function App() {
  return (
    <AuthProvider>
      <DragProvider>
        <Home />
      </DragProvider>
    </AuthProvider>
  );
}

export default App;
