//General
import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { v4 as uuidv4 } from "uuid";

//Minor Modules
import Item from "./item";

//Contexts
import { DragContext } from "../../helper/drag";

//Styles
import "../styles/base.css";

export default function Inventory({ inventoryId }) {
  //General
  const drag = useContext(DragContext);

  //Get Inventories
  const { loading, data, refetch } = useQuery(FETCH_INVENTORY, { variables: { inventoryId }, pollInterval: 100 });

  //Switch Items
  const [switchItems, { loading: switchLoad }] = useMutation(SWITCH_ITEMS, {
    variables: { firstInventory: drag.draggedFrom, secondInventory: drag.draggedTo, firstItem: drag.dragging, secondItem: drag.draggedOn },
  });

  //Dragging
  const startDrag = (event, target) => {
    event.preventDefault();
    if (target) {
      return drag.start({ firstInventory: inventoryId, firstItem: target });
    } else {
      return;
    }
  };

  const endDrag = (event, target) => {
    event.preventDefault();
    if (target) {
      drag.over({ secondInventory: inventoryId, secondItem: target });
    } else {
      return;
    }
  };

  const finishDrag = async () => {
    if (drag.draggedTo && drag.draggedOn) {
      switchItems();
    }
    drag.drop();
    refetch();
  };

  if (!loading) {
    const inv = data.getInventory;
    const slots = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen"];

    return (
      <div className="inventory">
        {slots.map((slot, index) => (
          <li
            draggable
            className="slot"
            key={`${uuidv4()}`}
            onDragStart={(e) => startDrag(e, slot)}
            onDragOver={(e) => endDrag(e, slot)}
            onDrop={drag.leave}
            onDragLeave={finishDrag}
          >
            {<Item itemId={inv[slot].item} />}
          </li>
        ))}
        <li
         className="slot"
         onDragStart={(e) => startDrag(e, "one")}
         onDragOver={(e) => endDrag(e, "one")}
         onDrop={drag.leave}
         onDragLeave={finishDrag}
         >
          <Item itemId={inv["one"].item} />
        </li>
      </div>
    );
  } else {
    return "";
  }
}

const SWITCH_ITEMS = gql`
  mutation switchItems($firstInventory: ID!, $secondInventory: ID!, $firstItem: String!, $secondItem: String!) {
    switchItems(switchItemsInput: { firstInventory: $firstInventory, secondInventory: $secondInventory, firstItem: $firstItem, secondItem: $secondItem })
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
