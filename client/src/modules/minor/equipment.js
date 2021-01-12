//General
import React, { useContext, memo } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Material UI
import Grid from "@material-ui/core/Grid";

//Minor Modules
import Item from "./item";

//Contexts
import { DragContext } from "../../helper/drag";
import { CharacterContext } from "../../helper/character";

//Assets

//Styles
import "../styles/base.css";

function Equipment({ equipmentId }) {
  //General
  const drag = useContext(DragContext);
  const character = useContext(CharacterContext);

  //Get Equipment
  const { loading, data, refetch } = useQuery(FETCH_EQUIPMENT, { variables: { equipmentId }, pollInterval: 200 });

  //Switch Items
  const [switchItems] = useMutation(SWITCH_ITEMS, {
    variables: { firstAnchor: drag.draggedFrom, secondAnchor: drag.draggedTo, firstTarget: drag.dragging, secondTarget: drag.draggedOn },
  });

  //Dragging
  const dragStart = (event, target) => {
    let img = new Image();
    img.src = "";
    event.dataTransfer.setDragImage(img, 0, 0);
    drag.start({ firstAnchor: equipmentId, firstTarget: target });
  };

  const dragOver = (event, target) => {
    event.preventDefault();
    drag.over({ secondAnchor: equipmentId, secondTarget: target });
  };

  const finishDrag = async () => {
    if (drag.draggedFrom && drag.draggedOn) {
      if (drag.dragging.substring(0, 4) === "slot") {
        let tempAbilities = character.abilities;
        tempAbilities[drag.dragging] = null;
        character.use(tempAbilities);
      }
      switchItems();
      refetch();
    }
    drag.drop();
  };

  const backgroundCalculator = (slot) => {
    if (drag.isDragging) {
      if (slot === drag.dragging && equipmentId === drag.draggedFrom) {
        return "#000";
      }
      if (slot === drag.draggedOn && equipmentId === drag.draggedTo) {
        return "#111";
      }
    } else {
      return "#333";
    }
  };

  if (!loading) {
    const inv = data.getEquipment;

    return (
      <div style={{ padding: "7px" }}>
        <Grid
          container
          justify="center"
          style={{ backgroundColor: "#111", borderRadius: "10px", width: "420px", height: "600", border: "2px solid black" }}
          spacing={2}
        >
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div style={{ padding: "5px", backgroundColor: "#222", borderRadius: "5px" }}>
              <h1 className="subheader">Head</h1>
              <div className="inventory">
                <li
                  style={{ backgroundColor: backgroundCalculator("head"), cursor: inv.head.item ? "grab" : "default" }}
                  className="slot"
                  draggable={inv.head.item ? true : false}
                  key={`${equipmentId}-head`}
                  onDragStart={(e) => dragStart(e, "head")}
                  onDragOver={(e) => dragOver(e, "head")}
                  onDragLeave={drag.leave}
                  onDrop={finishDrag}
                >
                  {inv.head.item ? <Item itemId={inv.head.item} type="head" status="equip" /> : null}
                </li>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div style={{ padding: "5px", backgroundColor: "#222", borderRadius: "5px" }}>
              <h1 className="subheader">Left Hand</h1>
              <div className="inventory">
                <li
                  style={{ backgroundColor: backgroundCalculator("leftHand"), cursor: inv.leftHand.item ? "grab" : "default" }}
                  className="slot"
                  draggable={inv.leftHand.item ? true : false}
                  key={`${equipmentId}-leftHand`}
                  onDragStart={(e) => dragStart(e, "leftHand")}
                  onDragOver={(e) => dragOver(e, "leftHand")}
                  onDragLeave={drag.leave}
                  onDrop={finishDrag}
                >
                  {inv.leftHand.item ? <Item itemId={inv.leftHand.item} type="leftHand" status="equip" /> : null}
                </li>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ padding: "5px", backgroundColor: "#222", borderRadius: "5px" }}>
              <h1 className="subheader">Upper Body</h1>
              <div className="inventory" style={{ height: "80px" }}>
                <li
                  style={{ backgroundColor: backgroundCalculator("upperBody"), cursor: inv.upperBody.item ? "grab" : "default", height: "80px" }}
                  className="slot"
                  draggable={inv.upperBody.item ? true : false}
                  key={`${equipmentId}-upperBody`}
                  onDragStart={(e) => dragStart(e, "upperBody")}
                  onDragOver={(e) => dragOver(e, "upperBody")}
                  onDragLeave={drag.leave}
                  onDrop={finishDrag}
                >
                  {inv.upperBody.item ? <Item itemId={inv.upperBody.item} type="upperBody" status="equip" /> : null}
                </li>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ padding: "5px", backgroundColor: "#222", borderRadius: "5px" }}>
              <h1 className="subheader">Right Hand</h1>
              <div className="inventory">
                <li
                  style={{ backgroundColor: backgroundCalculator("rightHand"), cursor: inv.rightHand.item ? "grab" : "default" }}
                  className="slot"
                  draggable={inv.rightHand.item ? true : false}
                  key={`${equipmentId}-rightHand`}
                  onDragStart={(e) => dragStart(e, "rightHand")}
                  onDragOver={(e) => dragOver(e, "rightHand")}
                  onDragLeave={drag.leave}
                  onDrop={finishDrag}
                >
                  {inv.rightHand.item ? <Item itemId={inv.rightHand.item} type="rightHand" status="equip" /> : null}
                </li>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ padding: "5px", backgroundColor: "#222", borderRadius: "5px" }}>
              <h1 className="subheader">Ring</h1>
              <div className="inventory">
                <li
                  style={{ backgroundColor: backgroundCalculator("ringOne"), cursor: inv.ringOne.item ? "grab" : "default" }}
                  className="slot"
                  draggable={inv.ringOne.item ? true : false}
                  key={`${equipmentId}-ringOne`}
                  onDragStart={(e) => dragStart(e, "ringOne")}
                  onDragOver={(e) => dragOver(e, "ringOne")}
                  onDragLeave={drag.leave}
                  onDrop={finishDrag}
                >
                  {inv.ringOne.item ? <Item itemId={inv.ringOne.item} type="ringOne" status="equip" /> : null}
                </li>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ padding: "5px", backgroundColor: "#222", borderRadius: "5px" }}>
              <h1 className="subheader">Lower Body</h1>
              <div className="inventory">
                <li
                  style={{ backgroundColor: backgroundCalculator("lowerBody"), cursor: inv.lowerBody.item ? "grab" : "default" }}
                  className="slot"
                  draggable={inv.lowerBody.item ? true : false}
                  key={`${equipmentId}-lowerBody`}
                  onDragStart={(e) => dragStart(e, "lowerBody")}
                  onDragOver={(e) => dragOver(e, "lowerBody")}
                  onDragLeave={drag.leave}
                  onDrop={finishDrag}
                >
                  {inv.lowerBody.item ? <Item itemId={inv.lowerBody.item} type="lowerBody" status="equip" /> : null}
                </li>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div style={{ padding: "5px", backgroundColor: "#222", borderRadius: "5px" }}>
              <h1 className="subheader">Ring</h1>
              <div className="inventory">
                <li
                  style={{ backgroundColor: backgroundCalculator("ringTwo"), cursor: inv.ringTwo.item ? "grab" : "default" }}
                  className="slot"
                  draggable={inv.ringTwo.item ? true : false}
                  key={`${equipmentId}-ringTwo`}
                  onDragStart={(e) => dragStart(e, "ringTwo")}
                  onDragOver={(e) => dragOver(e, "ringTwo")}
                  onDragLeave={drag.leave}
                  onDrop={finishDrag}
                >
                  {inv.ringTwo.item ? <Item itemId={inv.ringTwo.item} type="ringTwo" status="equip" /> : null}
                </li>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <div style={{ padding: "5px", backgroundColor: "#222", borderRadius: "5px" }}>
              <h1 className="subheader">Feet</h1>
              <div className="inventory">
                <li
                  style={{ backgroundColor: backgroundCalculator("feet"), cursor: inv.feet.item ? "grab" : "default" }}
                  className="slot"
                  draggable={inv.feet.item ? true : false}
                  key={`${equipmentId}-feet`}
                  onDragStart={(e) => dragStart(e, "feet")}
                  onDragOver={(e) => dragOver(e, "feet")}
                  onDragLeave={drag.leave}
                  onDrop={finishDrag}
                >
                  {inv.feet.item ? <Item itemId={inv.feet.item} type="feet" status="equip" /> : null}
                </li>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>
    );
  } else {
    return "";
  }
}

export default memo(Equipment);

const SWITCH_ITEMS = gql`
  mutation switchItems($firstAnchor: ID!, $secondAnchor: ID!, $firstTarget: String!, $secondTarget: String!) {
    switchItems(switchItemsInput: { firstAnchor: $firstAnchor, secondAnchor: $secondAnchor, firstTarget: $firstTarget, secondTarget: $secondTarget })
  }
`;

const FETCH_EQUIPMENT = gql`
  query($equipmentId: ID!) {
    getEquipment(equipmentId: $equipmentId) {
      id
      head {
        item
        enchantments {
          target
          value
        }
      }
      upperBody {
        item
        enchantments {
          target
          value
        }
      }
      lowerBody {
        item
        enchantments {
          target
          value
        }
      }
      feet {
        item
        enchantments {
          target
          value
        }
      }
      ringOne {
        item
        enchantments {
          target
          value
        }
      }
      ringTwo {
        item
        enchantments {
          target
          value
        }
      }
      leftHand {
        item
        enchantments {
          target
          value
        }
      }
      rightHand {
        item
        enchantments {
          target
          value
        }
      }
    }
  }
`;
