//General Imports
import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Contexts
import { AuthContext } from "../../helper/auth";

//Style
import "../styles/base.css";

//Images
import Load from "../../assets/loading/donkey_web.gif";

//&&&&&===============================*** REGISTRATION AND LOGIN MAIN FUNCTION ***===============================&&&&&//
export default function Login() {
  const context = useContext(AuthContext);

  //===============================*** LOGIN/REGISTER VALUE MANAGEMENT ***===============================//
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const [registerValues, setRegisterValues] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (event) => {
    setLoginValues({ ...loginValues, [event.target.name]: event.target.value });
  };

  const handleRegisterChange = (event) => {
    setRegisterValues({ ...registerValues, [event.target.name]: event.target.value });
  };

  //Holds errors received from server
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  //===============================*** LOGIN ***===============================//

  const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
      login(loginInput: { email: $email, password: $password }) {
        id
        username
        purity
        wisdom
        locations
        spirits
        vault
        token
      }
    }
  `;

  const [loginUser, { loading: loginLoad }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
    },
    onError(err) {
      setLoginErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: loginValues,
  });

  const loginSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  const login = (
    <div className="rpg-form">
      <form onSubmit={loginSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input className={registerErrors.email ? "error" : ""} type="email" id="email" name="email" onChange={handleLoginChange} />
        <p>{loginErrors.email}</p>
        <label htmlFor="username">Password</label>
        <input className={registerErrors.password ? "error" : ""} type="text" id="password" name="password" onChange={handleLoginChange} />
        <p>{loginErrors.password}</p>
        <button className="submit-button">{loginLoad ? <img src={Load} style={{ marginTop: "-10px" }} alt="loading" /> : "login"}</button>
      </form>
    </div>
  );

  //===============================*** REGISTRATION ***===============================//
  const REGISTER_USER = gql`
    mutation register($email: String!, $username: String!, $password: String!, $confirmPassword: String!) {
      register(registerInput: { email: $email, username: $username, password: $password, confirmPassword: $confirmPassword }) {
        id
        username
        purity
        wisdom
        locations
        spirits
        vault
        token
      }
    }
  `;

  const [addUser, { loading: registerLoad }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
    },
    onError(err) {
      console.log(err);
      setRegisterErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: registerValues,
  });

  const registerSubmit = (event) => {
    event.preventDefault();
    console.log(registerValues);
    addUser();
  };

  const register = (
    <div className="rpg-form">
      <form onSubmit={registerSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input className={registerErrors.email ? "error" : ""} type="email" id="email" name="email" onChange={handleRegisterChange} />
        <p>{registerErrors.email}</p>
        <label htmlFor="username">Username</label>
        <input className={registerErrors.username ? "error" : ""} type="text" id="username" name="username" onChange={handleRegisterChange} />
        <p>{registerErrors.username}</p>
        <label htmlFor="password">Password</label>
        <input className={registerErrors.password ? "error" : ""} type="text" id="password" name="password" onChange={handleRegisterChange} />
        <label htmlFor="confirmPassword" style={{ marginTop: "2px" }}>
          Confirm password
        </label>
        <input
          className={registerErrors.confirmPassword ? "error" : ""}
          type="text"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleRegisterChange}
        />
        <p style={{ height: "30px" }}>{registerErrors.confirmPassword || registerErrors.password}</p>
        <button className="submit-button" style={{ borderColor: registerLoad ? "#ab9d48" : "#bbb" }}>
          {registerLoad ? <img src={Load} alt="loading" style={{ marginTop: "-10px" }} /> : "register"}
        </button>
      </form>
    </div>
  );

  //===============================*** COMPILED ***===============================//

  return (
    <div>
      <h1 className="title">ROGUE RPG</h1>
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {login}
        {register}
      </div>
    </div>
  );
}
