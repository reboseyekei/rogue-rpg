//General
import React, { memo, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Contexts
import { DragContext } from "../../helper/drag";

//Styles
import "../styles/base.css";

function Item({ itemId, enchantments }) {
  const { loading, data } = useQuery(FETCH_ITEM, { variables: { itemId } });
  const drag = useContext(DragContext);

  const bodyGenerator = (item) => {
    let typeText = "";
    let details = [];

    switch (item.type) {
      case "consumable_cap":
        typeText = (
          <h5 style={{ fontFamily: "Piazzolla", margin: 0, marginTop: "2px", textAlign: "center", color: "orchid" }} key={`${itemId}-type`}>
            Potential Gem
          </h5>
        );
        if (item.mind.cap)
          details.push(
            <h6 style={{ margin: 0, marginTop: "1px" }} key={`${itemId}-mind-cap`}>
              {`+ ${item.mind.cap} to `}
              <span style={{ color: "darkcyan", textDecoration: "underline" }}>Mind cap</span>
            </h6>
          );
        if (item.body.cap)
          details.push(
            <h6 style={{ margin: 0, marginTop: "1px" }} key={`${itemId}-body-cap`}>
              {`+ ${item.body.cap} to `}
              <span style={{ color: "firebrick", textDecoration: "underline" }}>Body cap</span>
            </h6>
          );
        if (item.soul.cap)
          details.push(
            <h6 style={{ margin: 0, marginTop: "1px" }} key={`${itemId}-soul-cap`}>
              {`+ ${item.soul.cap} to `}
              <span style={{ color: "darkorchid", textDecoration: "underline" }}>Soul cap</span>
            </h6>
          );
        if (item.slots) details.push(`+ ${item.slots} slots`);
        break;
      default:
    }

    return (
      <div>
        <div className="divider"></div>
        {typeText}
        {details.map((detail) => detail)}
      </div>
    );
  };

  if (itemId) {
    if (!loading) {
      const fetchedItem = data.getItem;
      return (
        <div className="tooltip">
          <object
            className="item"
            style={{ height: "48px", width: "48px", cursor: "grab" }}
            data={require(`../../assets/items/${fetchedItem.path}.svg`)}
            type="image/svg+xml"
          >
            <img src={require(`../../assets/items/${fetchedItem.path}.svg`)} alt={fetchedItem.name} />
          </object>
          {!drag.isDragging ? (
            <div
              ref={(el) => {
                if (!el) return null;
                let left = el.getBoundingClientRect().x;
                let top = el.getBoundingClientRect().y;
                let heightCap = (window.innerHeight * 2) / 4;
                let widthCap = (window.innerWidth * 2) / 4;
                if (top < heightCap) {
                  el.style.cssText = "top: 60%; left: 50%;";
                  if (left < 0) {
                    el.style.cssText = "top: 60%; left: 106%;";
                  }
                  if (left > widthCap) {
                    el.style.cssText = "top: 60%; left: -6%";
                  }
                }
                if (top > heightCap) {
                  el.style.cssText = "bottom: 60%; left: 50%";
                  if (left < 0) {
                    el.style.cssText = "bottom: 60%; left: 106%";
                  }
                  if (left > widthCap) {
                    el.style.cssText = "bottom: 60%; left: -6%";
                  }
                }
              }}
              className="tooltiptext"
            >
              <h4 style={{ fontFamily: "Piazzolla", margin: 0, textAlign: "center", color: "gold" }}>{fetchedItem.name}</h4>
              <h6 style={{ margin: 0, marginBottom: "2px" }}>{fetchedItem.desc}</h6>
              {bodyGenerator(fetchedItem)}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    }
  } else {
    return null;
  }
  return null;
}

export default memo(Item);

const FETCH_ITEM = gql`
  query($itemId: ID!) {
    getItem(itemId: $itemId) {
      name
      desc
      path
      type
      ability
      slots
      mind {
        cap
        creation
        restoration
        destruction
      }
      body {
        cap
        vitality
        defense
        strength
        dexterity
      }
      soul {
        luck
        capacity
        clarity
        will
      }
      essence {
        focus
        value
      }
    }
  }
`;
