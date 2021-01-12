import React, { useReducer, createContext } from "react";

const initialState = {
  dragging: null,
  draggedFrom: null,
  draggedTo: null,
  draggedOn: null,
  isDragging: false,
};

const DragContext = createContext({
  dragging: null,
  draggedFrom: null,
  draggedTo: null,
  draggedOn: null,
  isDragging: false,
  start: (data) => {},
  over: (data) => {},
  drop: () => {},
  leave: () => {},
});

function dragReducer(state, action) {
  switch (action.type) {
    case "START":
      return {
        ...state,
        dragging: action.payload.firstTarget,
        draggedFrom: action.payload.firstAnchor,
        isDragging: true,
      };
    case "OVER":
      return {
        ...state,
        draggedOn: action.payload.secondTarget,
        draggedTo: action.payload.secondAnchor,
      };
    case "DROP":
      return {
        ...state,
        dragging: null,
        draggedFrom: null,
        draggedTo: null,
        draggedOn: null,
        isDragging: false,
      };
    case "LEAVE":
      return {
        ...state,
        draggedOn: null,
        draggedTo: null,
      };
    default:
      return state;
  }
}

function DragProvider(props) {
  const [state, dispatch] = useReducer(dragReducer, initialState);

  function start(data) {
    dispatch({
      type: "START",
      payload: data,
    });
  }

  function over(data) {
    dispatch({
      type: "OVER",
      payload: data,
    });
  }

  function drop() {
    dispatch({
      type: "DROP",
    });
  }

  function leave() {
    dispatch({
      type: "LEAVE",
    });
  }

  return (
    <DragContext.Provider
      value={{
        dragging: state.dragging,
        draggedFrom: state.draggedFrom,
        draggedTo: state.draggedTo,
        draggedOn: state.draggedOn,
        isDragging: state.isDragging,
        start,
        over,
        drop,
        leave,
      }}
      {...props}
    />
  );
}

export { DragContext, DragProvider };
