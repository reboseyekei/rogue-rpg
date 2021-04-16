import React from "react";

import Load from "../../assets/loading/large_donkey_web.gif";

import "../styles/base.css";

export default function Loading() {

    return (
        <div className="loading">
            <img src={Load} alt="loading" />
            <h1 className="header-alternate" style={{marginTop: "50px"}}>Loading...</h1>
        </div>
    );
}
