//General
import React, { useContext, memo } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

//Minor Modules
import Item from "./item";

//Contexts
import { DragContext } from "../../helper/drag";
import { CharacterContext } from "../../helper/character";

//Styles
import "../styles/base.css";

function Inventory({ inventoryId, refreshEquips }) {
  //General
  const drag = useContext(DragContext);
  const character = useContext(CharacterContext);

  //Get Inventories
  const { loading, data, refetch } = useQuery(FETCH_INVENTORY, { variables: { inventoryId }, pollInterval: 200 });

  //Switch Items
  const [switchItems] = useMutation(SWITCH_ITEMS, {
    variables: { firstAnchor: drag.draggedFrom, secondAnchor: drag.draggedTo, firstTarget: drag.dragging, secondTarget: drag.draggedOn },
  });

  //Dragging
  const dragStart = (event, target) => {
    let img = new Image();
    img.src = "";
    event.dataTransfer.setDragImage(img, 0, 0);
    drag.start({ firstAnchor: inventoryId, firstTarget: target });
  };

  const dragOver = (event, target) => {
    event.preventDefault();
    drag.over({ secondAnchor: inventoryId, secondTarget: target });
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
      if (slot === drag.dragging && inventoryId === drag.draggedFrom) {
        return "#000";
      }
      if (slot === drag.draggedOn && inventoryId === drag.draggedTo) {
        return "#111";
      }
    } else {
      return "#333";
    }
  };

  if (!loading) {
    const inv = data.getInventory;
    const slots = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];

    return (
      <div className="inventory">
        {slots.map((slot) => (
          <li
            style={{ backgroundColor: backgroundCalculator(slot), cursor: inv[slot].item ? "grab" : "default" }}
            className="slot"
            draggable={inv[slot].item ? true : false}
            key={`${inventoryId}-${slot}`}
            onDragStart={(e) => dragStart(e, slot)}
            onDragOver={(e) => dragOver(e, slot)}
            onDragLeave={drag.leave}
            onDrop={finishDrag}
          >
            {inv[slot].item ? <Item itemId={inv[slot].item} /> : null}
          </li>
        ))}
      </div>
    );
  } else {
    return "";
  }
}

export default memo(Inventory);

const SWITCH_ITEMS = gql`
  mutation switchItems($firstAnchor: ID!, $secondAnchor: ID!, $firstTarget: String!, $secondTarget: String!) {
    switchItems(switchItemsInput: { firstAnchor: $firstAnchor, secondAnchor: $secondAnchor, firstTarget: $firstTarget, secondTarget: $secondTarget })
  }
`;

const FETCH_INVENTORY = gql`
  query($inventoryId: ID!) {
    getInventory(inventoryId: $inventoryId) {
      one {
        item
        enchantments {
          target
          value
        }
      }
      two {
        item
        enchantments {
          target
          value
        }
      }
      three {
        item
        enchantments {
          target
          value
        }
      }
      four {
        item
        enchantments {
          target
          value
        }
      }
      five {
        item
        enchantments {
          target
          value
        }
      }
      six {
        item
        enchantments {
          target
          value
        }
      }
      seven {
        item
        enchantments {
          target
          value
        }
      }
      eight {
        item
        enchantments {
          target
          value
        }
      }
      nine {
        item
        enchantments {
          target
          value
        }
      }
      ten {
        item
        enchantments {
          target
          value
        }
      }
      eleven {
        item
        enchantments {
          target
          value
        }
      }
      twelve {
        item
        enchantments {
          target
          value
        }
      }
      thirteen {
        item
        enchantments {
          target
          value
        }
      }
      fourteen {
        item
        enchantments {
          target
          value
        }
      }
      fifteen {
        item
        enchantments {
          target
          value
        }
      }
    }
  }
`;
