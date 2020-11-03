import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from "./contexts/auth";


import Start from "./pages/Start";
import Home from "./pages/Home";

function ProtectedRoute({ component }) {
    const context = useContext(AuthContext);
    const Component = component;
    const isAuthenticated = context.user;

    if (isAuthenticated) {
        return <Home />
    } else {
        return <Start />
    }
}

export default ProtectedRoute;
