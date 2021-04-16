import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  character: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  character: null,
  login: (data) => { },
  logout: () => { },
  setCharacter: (data) => { },
  resetCharacter: () => { },
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SET_CHARACTER":
      return {
        ...state,
        character: action.payload,
      };
    case "RESET_CHARACTER":
      return {
        ...state,
        character: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(data) {
    localStorage.setItem("jwtToken", data.token);
    dispatch({
      type: "LOGIN",
      payload: data,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  function setCharacter(data) {
    dispatch({
      type: "SET_CHARACTER",
      payload: data,
    });
  }

  function resetCharacter() {
    dispatch({ type: "RESET_CHARACTER" });
  }

  return <AuthContext.Provider value={{ user: state.user, character: state.character, login, logout, setCharacter, resetCharacter }} {...props} />;
}

export { AuthContext, AuthProvider };
