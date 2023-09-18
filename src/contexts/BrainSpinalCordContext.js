import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  widgetOutputs: {}, // initialize widgetOutputs as an empty object
};

// Actions
const SET_WIDGET_OUTPUT = 'SET_WIDGET_OUTPUT';

// Reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case SET_WIDGET_OUTPUT:
      return { 
        ...state, 
        widgetOutputs: {
          ...state.widgetOutputs,
          [action.payload.id]: action.payload.output 
        }
      };
    default:
      return state;
  }
}

// Create context
const BrainSpinalCordContext = createContext();

// Create a custom hook to use the BrainSpinalCordContext
export function useBrainSpinalCordContext() {
  return useContext(BrainSpinalCordContext);
}

// Provider component
export function BrainSpinalCordProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions to be passed in the Provider value prop
  const actions = {
    setWidgetOutput: (id, output) => dispatch({ type: SET_WIDGET_OUTPUT, payload: { id, output } }),
  };

  return (
    <BrainSpinalCordContext.Provider value={{ state, actions }}>
      {children}
    </BrainSpinalCordContext.Provider>
  );
}
