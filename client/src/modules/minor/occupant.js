//General
import React, { useContext, useEffect, useState } from "react";

//Material UI
import Grid from "@material-ui/core/Grid";

//Context
import { CharacterContext } from "../../helper/character";

//Styles
import "../styles/base.css";

export default function Occupant({ occupant, turn}) {
  const getWidth = (healthMax, shieldMax) => {
    let highestStat = Math.max(healthMax, shieldMax);
    let healthMeasure;
    let shieldMeasure;

    if (healthMax === highestStat) {
      healthMeasure = "100%";
      shieldMeasure = `${(shieldMax / healthMax) * 100}%`;
    } else if (shieldMax === highestStat) {
      shieldMeasure = "100%";
      healthMeasure = `${(healthMax / shieldMax) * 100}%`;
    }

    return { healthMeasure, shieldMeasure };
  };

  let measures = getWidth(occupant.health.max, occupant.shield.max);

  const [healthWidth, setHealthWidth] = useState(`${(1 - occupant.health.current / occupant.health.max) * 100}%`);

  const calcHealth = () => {
    if(occupant.health.current > occupant.health.max){
      setHealthWidth("0%")
    } else if(occupant.health.current <= 0){
      setHealthWidth("100%")
    } else {
      setHealthWidth(`${(1 - occupant.health.current / occupant.health.max) * 100}%`);
    }
  }

  useEffect(() => {
    calcHealth();
  }, [occupant.health])

  const occupantDisplay = (
    <div style={{ height: "100%", padding: "10px"}}>
      <h1 className="subheader" style={{fontSize: "20px", color: occupant.id === turn[0][0] && "darkred"}}>{occupant.name}</h1>
      <div style={{ width: "70%" }}>
        <div style={{ marginTop: "20px" }}>
          <h1 className="subheader" style={{ fontSize: "12px", textAlign: "left", marginLeft: "2px" }}>
            {`${occupant.health.current}/${occupant.health.max} - Health`}
          </h1>
          <div className="stat-bar" style={{ width: measures.healthMeasure, marginRight: "auto" }}>
            <div className="bar" style={{ background: "#c54" }}>
              <div className="hit" style={{ width: healthWidth, maxWidth: "100%", minWidth: "0%"}}></div>
            </div>
          </div>
        </div>
        {measures.shieldMeasure !== "0%" && (
          <div style={{ marginTop: "20px" }}>
            <h1 className="subheader" style={{ fontSize: "12px", textAlign: "left", marginLeft: "2px" }}>
              {`${occupant.shield.current}/${occupant.shield.max} - Shield`}
            </h1>
            <div className="stat-bar" style={{ width: measures.shieldMeasure, marginRight: "auto" }}>
              <div className="bar" style={{ background: "#7132a8" }}>
                <div className="hit" style={{ width: `${(1 - occupant.shield.current / occupant.shield.max) * 100}%` }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <img
        src={require(`../../assets/skins/${occupant.skin}.jpg`)}
        style={{ height: "350px", borderRadius: "5px" }}
        alt={`character graphic for ${occupant.name}`}
      />
    </div>
  );

  return occupantDisplay;
}
