//General
import React, { useContext, useState } from "react";

//Material UI
import Grid from "@material-ui/core/Grid";

//Context
import { CharacterContext } from "../../helper/character";

//Styles
import "../styles/base.css";

export default function Players({ players, turn}) {
  const character = useContext(CharacterContext);

  const getWidth = (healthMax, manaMax, staminaMax, shieldMax) => {
    let highestStat = Math.max(healthMax, manaMax, staminaMax, shieldMax);
    let healthMeasure;
    let manaMeasure;
    let staminaMeasure;
    let shieldMeasure;

    if (healthMax === highestStat) {
      healthMeasure = "100%";
      manaMeasure = `${(manaMax / healthMax) * 100}%`;
      staminaMeasure = `${(staminaMax / healthMax) * 100}%`;
      shieldMeasure = `${(shieldMax / healthMax) * 100}%`;
    } else if (manaMax === highestStat) {
      manaMeasure = "100%";
      healthMeasure = `${(healthMax / manaMax) * 100}%`;
      staminaMeasure = `${(staminaMax / manaMax) * 100}%`;
      shieldMeasure = `${(shieldMax / manaMax) * 100}%`;
    } else if (staminaMax === highestStat) {
      staminaMeasure = "100%";
      healthMeasure = `${(healthMax / staminaMax) * 100}%`;
      manaMeasure = `${(manaMax / staminaMax) * 100}%`;
      shieldMeasure = `${(shieldMax / staminaMax) * 100}%`;
    } else if (shieldMax === highestStat) {
      shieldMeasure = "100%";
      healthMeasure = `${(healthMax / shieldMax) * 100}%`;
      manaMeasure = `${(manaMax / shieldMax) * 100}%`;
      staminaMeasure = `${(staminaMax / shieldMax) * 100}%`;
    }

    return { healthMeasure, manaMeasure, staminaMeasure, shieldMeasure };
  };

  const calcHit = (curr, max) => {
    if(curr > max){
      return "0%"
    } else if(curr <= 0){
      return "100%"
    } else {
      return `${(1 - curr / max) * 100}%`
    }
  }

  const playerDisplay = (player) => {
    let measures = getWidth(player.health.max, player.mana.max, player.stamina.max, player.shield.max);
    let healthHit = calcHit(player.health.current, player.health.max);
    let manaHit = calcHit(player.mana.current, player.mana.max);
    let staminaHit = calcHit(player.stamina.current, player.stamina.max);
    let shieldHit = calcHit(player.shield.current, player.shield.max);

    return (
      <Grid item xs={2} key={player.id}>
        <div style={{ borderRadius: "5px", border: player.id === turn[0][0] ? "2px solid #918959" : "2px solid #111", padding: "10px", height: "100%" }}>
          <h1 className="subheader">{player.name}</h1>
          <img
            src={require(`../../assets/skins/${player.skin}.jpg`)}
            style={{ width: "80%", borderRadius: "5px" }}
            alt={`character graphic for ${player.name}`}
          />
          <div style={{ marginTop: "4px", border: "2px solid #111", padding: "3px", borderRadius: "4px" }}>
            <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "2px" }}>
              {`${player.health.current}/${player.health.max} - Health`}
            </h1>
            <div className="stat-bar" style={{ width: measures.healthMeasure, marginRight: "auto" }}>
              <div className="bar" style={{ background: "#c54" }}>
                <div className="hit" style={{ width: healthHit }}></div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "4px", border: "2px solid #111", padding: "3px", borderRadius: "4px" }}>
            <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "2px" }}>
              {`${player.mana.current}/${player.mana.max} - Mana`}
            </h1>
            <div className="stat-bar" style={{ width: measures.manaMeasure, marginRight: "auto" }}>
              <div className="bar" style={{ background: "#4474cc" }}>
                <div className="hit" style={{ width: manaHit }}></div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "4px", border: "2px solid #111", padding: "3px", borderRadius: "4px" }}>
            <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "2px" }}>
              {`${player.stamina.current}/${player.stamina.max} - Stamina`}
            </h1>
            <div className="stat-bar" style={{ width: measures.staminaMeasure, marginRight: "auto" }}>
              <div className="bar" style={{ background: "#44cc64" }}>
                <div className="hit" style={{ width: staminaHit }}></div>
              </div>
            </div>
          </div>
          {measures.shieldMeasure !== "0%" && (
            <div style={{ marginTop: "4px", border: "2px solid #111", padding: "3px", borderRadius: "5px" }}>
              <h1 className="subheader" style={{ fontSize: "10px", textAlign: "left", marginLeft: "2px" }}>
                {`${player.shield.current}/${player.shield.max} - Shield`}
              </h1>
              <div className="stat-bar" style={{ width: measures.shieldMeasure, marginRight: "auto" }}>
                <div className="bar" style={{ background: "#7132a8" }}>
                  <div className="hit" style={{ width: shieldHit }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Grid>
    );
  };

  return (
    <div>
      <Grid container spacing={2}>
        {players.map((player) => playerDisplay(player))}
      </Grid>
    </div>
  );
}
