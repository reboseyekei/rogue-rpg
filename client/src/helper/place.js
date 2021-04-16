import React, { useReducer, createContext } from "react";

const initialState = {
    placeId: null,
    type: null,
    name: null,
    desc: null,
};

const PlaceContext = createContext({
    placeId: null,
    type: null,
    name: null,
    desc: null,
    place: (data) => { },
    reset: () => { },
});

function placeReducer(state, action) {
    switch (action.type) {
        case "PLACE":
            return {
                ...state,
                placeId: action.payload.placeId,
                type: action.payload.type,
                name: action.payload.name,
                desc: action.payload.desc,
            }
        case "RESET":
            return {
                placeId: null,
                type: null,
                name: null,
                desc: null,
            };
        default:
            return state;
    }
}

function PlaceProvider(props) {
    const [state, dispatch] = useReducer(placeReducer, initialState);

    function place(data) {
        dispatch({
            type: "PLACE",
            payload: data,
        })
    }

    function reset() {
        dispatch({
            type: "RESET",
        });
    }

    return (
        <PlaceContext.Provider
            value={{
                placeId: state.placeId,
                type: state.type,
                name: state.name,
                desc: state.desc,
                place,
                reset,
            }}
            {...props}
        />
    );
}

export { PlaceContext, PlaceProvider };
